import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const examples: Registry["items"] = [
  {
    name: "audio-player-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("audio-player")],
    files: [
      {
        path: "examples/audio-player-demo.tsx",
        type: "registry:example",
      },
    ],
  },
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
    name: "crosshair-cursor-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("crosshair-cursor")],
    files: [
      {
        path: "examples/crosshair-cursor-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "live-line-chart-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("live-line-chart")],
    files: [
      {
        path: "examples/live-line-chart-demo.tsx",
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
    name: "slider-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("slider")],
    files: [
      {
        path: "examples/slider-demo.tsx",
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
