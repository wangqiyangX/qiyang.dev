"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"

export type StepperProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "defaultValue" | "onChange"
> & {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number) => void
  decrementLabel?: string
  incrementLabel?: string
}

const defaultFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 8,
})

function Stepper({
  value,
  defaultValue = 0,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  disabled = false,
  onValueChange,
  decrementLabel = "Decrease value",
  incrementLabel = "Increase value",
  className,
  "aria-label": ariaLabel = "Stepper",
  ...props
}: StepperProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = clampValue(
    isControlled ? value : uncontrolledValue,
    min,
    max
  )
  const safeStep = Math.abs(step) || 1
  const canDecrement = !disabled && currentValue > min
  const canIncrement = !disabled && currentValue < max

  const updateValue = React.useCallback(
    (direction: -1 | 1) => {
      const nextValue = getNextValue(
        currentValue,
        direction,
        safeStep,
        min,
        max
      )

      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }

      onValueChange?.(nextValue)
    },
    [currentValue, isControlled, max, min, onValueChange, safeStep]
  )

  return (
    <div className={cn("inline-flex items-center", className)} {...props}>
      <ButtonGroup aria-label={ariaLabel}>
        <Button
          aria-label={decrementLabel}
          disabled={!canDecrement}
          onClick={() => updateValue(-1)}
          size="icon"
          type="button"
          variant="outline"
        >
          <MinusIcon aria-hidden="true" />
        </Button>
        <Button
          aria-label={incrementLabel}
          disabled={!canIncrement}
          onClick={() => updateValue(1)}
          size="icon"
          type="button"
          variant="outline"
        >
          <PlusIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
      <span className="sr-only" role="status">
        Value: {defaultFormatter.format(currentValue)}
      </span>
    </div>
  )
}

function getNextValue(
  value: number,
  direction: -1 | 1,
  step: number,
  min: number,
  max: number
) {
  return clampValue(
    roundToStepPrecision(value + step * direction, step),
    min,
    max
  )
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function roundToStepPrecision(value: number, step: number) {
  const precision = getDecimalPrecision(step)

  return Number(value.toFixed(precision))
}

function getDecimalPrecision(value: number) {
  if (!Number.isFinite(value)) {
    return 0
  }

  const valueText = value.toString().toLowerCase()
  const [base, exponent] = valueText.split("e-")
  const decimalPart = base?.split(".")[1]

  return (decimalPart?.length ?? 0) + (exponent ? Number(exponent) : 0)
}

export { Stepper }
