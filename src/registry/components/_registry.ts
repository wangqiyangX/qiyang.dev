import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const components: Registry["items"] = [
  {
    name: "chain-of-thought",
    type: "registry:component",
    title: "Chain of Thought",
    description:
      "Visualize AI reasoning steps with search results, images, and progress states.",
    files: [
      {
        path: "components/chain-of-thought/chain-of-thought.tsx",
        type: "registry:component",
        target: "components/chain-of-thought.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/chain-of-thought",
    registryDependencies: ["badge", "collapsible", getRegistryItemUrl("utils")],
    dependencies: ["lucide-react"],
  },
  {
    name: "mermaid-diagram",
    type: "registry:component",
    title: "Mermaid Diagram",
    description: "Render Mermaid diagrams inside a themed shadcn surface.",
    files: [
      {
        path: "components/mermaid-diagram/mermaid-diagram.tsx",
        type: "registry:component",
        target: "components/mermaid-diagram.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/mermaid-diagram",
    registryDependencies: ["alert", "skeleton", getRegistryItemUrl("utils")],
    dependencies: ["mermaid"],
  },
  {
    name: "context",
    type: "registry:component",
    title: "Context",
    description:
      "Display AI context window usage, token breakdowns, and cost estimates.",
    files: [
      {
        path: "components/context/context.tsx",
        type: "registry:component",
        target: "components/context.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/context",
    registryDependencies: [
      "button",
      "hover-card",
      "progress",
      getRegistryItemUrl("utils"),
    ],
    dependencies: ["ai", "tokenlens"],
  },
  {
    name: "test-results",
    type: "registry:component",
    title: "Test Results",
    description:
      "Display test suite summaries, progress, collapsible suites, and error details.",
    files: [
      {
        path: "components/test-results/test-results.tsx",
        type: "registry:component",
        target: "components/test-results.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/test-results",
    registryDependencies: [
      "alert",
      "badge",
      "card",
      "collapsible",
      "progress",
      "scroll-area",
      getRegistryItemUrl("utils"),
    ],
    dependencies: ["lucide-react"],
  },
  {
    name: "suggestion",
    type: "registry:component",
    title: "Suggestion",
    description:
      "Display clickable prompt suggestions in a responsive horizontal row.",
    files: [
      {
        path: "components/suggestion/suggestion.tsx",
        type: "registry:component",
        target: "components/suggestion.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/suggestion",
    registryDependencies: [
      "button",
      "scroll-area",
      getRegistryItemUrl("utils"),
    ],
  },
  {
    name: "shimmer",
    type: "registry:component",
    title: "Shimmer",
    description:
      "Animate text with a sweeping shimmer that respects reduced motion.",
    files: [
      {
        path: "components/shimmer/shimmer.tsx",
        type: "registry:component",
        target: "components/shimmer.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/shimmer",
    registryDependencies: [getRegistryItemUrl("utils")],
    dependencies: ["motion"],
  },
]
