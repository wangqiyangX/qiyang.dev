"use client"

import type { LivelineProps, LivelineSeries, ThemeMode } from "liveline"
import { Liveline } from "liveline"
import * as React from "react"

import { cn } from "@/lib/utils"

type LiveLineChartRootProps = React.ComponentPropsWithoutRef<"div"> & {
  data: LivelineProps["data"]
  value: LivelineProps["value"]
  series?: LivelineSeries[]
  theme?: ThemeMode | "system"
}

export type LiveLineChartHeaderProps = React.ComponentPropsWithoutRef<"div">

export type LiveLineChartMetricProps = React.ComponentPropsWithoutRef<"div">

export type LiveLineChartTitleProps = React.ComponentPropsWithoutRef<"h3">

export type LiveLineChartDescriptionProps = React.ComponentPropsWithoutRef<"p">

export type LiveLineChartBodyProps = React.ComponentPropsWithoutRef<"div">

export type LiveLineChartChartProps = Omit<
  LivelineProps,
  "className" | "data" | "series" | "style" | "theme" | "value"
> & {
  className?: string
  style?: React.CSSProperties
}

export type LiveLineChartValueProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  value?: number
  formatter?: (value: number) => React.ReactNode
}

export type LiveLineChartDeltaProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  value?: number
  formatter?: (value: number) => React.ReactNode
  showZeroSign?: boolean
}

export type LiveLineChartFooterProps = React.ComponentPropsWithoutRef<"div">

export type LiveLineChartLegendProps = React.ComponentPropsWithoutRef<"div"> & {
  series?: LivelineSeries[]
}

type LiveLineChartContextValue = {
  data: LivelineProps["data"]
  delta: number
  descriptionId: string
  series?: LivelineSeries[]
  theme: ThemeMode
  titleId: string
  value: number
}

const LiveLineChartContext =
  React.createContext<LiveLineChartContextValue | null>(null)

const defaultValueFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
})

const chartTextStyle = {
  fontFamily: "var(--font-sans), system-ui, sans-serif",
  fontVariantNumeric: "tabular-nums",
} satisfies React.CSSProperties

const chartSlotSelector = '[data-slot="live-line-chart-chart"]'
const livelineMonoFontPattern =
  /"SF Mono",\s*Menlo(?:,\s*Monaco)?(?:,\s*"Cascadia Code")?,\s*monospace/g
let liveLineChartCanvasFontOverrideInstalled = false

function LiveLineChartRoot({
  data,
  value,
  series,
  theme = "system",
  children,
  className,
  ...props
}: LiveLineChartRootProps) {
  const reactId = React.useId()
  const titleId = `${reactId}-title`
  const descriptionId = `${reactId}-description`
  const previousValue = data.at(-2)?.value ?? value
  const delta = value - previousValue
  const resolvedTheme = useResolvedLiveLineChartTheme(theme)
  const contextValue: LiveLineChartContextValue = {
    data,
    delta,
    descriptionId,
    series,
    theme: resolvedTheme,
    titleId,
    value,
  }

  return (
    <LiveLineChartContext.Provider value={contextValue}>
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        className={cn(
          "rounded-lg border bg-card p-4 text-card-foreground shadow-sm",
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    </LiveLineChartContext.Provider>
  )
}

function LiveLineChartHeader({
  className,
  ...props
}: LiveLineChartHeaderProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4 pb-3", className)}
      {...props}
    />
  )
}

function LiveLineChartMetric({
  className,
  ...props
}: LiveLineChartMetricProps) {
  return (
    <div
      className={cn("text-right font-sans tabular-nums", className)}
      {...props}
    />
  )
}

function LiveLineChartTitle({
  className,
  id,
  ...props
}: LiveLineChartTitleProps) {
  const context = useLiveLineChart()

  return (
    <h3
      className={cn("text-sm leading-none font-medium", className)}
      id={id ?? context.titleId}
      {...props}
    />
  )
}

function LiveLineChartDescription({
  className,
  id,
  ...props
}: LiveLineChartDescriptionProps) {
  const context = useLiveLineChart()

  return (
    <p
      className={cn("mt-1 text-xs text-muted-foreground", className)}
      id={id ?? context.descriptionId}
      {...props}
    />
  )
}

function LiveLineChartBody({ className, ...props }: LiveLineChartBodyProps) {
  return (
    <div
      className={cn(
        "relative flex h-56 min-h-44 flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function LiveLineChartChart({
  color = "#3b82f6",
  className,
  style,
  ...props
}: LiveLineChartChartProps) {
  const context = useLiveLineChart()
  useLiveLineChartCanvasFontOverride()
  const chartProps: LivelineProps = {
    ...props,
    color,
    data: context.data,
    series: context.series,
    theme: context.theme,
    value: context.value,
  }

  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col tabular-nums [&_button]:!font-sans [&_span]:!font-sans",
        className
      )}
      data-slot="live-line-chart-chart"
      style={{ ...chartTextStyle, ...style }}
    >
      <Liveline
        className="min-h-0 w-full flex-1"
        style={{ height: "auto" }}
        {...chartProps}
      />
    </div>
  )
}

function useLiveLineChartCanvasFontOverride() {
  React.useInsertionEffect(() => {
    installLiveLineChartCanvasFontOverride()
  }, [])
}

function installLiveLineChartCanvasFontOverride() {
  if (
    liveLineChartCanvasFontOverrideInstalled ||
    typeof window === "undefined" ||
    !window.CanvasRenderingContext2D
  ) {
    return
  }

  const descriptor = Object.getOwnPropertyDescriptor(
    window.CanvasRenderingContext2D.prototype,
    "font"
  )

  if (!descriptor?.get || !descriptor.set) {
    return
  }

  Object.defineProperty(window.CanvasRenderingContext2D.prototype, "font", {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get: descriptor.get,
    set(value: string) {
      descriptor.set?.call(this, resolveLiveLineChartCanvasFont(this, value))
    },
  })
  liveLineChartCanvasFontOverrideInstalled = true
}

function resolveLiveLineChartCanvasFont(
  context: CanvasRenderingContext2D,
  value: string
) {
  if (!value.includes("SF Mono")) {
    return value
  }

  const chart = context.canvas.closest<HTMLElement>(chartSlotSelector)

  if (!chart) {
    return value
  }

  const fontFamily =
    window.getComputedStyle(chart).fontFamily || chartTextStyle.fontFamily

  return value.replace(livelineMonoFontPattern, fontFamily)
}

function LiveLineChartValue({
  value,
  formatter = defaultValueFormatter.format,
  className,
  ...props
}: LiveLineChartValueProps) {
  const context = useLiveLineChart()
  const currentValue = value ?? context.value

  return (
    <span className={cn("text-lg font-semibold", className)} {...props}>
      {formatter(currentValue)}
    </span>
  )
}

function LiveLineChartDelta({
  value,
  formatter = formatSignedDelta,
  showZeroSign = false,
  className,
  ...props
}: LiveLineChartDeltaProps) {
  const context = useLiveLineChart()
  const currentValue = value ?? context.delta
  const isPositive = currentValue > 0
  const isNegative = currentValue < 0

  return (
    <span
      className={cn(
        "block text-xs",
        isPositive && "text-emerald-500",
        isNegative && "text-red-500",
        !isPositive && !isNegative && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {isPositive || (showZeroSign && currentValue === 0)
        ? `+${formatter(currentValue)}`
        : formatter(currentValue)}
    </span>
  )
}

function LiveLineChartFooter({
  className,
  ...props
}: LiveLineChartFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function LiveLineChartLegend({
  children,
  className,
  series,
  ...props
}: LiveLineChartLegendProps) {
  const context = useLiveLineChart()
  const items = series ?? context.series

  if (children) {
    return (
      <div
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (!items?.length) {
    return null
  }

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {items.map((item) => (
        <span
          className="inline-flex items-center gap-1.5 rounded-md text-xs text-muted-foreground"
          key={item.id}
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label ?? item.id}
        </span>
      ))}
    </div>
  )
}

function useLiveLineChart() {
  const context = React.useContext(LiveLineChartContext)

  if (!context) {
    throw new Error(
      "LiveLineChart components must be used within <LiveLineChart>."
    )
  }

  return context
}

function useResolvedLiveLineChartTheme(theme: ThemeMode | "system"): ThemeMode {
  const [resolvedTheme, setResolvedTheme] = React.useState<ThemeMode>(() =>
    resolveLiveLineChartTheme(theme)
  )

  React.useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme)
      return
    }

    const updateTheme = () => {
      setResolvedTheme(resolveLiveLineChartTheme(theme))
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const observer = new MutationObserver(updateTheme)

    updateTheme()
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    })
    mediaQuery.addEventListener("change", updateTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener("change", updateTheme)
    }
  }, [theme])

  return resolvedTheme
}

function resolveLiveLineChartTheme(theme: ThemeMode | "system"): ThemeMode {
  if (theme !== "system") {
    return theme
  }

  if (typeof document === "undefined") {
    return "light"
  }

  const root = document.documentElement

  if (root.classList.contains("dark")) {
    return "dark"
  }

  if (root.classList.contains("light")) {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function formatSignedDelta(value: number) {
  return defaultValueFormatter.format(value)
}

const LiveLineChart = Object.assign(LiveLineChartRoot, {
  Body: LiveLineChartBody,
  Chart: LiveLineChartChart,
  Delta: LiveLineChartDelta,
  Description: LiveLineChartDescription,
  Footer: LiveLineChartFooter,
  Header: LiveLineChartHeader,
  Legend: LiveLineChartLegend,
  Metric: LiveLineChartMetric,
  Title: LiveLineChartTitle,
  Value: LiveLineChartValue,
})

export {
  LiveLineChart,
  LiveLineChartBody,
  LiveLineChartChart,
  LiveLineChartDelta,
  LiveLineChartDescription,
  LiveLineChartFooter,
  LiveLineChartHeader,
  LiveLineChartLegend,
  LiveLineChartMetric,
  LiveLineChartTitle,
  LiveLineChartValue,
}
