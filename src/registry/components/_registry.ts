import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const components: Registry["items"] = [
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
