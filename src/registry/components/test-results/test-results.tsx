"use client"

import {
  CheckCircle2Icon,
  ChevronDownIcon,
  CircleDashedIcon,
  LoaderCircleIcon,
  type LucideIcon,
  XCircleIcon,
} from "lucide-react"
import * as React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const TEST_STATUSES = ["passed", "failed", "skipped", "running"] as const
const PERCENT_MAX = 100

export type TestStatusValue = (typeof TEST_STATUSES)[number]

type StatusCount = Record<TestStatusValue, number>

type StatusMeta = {
  label: string
  icon: LucideIcon
  badgeClassName: string
  indicatorClassName: string
}

const statusMeta = {
  passed: {
    label: "Passed",
    icon: CheckCircle2Icon,
    badgeClassName: "border-success/20 bg-success/10 text-success",
    indicatorClassName: "border-success/20 bg-success/10 text-success",
  },
  failed: {
    label: "Failed",
    icon: XCircleIcon,
    badgeClassName: "border-destructive/20 bg-destructive/10 text-destructive",
    indicatorClassName:
      "border-destructive/20 bg-destructive/10 text-destructive",
  },
  skipped: {
    label: "Skipped",
    icon: CircleDashedIcon,
    badgeClassName:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    indicatorClassName:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  running: {
    label: "Running",
    icon: LoaderCircleIcon,
    badgeClassName: "border-info/20 bg-info/10 text-info",
    indicatorClassName: "border-info/20 bg-info/10 text-info",
  },
} satisfies Record<TestStatusValue, StatusMeta>

type StatusContextValue = {
  status: TestStatusValue
}

const TestSuiteContext = React.createContext<StatusContextValue | null>(null)
const TestContext = React.createContext<StatusContextValue | null>(null)

export type TestResultsProps = React.ComponentPropsWithoutRef<typeof Card>

export function TestResults({ className, ...props }: TestResultsProps) {
  return (
    <Card
      data-slot="test-results"
      className={cn("w-full max-w-4xl", className)}
      {...props}
    />
  )
}

export type TestResultsHeaderProps = React.ComponentPropsWithoutRef<
  typeof CardHeader
> & {
  /**
   * Heading rendered above the summary.
   */
  title?: React.ReactNode
  /**
   * Supporting text rendered below the heading.
   */
  description?: React.ReactNode
}

export function TestResultsHeader({
  title = "Test Results",
  description,
  children,
  className,
  ...props
}: TestResultsHeaderProps) {
  return (
    <CardHeader
      data-slot="test-results-header"
      className={cn("gap-4", className)}
      {...props}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          {description != null && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        {children != null && (
          <div className="flex shrink-0 items-center gap-2">{children}</div>
        )}
      </div>
    </CardHeader>
  )
}

export type TestResultsSummaryProps = React.ComponentPropsWithoutRef<"div"> &
  Partial<StatusCount> & {
    /**
     * Total count used for percentage calculations. When omitted, the total is
     * derived from the status counts.
     */
    total?: number
  }

export function TestResultsSummary({
  passed = 0,
  failed = 0,
  skipped = 0,
  running = 0,
  total,
  children,
  className,
  ...props
}: TestResultsSummaryProps) {
  const counts = React.useMemo(
    () => ({ failed, passed, running, skipped }),
    [failed, passed, running, skipped]
  )
  const resolvedTotal = total ?? getTotal(counts)

  return (
    <div
      data-slot="test-results-summary"
      className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    >
      {children ??
        TEST_STATUSES.map((status) => (
          <StatusSummaryCard
            key={status}
            count={counts[status]}
            status={status}
            total={resolvedTotal}
          />
        ))}
    </div>
  )
}

export type TestResultsDurationProps = React.ComponentPropsWithoutRef<
  typeof Badge
> & {
  /**
   * Duration to display. Numbers are treated as milliseconds.
   */
  duration?: number | string
  /**
   * Label rendered before the duration.
   * @defaultValue "Duration"
   */
  label?: React.ReactNode
}

export function TestResultsDuration({
  duration,
  label = "Duration",
  children,
  className,
  ...props
}: TestResultsDurationProps) {
  return (
    <Badge
      data-slot="test-results-duration"
      variant="outline"
      className={cn("gap-1.5", className)}
      {...props}
    >
      {label != null && <span className="text-muted-foreground">{label}</span>}
      {children ?? (duration != null ? formatDuration(duration) : null)}
    </Badge>
  )
}

export type TestResultsProgressProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * Explicit progress value from 0 to 100.
   */
  value?: number
  /**
   * Completed test count used when value is omitted.
   */
  completed?: number
  /**
   * Total test count used when value is omitted.
   */
  total?: number
  /**
   * Label rendered above the progress bar.
   * @defaultValue "Overall progress"
   */
  label?: React.ReactNode
}

export function TestResultsProgress({
  value,
  completed = 0,
  total = 0,
  label = "Overall progress",
  className,
  ...props
}: TestResultsProgressProps) {
  const progressValue = value ?? getPercent(completed, total)

  return (
    <div
      data-slot="test-results-progress"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{label}</span>
        {total > 0 && (
          <span>
            {completed}/{total} completed
          </span>
        )}
      </div>
      <Progress
        aria-label={typeof label === "string" ? label : "Test results progress"}
        value={progressValue}
      />
    </div>
  )
}

export type TestResultsContentProps = React.ComponentPropsWithoutRef<
  typeof CardContent
>

export function TestResultsContent({
  className,
  ...props
}: TestResultsContentProps) {
  return (
    <CardContent
      data-slot="test-results-content"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

export type TestSuiteProps = React.ComponentPropsWithoutRef<
  typeof Collapsible
> & {
  /**
   * Suite status used by descendant status components.
   * @defaultValue "passed"
   */
  status?: TestStatusValue
}

export function TestSuite({
  status = "passed",
  defaultOpen,
  children,
  className,
  ...props
}: TestSuiteProps) {
  const context = React.useMemo<StatusContextValue>(
    () => ({ status }),
    [status]
  )

  return (
    <TestSuiteContext.Provider value={context}>
      <Collapsible
        data-slot="test-suite"
        defaultOpen={
          defaultOpen ?? (status === "failed" || status === "running")
        }
        className={cn(
          "overflow-hidden rounded-lg border bg-background",
          className
        )}
        {...props}
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-x-3 gap-y-2 p-3">
          {children}
          <CollapsibleTrigger
            data-slot="test-suite-toggle"
            className="group/test-suite-toggle self-center justify-self-end rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle suite"
          >
            <ChevronDownIcon
              aria-hidden
              className="transition-transform duration-200 group-data-[state=open]/test-suite-toggle:rotate-180"
            />
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </TestSuiteContext.Provider>
  )
}

export type TestSuiteNameProps = React.ComponentPropsWithoutRef<
  typeof CollapsibleTrigger
> & {
  /**
   * Optional file path or source label.
   */
  file?: React.ReactNode
}

export function TestSuiteName({
  file,
  children,
  className,
  ...props
}: TestSuiteNameProps) {
  return (
    <CollapsibleTrigger
      data-slot="test-suite-name"
      className={cn(
        "flex min-w-0 flex-col gap-1 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <span className="truncate text-sm font-medium">{children}</span>
      {file != null && (
        <span className="truncate text-xs text-muted-foreground">{file}</span>
      )}
    </CollapsibleTrigger>
  )
}

export type TestSuiteStatsProps = React.ComponentPropsWithoutRef<"span"> & {
  /**
   * Suite duration. Numbers are treated as milliseconds.
   */
  duration?: number | string
}

export function TestSuiteStats({
  duration,
  children,
  className,
  ...props
}: TestSuiteStatsProps) {
  return (
    <span
      data-slot="test-suite-stats"
      className={cn(
        "flex flex-wrap items-center justify-end gap-x-2 gap-y-1 self-center text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? (duration != null ? formatDuration(duration) : null)}
    </span>
  )
}

export type TestSuiteContentProps = React.ComponentPropsWithoutRef<
  typeof CollapsibleContent
>

export function TestSuiteContent({
  className,
  children,
  ...props
}: TestSuiteContentProps) {
  return (
    <CollapsibleContent
      data-slot="test-suite-content"
      className={cn("order-last col-span-full -mx-3 -mb-3", className)}
      {...props}
    >
      <div className="border-t">{children}</div>
    </CollapsibleContent>
  )
}

export type TestProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * Test status used by descendant status components.
   * @defaultValue "passed"
   */
  status?: TestStatusValue
}

export function Test({
  status = "passed",
  children,
  className,
  ...props
}: TestProps) {
  const context = React.useMemo<StatusContextValue>(
    () => ({ status }),
    [status]
  )

  return (
    <TestContext.Provider value={context}>
      <div
        data-slot="test"
        className={cn(
          "flex flex-wrap items-start gap-x-3 gap-y-3 border-t p-3 first:border-t-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TestContext.Provider>
  )
}

export type TestStatusProps = Omit<
  React.ComponentPropsWithoutRef<typeof Badge>,
  "children"
> & {
  /**
   * Status to display. When omitted, the nearest Test or TestSuite status is
   * used.
   */
  status?: TestStatusValue
  /**
   * Show the text label beside the status icon.
   * @defaultValue true
   */
  showLabel?: boolean
  /**
   * Custom label content.
   */
  children?: React.ReactNode
}

export function TestStatus({
  status: statusProp,
  showLabel = true,
  children,
  className,
  ...props
}: TestStatusProps) {
  const status = useResolvedStatus(statusProp)
  const meta = statusMeta[status]
  const Icon = meta.icon

  if (!showLabel) {
    return (
      <span
        data-slot="test-status"
        aria-label={meta.label}
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          meta.indicatorClassName,
          status === "running" && "[&_svg]:animate-spin",
          className
        )}
      >
        <Icon aria-hidden />
      </span>
    )
  }

  return (
    <Badge
      data-slot="test-status"
      variant="outline"
      className={cn("capitalize", meta.badgeClassName, className)}
      {...props}
    >
      <Icon aria-hidden data-icon="inline-start" />
      {children ?? meta.label}
    </Badge>
  )
}

export type TestNameProps = React.ComponentPropsWithoutRef<"span"> & {
  /**
   * Optional supporting copy for the test row.
   */
  description?: React.ReactNode
}

export function TestName({
  description,
  children,
  className,
  ...props
}: TestNameProps) {
  return (
    <span
      data-slot="test-name"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    >
      <span className="truncate text-sm font-medium">{children}</span>
      {description != null && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}
    </span>
  )
}

export type TestDurationProps = React.ComponentPropsWithoutRef<"span"> & {
  /**
   * Duration to display. Numbers are treated as milliseconds.
   */
  duration?: number | string
}

export function TestDuration({
  duration,
  children,
  className,
  ...props
}: TestDurationProps) {
  return (
    <span
      data-slot="test-duration"
      className={cn("ml-auto pt-1 text-xs text-muted-foreground", className)}
      {...props}
    >
      {children ?? (duration != null ? formatDuration(duration) : null)}
    </span>
  )
}

export type TestErrorProps = React.ComponentPropsWithoutRef<typeof Alert>

export function TestError({ className, children, ...props }: TestErrorProps) {
  return (
    <Alert
      data-slot="test-error"
      variant="destructive"
      className={cn("w-full", className)}
      {...props}
    >
      <XCircleIcon aria-hidden />
      {children}
    </Alert>
  )
}

export type TestErrorMessageProps = React.ComponentPropsWithoutRef<
  typeof AlertTitle
>

export function TestErrorMessage(props: TestErrorMessageProps) {
  return <AlertTitle data-slot="test-error-message" {...props} />
}

export type TestErrorStackProps = React.ComponentPropsWithoutRef<
  typeof AlertDescription
> & {
  /**
   * Stack trace to render. Children override this value.
   */
  stack?: string
}

export function TestErrorStack({
  stack,
  children,
  className,
  ...props
}: TestErrorStackProps) {
  return (
    <AlertDescription
      data-slot="test-error-stack"
      className={className}
      {...props}
    >
      <ScrollArea className="mt-3 max-h-44 rounded-md border bg-muted/40">
        <pre className="p-3 text-xs leading-relaxed break-words whitespace-pre-wrap">
          <code>{children ?? stack}</code>
        </pre>
      </ScrollArea>
    </AlertDescription>
  )
}

function StatusSummaryCard({
  status,
  count,
  total,
}: {
  status: TestStatusValue
  count: number
  total: number
}) {
  const meta = statusMeta[status]

  return (
    <div
      data-slot="test-results-summary-card"
      className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">
          {meta.label}
        </span>
        <TestStatus
          status={status}
          showLabel={false}
          className="size-6 [&_svg]:size-3.5"
        />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums">{count}</span>
        <span className="text-xs text-muted-foreground">
          {getPercent(count, total)}%
        </span>
      </div>
    </div>
  )
}

function useResolvedStatus(status?: TestStatusValue) {
  const testContext = React.useContext(TestContext)
  const suiteContext = React.useContext(TestSuiteContext)

  return status ?? testContext?.status ?? suiteContext?.status ?? "passed"
}

function getTotal(counts: StatusCount) {
  return TEST_STATUSES.reduce((total, status) => total + counts[status], 0)
}

function getPercent(value: number, total: number) {
  if (total <= 0) {
    return 0
  }

  return Math.round((value / total) * PERCENT_MAX)
}

function formatDuration(duration: number | string) {
  if (typeof duration === "string") {
    return duration
  }

  if (duration < 1000) {
    return `${duration}ms`
  }

  return `${(duration / 1000).toFixed(2)}s`
}
