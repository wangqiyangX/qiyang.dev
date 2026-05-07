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
import type {
  Slider,
  SliderHiddenInput,
  SliderLabel,
  SliderMark,
  SliderRange,
  SliderThumb,
  SliderTick,
  SliderTrack,
} from "@/registry/components/slider/slider"
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

export type SliderProps = Pick<
  ComponentProps<typeof Slider>,
  | "defaultValue"
  | "dir"
  | "disabled"
  | "formatValue"
  | "inverted"
  | "max"
  | "min"
  | "onValueChange"
  | "orientation"
  | "step"
  | "value"
>

export type SliderTrackProps = Omit<
  ComponentProps<typeof SliderTrack>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "children" | "className">
>

export type SliderRangeProps = Omit<
  ComponentProps<typeof SliderRange>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "children" | "className">
>

export type SliderThumbProps = Omit<
  ComponentProps<typeof SliderThumb>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "children" | "className">
>

export type SliderMarkProps = Omit<
  ComponentProps<typeof SliderMark>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "children" | "className">
>

export type SliderTickProps = Omit<
  ComponentProps<typeof SliderTick>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "className">
>

export type SliderLabelProps = Omit<
  ComponentProps<typeof SliderLabel>,
  keyof Omit<ComponentPropsWithoutRef<"span">, "children" | "className">
>

export type SliderHiddenInputProps = Omit<
  ComponentProps<typeof SliderHiddenInput>,
  keyof Omit<ComponentPropsWithoutRef<"input">, "className" | "name">
>

export type StepperProps = Omit<
  ComponentProps<typeof Stepper>,
  keyof Omit<ComponentPropsWithoutRef<"div">, "className">
>
