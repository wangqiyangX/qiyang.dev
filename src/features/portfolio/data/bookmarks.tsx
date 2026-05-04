import { Icons } from "@/components/icons"

import type { Bookmark } from "../types/bookmarks"

export const BOOKMARKS: Bookmark[] = [
  {
    title: "Making Software",
    url: "https://www.makingsoftware.com",
    author: "Dan Hollick",
    bookmarkedAt: "2026-05-04",
  },
]

function Circle() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  )
}
