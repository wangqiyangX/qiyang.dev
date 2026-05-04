import { CodeXmlIcon, GraduationCapIcon } from "lucide-react"

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
        title: "Frontend Development Engineer",
        employmentPeriod: {
          start: "07.2024",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description:
          "- Develops frontend features with attention to maintainable UI structure and interaction details.\n- Collaborates across product and engineering work to deliver reliable web experiences.",
        skills: [
          "TypeScript",
          "React Native",
          "Next.js",
          "Tailwind CSS",
          "Figma",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "1",
        title: "Bachelor of Communication Engineering — NJUPT",
        employmentPeriod: {
          start: "09.2020",
          end: "06.2024",
        },
        icon: <GraduationCapIcon />,
        description: `- Undergraduate study in communication engineering, with coursework spanning signal systems, networking, electronics, and software fundamentals.
- Built a technical foundation across communication systems, computer networks, and applied engineering.
- Developed long-term interests in software products, web systems, and mobile development.`,
        skills: [
          "C",
          "Java",
          "Python",
          "JavaScript",
          "Systems Design",
          "Software Engineering",
        ],
      },
    ],
  },
]
