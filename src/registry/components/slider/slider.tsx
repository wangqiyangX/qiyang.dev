"use client"

import { Slider as SliderPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

type SliderValueFormatter = (value: number, index: number) => React.ReactNode

type SliderDirection = "ltr" | "rtl"

type SliderContextValue = {
  dir: SliderDirection
  disabled?: boolean
  formatValue: SliderValueFormatter
  getPercentage: (value: number) => number
  inverted: boolean
  max: number
  min: number
  orientation: "horizontal" | "vertical"
  value: number[]
}

type SliderMarkContextValue = {
  value: number
}

export type SliderRootProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  formatValue?: SliderValueFormatter
}

export type SliderTrackProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Track
>

export type SliderRangeProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Range
>

export type SliderThumbProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Thumb
> & {
  index?: number
}

export type SliderMarkProps = React.ComponentPropsWithoutRef<"div"> & {
  value: number
}

export type SliderTickProps = React.ComponentPropsWithoutRef<"span">

export type SliderLabelProps = React.ComponentPropsWithoutRef<"span"> & {
  value?: number
}

export type SliderHiddenInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "defaultValue" | "type" | "value"
> & {
  index?: number
  separator?: string
  value?: number | string
}

const defaultFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 8,
})

const SliderContext = React.createContext<SliderContextValue | null>(null)
const SliderMarkContext = React.createContext<SliderMarkContextValue | null>(
  null
)
const SliderTrackContext = React.createContext(false)

function SliderRoot({
  className,
  children,
  defaultValue,
  dir,
  disabled,
  formatValue = (value) => defaultFormatter.format(value),
  inverted = false,
  max = 100,
  min = 0,
  onValueChange,
  orientation = "horizontal",
  value,
  ...props
}: SliderRootProps) {
  const direction: SliderDirection = dir === "rtl" ? "rtl" : "ltr"
  const [uncontrolledValue, setUncontrolledValue] = React.useState<number[]>(
    () => getInitialValue(value, defaultValue, min)
  )
  const isControlled = value !== undefined
  const currentValue = isControlled
    ? getInitialValue(value, defaultValue, min)
    : uncontrolledValue

  const getPercentage = React.useCallback(
    (markValue: number) => {
      const distance = max - min

      if (distance === 0) {
        return 0
      }

      const percentage = ((clamp(markValue, min, max) - min) / distance) * 100

      return inverted ? 100 - percentage : percentage
    },
    [inverted, max, min]
  )

  const handleValueChange = React.useCallback(
    (nextValue: number[]) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }

      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange]
  )

  const context = React.useMemo<SliderContextValue>(
    () => ({
      dir: direction,
      disabled,
      formatValue,
      getPercentage,
      inverted,
      max,
      min,
      orientation,
      value: currentValue,
    }),
    [
      currentValue,
      direction,
      disabled,
      formatValue,
      getPercentage,
      inverted,
      max,
      min,
      orientation,
    ]
  )

  return (
    <SliderContext.Provider value={context}>
      <SliderPrimitive.Root
        className={cn(
          "relative flex h-10 w-full touch-none items-center select-none data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-10 data-[orientation=vertical]:flex-col data-disabled:opacity-50",
          className
        )}
        data-slot="slider"
        defaultValue={defaultValue}
        dir={dir}
        disabled={disabled}
        inverted={inverted}
        max={max}
        min={min}
        onValueChange={handleValueChange}
        orientation={orientation}
        value={value}
        {...props}
      >
        {children ?? (
          <>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            {currentValue.map((_, index) => (
              <SliderThumb index={index} key={index} />
            ))}
          </>
        )}
      </SliderPrimitive.Root>
    </SliderContext.Provider>
  )
}

function SliderTrack({ className, ...props }: SliderTrackProps) {
  return (
    <SliderTrackContext.Provider value={true}>
      <SliderPrimitive.Track
        className={cn(
          "relative h-5 w-full grow rounded-sm bg-muted data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5",
          className
        )}
        data-slot="slider-track"
        {...props}
      />
    </SliderTrackContext.Provider>
  )
}

function SliderRange({ className, ...props }: SliderRangeProps) {
  return (
    <SliderPrimitive.Range
      className={cn(
        "absolute inset-y-0 rounded-[inherit] bg-primary data-[orientation=vertical]:inset-x-0 data-[orientation=vertical]:w-full",
        className
      )}
      data-slot="slider-range"
      {...props}
    />
  )
}

function SliderThumb({
  "aria-label": ariaLabel,
  className,
  index = 0,
  ...props
}: SliderThumbProps) {
  return (
    <SliderPrimitive.Thumb
      aria-label={ariaLabel ?? `Slider thumb ${index + 1}`}
      className={cn(
        "block h-5 w-2.5 shrink-0 rounded-[3px] border border-primary/70 bg-background shadow-sm transition-[color,box-shadow] outline-none hover:border-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[orientation=vertical]:h-2.5 data-[orientation=vertical]:w-5",
        className
      )}
      data-slot="slider-thumb"
      {...props}
    />
  )
}

function SliderMark({
  className,
  children,
  style,
  value,
  ...props
}: SliderMarkProps) {
  const slider = useSlider()
  const inTrack = React.useContext(SliderTrackContext)
  const percentage = slider.getPercentage(value)
  const active = isMarkActive(value, slider)
  const edge = percentage <= 0 ? "start" : percentage >= 100 ? "end" : undefined
  const positionStyle: React.CSSProperties =
    slider.orientation === "vertical"
      ? { bottom: `${percentage}%` }
      : { insetInlineStart: `${percentage}%` }

  if (!inTrack) {
    throw new Error("Slider.Mark must be used within Slider.Track")
  }

  return (
    <SliderMarkContext.Provider value={{ value }}>
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-muted-foreground data-[active=true]:text-foreground data-[orientation=horizontal]:data-[dir=ltr]:data-[edge=end]:-translate-x-full data-[orientation=horizontal]:data-[dir=rtl]:data-[edge=end]:translate-x-0 data-[orientation=horizontal]:data-[dir=ltr]:data-[edge=start]:translate-x-0 data-[orientation=horizontal]:data-[dir=rtl]:data-[edge=start]:-translate-x-full data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-1/2 data-[orientation=vertical]:flex-row data-[orientation=vertical]:data-[edge=end]:-translate-y-full data-[orientation=vertical]:data-[edge=start]:translate-y-0",
          className
        )}
        data-active={active}
        data-dir={slider.dir}
        data-edge={edge}
        data-slot="slider-mark"
        data-orientation={slider.orientation}
        style={{
          ...positionStyle,
          ...style,
        }}
        {...props}
      >
        {children ?? (
          <>
            <SliderTick />
            <SliderLabel />
          </>
        )}
      </div>
    </SliderMarkContext.Provider>
  )
}

function SliderTick({ className, ...props }: SliderTickProps) {
  const slider = useSlider()

  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-2 w-px rounded-full bg-current/50 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-2",
        className
      )}
      data-orientation={slider.orientation}
      data-slot="slider-tick"
      {...props}
    />
  )
}

function SliderLabel({
  className,
  children,
  value: valueProp,
  ...props
}: SliderLabelProps) {
  const slider = useSlider()
  const mark = React.useContext(SliderMarkContext)
  const value = valueProp ?? mark?.value

  return (
    <span
      className={cn(
        "absolute top-4 font-sans text-[11px] leading-none whitespace-nowrap tabular-nums data-[orientation=vertical]:top-auto data-[orientation=vertical]:left-4",
        className
      )}
      data-slot="slider-label"
      data-orientation={slider.orientation}
      {...props}
    >
      {children ?? (value === undefined ? null : slider.formatValue(value, 0))}
    </span>
  )
}

function SliderHiddenInput({
  index,
  separator = ",",
  value: valueProp,
  ...props
}: SliderHiddenInputProps) {
  const slider = useSlider()
  const value =
    valueProp ??
    (index === undefined
      ? slider.value.join(separator)
      : (slider.value[index] ?? slider.min))

  return (
    <input
      data-slot="slider-hidden-input"
      readOnly
      type="hidden"
      value={value}
      {...props}
    />
  )
}

function useSlider() {
  const context = React.useContext(SliderContext)

  if (!context) {
    throw new Error("Slider components must be used within Slider.Root")
  }

  return context
}

function getInitialValue(
  value: number[] | readonly number[] | undefined,
  defaultValue: number[] | readonly number[] | undefined,
  min: number
) {
  if (Array.isArray(value)) {
    return [...value]
  }

  if (Array.isArray(defaultValue)) {
    return [...defaultValue]
  }

  return [min]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function isMarkActive(value: number, slider: SliderContextValue) {
  const [firstValue = slider.min, secondValue] = slider.value

  if (secondValue !== undefined) {
    const lowerValue = Math.min(firstValue, secondValue)
    const upperValue = Math.max(firstValue, secondValue)

    return value >= lowerValue && value <= upperValue
  }

  return slider.inverted ? value >= firstValue : value <= firstValue
}

const Slider = Object.assign(SliderRoot, {
  HiddenInput: SliderHiddenInput,
  Label: SliderLabel,
  Mark: SliderMark,
  Range: SliderRange,
  Root: SliderRoot,
  Thumb: SliderThumb,
  Tick: SliderTick,
  Track: SliderTrack,
})

SliderRoot.displayName = "Slider"
SliderTrack.displayName = "Slider.Track"
SliderRange.displayName = "Slider.Range"
SliderThumb.displayName = "Slider.Thumb"
SliderMark.displayName = "Slider.Mark"
SliderTick.displayName = "Slider.Tick"
SliderLabel.displayName = "Slider.Label"
SliderHiddenInput.displayName = "Slider.HiddenInput"

export {
  Slider,
  SliderHiddenInput,
  SliderLabel,
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTick,
  SliderTrack,
}
