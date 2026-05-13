"use client"

import * as React from "react"

import { Suggestion, Suggestions } from "@/registry/components/suggestion"

const suggestions = [
  "Draft a concise project update",
  "Compare server actions and API routes",
  "List edge cases for this flow",
  "Turn these notes into tasks",
  "Suggest cleaner component names",
]

export default function SuggestionDemo() {
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(
    suggestions[0]
  )

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Suggestions>
        {suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion}
            suggestion={suggestion}
            onClick={setSelectedSuggestion}
          />
        ))}
      </Suggestions>

      <div className="rounded-lg border border-dashed bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
        {selectedSuggestion}
      </div>
    </div>
  )
}
