"use client"

import { motion } from "motion/react"
import * as React from "react"

import { cn } from "@/lib/utils"

type ShimmerOwnProps<T extends React.ElementType = "p"> = {
  as?: T
  children: string
  className?: string
  duration?: number
  spread?: number
  style?: React.CSSProperties
}

export type ShimmerProps<T extends React.ElementType = "p"> =
  ShimmerOwnProps<T> &
    Omit<
      React.ComponentPropsWithoutRef<T>,
      keyof ShimmerOwnProps<T> | "children"
    >

type ShimmerElementProps = {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const ShimmerElement = React.forwardRef<HTMLElement, ShimmerElementProps>(
  ({ as: Component = "p", ...props }, ref) =>
    React.createElement(Component, { ref, ...props })
)

ShimmerElement.displayName = "ShimmerElement"

const MotionShimmerElement = motion.create(ShimmerElement, {
  forwardMotionProps: true,
})

function ShimmerComponent<T extends React.ElementType = "p">({
  as,
  children,
  className,
  duration = 2,
  spread = 2,
  style,
  ...props
}: ShimmerProps<T>) {
  const spreadWidth = `${Math.max(children.length * spread, 1)}ch`

  return (
    <MotionShimmerElement
      as={as}
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "[--shimmer-text:var(--foreground)]",
        "[--shimmer-text-muted:color-mix(in_oklab,var(--foreground)_35%,transparent)]",
        className
      )}
      animate={{ backgroundPositionX: [spreadWidth, `-${spreadWidth}`] }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundImage:
          "linear-gradient(90deg,var(--shimmer-text-muted) 0%,var(--shimmer-text) 45%,var(--shimmer-text-muted) 90%)",
        backgroundSize: `${spreadWidth} 100%`,
        ...style,
      }}
      {...props}
    >
      {children}
    </MotionShimmerElement>
  )
}

const Shimmer = React.memo(ShimmerComponent) as typeof ShimmerComponent

export { Shimmer }
