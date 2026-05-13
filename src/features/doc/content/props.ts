import type { LanguageModelUsage } from "ai"
import type { motion } from "motion/react"
import type { ComponentProps, ReactNode } from "react"

import type { Button } from "@/components/ui/button"
import type { Card } from "@/components/ui/card"
import type { ScrollArea } from "@/components/ui/scroll-area"
import type { AppleHelloEffectEnglish } from "@/registry/components/apple-hello-effect/apple-hello-effect-english"
import type {
  ChainOfThoughtImageOwnProps,
  ChainOfThoughtOwnProps,
  ChainOfThoughtSearchResultsOwnProps,
  ChainOfThoughtStepOwnProps,
} from "@/registry/components/chain-of-thought"
import type { ModelId } from "@/registry/components/context"
import type { CopyButton } from "@/registry/components/copy-button"
import type { GitHubContributions } from "@/registry/components/github-contributions"
import type { GlowCardGrid } from "@/registry/components/glow-card-grid/glow-card-grid"
import type { MermaidDiagramOwnProps } from "@/registry/components/mermaid-diagram"
import type { MiddleTruncation } from "@/registry/components/middle-truncation/middle-truncation"
import type { ScrollFadeEffect } from "@/registry/components/scroll-fade-effect"
import type { ShimmerOwnProps } from "@/registry/components/shimmer"
import type { ShimmeringText } from "@/registry/components/shimmering-text"
import type {
  SlideToUnlock,
  SlideToUnlockText,
} from "@/registry/components/slide-to-unlock"
import type { TestStatusValue } from "@/registry/components/test-results"
import type { TestimonialSpotlight } from "@/registry/components/testimonial-spotlight"

export type AppleHelloEffectProps = Omit<
  ComponentProps<typeof AppleHelloEffectEnglish>,
  keyof Omit<ComponentProps<typeof motion.svg>, "onAnimationComplete">
>

export type ShimmeringTextProps = Omit<
  ComponentProps<typeof ShimmeringText>,
  keyof ComponentProps<typeof motion.span>
>

export type ShimmerProps = ShimmerOwnProps

export type MermaidDiagramProps = MermaidDiagramOwnProps

export type SuggestionSuggestionsProps = {
  /**
   * Any other props are spread to the underlying `ScrollArea` component.
   */
  "...props": ComponentProps<typeof ScrollArea>
}

export type SuggestionProps = {
  /**
   * The suggestion string to display and emit on click.
   */
  suggestion: string
  /**
   * Callback fired when the suggestion is clicked.
   */
  onClick?: (suggestion: string) => void
  /**
   * Any other props are spread to the underlying shadcn/ui `Button` component.
   */
  "...props": Omit<ComponentProps<typeof Button>, "onClick">
}

export type ContextProps = {
  /**
   * The total context window size in tokens.
   */
  maxTokens: number
  /**
   * The number of tokens currently used.
   */
  usedTokens: number
  /**
   * Detailed token usage breakdown from the AI SDK.
   */
  usage?: LanguageModelUsage
  /**
   * Model identifier for cost calculation.
   *
   * @example "openai:gpt-4o-mini"
   */
  modelId?: ModelId
}

export type ContextTriggerProps = {
  /**
   * Custom trigger element. If omitted, a button with usage percentage and
   * progress icon is rendered.
   */
  children?: ReactNode
}

export type ContextContentProps = {
  /**
   * Additional classes for the hover card content.
   */
  className?: string
}

export type ContextContentHeaderProps = {
  /**
   * Custom header content. If omitted, renders percentage, token counts, and
   * progress bar.
   */
  children?: ReactNode
}

export type ContextContentBodyProps = {
  /**
   * Body content, typically containing usage breakdown components.
   */
  children?: ReactNode
}

export type ContextContentFooterProps = {
  /**
   * Custom footer content. If omitted, renders total cost when a model ID is
   * available.
   */
  children?: ReactNode
}

export type ContextUsageProps = {
  /**
   * Custom row content. If omitted, renders token count and cost for the usage
   * type.
   */
  children?: ReactNode
  /**
   * Additional classes for the usage row.
   */
  className?: string
}

export type TestResultsProps = {
  /**
   * Test results content.
   */
  children?: ReactNode
  /**
   * Additional classes for the root card.
   */
  className?: string
  /**
   * Any other props are spread to the underlying shadcn/ui `Card` component.
   */
  "...props": ComponentProps<typeof Card>
}

export type TestResultsHeaderProps = {
  /**
   * Heading rendered above the summary.
   *
   * @defaultValue "Test Results"
   */
  title?: ReactNode
  /**
   * Supporting text rendered below the heading.
   */
  description?: ReactNode
  /**
   * Header-side content, usually `TestResultsDuration`.
   */
  children?: ReactNode
}

export type TestResultsSummaryProps = {
  /**
   * Passed test count.
   */
  passed?: number
  /**
   * Failed test count.
   */
  failed?: number
  /**
   * Skipped test count.
   */
  skipped?: number
  /**
   * Running test count.
   */
  running?: number
  /**
   * Total count used for percentage calculations. When omitted, the total is
   * derived from the status counts.
   */
  total?: number
  /**
   * Custom summary content. If omitted, status summary cards are rendered.
   */
  children?: ReactNode
}

export type TestResultsDurationProps = {
  /**
   * Duration to display. Numbers are treated as milliseconds.
   */
  duration?: number | string
  /**
   * Label rendered before the duration.
   *
   * @defaultValue "Duration"
   */
  label?: ReactNode
  /**
   * Custom duration content.
   */
  children?: ReactNode
}

export type TestResultsProgressProps = {
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
   *
   * @defaultValue "Overall progress"
   */
  label?: ReactNode
}

export type TestResultsContentProps = {
  /**
   * Results content, usually summary, progress, and suites.
   */
  children?: ReactNode
  /**
   * Additional classes for the content area.
   */
  className?: string
}

export type TestSuiteProps = {
  /**
   * Suite status used by descendant status components.
   *
   * @defaultValue "passed"
   */
  status?: TestStatusValue
  /**
   * Initial open state for the collapsible suite.
   */
  defaultOpen?: boolean
  /**
   * Suite header and content children.
   */
  children?: ReactNode
}

export type TestSuiteNameProps = {
  /**
   * Optional file path or source label.
   */
  file?: ReactNode
  /**
   * Suite name.
   */
  children?: ReactNode
}

export type TestSuiteStatsProps = {
  /**
   * Suite duration. Numbers are treated as milliseconds.
   */
  duration?: number | string
  /**
   * Custom stats content.
   */
  children?: ReactNode
}

export type TestSuiteContentProps = {
  /**
   * Tests rendered inside the suite.
   */
  children?: ReactNode
}

export type TestProps = {
  /**
   * Test status used by descendant status components.
   *
   * @defaultValue "passed"
   */
  status?: TestStatusValue
  /**
   * Test row content.
   */
  children?: ReactNode
}

export type TestStatusProps = {
  /**
   * Status to display. When omitted, the nearest `Test` or `TestSuite` status
   * is used.
   */
  status?: TestStatusValue
  /**
   * Show the text label beside the status icon.
   *
   * @defaultValue true
   */
  showLabel?: boolean
  /**
   * Custom label content.
   */
  children?: ReactNode
}

export type TestNameProps = {
  /**
   * Optional supporting copy for the test row.
   */
  description?: ReactNode
  /**
   * Test name.
   */
  children?: ReactNode
}

export type TestDurationProps = {
  /**
   * Duration to display. Numbers are treated as milliseconds.
   */
  duration?: number | string
  /**
   * Custom duration content.
   */
  children?: ReactNode
}

export type TestErrorProps = {
  /**
   * Error details, usually `TestErrorMessage` and `TestErrorStack`.
   */
  children?: ReactNode
}

export type TestErrorMessageProps = {
  /**
   * Error message shown above the stack trace.
   */
  children?: ReactNode
}

export type TestErrorStackProps = {
  /**
   * Stack trace to render. Children override this value.
   */
  stack?: string
  /**
   * Custom stack trace content.
   */
  children?: ReactNode
}

export type ChainOfThoughtProps = ChainOfThoughtOwnProps

export type ChainOfThoughtStepProps = ChainOfThoughtStepOwnProps

export type ChainOfThoughtSearchResultsProps =
  ChainOfThoughtSearchResultsOwnProps

export type ChainOfThoughtImageProps = ChainOfThoughtImageOwnProps

export type SlideToUnlockRootProps = Omit<
  ComponentProps<typeof SlideToUnlock>,
  keyof ComponentProps<"div">
>

export type SlideToUnlockTextProps = Omit<
  ComponentProps<typeof SlideToUnlockText>,
  keyof Omit<ComponentProps<typeof motion.div>, "children">
>

export type ScrollFadeEffectProps = Omit<
  ComponentProps<typeof ScrollFadeEffect>,
  keyof ComponentProps<"div">
>

export type CopyButtonProps = Omit<
  ComponentProps<typeof CopyButton>,
  keyof ComponentProps<typeof Button>
>

export type HapticProps = {
  /**
   * Trigger haptic feedback on mobile devices.
   * Uses Vibration API on Android/modern browsers, and iOS checkbox trick on iOS.
   *
   * @param pattern - Vibration duration (ms) or pattern.
   * Custom patterns only work on Android devices. iOS uses fixed feedback.
   * See [Vibration API](https://developer.mozilla.org/docs/Web/API/Vibration_API)
   *
   * @example
   *
   * ```tsx
   * import { haptic } from "@/lib/haptic"
   *
   * <Button onClick={() => haptic()}>Haptic</Button>
   * ```
   */
  haptic: (pattern?: number | number[]) => void
}

export type TestimonialSpotlightProps = Omit<
  ComponentProps<typeof TestimonialSpotlight>,
  keyof Omit<
    React.ComponentPropsWithoutRef<"div">,
    | "children"
    | "onFocus"
    | "onBlur"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onMouseMove"
  >
>

export type GlowCardGridProps = Omit<
  ComponentProps<typeof GlowCardGrid>,
  keyof Omit<ComponentProps<"div">, "children">
>

export type MiddleTruncationProps = Omit<
  ComponentProps<typeof MiddleTruncation>,
  keyof Omit<ComponentProps<"span">, "children" | "className">
>

export type GitHubContributionsProps = ComponentProps<
  typeof GitHubContributions
>
