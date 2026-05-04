import { cn } from "@/lib/utils"

export type ReadingNoteCardProps = React.ComponentProps<"article"> & {
  title?: string
  source?: string
  excerpt?: string
  meta?: string
  tags?: string[]
}

export function ReadingNoteCard({
  className,
  title = "A note worth returning to",
  source = "Reading note",
  excerpt = "Capture the idea, the source, and a few durable tags in one compact surface.",
  meta = "Updated today",
  tags = ["notes", "reading"],
  ...props
}: ReadingNoteCardProps) {
  return (
    <article
      className={cn(
        "w-full max-w-md rounded-lg border bg-card p-4 text-card-foreground shadow-xs",
        "transition-colors hover:bg-accent/40",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {source}
          </p>
          <h3 className="line-clamp-2 text-base leading-snug font-semibold text-balance">
            {title}
          </h3>
        </div>
        <p className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground">
          {meta}
        </p>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {excerpt}
      </p>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
