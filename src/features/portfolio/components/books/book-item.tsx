import { format } from "date-fns"
import { ArrowUpRightIcon, BookOpenIcon } from "lucide-react"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { UTM_PARAMS } from "@/config/site"
import type { Book, BookStatus } from "@/features/portfolio/types/books"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

const STATUS_LABELS: Record<BookStatus, string> = {
  read: "Read",
  reading: "Reading",
  "want-to-read": "Want to Read",
}

const STATUS_CLASS_NAMES: Record<BookStatus, string> = {
  read: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  reading: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "want-to-read": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

export function BookItem({
  className,
  book,
}: {
  className?: string
  book: Book
}) {
  const content = (
    <>
      <div
        className={cn(
          "mx-4 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-lg select-none",
          "border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background",
          "bg-muted text-muted-foreground [&_svg]:size-4"
        )}
      >
        {book.cover ? (
          <Image
            src={book.cover}
            alt=""
            width={24}
            height={24}
            className="size-full object-cover"
            unoptimized
          />
        ) : (
          <BookOpenIcon />
        )}
      </div>

      <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="leading-snug font-medium text-balance">
            {book.title}
          </h3>

          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[0.6875rem] leading-none font-medium",
              STATUS_CLASS_NAMES[book.status]
            )}
          >
            {STATUS_LABELS[book.status]}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {book.author && (
            <>
              <dl>
                <dt className="sr-only">Author</dt>
                <dd>{book.author}</dd>
              </dl>

              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
              />
            </>
          )}

          <dl>
            <dt className="sr-only">Recorded on</dt>
            <dd>
              <time dateTime={new Date(book.recordedAt).toISOString()}>
                {format(new Date(book.recordedAt), "dd.MM.yyyy")}
              </time>
            </dd>
          </dl>
        </div>
      </div>

      {book.url && (
        <ArrowUpRightIcon className="size-4 text-muted-foreground" />
      )}
    </>
  )

  if (!book.url) {
    return (
      <div className={cn("flex items-center pr-2", className)}>{content}</div>
    )
  }

  return (
    <a
      className={cn("flex items-center pr-2 hover:bg-accent-muted", className)}
      href={addQueryParams(book.url, UTM_PARAMS)}
      target="_blank"
      rel="noopener"
    >
      {content}
    </a>
  )
}
