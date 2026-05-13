import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const examples: Registry["items"] = [
  {
    name: "chain-of-thought-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("chain-of-thought")],
    files: [
      {
        path: "examples/chain-of-thought-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "mermaid-diagram-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("mermaid-diagram")],
    files: [
      {
        path: "examples/mermaid-diagram-demo.tsx",
        type: "registry:example",
      },
    ],
  },
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
