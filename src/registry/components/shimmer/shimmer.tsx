"use client"

import { motion, useReducedMotion } from "motion/react"
import * as React from "react"

import { cn } from "@/lib/utils"

export type ShimmerOwnProps<T extends React.ElementType = "p"> = {
  /**
   * Element or component rendered by Shimmer.
   * @defaultValue "p"
   */
  as?: T
  /**
   * Text content to render with the shimmer effect.
   */
  children: string
  /**
   * Additional classes for the rendered element.
   */
  className?: string
  /**
   * Duration of one shimmer cycle in seconds.
   * @defaultValue 2
   */
  duration?: number
  /**
   * Width multiplier for the shimmer gradient based on text length.
   * @defaultValue 2
   */
  spread?: number
  /**
   * Inline styles for the rendered element.
   */
  style?: React.CSSProperties
}

export type ShimmerProps<T extends React.ElementType = "p"> =
  ShimmerOwnProps<T> &
    Omit<
      React.ComponentPropsWithoutRef<T>,
      keyof ShimmerOwnProps<T> | "children"
    >

type ShimmerComponent = <T extends React.ElementType = "p">(
  props: ShimmerProps<T> & {
    ref?: React.ComponentPropsWithRef<T>["ref"]
  }
) => React.ReactElement | null

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

const graphemeSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null

function getTextSegmentCount(text: string) {
  if (!graphemeSegmenter) {
    return Array.from(text).length
  }

  return Array.from(graphemeSegmenter.segment(text)).length
}

const ForwardedShimmer = React.forwardRef<
  HTMLElement,
  ShimmerProps<React.ElementType>
>(function ShimmerComponent(
  { as, children, className, duration = 2, spread = 2, style, ...props },
  ref
) {
  const shouldReduceMotion = useReducedMotion()
  const spreadWidth = React.useMemo(
    () => `${Math.max(getTextSegmentCount(children) * spread, 1)}ch`,
    [children, spread]
  )

  return (
    <MotionShimmerElement
      {...props}
      ref={ref}
      as={as}
      className={cn(
        "inline-block",
        shouldReduceMotion
          ? "text-foreground"
          : "bg-clip-text text-transparent",
        "[--shimmer-text:var(--foreground)]",
        "[--shimmer-text-muted:color-mix(in_oklab,var(--foreground)_35%,transparent)]",
        className
      )}
      animate={
        shouldReduceMotion
          ? undefined
          : { backgroundPositionX: [spreadWidth, `-${spreadWidth}`] }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration,
              ease: "linear",
              repeat: Infinity,
            }
      }
      style={
        shouldReduceMotion
          ? style
          : {
              backgroundImage:
                "linear-gradient(90deg,var(--shimmer-text-muted) 0%,var(--shimmer-text) 45%,var(--shimmer-text-muted) 90%)",
              backgroundSize: `${spreadWidth} 100%`,
              ...style,
            }
      }
    >
      {children}
    </MotionShimmerElement>
  )
})

ForwardedShimmer.displayName = "Shimmer"

const Shimmer = React.memo(ForwardedShimmer) as ShimmerComponent

export { Shimmer }
