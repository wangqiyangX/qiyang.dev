import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Qiyang",
  lastName: "Wang",
  displayName: "Qiyang Wang",
  username: "wangqiyangX",
  gender: "male",
  pronouns: "he/him",
  bio: "Frontend Development Engineer at Xiaomi, building reliable product interfaces with React, Next.js, and TypeScript.",
  flipSentences: ["Building thoughtful software.", "Software Engineer."],
  address: "Beijing, China",
  phoneNumber: "KzQ0IDc3MzE3NDIzNDM=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "d2FuZ3FpeWFuZ3hAZ21haWwuY29t", // base64 encoded
  website: "https://qiyang.dev",
  jobTitle: "Software Engineer",
  jobs: [
    {
      title: "Software Engineer",
      company: "qiyang.dev",
      website: "https://qiyang.dev",
    },
  ],
  about: `
- Software Engineer focused on React, Next.js, TypeScript, and reliable product interfaces.
- Maintainer of [qiyang.dev](https://qiyang.dev), where I share software projects and reusable UI experiments.
`,
  avatar: "https://yvgoosdtwt8fkmmh.public.blob.vercel-storage.com/avatar.png",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-dark.png?v=8",
  namePronunciationUrl: "",
  timeZone: "Asia/Shanghai",
  keywords: [
    "qiyang",
    "qiyang wang",
    "wangqiyang",
    "wangqiyangX",
    "qiyang.dev",
    "frontend",
    "developer",
    "reading notes",
    "shadcn",
  ],
  dateCreated: "2026-05-04", // YYYY-MM-DD
}
