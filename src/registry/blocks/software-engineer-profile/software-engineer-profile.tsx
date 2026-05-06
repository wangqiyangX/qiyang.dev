const focusAreas = [
  "React interfaces",
  "Next.js applications",
  "TypeScript systems",
]

const links = [
  {
    label: "Website",
    href: "https://qiyang.dev",
  },
  {
    label: "GitHub",
    href: "https://github.com/qiyangdev",
  },
  {
    label: "Notes",
    href: "https://notes.qiyang.dev",
  },
]

export default function SoftwareEngineerProfile() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div className="space-y-6">
          <div className="inline-flex h-8 items-center rounded-full border border-border bg-background px-3 font-mono text-xs text-muted-foreground">
            qiyang.dev
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Building thoughtful software with reliable product interfaces.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Qiyang Wang is a software engineer focused on React, Next.js,
              TypeScript, and the small engineering decisions that make products
              easier to maintain.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="font-mono text-xs text-muted-foreground">Role</p>
              <p className="mt-1 font-medium">Software Engineer</p>
            </div>
            <div className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
              Beijing
            </div>
          </div>

          <div className="grid gap-3 py-5">
            {focusAreas.map((item) => (
              <div
                className="flex items-center justify-between gap-4 rounded-md bg-muted px-3 py-2 text-sm"
                key={item}
              >
                <span>{item}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  active
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {links.map((link) => (
              <a
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                href={link.href}
                key={link.href}
                rel="noopener"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
