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
} from "@/registry/components/context"

const usage = {
  cachedInputTokens: 4200,
  inputTokenDetails: {
    cacheReadTokens: 4200,
    cacheWriteTokens: 0,
    noCacheTokens: 13_400,
  },
  inputTokens: 17_600,
  outputTokenDetails: {
    reasoningTokens: 8100,
    textTokens: 5100,
  },
  outputTokens: 13_200,
  reasoningTokens: 8100,
  totalTokens: 30_800,
}

export default function ContextDemo() {
  return (
    <Context
      maxTokens={128_000}
      modelId="openai:gpt-5"
      usedTokens={40_000}
      usage={usage}
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
