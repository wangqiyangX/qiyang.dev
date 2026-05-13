import type { LanguageModelUsage } from "ai"
import type { motion } from "motion/react"
import type { ComponentProps, ReactNode } from "react"

import type { Button } from "@/components/ui/button"
import type { ScrollArea } from "@/components/ui/scroll-area"
import type { AppleHelloEffectEnglish } from "@/registry/components/apple-hello-effect/apple-hello-effect-english"
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
