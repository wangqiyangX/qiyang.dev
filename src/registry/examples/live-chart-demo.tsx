"use client"

import type { LivelinePoint } from "liveline"
import * as React from "react"

import { LiveChart } from "@/registry/components/live-chart/live-chart"

export default function LiveChartDemo() {
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
    <LiveChart
      badge={false}
      className="w-full max-w-xl"
      color="#22c55e"
      data={data}
      exaggerate
      formatValue={(currentValue) => `${currentValue.toFixed(1)}%`}
      momentum
      referenceLine={{ label: "Above 56%", value: 56 }}
      showValue
      value={value}
      valueMomentumColor
      window={72}
      windows={[
        { label: "30s", secs: 30 },
        { label: "1m", secs: 60 },
        { label: "2m", secs: 120 },
      ]}
      windowStyle="rounded"
    >
      <LiveChart.Header>
        <div>
          <LiveChart.Title>Conversion pulse</LiveChart.Title>
          <LiveChart.Description>
            Rolling checkout activity from the last few minutes.
          </LiveChart.Description>
        </div>
        <LiveChart.Metric>
          <LiveChart.Value
            formatter={(currentValue) => `${currentValue.toFixed(1)}%`}
          />
          <LiveChart.Delta formatter={(delta) => `${delta.toFixed(1)} pts`} />
        </LiveChart.Metric>
      </LiveChart.Header>
      <LiveChart.Body className="h-64">
        <LiveChart.Chart />
      </LiveChart.Body>
      <LiveChart.Footer>
        <span>Live feed</span>
        <span>Updated every 1.2s</span>
      </LiveChart.Footer>
    </LiveChart>
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
