import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const examples: Registry["items"] = [
  {
    name: "context-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("context")],
    files: [
      {
        path: "examples/context-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "live-chart-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("live-chart")],
    files: [
      {
        path: "examples/live-chart-demo.tsx",
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
  {
    name: "stepper-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("stepper")],
    files: [
      {
        path: "examples/stepper-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "file-tree-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("file-tree")],
    files: [
      {
        path: "examples/file-tree-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
