import { ImageIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtDescription,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
  ChainOfThoughtSteps,
  ChainOfThoughtTitle,
  ChainOfThoughtTrigger,
} from "@/registry/components/chain-of-thought"

const searchResults = [
  {
    title: "Collapsible - shadcn/ui",
    url: "https://ui.shadcn.com/docs/components/radix/collapsible",
    source: "Docs",
    description:
      "Confirms the trigger and content composition used for the reasoning panel.",
  },
  {
    title: "Badge - shadcn/ui",
    url: "https://ui.shadcn.com/docs/components/radix/badge",
    source: "Docs",
    description:
      "Provides the compact status and source labels inside each reasoning step.",
  },
]

type ChainOfThoughtDemoProps = {
  className?: string
  defaultOpen?: boolean
}

export default function ChainOfThoughtDemo({
  className,
  defaultOpen = true,
}: ChainOfThoughtDemoProps) {
  return (
    <ChainOfThought
      defaultOpen={defaultOpen}
      className={cn("w-full max-w-2xl", className)}
    >
      <ChainOfThoughtTrigger>
        <ChainOfThoughtTitle>AI reasoning trace</ChainOfThoughtTitle>
        <ChainOfThoughtDescription>
          Four steps from intent parsing to a ready response.
        </ChainOfThoughtDescription>
      </ChainOfThoughtTrigger>
      <ChainOfThoughtContent>
        <ChainOfThoughtSteps>
          <ChainOfThoughtStep
            status="complete"
            title="Understand the request"
            description="Identify the required component API, states, and supporting media."
          />
          <ChainOfThoughtStep
            status="complete"
            type="search"
            icon={<SearchIcon aria-hidden />}
            title="Check relevant UI primitives"
            badge="2 sources"
          >
            <ChainOfThoughtSearchResults results={searchResults} />
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            status="active"
            type="image"
            icon={<ImageIcon aria-hidden />}
            title="Compare visual evidence"
            description="Attach visual context when a step depends on an image or screenshot."
          >
            <ChainOfThoughtImage
              src="/og/simple?title=Source%20Snapshot&description=Grouped%20signals%20from%20search%2C%20image%2C%20and%20tool%20results"
              alt="Generated preview representing grouped source signals"
              caption="Image steps can carry captions without leaving the reasoning flow."
            />
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            status="pending"
            type="result"
            title="Prepare final response"
            description="Summarize the decision path and produce the final answer."
          />
        </ChainOfThoughtSteps>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}
