"use client"

import * as React from "react"
import type { TokenBreakdown } from "tokenlens/core"
import { getTokenCosts } from "tokenlens/helpers"
import { getModels } from "tokenlens/models"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

export type LanguageModelUsage = {
  inputTokens?: number
  outputTokens?: number
  reasoningTokens?: number
  cachedInputTokens?: number
  totalTokens?: number
}

export type ModelId = string

type ContextCostBreakdown = {
  input: number
  output: number
  reasoning: number
  cachedInput: number
  total: number
}

type ContextValue = {
  maxTokens: number
  usedTokens: number
  usage: Required<LanguageModelUsage>
  modelId?: ModelId
  percentage: number
  costs?: ContextCostBreakdown
}

export type ContextProps = React.ComponentProps<typeof HoverCard> & {
  maxTokens: number
  usedTokens: number
  usage?: LanguageModelUsage
  modelId?: ModelId
}

export type ContextTriggerProps = React.ComponentProps<typeof Button> & {
  children?: React.ReactNode
}

export type ContextContentProps = React.ComponentProps<typeof HoverCardContent>

export type ContextContentHeaderProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

export type ContextContentBodyProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

export type ContextContentFooterProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

export type ContextUsageProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

const ContextValueContext = React.createContext<ContextValue | null>(null)

const tokenFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const percentFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 0,
})

const costFormatter = new Intl.NumberFormat("en", {
  currency: "USD",
  maximumFractionDigits: 6,
  minimumFractionDigits: 2,
  style: "currency",
})

const modelCatalog = getModels()

function Context({
  maxTokens,
  usedTokens,
  usage,
  modelId,
  children,
  ...props
}: ContextProps) {
  const normalizedUsage = normalizeUsage(usage)
  const safeMaxTokens = Math.max(0, maxTokens)
  const safeUsedTokens = Math.max(0, usedTokens)
  const percentage =
    safeMaxTokens > 0
      ? Math.min((safeUsedTokens / safeMaxTokens) * 100, 100)
      : 0

  const value = React.useMemo<ContextValue>(
    () => ({
      costs: modelId ? estimateCosts(modelId, normalizedUsage) : undefined,
      maxTokens: safeMaxTokens,
      modelId,
      percentage,
      usage: normalizedUsage,
      usedTokens: safeUsedTokens,
    }),
    [modelId, normalizedUsage, percentage, safeMaxTokens, safeUsedTokens]
  )

  return (
    <ContextValueContext.Provider value={value}>
      <HoverCard {...props}>{children}</HoverCard>
    </ContextValueContext.Provider>
  )
}

function ContextTrigger({
  children,
  className,
  variant = "outline",
  size = "sm",
  ...props
}: ContextTriggerProps) {
  const context = useContextValue()

  if (React.isValidElement(children)) {
    return <HoverCardTrigger asChild>{children}</HoverCardTrigger>
  }

  return (
    <HoverCardTrigger asChild>
      <Button
        aria-label={`Context usage ${formatPercent(context.percentage)}`}
        className={cn("gap-2 px-2.5 font-mono tabular-nums", className)}
        size={size}
        type="button"
        variant={variant}
        {...props}
      >
        <ContextProgressRing percentage={context.percentage} />
        <span>{formatPercent(context.percentage)}</span>
      </Button>
    </HoverCardTrigger>
  )
}

function ContextContent({
  className,
  sideOffset = 8,
  ...props
}: ContextContentProps) {
  return (
    <HoverCardContent
      className={cn("w-80 overflow-hidden p-0", className)}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function ContextContentHeader({
  children,
  className,
  ...props
}: ContextContentHeaderProps) {
  const context = useContextValue()

  return (
    <div className={cn("space-y-3 p-4", className)} {...props}>
      {children ?? (
        <>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Context window
              </p>
              <p className="font-mono text-lg leading-none font-semibold tabular-nums">
                {formatPercent(context.percentage)}
              </p>
            </div>
            <div className="text-right font-mono text-xs text-muted-foreground tabular-nums">
              {formatTokens(context.usedTokens)} /{" "}
              {formatTokens(context.maxTokens)}
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              aria-hidden="true"
              className="h-full rounded-full bg-current transition-[width]"
              style={{ width: `${context.percentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  )
}

function ContextContentBody({
  children,
  className,
  ...props
}: ContextContentBodyProps) {
  return (
    <div className={cn("space-y-1 px-4 pb-4", className)} {...props}>
      {children}
    </div>
  )
}

function ContextContentFooter({
  children,
  className,
  ...props
}: ContextContentFooterProps) {
  const context = useContextValue()

  if (!children && !context.modelId) {
    return null
  }

  return (
    <div
      className={cn(
        "border-t bg-muted/50 px-4 py-3 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? (
        <div className="flex items-center justify-between gap-4">
          <span>Total cost</span>
          <span className="font-mono text-foreground tabular-nums">
            {context.costs ? formatCost(context.costs.total) : "Unavailable"}
          </span>
        </div>
      )}
    </div>
  )
}

function ContextInputUsage({
  children,
  className,
  ...props
}: ContextUsageProps) {
  const context = useContextValue()

  return (
    <ContextUsageRow
      className={className}
      cost={context.costs?.input}
      label="Input"
      tokens={context.usage.inputTokens}
      {...props}
    >
      {children}
    </ContextUsageRow>
  )
}

function ContextOutputUsage({
  children,
  className,
  ...props
}: ContextUsageProps) {
  const context = useContextValue()

  return (
    <ContextUsageRow
      className={className}
      cost={context.costs?.output}
      label="Output"
      tokens={context.usage.outputTokens}
      {...props}
    >
      {children}
    </ContextUsageRow>
  )
}

function ContextReasoningUsage({
  children,
  className,
  ...props
}: ContextUsageProps) {
  const context = useContextValue()

  return (
    <ContextUsageRow
      className={className}
      cost={context.costs?.reasoning}
      label="Reasoning"
      tokens={context.usage.reasoningTokens}
      {...props}
    >
      {children}
    </ContextUsageRow>
  )
}

function ContextCacheUsage({
  children,
  className,
  ...props
}: ContextUsageProps) {
  const context = useContextValue()

  return (
    <ContextUsageRow
      className={className}
      cost={context.costs?.cachedInput}
      label="Cache"
      tokens={context.usage.cachedInputTokens}
      {...props}
    >
      {children}
    </ContextUsageRow>
  )
}

function ContextUsageRow({
  children,
  className,
  cost,
  label,
  tokens,
  ...props
}: ContextUsageProps & {
  cost?: number
  label: string
  tokens: number
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-md px-2 py-1.5 text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="text-muted-foreground">{label}</span>
          <span className="flex items-center gap-2 font-mono tabular-nums">
            <span>{formatTokens(tokens)}</span>
            {cost !== undefined && (
              <span className="text-muted-foreground">{formatCost(cost)}</span>
            )}
          </span>
        </>
      )}
    </div>
  )
}

function ContextProgressRing({ percentage }: { percentage: number }) {
  const radius = 7
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg aria-hidden="true" className="size-4 -rotate-90" viewBox="0 0 18 18">
      <circle
        className="text-muted-foreground/25"
        cx="9"
        cy="9"
        fill="none"
        r={radius}
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="9"
        cy="9"
        fill="none"
        r={radius}
        stroke="currentColor"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function useContextValue() {
  const context = React.useContext(ContextValueContext)

  if (!context) {
    throw new Error("Context components must be used within <Context>.")
  }

  return context
}

function normalizeUsage(
  usage?: LanguageModelUsage
): Required<LanguageModelUsage> {
  const inputTokens = Math.max(0, usage?.inputTokens ?? 0)
  const outputTokens = Math.max(0, usage?.outputTokens ?? 0)
  const reasoningTokens = Math.max(0, usage?.reasoningTokens ?? 0)
  const cachedInputTokens = Math.max(0, usage?.cachedInputTokens ?? 0)
  const totalTokens =
    usage?.totalTokens ??
    inputTokens + outputTokens + reasoningTokens + cachedInputTokens

  return {
    cachedInputTokens,
    inputTokens,
    outputTokens,
    reasoningTokens,
    totalTokens: Math.max(0, totalTokens),
  }
}

function estimateCosts(
  modelId: ModelId,
  usage: Required<LanguageModelUsage>
): ContextCostBreakdown | undefined {
  try {
    const costs = getTokenCosts(modelId, toTokenBreakdown(usage), modelCatalog)
    const input = costs.inputUSD ?? costs.inputTokenUSD ?? 0
    const output = costs.outputUSD ?? costs.outputTokenUSD ?? 0
    const reasoning = costs.reasoningUSD ?? costs.reasoningTokenUSD ?? 0
    const cachedInput =
      (costs.cacheReadUSD ?? costs.cacheReadsUSD ?? 0) +
      (costs.cacheWriteUSD ?? costs.cacheWritesUSD ?? 0)
    const total = costs.totalUSD ?? input + output + reasoning + cachedInput

    return {
      cachedInput,
      input,
      output,
      reasoning,
      total,
    }
  } catch {
    return undefined
  }
}

function toTokenBreakdown(usage: Required<LanguageModelUsage>): TokenBreakdown {
  return {
    cacheReads: usage.cachedInputTokens,
    input: usage.inputTokens,
    output: usage.outputTokens,
    reasoningTokens: usage.reasoningTokens,
    total: usage.totalTokens,
  }
}

function formatTokens(tokens: number) {
  return tokenFormatter.format(tokens)
}

function formatPercent(percentage: number) {
  return `${percentFormatter.format(percentage)}%`
}

function formatCost(cost: number) {
  return costFormatter.format(cost)
}

export {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger,
}
