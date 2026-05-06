"use client"

import * as React from "react"

import { Stepper } from "@/registry/components/stepper/stepper"

export default function StepperDemo() {
  const [value, setValue] = React.useState(3)

  return (
    <div className="flex flex-col items-center gap-4">
      <Stepper
        aria-label="Quantity"
        max={8}
        min={0}
        onValueChange={setValue}
        value={value}
      />
      <p className="font-sans text-sm text-muted-foreground tabular-nums">
        {value}
      </p>
    </div>
  )
}
