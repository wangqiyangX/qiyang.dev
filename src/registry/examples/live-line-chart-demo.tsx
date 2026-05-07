"use client"

import type { LivelinePoint } from "liveline"
import * as React from "react"

import { LiveLineChart } from "@/registry/components/live-line-chart/live-line-chart"

export default function LiveLineChartDemo() {
  const [data, setData] = React.useState<LivelinePoint[]>(() =>
    createInitialData()
  )
  const value = data.at(-1)?.value ?? 0

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setData((currentData) => {
        const previousPoint = currentData.at(-1)
        const previousValue = previousPoint?.value ?? 56
        const nextValue = clamp(
          previousValue + (Math.random() - 0.45) * 3.2,
          42,
          74
        )
        const nextPoint = {
          time: Math.floor(Date.now() / 1000),
          value: nextValue,
        }

        return [...currentData.slice(-70), nextPoint]
      })
    }, 1200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <LiveLineChart className="w-full max-w-xl" data={data} value={value}>
      <LiveLineChart.Header>
        <div>
          <LiveLineChart.Title>Conversion pulse</LiveLineChart.Title>
          <LiveLineChart.Description>
            Rolling checkout activity from the last few minutes.
          </LiveLineChart.Description>
        </div>
        <LiveLineChart.Metric>
          <LiveLineChart.Value
            formatter={(currentValue) => `${currentValue.toFixed(1)}%`}
          />
          <LiveLineChart.Delta
            formatter={(delta) => `${delta.toFixed(1)} pts`}
          />
        </LiveLineChart.Metric>
      </LiveLineChart.Header>
      <LiveLineChart.Body className="h-64">
        <LiveLineChart.Chart
          badge={false}
          color="#22c55e"
          exaggerate
          formatValue={(currentValue) => `${currentValue.toFixed(1)}%`}
          momentum
          referenceLine={{ label: "Above 56%", value: 56 }}
          showValue
          valueMomentumColor
          window={72}
          windows={[
            { label: "30s", secs: 30 },
            { label: "1m", secs: 60 },
            { label: "2m", secs: 120 },
          ]}
          windowStyle="rounded"
        />
      </LiveLineChart.Body>
      <LiveLineChart.Footer>
        <span>Live feed</span>
        <span>Updated every 1.2s</span>
      </LiveLineChart.Footer>
    </LiveLineChart>
  )
}

function createInitialData() {
  const now = Math.floor(Date.now() / 1000)

  return Array.from({ length: 36 }, (_, index) => ({
    time: now - (35 - index) * 2,
    value: 56 + Math.sin(index / 3) * 5 + Math.cos(index / 5) * 2,
  }))
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
