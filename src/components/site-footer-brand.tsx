"use client"

import { motion, useMotionValue, useSpring } from "motion/react"

const VIEWBOX_MIN_X = -84
const VIEWBOX_WIDTH = 3408
const VIEWBOX_MAX_X = VIEWBOX_MIN_X + VIEWBOX_WIDTH
const DEFAULT_GRADIENT_X = VIEWBOX_MIN_X + VIEWBOX_WIDTH / 2

export function SiteFooterInteractiveLogotype() {
  const gradientX1Raw = useMotionValue(DEFAULT_GRADIENT_X)
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const containerRect = container.getBoundingClientRect()
    const mouseX = event.clientX - containerRect.left
    const containerWidth = containerRect.width

    const normalizedX =
      VIEWBOX_MIN_X + (mouseX / containerWidth) * VIEWBOX_WIDTH
    const clampedX = Math.max(
      VIEWBOX_MIN_X,
      Math.min(VIEWBOX_MAX_X, normalizedX)
    )

    gradientX1Raw.set(clampedX)
  }

  const handleMouseLeave = () => {
    gradientX1Raw.set(DEFAULT_GRADIENT_X)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[40%] items-center justify-center">
          <svg
            className="container size-full"
            viewBox="-84 -24 3408 528"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M -60 60 L 0 60 L 0 360 L -60 360 L -60 60 Z M 0 0 L 180 0 L 180 60 L 0 60 L 0 0 Z M 0 360 L 120 360 L 120 420 L 0 420 L 0 360 Z M 120 300 L 180 300 L 180 360 L 120 360 L 120 300 Z M 180 60 L 240 60 L 240 300 L 180 300 L 180 60 Z M 180 360 L 240 360 L 240 420 L 180 420 L 180 360 Z M 300 0 L 360 0 L 360 60 L 300 60 L 300 0 Z M 300 120 L 360 120 L 360 420 L 300 420 L 300 120 Z M 420 120 L 480 120 L 480 300 L 420 300 L 420 120 Z M 420 420 L 660 420 L 660 480 L 420 480 L 420 420 Z M 480 300 L 660 300 L 660 120 L 720 120 L 720 420 L 660 420 L 660 360 L 480 360 L 480 300 Z M 780 300 L 840 300 L 840 360 L 780 360 L 780 300 Z M 840 120 L 1080 120 L 1080 180 L 840 180 L 840 120 Z M 840 240 L 1080 240 L 1080 180 L 1140 180 L 1140 420 L 840 420 L 840 360 L 1080 360 L 1080 300 L 840 300 L 840 240 Z M 1200 120 L 1440 120 L 1440 180 L 1260 180 L 1260 420 L 1200 420 L 1200 120 Z M 1440 180 L 1500 180 L 1500 420 L 1440 420 L 1440 180 Z M 1560 180 L 1620 180 L 1620 300 L 1560 300 L 1560 180 Z M 1560 420 L 1800 420 L 1800 480 L 1560 480 L 1560 420 Z M 1620 120 L 1860 120 L 1860 420 L 1800 420 L 1800 360 L 1620 360 L 1620 300 L 1800 300 L 1800 180 L 1620 180 L 1620 120 Z M 1920 0 L 1980 0 L 1980 300 L 2040 300 L 2040 360 L 1980 360 L 1980 420 L 1920 420 L 1920 0 Z M 2040 240 L 2100 240 L 2100 300 L 2040 300 L 2040 240 Z M 2100 300 L 2160 300 L 2160 0 L 2220 0 L 2220 420 L 2160 420 L 2160 360 L 2100 360 L 2100 300 Z M 2280 300 L 2340 300 L 2340 360 L 2280 360 L 2280 300 Z M 2340 120 L 2520 120 L 2520 180 L 2340 180 L 2340 120 Z M 2340 240 L 2520 240 L 2520 180 L 2580 180 L 2580 420 L 2340 420 L 2340 360 L 2520 360 L 2520 300 L 2340 300 L 2340 240 Z M 2640 120 L 2880 120 L 2880 180 L 2700 180 L 2700 420 L 2640 420 L 2640 120 Z M 2880 180 L 2940 180 L 2940 420 L 2880 420 L 2880 180 Z M 3000 180 L 3060 180 L 3060 300 L 3000 300 L 3000 180 Z M 3000 420 L 3240 420 L 3240 480 L 3000 480 L 3000 420 Z M 3060 120 L 3300 120 L 3300 420 L 3240 420 L 3240 360 L 3060 360 L 3060 300 L 3240 300 L 3240 180 L 3060 180 L 3060 120 Z"
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              className="stroke-foreground/10"
              d="M -60 60 L 0 60 L 0 360 L -60 360 L -60 60 Z M 0 0 L 180 0 L 180 60 L 0 60 L 0 0 Z M 0 360 L 120 360 L 120 420 L 0 420 L 0 360 Z M 120 300 L 180 300 L 180 360 L 120 360 L 120 300 Z M 180 60 L 240 60 L 240 300 L 180 300 L 180 60 Z M 180 360 L 240 360 L 240 420 L 180 420 L 180 360 Z M 300 0 L 360 0 L 360 60 L 300 60 L 300 0 Z M 300 120 L 360 120 L 360 420 L 300 420 L 300 120 Z M 420 120 L 480 120 L 480 300 L 420 300 L 420 120 Z M 420 420 L 660 420 L 660 480 L 420 480 L 420 420 Z M 480 300 L 660 300 L 660 120 L 720 120 L 720 420 L 660 420 L 660 360 L 480 360 L 480 300 Z M 780 300 L 840 300 L 840 360 L 780 360 L 780 300 Z M 840 120 L 1080 120 L 1080 180 L 840 180 L 840 120 Z M 840 240 L 1080 240 L 1080 180 L 1140 180 L 1140 420 L 840 420 L 840 360 L 1080 360 L 1080 300 L 840 300 L 840 240 Z M 1200 120 L 1440 120 L 1440 180 L 1260 180 L 1260 420 L 1200 420 L 1200 120 Z M 1440 180 L 1500 180 L 1500 420 L 1440 420 L 1440 180 Z M 1560 180 L 1620 180 L 1620 300 L 1560 300 L 1560 180 Z M 1560 420 L 1800 420 L 1800 480 L 1560 480 L 1560 420 Z M 1620 120 L 1860 120 L 1860 420 L 1800 420 L 1800 360 L 1620 360 L 1620 300 L 1800 300 L 1800 180 L 1620 180 L 1620 120 Z M 1920 0 L 1980 0 L 1980 300 L 2040 300 L 2040 360 L 1980 360 L 1980 420 L 1920 420 L 1920 0 Z M 2040 240 L 2100 240 L 2100 300 L 2040 300 L 2040 240 Z M 2100 300 L 2160 300 L 2160 0 L 2220 0 L 2220 420 L 2160 420 L 2160 360 L 2100 360 L 2100 300 Z M 2280 300 L 2340 300 L 2340 360 L 2280 360 L 2280 300 Z M 2340 120 L 2520 120 L 2520 180 L 2340 180 L 2340 120 Z M 2340 240 L 2520 240 L 2520 180 L 2580 180 L 2580 420 L 2340 420 L 2340 360 L 2520 360 L 2520 300 L 2340 300 L 2340 240 Z M 2640 120 L 2880 120 L 2880 180 L 2700 180 L 2700 420 L 2640 420 L 2640 120 Z M 2880 180 L 2940 180 L 2940 420 L 2880 420 L 2880 180 Z M 3000 180 L 3060 180 L 3060 300 L 3000 300 L 3000 180 Z M 3000 420 L 3240 420 L 3240 480 L 3000 480 L 3000 420 Z M 3060 120 L 3300 120 L 3300 420 L 3240 420 L 3240 360 L 3060 360 L 3060 300 L 3240 300 L 3240 180 L 3060 180 L 3060 120 Z"
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="-24"
                x2={DEFAULT_GRADIENT_X}
                y2="504"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
