"use client"

import { useTheme } from "next-themes"
import { toast } from "sonner"

import { copyText } from "@/utils/copy"

import { getMarkSVG, QiyangWangMark } from "./qiyangwang-mark"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit dark:liquid-glass-border dark:ring-0">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff")
            copyText(svg)
            toast.success("Mark as SVG copied")
          }}
        >
          <QiyangWangMark />
          Copy Mark as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
