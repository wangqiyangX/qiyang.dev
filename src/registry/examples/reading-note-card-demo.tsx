import { ReadingNoteCard } from "@/registry/components/reading-note-card/reading-note-card"

export default function ReadingNoteCardDemo() {
  return (
    <ReadingNoteCard
      title="Notes should be small enough to keep moving"
      source="Component note"
      excerpt="A compact card for showing a reading note with context, summary, and lightweight tags."
      meta="May 2026"
      tags={["component", "notes", "ui"]}
    />
  )
}
