"use client"

import * as React from "react"

import { Slider } from "@/registry/components/slider/slider"

const marks = [0, 25, 50, 75, 100]

export default function SliderDemo() {
  const [value, setValue] = React.useState([48])

  return (
    <div className="w-full max-w-sm space-y-6 font-sans">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Intensity</span>
        <span className="text-muted-foreground tabular-nums">{value[0]}%</span>
      </div>
      <Slider
        className="mt-8 mb-6"
        max={100}
        min={0}
        onValueChange={setValue}
        step={1}
        value={value}
      >
        <Slider.Track>
          <Slider.Range />
          {marks.map((mark) => (
            <Slider.Mark key={mark} value={mark}>
              <Slider.Tick />
              <Slider.Label />
            </Slider.Mark>
          ))}
        </Slider.Track>
        <Slider.Thumb aria-label="Intensity" />
        <Slider.HiddenInput name="intensity" />
      </Slider>
    </div>
  )
}
