import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"
import { getDocsByCategory } from "@/features/doc/data/documents"
import { cn } from "@/lib/utils"
import ShimmerDemo from "@/registry/examples/shimmer-demo"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function ComponentsShowcase() {
  const components = getDocsByCategory("components")

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Components
          <PanelTitleSup>({components.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-1 gap-1 p-1 md:grid-cols-3">
        <GridItem>
          <ShimmerDemo />
        </GridItem>
      </div>

      <div className="screen-line-bottom h-px" />

      <div className="flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/components" />}
        >
          All Components
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}

function GridItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-line bg-background p-4 transition-[border-color] hover:border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
