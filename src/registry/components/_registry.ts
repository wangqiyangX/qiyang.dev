import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const components: Registry["items"] = [
  {
    name: "context",
    type: "registry:component",
    title: "Context",
    description:
      "Display AI model context usage, token breakdowns, and cost estimates.",
    files: [
      {
        path: "components/context/context.tsx",
        type: "registry:component",
        target: "components/context.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/context",
    registryDependencies: ["button", "hover-card", getRegistryItemUrl("utils")],
    dependencies: ["lucide-react", "tokenlens"],
  },
  {
    name: "shimmer",
    type: "registry:component",
    title: "Shimmer",
    description:
      "An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
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
