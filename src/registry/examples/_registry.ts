import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const examples: Registry["items"] = [
  {
    name: "shimmer-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("shimmer")],
    files: [
      {
        path: "examples/shimmer-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
