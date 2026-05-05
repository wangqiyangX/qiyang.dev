import type { Registry } from "shadcn/schema"

import { blocks } from "./blocks/_registry"
import { components } from "./components/_registry"
import { examples } from "./examples/_registry"

export const registry = {
  name: "qiyang",
  homepage: "https://qiyang.dev/components",
  items: [...blocks, ...components, ...examples],
} satisfies Registry
