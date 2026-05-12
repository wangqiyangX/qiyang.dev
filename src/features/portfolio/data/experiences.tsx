import { CodeXmlIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "xiaomi",
    companyName: "Xiaomi",
    companyLogo:
      "https://yvgoosdtwt8fkmmh.public.blob.vercel-storage.com/xiaomi.svg",
    companyWebsite: "https://mi.com",
    positions: [
      {
        id: "1",
        title: "Frontend Developer",
        employmentPeriod: {
          start: "07.2024",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description:
          "- Build and maintain frontend applications and user-facing web experiences at Xiaomi.\n- Work across product requirements, interface implementation, performance, and day-to-day frontend engineering quality.",
        skills: [
          "TypeScript",
          "JavaScript",
          "React",
          "Frontend Engineering",
          "Web Performance",
          "UI Implementation",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
]
