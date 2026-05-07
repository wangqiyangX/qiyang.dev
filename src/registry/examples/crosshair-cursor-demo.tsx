"use client"

import {
  CrosshairCursor,
  useCrosshairCursor,
} from "@/registry/components/crosshair-cursor"

export default function CrosshairCursorDemo() {
  return (
    <CrosshairCursor className="h-80 w-full max-w-2xl bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px]">
      <CrosshairCursor.Content className="flex h-full items-end justify-between p-4">
        <div className="rounded-sm border bg-background/90 px-2 py-1 text-xs text-muted-foreground tabular-nums shadow-sm">
          origin: pointer
        </div>
        <PositionReadout />
      </CrosshairCursor.Content>
      <CrosshairCursor.Guides />
      <CrosshairCursor.Cursor />
    </CrosshairCursor>
  )
}

function PositionReadout() {
  const { active, position } = useCrosshairCursor()

  return (
    <div className="rounded-sm border bg-background/90 px-2 py-1 text-xs text-muted-foreground tabular-nums shadow-sm">
      x {active ? Math.round(position.x) : 0} / y{" "}
      {active ? Math.round(position.y) : 0}
    </div>
  )
}
