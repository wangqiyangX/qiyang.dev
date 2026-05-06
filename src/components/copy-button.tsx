"use client"

import type { CopyButtonProps } from "@/components/copy-button/copy-button"
import { CopyButton as CopyButtonPrimitive } from "@/components/copy-button/copy-button"
import type { Event } from "@/lib/events"
import { trackEvent } from "@/lib/events"

import { Icons } from "./icons"

export function CopyButton({
  size = "icon-sm",
  event,
  ...props
}: CopyButtonProps & {
  event?: Event["name"]
}) {
  return (
    <CopyButtonPrimitive
      variant="secondary"
      size={size}
      idleIcon={<Icons.copy />}
      onCopySuccess={(copiedValue) => {
        if (event) {
          trackEvent({
            name: event,
            properties: {
              code: copiedValue,
            },
          })
        }
      }}
      {...props}
    />
  )
}
