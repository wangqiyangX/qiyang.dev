"use client"

import type { MermaidConfig } from "mermaid"
import * as React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type MermaidRenderState =
  | {
      status: "idle" | "loading"
      error?: never
      svg?: never
    }
  | {
      status: "error"
      error: Error
      svg?: never
    }
  | {
      status: "rendered"
      error?: never
      svg: string
    }

export type MermaidDiagramOwnProps = {
  /**
   * Mermaid diagram source. If omitted, the component uses string children.
   */
  chart?: string
  /**
   * Mermaid diagram source passed as children.
   */
  children?: string
  /**
   * Additional Mermaid configuration merged into the default safe config.
   */
  config?: MermaidConfig
  /**
   * Optional caption rendered below the diagram.
   */
  caption?: React.ReactNode
  /**
   * Additional classes for the caption.
   */
  captionClassName?: string
  /**
   * Fallback shown while Mermaid is loading and rendering.
   */
  loadingFallback?: React.ReactNode
  /**
   * Fallback shown when Mermaid cannot parse or render the diagram.
   */
  errorFallback?: React.ReactNode | ((error: Error) => React.ReactNode)
}

export type MermaidDiagramProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  keyof MermaidDiagramOwnProps | "children"
> &
  MermaidDiagramOwnProps

function isDarkMode() {
  if (typeof document === "undefined") {
    return false
  }

  const root = document.documentElement

  if (root.classList.contains("dark")) {
    return true
  }

  if (root.classList.contains("light")) {
    return false
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function getThemeVariables() {
  const dark = isDarkMode()

  return {
    background: "transparent",
    mainBkg: dark ? "#18181b" : "#ffffff",
    secondBkg: dark ? "#27272a" : "#f4f4f5",
    tertiaryColor: dark ? "#09090b" : "#fafafa",
    primaryColor: dark ? "#27272a" : "#f4f4f5",
    primaryTextColor: dark ? "#fafafa" : "#18181b",
    primaryBorderColor: dark ? "#52525b" : "#d4d4d8",
    secondaryColor: dark ? "#18181b" : "#fafafa",
    secondaryTextColor: dark ? "#fafafa" : "#18181b",
    secondaryBorderColor: dark ? "#3f3f46" : "#e4e4e7",
    lineColor: dark ? "#a1a1aa" : "#71717a",
    textColor: dark ? "#fafafa" : "#18181b",
    border1: dark ? "#52525b" : "#d4d4d8",
    border2: dark ? "#3f3f46" : "#e4e4e7",
    clusterBkg: dark ? "#18181b" : "#fafafa",
    clusterBorder: dark ? "#3f3f46" : "#d4d4d8",
    noteBkgColor: dark ? "#27272a" : "#f4f4f5",
    noteTextColor: dark ? "#fafafa" : "#18181b",
    noteBorderColor: dark ? "#52525b" : "#d4d4d8",
    activationBkgColor: dark ? "#27272a" : "#f4f4f5",
    activationBorderColor: dark ? "#52525b" : "#a1a1aa",
  }
}

function getMermaidConfig(config?: MermaidConfig): MermaidConfig {
  const defaults: MermaidConfig = {
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    fontFamily: "inherit",
    htmlLabels: false,
    themeVariables: getThemeVariables(),
    flowchart: {
      curve: "basis",
    },
  }

  return {
    ...defaults,
    ...config,
    startOnLoad: false,
    flowchart: {
      ...defaults.flowchart,
      ...config?.flowchart,
    },
    themeVariables: {
      ...defaults.themeVariables,
      ...config?.themeVariables,
    },
  }
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error
  }

  return new Error(
    typeof error === "string" ? error : "Unable to render Mermaid diagram."
  )
}

function useThemeSignal() {
  const [signal, setSignal] = React.useState(0)

  React.useEffect(() => {
    const root = document.documentElement
    const notify = () => setSignal((value) => value + 1)
    const observer = new MutationObserver(notify)
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    media.addEventListener("change", notify)

    return () => {
      observer.disconnect()
      media.removeEventListener("change", notify)
    }
  }, [])

  return signal
}

function MermaidDiagramLoading() {
  return (
    <div className="flex min-h-48 items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  )
}

function MermaidDiagramError({ error }: { error: Error }) {
  return (
    <div className="p-3">
      <Alert variant="destructive">
        <AlertTitle>Unable to render diagram</AlertTitle>
        <AlertDescription className="font-mono text-xs whitespace-pre-wrap">
          {error.message}
        </AlertDescription>
      </Alert>
    </div>
  )
}

const MermaidDiagram = React.forwardRef<HTMLDivElement, MermaidDiagramProps>(
  function MermaidDiagram(
    {
      chart,
      children,
      config,
      caption,
      captionClassName,
      loadingFallback,
      errorFallback,
      className,
      ...props
    },
    ref
  ) {
    const reactId = React.useId()
    const diagramRef = React.useRef<HTMLDivElement>(null)
    const themeSignal = useThemeSignal()
    const source = (chart ?? children ?? "").trim()
    const renderId = React.useMemo(
      () => `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
      [reactId]
    )
    const [renderState, setRenderState] = React.useState<MermaidRenderState>({
      status: "idle",
    })

    React.useEffect(() => {
      let cancelled = false

      async function renderDiagram() {
        if (!source) {
          setRenderState({
            status: "error",
            error: new Error("No Mermaid diagram source provided."),
          })
          return
        }

        setRenderState({ status: "loading" })

        try {
          const mermaid = (await import("mermaid")).default

          mermaid.initialize(getMermaidConfig(config))

          const { svg, bindFunctions } = await mermaid.render(renderId, source)

          if (cancelled) {
            return
          }

          setRenderState({ status: "rendered", svg })

          requestAnimationFrame(() => {
            if (!cancelled && diagramRef.current) {
              bindFunctions?.(diagramRef.current)
            }
          })
        } catch (error) {
          if (!cancelled) {
            setRenderState({
              status: "error",
              error: normalizeError(error),
            })
          }
        }
      }

      renderDiagram()

      return () => {
        cancelled = true
      }
    }, [config, renderId, source, themeSignal])

    const fallback =
      renderState.status === "error"
        ? typeof errorFallback === "function"
          ? errorFallback(renderState.error)
          : (errorFallback ?? <MermaidDiagramError error={renderState.error} />)
        : (loadingFallback ?? <MermaidDiagramLoading />)

    return (
      <div
        ref={ref}
        data-slot="mermaid-diagram"
        data-status={renderState.status}
        className={cn(
          "not-prose overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {renderState.status === "rendered" ? (
          <div className="overflow-auto p-4 md:p-6">
            <div
              ref={diagramRef}
              data-slot="mermaid-diagram-svg"
              className={cn(
                "min-w-0 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full",
                "[&_svg]:overflow-visible [&_svg]:font-sans [&_svg_text]:font-sans"
              )}
              dangerouslySetInnerHTML={{ __html: renderState.svg }}
            />
          </div>
        ) : (
          fallback
        )}

        {caption ? (
          <div
            data-slot="mermaid-diagram-caption"
            className={cn(
              "border-t px-4 py-2 text-sm text-muted-foreground",
              captionClassName
            )}
          >
            {caption}
          </div>
        ) : null}
      </div>
    )
  }
)

MermaidDiagram.displayName = "MermaidDiagram"

export { MermaidDiagram }
