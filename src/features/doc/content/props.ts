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
  FileTree,
  FileTreeFile,
  FileTreeFolder,
  FileTreeItem,
} from "@/registry/components/file-tree"
import type {
  LiveChart,
  LiveChartChart,
  LiveChartHeader,
  LiveChartLegend,
  LiveChartValue,
} from "@/registry/components/live-chart/live-chart"
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

export type LiveChartProps = Omit<
  ComponentProps<typeof LiveChart>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type LiveChartChartProps = ComponentProps<typeof LiveChartChart>

export type LiveChartLayoutProps = Omit<
  ComponentProps<typeof LiveChartHeader>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type LiveChartTextProps = Omit<
  ComponentProps<typeof LiveChartValue>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "children" | "className">
>

export type LiveChartLegendProps = Omit<
  ComponentProps<typeof LiveChartLegend>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type ShimmerProps = ComponentProps<typeof Shimmer>

export type StepperProps = Omit<
  ComponentProps<typeof Stepper>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "className">
>
