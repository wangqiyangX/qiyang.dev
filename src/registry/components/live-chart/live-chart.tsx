"use client"

import type { LivelineProps, LivelineSeries, ThemeMode } from "liveline"
import { Liveline } from "liveline"
import * as React from "react"

import { cn } from "@/lib/utils"

type LiveChartRootProps = Omit<React.ComponentPropsWithoutRef<"div">, "color"> &
  Omit<LivelineProps, "className" | "style" | "theme"> & {
    theme?: ThemeMode | "system"
  }

export type LiveChartHeaderProps = React.ComponentPropsWithoutRef<"div">

export type LiveChartMetricProps = React.ComponentPropsWithoutRef<"div">

export type LiveChartTitleProps = React.ComponentPropsWithoutRef<"h3">

export type LiveChartDescriptionProps = React.ComponentPropsWithoutRef<"p">

export type LiveChartBodyProps = React.ComponentPropsWithoutRef<"div">

export type LiveChartChartProps = Omit<LivelineProps, "data" | "value"> & {
  data?: LivelineProps["data"]
  value?: LivelineProps["value"]
}

export type LiveChartValueProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  value?: number
  formatter?: (value: number) => React.ReactNode
}

export type LiveChartDeltaProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  value?: number
  formatter?: (value: number) => React.ReactNode
  showZeroSign?: boolean
}

export type LiveChartFooterProps = React.ComponentPropsWithoutRef<"div">

export type LiveChartLegendProps = React.ComponentPropsWithoutRef<"div"> & {
  series?: LivelineSeries[]
}

type LiveChartContextValue = {
  delta: number
  descriptionId: string
  series?: LivelineSeries[]
  titleId: string
  value: number
  chartProps: LivelineProps
}

const LiveChartContext = React.createContext<LiveChartContextValue | null>(null)

const defaultValueFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
})

function LiveChartRoot({
  data,
  value,
  series,
  theme = "system",
  color = "#3b82f6",
  window: windowSecs,
  grid,
  badge,
  momentum,
  fill,
  loading,
  paused,
  emptyText,
  scrub,
  exaggerate,
  showValue,
  valueMomentumColor,
  degen,
  badgeTail,
  windows,
  onWindowChange,
  windowStyle,
  badgeVariant,
  tooltipY,
  tooltipOutline,
  orderbook,
  referenceLine,
  formatValue,
  formatTime,
  lerpSpeed,
  padding,
  onHover,
  cursor,
  pulse,
  lineWidth,
  mode,
  candles,
  candleWidth,
  liveCandle,
  lineMode,
  lineData,
  lineValue,
  onModeChange,
  onSeriesToggle,
  seriesToggleCompact,
  children,
  className,
  ...props
}: LiveChartRootProps) {
  const reactId = React.useId()
  const titleId = `${reactId}-title`
  const descriptionId = `${reactId}-description`
  const previousValue = data.at(-2)?.value ?? value
  const delta = value - previousValue
  const resolvedTheme = useResolvedLiveChartTheme(theme)
  const chartProps: LivelineProps = {
    badge,
    badgeTail,
    badgeVariant,
    candles,
    candleWidth,
    color,
    cursor,
    data,
    degen,
    emptyText,
    exaggerate,
    fill,
    formatTime,
    formatValue,
    grid,
    lerpSpeed,
    lineData,
    lineMode,
    lineValue,
    lineWidth,
    liveCandle,
    loading,
    mode,
    momentum,
    onHover,
    onModeChange,
    onSeriesToggle,
    onWindowChange,
    orderbook,
    padding,
    paused,
    pulse,
    referenceLine,
    scrub,
    series,
    seriesToggleCompact,
    showValue,
    theme: resolvedTheme,
    tooltipOutline,
    tooltipY,
    value,
    valueMomentumColor,
    window: windowSecs,
    windows,
    windowStyle,
  }
  const contextValue: LiveChartContextValue = {
    chartProps,
    delta,
    descriptionId,
    series,
    titleId,
    value,
  }

  return (
    <LiveChartContext.Provider value={contextValue}>
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
    </LiveChartContext.Provider>
  )
}

function LiveChartHeader({ className, ...props }: LiveChartHeaderProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4 pb-3", className)}
      {...props}
    />
  )
}

function LiveChartMetric({ className, ...props }: LiveChartMetricProps) {
  return (
    <div
      className={cn("text-right font-sans tabular-nums", className)}
      {...props}
    />
  )
}

function LiveChartTitle({ className, id, ...props }: LiveChartTitleProps) {
  const context = useLiveChart()

  return (
    <h3
      className={cn("text-sm leading-none font-medium", className)}
      id={id ?? context.titleId}
      {...props}
    />
  )
}

function LiveChartDescription({
  className,
  id,
  ...props
}: LiveChartDescriptionProps) {
  const context = useLiveChart()

  return (
    <p
      className={cn("mt-1 text-xs text-muted-foreground", className)}
      id={id ?? context.descriptionId}
      {...props}
    />
  )
}

function LiveChartBody({ className, ...props }: LiveChartBodyProps) {
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

function LiveChartChart({
  data,
  value,
  className,
  style,
  ...props
}: LiveChartChartProps) {
  const context = useLiveChart()
  const chartProps: LivelineProps = {
    ...context.chartProps,
    ...props,
    data: data ?? context.chartProps.data,
    value: value ?? context.chartProps.value,
  }

  return (
    <Liveline
      className={cn("min-h-0 w-full flex-1", className)}
      style={{ height: "auto", ...style }}
      {...chartProps}
    />
  )
}

function LiveChartValue({
  value,
  formatter = defaultValueFormatter.format,
  className,
  ...props
}: LiveChartValueProps) {
  const context = useLiveChart()
  const currentValue = value ?? context.value

  return (
    <span className={cn("text-lg font-semibold", className)} {...props}>
      {formatter(currentValue)}
    </span>
  )
}

function LiveChartDelta({
  value,
  formatter = formatSignedDelta,
  showZeroSign = false,
  className,
  ...props
}: LiveChartDeltaProps) {
  const context = useLiveChart()
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

function LiveChartFooter({ className, ...props }: LiveChartFooterProps) {
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

function LiveChartLegend({
  children,
  className,
  series,
  ...props
}: LiveChartLegendProps) {
  const context = useLiveChart()
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

function useLiveChart() {
  const context = React.useContext(LiveChartContext)

  if (!context) {
    throw new Error("LiveChart components must be used within <LiveChart>.")
  }

  return context
}

function useResolvedLiveChartTheme(theme: ThemeMode | "system"): ThemeMode {
  const [resolvedTheme, setResolvedTheme] = React.useState<ThemeMode>(() =>
    resolveLiveChartTheme(theme)
  )

  React.useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme)
      return
    }

    const updateTheme = () => {
      setResolvedTheme(resolveLiveChartTheme(theme))
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

function resolveLiveChartTheme(theme: ThemeMode | "system"): ThemeMode {
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

const LiveChart = Object.assign(LiveChartRoot, {
  Body: LiveChartBody,
  Chart: LiveChartChart,
  Delta: LiveChartDelta,
  Description: LiveChartDescription,
  Footer: LiveChartFooter,
  Header: LiveChartHeader,
  Legend: LiveChartLegend,
  Metric: LiveChartMetric,
  Title: LiveChartTitle,
  Value: LiveChartValue,
})

export {
  LiveChart,
  LiveChartBody,
  LiveChartChart,
  LiveChartDelta,
  LiveChartDescription,
  LiveChartFooter,
  LiveChartHeader,
  LiveChartLegend,
  LiveChartMetric,
  LiveChartTitle,
  LiveChartValue,
}
