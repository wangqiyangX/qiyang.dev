import Link from "next/link"

import { BrandAssetsMenu } from "@/registry/components/brand-assets-menu"

export default function BrandAssetsMenuDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BrandAssetsMenu
        logomark={<QiyangMark />}
        logomarkSVG={LOGOMARK_SVG}
        logotypeSVG={LOGOTYPE_SVG}
        brandGuidelinesURL="https://chanhdai.com/blog/chanhdai-brand"
        brandAssetsURL="https://assets.chanhdai.com/chanhdai-brand.zip"
      >
        <Link href="/" aria-label="Home">
          <QiyangMark className="h-8 text-foreground" />
        </Link>
      </BrandAssetsMenu>

      <div className="text-sm text-muted-foreground">
        <span className="hidden pointer-fine:inline-block">
          Right-click the logo
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Press & hold the logo
        </span>
      </div>
    </div>
  )
}

const LOGOMARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="96 36 588 288"><path d="M120 120h60v120h-60zm60-60h120v60H180zm0 180h60v-60h60v-60h60v180H180zM420 60h60v60h120V60h60v120h-60v120H480V180h-60z" fill="currentColor" fill-rule="evenodd"/></svg>'

const LOGOTYPE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 2048 256"><path fill="currentColor" d="M192 256H64v-64h128v64ZM448 64H320v128h128v64H256V0h192v64ZM64 192H0V64h64v128ZM512 192h-64V64h64v128ZM192 64H64V0h128v64ZM768 32h32v32h-32zM672 0h96v32h-96zM640 32h32v192h-32zM672 224h96v32h-96zM768 192h32v32h-32zM832 0h32v256h-32zM864 64h96v32h-96zM960 96h32v160h-32zM1056 64h96v32h-96zM1024 96h32v128h-32zM1056 224h64v32h-64zM1120 192h32v32h-32zM1152 64h32v192h-32zM1216 64h32v192h-32zM1248 64h96v32h-96zM1344 96h32v160h-32zM1408 0h32v256h-32zM1440 64h96v32h-96zM1536 96h32v160h-32zM1632 0h64v32h-64zM1696 32h32v32h-32zM1696 192h32v32h-32zM1728 64h32v128h-32zM1632 224h64v32h-64zM1600 0h32v256h-32zM1824 64h96v32h-96zM1792 96h32v128h-32zM1824 224h64v32h-64zM1888 192h32v32h-32zM1920 64h32v192h-32zM1984 64h32v32h-32zM2016 64h32v192h-32zM2016 0h32v32h-32z"/></svg>'

function QiyangMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="96 36 588 288"
      aria-hidden
      {...props}
    >
      <path
        d="M 120 120 L 180 120 L 180 240 L 120 240 L 120 120 Z M 180 60 L 300 60 L 300 120 L 180 120 L 180 60 Z M 180 240 L 240 240 L 240 180 L 300 180 L 300 120 L 360 120 L 360 300 L 180 300 L 180 240 Z M 420 60 L 480 60 L 480 120 L 600 120 L 600 60 L 660 60 L 660 180 L 600 180 L 600 300 L 480 300 L 480 180 L 420 180 L 420 60 Z"
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
    </svg>
  )
}
