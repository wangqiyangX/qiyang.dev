import type { Registry } from "shadcn/schema"

import { getRegistryItemUrl } from "@/utils/registry"

export const examples: Registry["items"] = [
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
