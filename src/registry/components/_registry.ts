import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const components: Registry["items"] = [
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
