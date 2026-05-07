"use client"

import {
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
} from "@/registry/components/context/context"

export default function ContextDemo() {
  return (
    <Context
      maxTokens={400_000}
      modelId="openai/gpt-5-nano"
      usage={{
        cachedInputTokens: 8_200,
        inputTokens: 32_400,
        outputTokens: 4_800,
        reasoningTokens: 1_600,
      }}
      usedTokens={47_000}
    >
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
          <ContextReasoningUsage />
          <ContextCacheUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  )
}
