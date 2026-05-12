import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "news.qiyang.dev",
    title: "News",
    period: {
      start: "04.2026",
    },
    link: "https://news.qiyang.dev",
    skills: [
      "Open Source",
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "shadcn/ui",
      "Drizzle ORM",
      "Better Auth",
      "PostgreSQL",
      "Bun",
    ],
    description: `A small public news board built with Next.js, shadcn/ui, Drizzle ORM, Better Auth, and PostgreSQL.
- News table with TanStack Table pagination and column visibility controls
- Email/password authentication with Better Auth
- One vote per user per news item
- Drizzle ORM schema and migrations
- shadcn/ui components, Sonner toasts, and dark mode support
`,
    logo: "https://yvgoosdtwt8fkmmh.public.blob.vercel-storage.com/newspaper.svg",
    isExpanded: true,
  },
]
