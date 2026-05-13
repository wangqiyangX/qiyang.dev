import { Grip, LayoutDashboard } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { X_HANDLE } from "@/config/site"
import { cn } from "@/lib/utils"
import ChainOfThoughtDemo from "@/registry/examples/chain-of-thought-demo"
import ContextDemo from "@/registry/examples/context-demo"
import MermaidDiagramDemo from "@/registry/examples/mermaid-diagram-demo"
import ShimmerDemo from "@/registry/examples/shimmer-demo"

const title = "Component Showcase"
const description = "Pixel-perfect, uniquely crafted."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/components/showcase",
  },
  openGraph: {
    url: "/components/showcase",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

export default function ComponentsShowcasePage() {
  return (
    <>
      <PageHeading>
        <PageHeadingTagline>Component Showcase</PageHeadingTagline>
        <PageHeadingTitle>Pixel-perfect, uniquely crafted.</PageHeadingTitle>
      </PageHeading>

      <div className="flex items-center justify-end gap-1 p-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="size-7 border-none text-muted-foreground"
                variant="ghost"
                size="icon-sm"
                nativeButton={false}
                render={<Link href="/components" />}
                aria-label="List"
              >
                <Grip />
              </Button>
            }
          />
          <TooltipContent>
            <p>List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="size-7"
                variant="outline"
                size="icon-sm"
                aria-label="Showcase"
              >
                <LayoutDashboard />
              </Button>
            }
          />
          <TooltipContent>
            <p>Showcase</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="screen-line-bottom h-px" />

      <div className="grid grid-cols-1 gap-1 p-1 lg:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
        <GridItem>
          <ChainOfThoughtDemo className="max-w-none" />
        </GridItem>

        <div className="grid gap-1 lg:self-start">
          <GridItem>
            <ContextDemo />
          </GridItem>

          <GridItem>
            <ShimmerDemo />
          </GridItem>
        </div>

        <GridItem className="lg:col-span-2">
          <MermaidDiagramDemo />
        </GridItem>
      </div>
    </>
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
