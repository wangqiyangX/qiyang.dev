import type { Registry } from "shadcn/schema"

import { qiyangRegistryItems } from "./qiyang-registry"

export const registry = {
  name: "qiyang",
  homepage: "https://qiyang.dev/components",
  items: qiyangRegistryItems,
} satisfies Registry
