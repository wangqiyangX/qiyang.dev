import type { Registry } from "shadcn/schema"

export const blocks: Registry["items"] = [
  {
    name: "software-engineer-profile",
    type: "registry:block",
    title: "Software Engineer Profile",
    description: "A portfolio block with engineering focus and project links.",
    files: [
      {
        path: "blocks/software-engineer-profile/software-engineer-profile.tsx",
        type: "registry:component",
      },
    ],
    categories: ["content", "portfolio"],
    meta: {
      createdAt: "2026-05-06",
      previewClassName: "min-h-svh content-center-safe",
    },
  },
]
