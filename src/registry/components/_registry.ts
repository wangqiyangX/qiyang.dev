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
    name: "live-chart",
    type: "registry:component",
    title: "Live Chart",
    description:
      "Compose real-time animated charts with metrics, legends, and sections.",
    files: [
      {
        path: "components/live-chart/live-chart.tsx",
        type: "registry:component",
        target: "components/live-chart.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/live-chart",
    registryDependencies: [getRegistryItemUrl("utils")],
    dependencies: ["liveline"],
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
  {
    name: "stepper",
    type: "registry:component",
    title: "Stepper",
    description:
      "Increment or decrement a numeric value with compact icon controls.",
    files: [
      {
        path: "components/stepper/stepper.tsx",
        type: "registry:component",
        target: "components/stepper.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/stepper",
    registryDependencies: [
      "button",
      "button-group",
      getRegistryItemUrl("utils"),
    ],
    dependencies: ["lucide-react"],
  },
  {
    name: "file-tree",
    type: "registry:component",
    title: "File Tree",
    description:
      "Nested file tree with compound components and extension-aware tech stack icons.",
    files: [
      {
        path: "components/file-tree/file-tree.tsx",
        type: "registry:component",
        target: "components/file-tree.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/file-tree",
    registryDependencies: [getRegistryItemUrl("utils")],
    dependencies: ["lucide-react", "tech-stack-icons"],
  },
]
