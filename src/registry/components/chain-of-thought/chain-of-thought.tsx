"use client"

import {
  BrainIcon,
  CheckIcon,
  ChevronDownIcon,
  CircleIcon,
  ExternalLinkIcon,
  ImageIcon,
  LoaderCircleIcon,
  SearchIcon,
  SparklesIcon,
  WrenchIcon,
} from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export type ChainOfThoughtStatus = "complete" | "active" | "pending"

export type ChainOfThoughtStepType =
  | "thinking"
  | "search"
  | "image"
  | "tool"
  | "result"

export type ChainOfThoughtIcon = React.ReactNode

export type ChainOfThoughtOwnProps = {
  /**
   * Controlled open state for the collapsible reasoning panel.
   */
  open?: boolean
  /**
   * Initial open state when the component is uncontrolled.
   * @defaultValue false
   */
  defaultOpen?: boolean
  /**
   * Called when the collapsible panel opens or closes.
   */
  onOpenChange?: (open: boolean) => void
}

export type ChainOfThoughtProps = Omit<
  React.ComponentPropsWithoutRef<typeof Collapsible>,
  keyof ChainOfThoughtOwnProps
> &
  ChainOfThoughtOwnProps

type ChainOfThoughtContextValue = {
  open: boolean
  contentId: string
  triggerId: string
}

const ChainOfThoughtContext =
  React.createContext<ChainOfThoughtContextValue | null>(null)

function useChainOfThought() {
  const context = React.useContext(ChainOfThoughtContext)

  if (!context) {
    throw new Error(
      "ChainOfThought components must be used within ChainOfThought."
    )
  }

  return context
}

type ChainOfThoughtStepContextValue = {
  status: ChainOfThoughtStatus
  type: ChainOfThoughtStepType
}

const ChainOfThoughtStepContext =
  React.createContext<ChainOfThoughtStepContextValue | null>(null)

function useChainOfThoughtStep() {
  const context = React.useContext(ChainOfThoughtStepContext)

  if (!context) {
    throw new Error(
      "ChainOfThought step components must be used within ChainOfThoughtStep."
    )
  }

  return context
}

function ChainOfThought({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  ...props
}: ChainOfThoughtProps) {
  const reactId = React.useId()
  const id = React.useMemo(
    () => `chain-of-thought-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId]
  )
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [controlledOpen, onOpenChange]
  )

  const context = React.useMemo<ChainOfThoughtContextValue>(
    () => ({
      open,
      contentId: `${id}-content`,
      triggerId: `${id}-trigger`,
    }),
    [id, open]
  )

  return (
    <ChainOfThoughtContext.Provider value={context}>
      <Collapsible
        data-slot="chain-of-thought"
        open={open}
        onOpenChange={handleOpenChange}
        className={cn(
          "overflow-hidden rounded-lg border bg-background text-foreground shadow-xs",
          className
        )}
        {...props}
      />
    </ChainOfThoughtContext.Provider>
  )
}

export type ChainOfThoughtTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof CollapsibleTrigger>,
  "children"
> & {
  /**
   * Header content, usually ChainOfThoughtTitle and ChainOfThoughtDescription.
   */
  children: React.ReactNode
}

function ChainOfThoughtTrigger({
  className,
  children,
  ...props
}: ChainOfThoughtTriggerProps) {
  const { contentId, triggerId } = useChainOfThought()

  return (
    <CollapsibleTrigger
      id={triggerId}
      aria-controls={contentId}
      data-slot="chain-of-thought-trigger"
      className={cn(
        "group/chain-of-thought-trigger flex w-full items-center gap-3 p-4 text-left transition-colors outline-none hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">{children}</span>
      <ChevronDownIcon
        aria-hidden
        className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/chain-of-thought-trigger:rotate-180"
      />
    </CollapsibleTrigger>
  )
}

export type ChainOfThoughtContentOwnProps = {
  /**
   * Class name applied to the inner content wrapper.
   */
  innerClassName?: string
}

export type ChainOfThoughtContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof CollapsibleContent>,
  keyof ChainOfThoughtContentOwnProps
> &
  ChainOfThoughtContentOwnProps

function ChainOfThoughtContent({
  className,
  innerClassName,
  children,
  ...props
}: ChainOfThoughtContentProps) {
  const { contentId, open } = useChainOfThought()

  return (
    <CollapsibleContent
      id={contentId}
      forceMount
      aria-hidden={!open}
      inert={!open ? true : undefined}
      data-slot="chain-of-thought-content"
      className={cn(
        "grid overflow-hidden border-t transition-[grid-template-rows,opacity,transform] duration-200 ease-out data-[state=closed]:pointer-events-none data-[state=closed]:-translate-y-1 data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <div className={cn("min-h-0 overflow-hidden", innerClassName)}>
        {children}
      </div>
    </CollapsibleContent>
  )
}

function ChainOfThoughtTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      data-slot="chain-of-thought-title"
      className={cn("truncate text-sm font-medium", className)}
      {...props}
    />
  )
}

function ChainOfThoughtDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="chain-of-thought-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function ChainOfThoughtSteps({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      data-slot="chain-of-thought-steps"
      className={cn("flex flex-col p-4", className)}
      {...props}
    />
  )
}

export type ChainOfThoughtStepOwnProps = {
  /**
   * Visual status for this reasoning step.
   * @defaultValue "pending"
   */
  status?: ChainOfThoughtStatus
  /**
   * Semantic step type used to select a default icon.
   * @defaultValue "thinking"
   */
  type?: ChainOfThoughtStepType
  /**
   * Custom icon component or element shown in the step indicator.
   */
  icon?: ChainOfThoughtIcon
  /**
   * Title rendered in the step body.
   */
  title?: React.ReactNode
  /**
   * Supporting description rendered below the title.
   */
  description?: React.ReactNode
  /**
   * Extra metadata rendered beside the status badge.
   */
  badge?: React.ReactNode
  /**
   * Class name applied to the step body card.
   */
  contentClassName?: string
}

export type ChainOfThoughtStepProps = Omit<
  React.ComponentPropsWithoutRef<"li">,
  keyof ChainOfThoughtStepOwnProps
> &
  ChainOfThoughtStepOwnProps

function ChainOfThoughtStep({
  className,
  contentClassName,
  status = "pending",
  type = "thinking",
  icon,
  title,
  description,
  badge,
  children,
  ...props
}: ChainOfThoughtStepProps) {
  const context = React.useMemo<ChainOfThoughtStepContextValue>(
    () => ({ status, type }),
    [status, type]
  )
  const hasHeader = title != null || description != null || badge != null

  return (
    <ChainOfThoughtStepContext.Provider value={context}>
      <li
        data-slot="chain-of-thought-step"
        data-status={status}
        data-type={type}
        className={cn(
          "group/chain-of-thought-step relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 pb-4 before:absolute before:top-8 before:bottom-0 before:left-4 before:w-px before:bg-border last:pb-0 last:before:hidden",
          className
        )}
        {...props}
      >
        <ChainOfThoughtStepIndicator icon={icon} />

        <div
          data-slot="chain-of-thought-step-content"
          className={cn(
            "min-w-0 rounded-lg border bg-card p-3 text-sm shadow-xs",
            status === "active" && "ring-2 ring-primary/10",
            contentClassName
          )}
        >
          {hasHeader && (
            <div className="flex min-w-0 flex-wrap items-start gap-2">
              <div className="min-w-0 flex-1">
                {title != null && (
                  <h4 className="text-sm font-medium text-pretty">{title}</h4>
                )}
                {description != null && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {badge != null && <Badge variant="outline">{badge}</Badge>}
                <ChainOfThoughtStatusBadge />
              </div>
            </div>
          )}

          {children != null && (
            <div className={cn("flex flex-col gap-3", hasHeader && "mt-3")}>
              {children}
            </div>
          )}
        </div>
      </li>
    </ChainOfThoughtStepContext.Provider>
  )
}

type ChainOfThoughtStepIndicatorProps = {
  icon?: ChainOfThoughtIcon
}

function ChainOfThoughtStepIndicator({
  icon,
}: ChainOfThoughtStepIndicatorProps) {
  const { status, type } = useChainOfThoughtStep()
  const shouldSpin = icon == null && status === "active"

  return (
    <span
      data-slot="chain-of-thought-step-indicator"
      className={cn(
        "relative z-1 flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        status === "complete" &&
          "border-primary bg-primary text-primary-foreground",
        status === "active" &&
          "border-primary text-primary ring-4 ring-primary/10",
        status === "pending" && "border-border bg-muted",
        shouldSpin && "[&_svg]:animate-spin"
      )}
    >
      {icon ?? <DefaultStepIcon status={status} type={type} />}
    </span>
  )
}

function ChainOfThoughtStatusBadge() {
  const { status } = useChainOfThoughtStep()

  return (
    <Badge
      data-slot="chain-of-thought-status"
      variant={
        status === "complete"
          ? "default"
          : status === "active"
            ? "secondary"
            : "outline"
      }
    >
      {statusLabels[status]}
    </Badge>
  )
}

export type ChainOfThoughtSearchResult = {
  /**
   * Search result title.
   */
  title: React.ReactNode
  /**
   * Optional URL for the result.
   */
  url?: string
  /**
   * Optional source name displayed as a badge.
   */
  source?: React.ReactNode
  /**
   * Result summary or snippet.
   */
  description?: React.ReactNode
}

export type ChainOfThoughtSearchResultsOwnProps = {
  /**
   * Search results rendered inside the current reasoning step.
   */
  results: ChainOfThoughtSearchResult[]
  /**
   * Label shown above the search result list.
   * @defaultValue "Search results"
   */
  label?: React.ReactNode
  /**
   * Message rendered when no results are provided.
   * @defaultValue "No search results"
   */
  emptyMessage?: React.ReactNode
}

export type ChainOfThoughtSearchResultsProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  keyof ChainOfThoughtSearchResultsOwnProps
> &
  ChainOfThoughtSearchResultsOwnProps

function ChainOfThoughtSearchResults({
  className,
  results,
  label = "Search results",
  emptyMessage = "No search results",
  ...props
}: ChainOfThoughtSearchResultsProps) {
  return (
    <div
      data-slot="chain-of-thought-search-results"
      className={cn("rounded-lg border bg-muted/30 p-2", className)}
      {...props}
    >
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="secondary">
          <SearchIcon data-icon="inline-start" aria-hidden />
          {label}
        </Badge>
        <span className="text-xs text-muted-foreground tabular-nums">
          {results.length}
        </span>
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-2">
          {results.map((result, index) => (
            <li key={index}>
              <SearchResultCard result={result} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-2 py-3 text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      )}
    </div>
  )
}

type SearchResultCardProps = {
  result: ChainOfThoughtSearchResult
}

function SearchResultCard({
  result: { title, url, source, description },
}: SearchResultCardProps) {
  const titleClassName =
    "min-w-0 flex-1 text-sm font-medium text-pretty [&_svg]:size-3.5 [&_svg]:shrink-0"

  return (
    <div className="rounded-md border bg-background p-2">
      <div className="flex min-w-0 items-start gap-2">
        {url ? (
          <a
            className={cn(titleClassName, "hover:underline")}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {title}
            <ExternalLinkIcon
              data-icon="inline-end"
              aria-hidden
              className="ml-1 inline align-[-0.125em]"
            />
          </a>
        ) : (
          <span className={titleClassName}>{title}</span>
        )}
        {source != null && (
          <Badge variant="outline" className="shrink-0">
            {source}
          </Badge>
        )}
      </div>
      {description != null && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export type ChainOfThoughtImageOwnProps = {
  /**
   * Image URL or path.
   */
  src: string
  /**
   * Accessible image alternative text.
   */
  alt: string
  /**
   * Optional caption rendered below the image.
   */
  caption?: React.ReactNode
  /**
   * Class name applied to the image element.
   */
  imageClassName?: string
}

export type ChainOfThoughtImageProps = Omit<
  React.ComponentPropsWithoutRef<"figure">,
  keyof ChainOfThoughtImageOwnProps
> &
  ChainOfThoughtImageOwnProps

function ChainOfThoughtImage({
  className,
  imageClassName,
  src,
  alt,
  caption,
  ...props
}: ChainOfThoughtImageProps) {
  return (
    <figure
      data-slot="chain-of-thought-image"
      className={cn("overflow-hidden rounded-lg border bg-muted/30", className)}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={cn("aspect-video w-full object-cover", imageClassName)}
      />
      {caption != null && (
        <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const statusLabels: Record<ChainOfThoughtStatus, string> = {
  complete: "Complete",
  active: "Active",
  pending: "Pending",
}

function DefaultStepIcon({ status, type }: ChainOfThoughtStepContextValue) {
  if (status === "complete") {
    return <CheckIcon aria-hidden />
  }

  if (status === "active") {
    return <LoaderCircleIcon aria-hidden />
  }

  if (status === "pending" && type === "result") {
    return <CircleIcon aria-hidden />
  }

  if (type === "search") {
    return <SearchIcon aria-hidden />
  }

  if (type === "image") {
    return <ImageIcon aria-hidden />
  }

  if (type === "tool") {
    return <WrenchIcon aria-hidden />
  }

  if (type === "result") {
    return <SparklesIcon aria-hidden />
  }

  return <BrainIcon aria-hidden />
}

export {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtDescription,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
  ChainOfThoughtSteps,
  ChainOfThoughtTitle,
  ChainOfThoughtTrigger,
  useChainOfThought,
  useChainOfThoughtStep,
}
