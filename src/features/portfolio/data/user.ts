import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Qiyang",
  lastName: "Wang",
  displayName: "Qiyang Wang",
  username: "qiyangdev",
  gender: "male",
  pronouns: "he/him",
  bio: "Frontend Development Engineer at Xiaomi, building reliable product interfaces with React, Next.js, and TypeScript.",
  flipSentences: [
    "Keep Learning. Keep Building.",
    "Passionate about technology and design.",
    "I build solutions that solve real problems and create real value.",
    "LEARN. BUILD. IMPACT.",
    "The best way to predict the future is to create it.",
  ],
  address: "Beijing, China",
  phoneNumber: "KzQ0MDc3MzE3NDIzNDM=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
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
  ogImage: "https://yvgoosdtwt8fkmmh.public.blob.vercel-storage.com/avatar.png",
  namePronunciationUrl: "",
  timeZone: "Asia/Shanghai",
  keywords: [
    "qiyang",
    "qiyang wang",
    "wangqiyang",
    "qiyangdev",
    "qiyang.dev",
    "frontend",
    "developer",
    "shadcn",
    "software engineer",
  ],
  dateCreated: "2026-05-04", // YYYY-MM-DD
}
