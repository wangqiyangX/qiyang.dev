import { compareDesc } from "date-fns"

import { CollapsibleList } from "@/components/collapsible-list"

import { BOOKS } from "../../data/books"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "../panel"
import { BookItem } from "./book-item"

const SORTED_BOOKS = [...BOOKS].sort((a, b) => {
  return compareDesc(new Date(a.recordedAt), new Date(b.recordedAt))
})

export function Books() {
  return (
    <Panel id="books">
      <PanelHeader>
        <PanelTitle>
          Books
          <PanelTitleSup>({SORTED_BOOKS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      {SORTED_BOOKS.length > 0 ? (
        <CollapsibleList
          items={SORTED_BOOKS}
          max={3}
          keyExtractor={(item) => `${item.title}-${item.recordedAt}`}
          renderItem={(item) => <BookItem book={item} />}
        />
      ) : (
        <PanelContent className="text-sm text-muted-foreground">
          No books recorded yet.
        </PanelContent>
      )}
    </Panel>
  )
}
