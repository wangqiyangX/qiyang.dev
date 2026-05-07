"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CrosshairCursorPosition = {
  x: number
  y: number
}

type CrosshairCursorContextValue = {
  active: boolean
  disabled: boolean
  position: CrosshairCursorPosition
}

const CrosshairCursorContext =
  React.createContext<CrosshairCursorContextValue | null>(null)

export type CrosshairCursorProps = React.ComponentPropsWithoutRef<"div"> & {
  disabled?: boolean
  hideOnLeave?: boolean
  position?: CrosshairCursorPosition
  defaultPosition?: CrosshairCursorPosition
  onPositionChange?: (position: CrosshairCursorPosition) => void
}

export type CrosshairCursorContentProps = React.ComponentPropsWithoutRef<"div">

export type CrosshairCursorGuidesProps = React.ComponentPropsWithoutRef<"div">

export type CrosshairCursorLineProps = React.ComponentPropsWithoutRef<"div">

export type CrosshairCursorCursorProps =
  React.ComponentPropsWithoutRef<"div"> & {
    width?: number
    height?: number
  }

function CrosshairCursorRoot({
  className,
  children,
  disabled = false,
  hideOnLeave = true,
  position: positionProp,
  defaultPosition = { x: 0, y: 0 },
  onPositionChange,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  ...props
}: CrosshairCursorProps) {
  const [active, setActive] = React.useState(false)
  const [uncontrolledPosition, setUncontrolledPosition] =
    React.useState(defaultPosition)
  const isControlled = positionProp !== undefined
  const position = positionProp ?? uncontrolledPosition

  const updatePosition = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) {
        setActive(false)
        return
      }

      const rect = event.currentTarget.getBoundingClientRect()
      const nextPosition = {
        x: clamp(event.clientX - rect.left, 0, rect.width),
        y: clamp(event.clientY - rect.top, 0, rect.height),
      }

      if (!isControlled) {
        setUncontrolledPosition(nextPosition)
      }

      setActive(true)
      onPositionChange?.(nextPosition)
    },
    [disabled, isControlled, onPositionChange]
  )

  const handlePointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      updatePosition(event)
      onPointerEnter?.(event)
    },
    [onPointerEnter, updatePosition]
  )

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      updatePosition(event)
      onPointerMove?.(event)
    },
    [onPointerMove, updatePosition]
  )

  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (hideOnLeave) {
        setActive(false)
      }

      onPointerLeave?.(event)
    },
    [hideOnLeave, onPointerLeave]
  )

  const context = React.useMemo<CrosshairCursorContextValue>(
    () => ({
      active: active && !disabled,
      disabled,
      position,
    }),
    [active, disabled, position]
  )

  return (
    <CrosshairCursorContext.Provider value={context}>
      <div
        className={cn(
          "relative isolate min-h-48 overflow-hidden rounded-md border bg-background text-foreground",
          !disabled && "cursor-none",
          className
        )}
        data-active={context.active}
        data-slot="crosshair-cursor"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        {...props}
      >
        {children}
      </div>
    </CrosshairCursorContext.Provider>
  )
}

function CrosshairCursorContent({
  className,
  ...props
}: CrosshairCursorContentProps) {
  return (
    <div
      className={cn("relative z-10", className)}
      data-slot="crosshair-cursor-content"
      {...props}
    />
  )
}

function CrosshairCursorGuides({
  className,
  children,
  ...props
}: CrosshairCursorGuidesProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("contents", className)}
      data-slot="crosshair-cursor-guides"
      {...props}
    >
      <CrosshairCursorHorizontalLine />
      <CrosshairCursorVerticalLine />
      {children}
    </div>
  )
}

function CrosshairCursorHorizontalLine({
  className,
  style,
  ...props
}: CrosshairCursorLineProps) {
  const { active, position } = useCrosshairCursor()

  if (!active) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute right-0 left-0 z-20 h-0 border-t border-dashed border-gray-400",
        className
      )}
      data-slot="crosshair-cursor-horizontal-line"
      style={{
        top: position.y,
        ...style,
      }}
      {...props}
    />
  )
}

function CrosshairCursorVerticalLine({
  className,
  style,
  ...props
}: CrosshairCursorLineProps) {
  const { active, position } = useCrosshairCursor()

  if (!active) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 bottom-0 z-20 w-0 border-l border-dashed border-gray-400",
        className
      )}
      data-slot="crosshair-cursor-vertical-line"
      style={{
        left: position.x,
        ...style,
      }}
      {...props}
    />
  )
}

function CrosshairCursorCursor({
  className,
  height = 8,
  style,
  width = 8,
  ...props
}: CrosshairCursorCursorProps) {
  const { active, position } = useCrosshairCursor()

  if (!active) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-30 border border-foreground bg-background shadow-sm",
        className
      )}
      data-slot="crosshair-cursor-cursor"
      style={{
        height,
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        width,
        ...style,
      }}
      {...props}
    />
  )
}

export function useCrosshairCursor() {
  const context = React.useContext(CrosshairCursorContext)

  if (!context) {
    throw new Error("useCrosshairCursor must be used within a CrosshairCursor.")
  }

  return context
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const CrosshairCursor = Object.assign(CrosshairCursorRoot, {
  Content: CrosshairCursorContent,
  Cursor: CrosshairCursorCursor,
  Guides: CrosshairCursorGuides,
  HorizontalLine: CrosshairCursorHorizontalLine,
  VerticalLine: CrosshairCursorVerticalLine,
})

CrosshairCursorRoot.displayName = "CrosshairCursor"
CrosshairCursorContent.displayName = "CrosshairCursor.Content"
CrosshairCursorCursor.displayName = "CrosshairCursor.Cursor"
CrosshairCursorGuides.displayName = "CrosshairCursor.Guides"
CrosshairCursorHorizontalLine.displayName = "CrosshairCursor.HorizontalLine"
CrosshairCursorVerticalLine.displayName = "CrosshairCursor.VerticalLine"

export {
  CrosshairCursor,
  CrosshairCursorContent,
  CrosshairCursorCursor,
  CrosshairCursorGuides,
  CrosshairCursorHorizontalLine,
  CrosshairCursorRoot,
  CrosshairCursorVerticalLine,
}
