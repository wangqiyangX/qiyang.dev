export type BookStatus = "read" | "reading" | "want-to-read"

export type Book = {
  title: string
  author?: string
  url?: string
  cover?: string
  status: BookStatus
  recordedAt: string
}
