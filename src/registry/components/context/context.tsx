"use client"

import type { LanguageModelUsage } from "ai"
import * as React from "react"
import { getUsage } from "tokenlens"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const PERCENT_MAX = 100
const ICON_SIZE = 20
const ICON_VIEW_BOX = 24
const ICON_CENTER = 12
const ICON_RADIUS = 10
const ICON_STROKE_WIDTH = 2

export type ModelId = string

type ContextValue = {
  maxTokens: number
  usedTokens: number
  usage?: LanguageModelUsage
  modelId?: ModelId
}

export type ContextProps = React.ComponentProps<typeof HoverCard> & ContextValue

type TokenBreakdown = {
  inputTokens: number
  outputTokens: number
  reasoningTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
  cacheTokens: number
}

const ContextValueContext = React.createContext<ContextValue | null>(null)

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
})

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  style: "percent",
})

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 6,
  style: "currency",
})

function useContextValue() {
  const context = React.useContext(ContextValueContext)

  if (!context) {
    throw new Error("Context components must be used within Context.")
  }

  return context
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getUsageBreakdown(usage?: LanguageModelUsage): TokenBreakdown {
  const cacheReadTokens =
    usage?.inputTokenDetails?.cacheReadTokens ?? usage?.cachedInputTokens ?? 0
  const cacheWriteTokens = usage?.inputTokenDetails?.cacheWriteTokens ?? 0
  const reasoningTokens =
    usage?.outputTokenDetails?.reasoningTokens ?? usage?.reasoningTokens ?? 0
  const inputTokens =
    usage?.inputTokenDetails?.noCacheTokens ??
    Math.max((usage?.inputTokens ?? 0) - cacheReadTokens - cacheWriteTokens, 0)
  const outputTokens =
    usage?.outputTokenDetails?.textTokens ??
    Math.max((usage?.outputTokens ?? 0) - reasoningTokens, 0)

  return {
    cacheReadTokens,
    cacheTokens: cacheReadTokens + cacheWriteTokens,
    cacheWriteTokens,
    inputTokens,
    outputTokens,
    reasoningTokens,
  }
}

function getContextCost({
  modelId,
  breakdown,
}: {
  modelId?: ModelId
  breakdown: TokenBreakdown
}) {
  if (!modelId) {
    return undefined
  }

  return getUsage({
    modelId,
    usage: {
      cacheReads: breakdown.cacheReadTokens,
      cacheWrites: breakdown.cacheWriteTokens,
      input: breakdown.inputTokens,
      output: breakdown.outputTokens,
      reasoningTokens: breakdown.reasoningTokens,
      total:
        breakdown.inputTokens +
        breakdown.outputTokens +
        breakdown.reasoningTokens +
        breakdown.cacheTokens,
    },
  }).costUSD
}

function formatTokens(tokens?: number) {
  if (tokens === undefined) {
    return "-"
  }

  return compactFormatter.format(tokens)
}

function formatCost(cost?: number) {
  if (cost === undefined) {
    return "-"
  }

  return currencyFormatter.format(cost)
}

function getUsedPercent(usedTokens: number, maxTokens: number) {
  if (maxTokens <= 0) {
    return 0
  }

  return clamp(usedTokens / maxTokens, 0, 1)
}

export function Context({
  usedTokens,
  maxTokens,
  usage,
  modelId,
  ...props
}: ContextProps) {
  const contextValue = React.useMemo(
    () => ({ maxTokens, modelId, usage, usedTokens }),
    [maxTokens, modelId, usage, usedTokens]
  )

  return (
    <ContextValueContext.Provider value={contextValue}>
      <HoverCard closeDelay={0} openDelay={0} {...props} />
    </ContextValueContext.Provider>
  )
}

function ContextIcon() {
  const { usedTokens, maxTokens } = useContextValue()
  const circumference = 2 * Math.PI * ICON_RADIUS
  const usedPercent = getUsedPercent(usedTokens, maxTokens)
  const dashOffset = circumference * (1 - usedPercent)

  return (
    <svg
      aria-label="Model context usage"
      data-icon="inline-end"
      height={ICON_SIZE}
      role="img"
      viewBox={`0 0 ${ICON_VIEW_BOX} ${ICON_VIEW_BOX}`}
      width={ICON_SIZE}
    >
      <circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        fill="none"
        opacity="0.25"
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        fill="none"
        opacity="0.75"
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeWidth={ICON_STROKE_WIDTH}
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
      />
    </svg>
  )
}

export type ContextTriggerProps = React.ComponentProps<typeof Button>

export function ContextTrigger({ children, ...props }: ContextTriggerProps) {
  const { usedTokens, maxTokens } = useContextValue()
  const usedPercent = getUsedPercent(usedTokens, maxTokens)

  return (
    <HoverCardTrigger asChild>
      {children ?? (
        <Button type="button" variant="ghost" {...props}>
          <span className="font-medium text-muted-foreground">
            {percentFormatter.format(usedPercent)}
          </span>
          <ContextIcon />
        </Button>
      )}
    </HoverCardTrigger>
  )
}

export type ContextContentProps = React.ComponentProps<typeof HoverCardContent>

export function ContextContent({ className, ...props }: ContextContentProps) {
  return (
    <HoverCardContent
      className={cn("min-w-64 divide-y overflow-hidden p-0", className)}
      {...props}
    />
  )
}

export type ContextContentHeaderProps = React.ComponentProps<"div">

export function ContextContentHeader({
  children,
  className,
  ...props
}: ContextContentHeaderProps) {
  const { usedTokens, maxTokens } = useContextValue()
  const usedPercent = getUsedPercent(usedTokens, maxTokens)

  return (
    <div className={cn("flex w-full flex-col gap-2 p-3", className)} {...props}>
      {children ?? (
        <>
          <div className="flex items-center justify-between gap-3 text-xs">
            <p>{percentFormatter.format(usedPercent)}</p>
            <p className="font-mono text-muted-foreground">
              {formatTokens(usedTokens)} / {formatTokens(maxTokens)}
            </p>
          </div>
          <Progress value={usedPercent * PERCENT_MAX} />
        </>
      )}
    </div>
  )
}

export type ContextContentBodyProps = React.ComponentProps<"div">

export function ContextContentBody({
  children,
  className,
  ...props
}: ContextContentBodyProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2 p-3", className)} {...props}>
      {children}
    </div>
  )
}

export type ContextContentFooterProps = React.ComponentProps<"div">

export function ContextContentFooter({
  children,
  className,
  ...props
}: ContextContentFooterProps) {
  const { modelId, usage } = useContextValue()
  const breakdown = getUsageBreakdown(usage)
  const totalCost = getContextCost({ breakdown, modelId })?.totalUSD

  if (!children && !modelId) {
    return null
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-3 bg-secondary p-3 text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="text-muted-foreground">Total cost</span>
          <span>{formatCost(totalCost)}</span>
        </>
      )}
    </div>
  )
}

type ContextUsageRowProps = React.ComponentProps<"div"> & {
  label: string
  tokens: number
  cost?: number
}

function ContextUsageRow({
  label,
  tokens,
  cost,
  className,
  children,
  ...props
}: ContextUsageRowProps) {
  if (children) {
    return (
      <div className={cn("text-xs", className)} {...props}>
        {children}
      </div>
    )
  }

  if (!tokens) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-xs",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <span>
        {formatTokens(tokens)}
        {cost !== undefined ? (
          <span className="ml-2 text-muted-foreground">{formatCost(cost)}</span>
        ) : null}
      </span>
    </div>
  )
}

export type ContextInputUsageProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  children?: React.ReactNode
}

export function ContextInputUsage(props: ContextInputUsageProps) {
  const { usage, modelId } = useContextValue()
  const breakdown = getUsageBreakdown(usage)
  const cost = getContextCost({ breakdown, modelId })?.inputUSD

  return (
    <ContextUsageRow
      label="Input"
      tokens={breakdown.inputTokens}
      cost={cost}
      {...props}
    />
  )
}

export type ContextOutputUsageProps = ContextInputUsageProps

export function ContextOutputUsage(props: ContextOutputUsageProps) {
  const { usage, modelId } = useContextValue()
  const breakdown = getUsageBreakdown(usage)
  const cost = getContextCost({ breakdown, modelId })?.outputUSD

  return (
    <ContextUsageRow
      label="Output"
      tokens={breakdown.outputTokens}
      cost={cost}
      {...props}
    />
  )
}

export type ContextReasoningUsageProps = ContextInputUsageProps

export function ContextReasoningUsage(props: ContextReasoningUsageProps) {
  const { usage, modelId } = useContextValue()
  const breakdown = getUsageBreakdown(usage)
  const cost = getContextCost({ breakdown, modelId })?.reasoningUSD

  return (
    <ContextUsageRow
      label="Reasoning"
      tokens={breakdown.reasoningTokens}
      cost={cost}
      {...props}
    />
  )
}

export type ContextCacheUsageProps = ContextInputUsageProps

export function ContextCacheUsage(props: ContextCacheUsageProps) {
  const { usage, modelId } = useContextValue()
  const breakdown = getUsageBreakdown(usage)
  const cost = getContextCost({ breakdown, modelId })
  const cacheCost =
    cost?.cacheReadUSD === undefined && cost?.cacheWriteUSD === undefined
      ? undefined
      : (cost.cacheReadUSD ?? 0) + (cost.cacheWriteUSD ?? 0)

  return (
    <ContextUsageRow
      label="Cache"
      tokens={breakdown.cacheTokens}
      cost={cacheCost}
      {...props}
    />
  )
}
