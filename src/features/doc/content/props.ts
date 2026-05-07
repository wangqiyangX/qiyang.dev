import type { ComponentProps, ComponentPropsWithoutRef } from "react"

import type { Button } from "@/components/ui/button"
import type { HoverCard, HoverCardContent } from "@/components/ui/hover-card"
import type {
  Context,
  ContextContent,
  ContextContentHeader,
  ContextInputUsage,
  ContextTrigger,
} from "@/registry/components/context/context"
import type {
  CrosshairCursor,
  CrosshairCursorContent,
  CrosshairCursorCursor,
  CrosshairCursorGuides,
  CrosshairCursorHorizontalLine,
} from "@/registry/components/crosshair-cursor"
import type {
  FileTree,
  FileTreeFile,
  FileTreeFolder,
  FileTreeItem,
} from "@/registry/components/file-tree"
import type {
  LiveLineChart,
  LiveLineChartChart,
  LiveLineChartHeader,
  LiveLineChartLegend,
  LiveLineChartValue,
} from "@/registry/components/live-line-chart/live-line-chart"
import type { Shimmer } from "@/registry/components/shimmer/shimmer"
import type { Stepper } from "@/registry/components/stepper/stepper"

export type ContextProps = Omit<
  ComponentProps<typeof Context>,
  keyof ComponentProps<typeof HoverCard>
>

export type ContextTriggerProps = Omit<
  ComponentProps<typeof ContextTrigger>,
  keyof Omit<ComponentProps<typeof Button>, "children">
>

export type ContextContentProps = Omit<
  ComponentProps<typeof ContextContent>,
  keyof Omit<ComponentProps<typeof HoverCardContent>, "className">
>

export type ContextContentSectionProps = Omit<
  ComponentProps<typeof ContextContentHeader>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type ContextUsageProps = Omit<
  ComponentProps<typeof ContextInputUsage>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type CrosshairCursorProps = Omit<
  ComponentProps<typeof CrosshairCursor>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type CrosshairCursorContentProps = Omit<
  ComponentProps<typeof CrosshairCursorContent>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type CrosshairCursorGuidesProps = Omit<
  ComponentProps<typeof CrosshairCursorGuides>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type CrosshairCursorCursorProps = Omit<
  ComponentProps<typeof CrosshairCursorCursor>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "className">
>

export type CrosshairCursorLineProps = Omit<
  ComponentProps<typeof CrosshairCursorHorizontalLine>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "className">
>

export type FileTreeProps = Omit<
  ComponentProps<typeof FileTree>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type FileTreeFolderProps = Omit<
  ComponentProps<typeof FileTreeFolder>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type FileTreeFileProps = Omit<
  ComponentProps<typeof FileTreeFile>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "className">
>

export type FileTreeItemProps = Omit<
  ComponentProps<typeof FileTreeItem>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type LiveLineChartProps = Omit<
  ComponentProps<typeof LiveLineChart>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type LiveLineChartChartProps = ComponentProps<typeof LiveLineChartChart>

export type LiveLineChartLayoutProps = Omit<
  ComponentProps<typeof LiveLineChartHeader>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type LiveLineChartTextProps = Omit<
  ComponentProps<typeof LiveLineChartValue>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "children" | "className">
>

export type LiveLineChartLegendProps = Omit<
  ComponentProps<typeof LiveLineChartLegend>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type ShimmerProps = ComponentProps<typeof Shimmer>

export type StepperProps = Omit<
  ComponentProps<typeof Stepper>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "className">
>
