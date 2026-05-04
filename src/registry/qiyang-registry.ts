import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const qiyangRegistryItems: Registry["items"] = [
  {
    name: "reading-note-card",
    type: "registry:component",
    title: "Reading Note Card",
    description:
      "A compact card for presenting a reading note with source, summary, and tags.",
    files: [
      {
        path: "components/reading-note-card/reading-note-card.tsx",
        type: "registry:component",
        target: "components/reading-note-card.tsx",
      },
    ],
    docs: "https://qiyang.dev/components/reading-note-card",
  },
  {
    name: "reading-note-card-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("reading-note-card")],
    files: [
      {
        path: "examples/reading-note-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
