"use client"

import { useCallback, useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import type { VolumeIconHandle } from "@/components/animated-icons/volume"
import { VolumeIcon } from "@/components/animated-icons/volume"
import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"

export function PronounceMyName({
  className,
  namePronunciationUrl,
}: {
  className?: string
  namePronunciationUrl: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const volumeIconRef = useRef<VolumeIconHandle>(null)

  const handlePlayClick = useCallback(() => {
    volumeIconRef.current?.startAnimation()
    audioRef.current ??= new Audio(namePronunciationUrl)
    audioRef.current.currentTime = 0
    void audioRef.current.play()
    trackEvent({
      name: "play_name_pronunciation",
    })
  }, [namePronunciationUrl])

  useHotkeys("p", handlePlayClick)

  return (
    <button
      className={cn(
        "relative after:absolute after:-inset-2",
        "touch-manipulation text-muted-foreground transition-[color,scale] select-none hover:text-foreground active:scale-[0.9]",
        className
      )}
      onClick={handlePlayClick}
      aria-label="Pronounce my name"
    >
      <VolumeIcon ref={volumeIconRef} className="size-4.5" />
    </button>
  )
}
