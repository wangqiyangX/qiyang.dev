"use client"

import {
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  RotateCwIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export type AudioPlayerAudioData = {
  base64: string
  mediaType?: string
  mimeType?: string
}

export type AudioPlayerProps = React.ComponentProps<"div">

export type AudioPlayerElementProps = Omit<
  React.ComponentPropsWithoutRef<"audio">,
  "src"
> & {
  src?: string
  data?: AudioPlayerAudioData
}

export type AudioPlayerControlBarProps = React.ComponentProps<
  typeof ButtonGroup
>

export type AudioPlayerControlRowProps = React.ComponentProps<"div">

export type AudioPlayerControlSeparatorProps = React.ComponentProps<
  typeof ButtonGroupSeparator
>

export type AudioPlayerPlayButtonProps = React.ComponentProps<typeof Button>

export type AudioPlayerSeekBackwardButtonProps = React.ComponentProps<
  typeof Button
> & {
  seekOffset?: number
}

export type AudioPlayerSeekForwardButtonProps = React.ComponentProps<
  typeof Button
> & {
  seekOffset?: number
}

export type AudioPlayerTimeDisplayProps = Omit<
  React.ComponentProps<typeof ButtonGroupText>,
  "asChild" | "children"
> & {
  formatTime?: (seconds: number) => string
}

export type AudioPlayerTimeRangeProps = Omit<
  React.ComponentProps<typeof Slider>,
  "defaultValue" | "max" | "onPointerLeave" | "onPointerMove" | "value"
> & {
  formatTime?: (seconds: number) => string
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>
}

export type AudioPlayerDurationDisplayProps = AudioPlayerTimeDisplayProps

export type AudioPlayerRemainingTimeDisplayProps = AudioPlayerTimeDisplayProps

export type AudioPlayerMuteButtonProps = React.ComponentProps<typeof Button>

export type AudioPlayerVolumeRangeProps = Omit<
  React.ComponentProps<typeof Slider>,
  "defaultValue" | "max" | "value"
>

type AudioPlayerContextValue = {
  currentTime: number
  duration: number
  muted: boolean
  paused: boolean
  seekBy: (offset: number) => void
  seekTo: (time: number) => void
  setAudioElement: (audio: HTMLAudioElement | null) => void
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  setMuted: React.Dispatch<React.SetStateAction<boolean>>
  setPaused: React.Dispatch<React.SetStateAction<boolean>>
  setVolumeState: React.Dispatch<React.SetStateAction<number>>
  setVolume: (volume: number) => void
  toggleMuted: () => void
  togglePlayback: () => void
  volume: number
}

const AudioPlayerContext = React.createContext<AudioPlayerContextValue | null>(
  null
)

const audioButtonClassName = "text-muted-foreground hover:text-foreground"

const audioTextClassName =
  "h-8 border-0 bg-transparent px-1.5 font-sans text-xs text-muted-foreground shadow-none tabular-nums"

const audioSliderClassName =
  "[&_[data-slot=slider-range]]:bg-muted-foreground [&_[data-slot=slider-thumb]]:border-border [&_[data-slot=slider-thumb]]:bg-background [&_[data-slot=slider-thumb]]:shadow-xs [&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-track]]:bg-border"

const iconClassName = "size-4 fill-none stroke-current"

function AudioPlayer({ className, ...props }: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [muted, setMuted] = React.useState(false)
  const [paused, setPaused] = React.useState(true)
  const [volume, setVolumeState] = React.useState(1)

  const setAudioElement = React.useCallback(
    (audio: HTMLAudioElement | null) => {
      audioRef.current = audio
    },
    []
  )

  const seekTo = React.useCallback((time: number) => {
    const audio = audioRef.current
    const duration = audio ? getFiniteTime(audio.duration) : 0
    const nextTime = clamp(time, 0, duration || Number.MAX_SAFE_INTEGER)

    setCurrentTime(nextTime)

    if (audio) {
      audio.currentTime = nextTime
    }
  }, [])

  const seekBy = React.useCallback(
    (offset: number) => {
      const audio = audioRef.current

      seekTo((audio ? getFiniteTime(audio.currentTime) : currentTime) + offset)
    },
    [currentTime, seekTo]
  )

  const setVolume = React.useCallback((volume: number) => {
    const audio = audioRef.current
    const nextVolume = clamp(volume, 0, 1)

    setVolumeState(nextVolume)
    setMuted(nextVolume === 0)

    if (audio) {
      audio.volume = nextVolume
      audio.muted = nextVolume === 0
    }
  }, [])

  const toggleMuted = React.useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.muted = !audio.muted
    setMuted(audio.muted)
  }, [])

  const togglePlayback = React.useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      void audio.play().catch(() => {
        setPaused(true)
      })
      return
    }

    audio.pause()
  }, [])

  const value = React.useMemo<AudioPlayerContextValue>(
    () => ({
      currentTime,
      duration,
      muted,
      paused,
      seekBy,
      seekTo,
      setAudioElement,
      setCurrentTime,
      setDuration,
      setMuted,
      setPaused,
      setVolumeState,
      setVolume,
      toggleMuted,
      togglePlayback,
      volume,
    }),
    [
      currentTime,
      duration,
      muted,
      paused,
      seekBy,
      seekTo,
      setAudioElement,
      setVolume,
      toggleMuted,
      togglePlayback,
      volume,
    ]
  )

  return (
    <AudioPlayerContext.Provider value={value}>
      <div className={cn("w-full", className)} {...props} />
    </AudioPlayerContext.Provider>
  )
}

function AudioPlayerElement({
  className,
  data,
  onDurationChange,
  onEmptied,
  onLoadedMetadata,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  preload = "metadata",
  src,
  ...props
}: AudioPlayerElementProps) {
  const player = useAudioPlayer()
  const setAudioElement = player.setAudioElement
  const audioRef = React.useCallback(
    (audio: HTMLAudioElement | null) => {
      setAudioElement(audio)
    },
    [setAudioElement]
  )

  const updateTimeState = React.useCallback(
    (audio: HTMLAudioElement) => {
      player.setCurrentTime(getFiniteTime(audio.currentTime))
      player.setDuration(getFiniteTime(audio.duration))
    },
    [player]
  )

  const updateVolumeState = React.useCallback(
    (audio: HTMLAudioElement) => {
      player.setMuted(audio.muted)
      player.setVolumeState(audio.volume)
    },
    [player]
  )

  return (
    <audio
      className={cn("hidden", className)}
      preload={preload}
      ref={audioRef}
      src={data ? getDataAudioSource(data) : src}
      onDurationChange={(event) => {
        onDurationChange?.(event)
        updateTimeState(event.currentTarget)
      }}
      onEmptied={(event) => {
        onEmptied?.(event)
        player.setCurrentTime(0)
        player.setDuration(0)
        player.setPaused(true)
      }}
      onLoadedMetadata={(event) => {
        onLoadedMetadata?.(event)
        updateTimeState(event.currentTarget)
        updateVolumeState(event.currentTarget)
      }}
      onPause={(event) => {
        onPause?.(event)
        player.setPaused(true)
      }}
      onPlay={(event) => {
        onPlay?.(event)
        player.setPaused(false)
      }}
      onTimeUpdate={(event) => {
        onTimeUpdate?.(event)
        updateTimeState(event.currentTarget)
      }}
      onVolumeChange={(event) => {
        onVolumeChange?.(event)
        updateVolumeState(event.currentTarget)
      }}
      {...props}
    />
  )
}

function AudioPlayerControlBar({
  children,
  className,
  orientation = "vertical",
  ...props
}: AudioPlayerControlBarProps) {
  return (
    <ButtonGroup
      className={cn(
        "h-auto w-full min-w-0 items-stretch gap-1 rounded-lg border bg-background p-1.5 shadow-xs",
        className
      )}
      orientation={orientation}
      {...props}
    >
      {children}
    </ButtonGroup>
  )
}

function AudioPlayerControlRow({
  className,
  ...props
}: AudioPlayerControlRowProps) {
  return (
    <div
      className={cn("flex min-w-0 items-center gap-1", className)}
      {...props}
    />
  )
}

function AudioPlayerControlSeparator({
  className,
  ...props
}: AudioPlayerControlSeparatorProps) {
  return (
    <ButtonGroupSeparator
      className={cn("mx-1 h-4 self-center", className)}
      {...props}
    />
  )
}

function AudioPlayerPlayButton({
  className,
  onClick,
  type = "button",
  ...props
}: AudioPlayerPlayButtonProps) {
  const player = useAudioPlayer()
  const Icon = player.paused ? PlayIcon : PauseIcon

  return (
    <Button
      aria-label={player.paused ? "Play" : "Pause"}
      className={cn(audioButtonClassName, className)}
      size="icon-sm"
      type={type}
      variant="ghost"
      onClick={composeEventHandlers(onClick, player.togglePlayback)}
      {...props}
    >
      <Icon className={iconClassName} />
    </Button>
  )
}

function AudioPlayerSeekBackwardButton({
  className,
  onClick,
  seekOffset = 10,
  type = "button",
  ...props
}: AudioPlayerSeekBackwardButtonProps) {
  const player = useAudioPlayer()

  return (
    <Button
      aria-label={`Seek back ${seekOffset} seconds`}
      className={cn(audioButtonClassName, className)}
      size="icon-sm"
      type={type}
      variant="ghost"
      onClick={composeEventHandlers(onClick, () => player.seekBy(-seekOffset))}
      {...props}
    >
      <RotateCcwIcon className={iconClassName} />
    </Button>
  )
}

function AudioPlayerSeekForwardButton({
  className,
  onClick,
  seekOffset = 10,
  type = "button",
  ...props
}: AudioPlayerSeekForwardButtonProps) {
  const player = useAudioPlayer()

  return (
    <Button
      aria-label={`Seek forward ${seekOffset} seconds`}
      className={cn(audioButtonClassName, className)}
      size="icon-sm"
      type={type}
      variant="ghost"
      onClick={composeEventHandlers(onClick, () => player.seekBy(seekOffset))}
      {...props}
    >
      <RotateCwIcon className={iconClassName} />
    </Button>
  )
}

function AudioPlayerTimeDisplay({
  className,
  formatTime = formatAudioTime,
  ...props
}: AudioPlayerTimeDisplayProps) {
  const player = useAudioPlayer()

  return (
    <ButtonGroupText
      className={cn(audioTextClassName, "min-w-10 justify-center", className)}
      {...props}
    >
      {formatTime(player.currentTime)}
    </ButtonGroupText>
  )
}

function AudioPlayerTimeRange({
  className,
  formatTime = formatAudioTime,
  onPointerLeave,
  onPointerMove,
  onValueChange,
  onValueCommit,
  ...props
}: AudioPlayerTimeRangeProps) {
  const player = useAudioPlayer()
  const [preview, setPreview] = React.useState<{
    percent: number
    time: number
  } | null>(null)
  const [pendingTime, setPendingTime] = React.useState<number | null>(null)
  const duration = Math.max(player.duration, 0)
  const currentValue =
    pendingTime ?? (duration > 0 ? Math.min(player.currentTime, duration) : 0)

  return (
    <ButtonGroupText
      className={cn(
        "relative h-8 min-w-28 flex-1 border-0 bg-transparent px-3 shadow-none",
        className
      )}
      onPointerLeave={composeEventHandlers(onPointerLeave, () =>
        setPreview(null)
      )}
      onPointerMove={composeEventHandlers(onPointerMove, (event) => {
        if (duration <= 0) {
          return
        }

        const bounds = event.currentTarget.getBoundingClientRect()
        const percent = clamp(
          (event.clientX - bounds.left) / bounds.width,
          0,
          1
        )

        setPreview({
          percent,
          time: percent * duration,
        })
      })}
    >
      {preview ? (
        <span
          className="pointer-events-none absolute bottom-6 z-10 rounded-md border bg-popover px-1.5 py-0.5 text-[10px] leading-none text-popover-foreground tabular-nums shadow-xs"
          style={{
            left: `${preview.percent * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {formatTime(preview.time)}
        </span>
      ) : null}
      <Slider
        aria-label="Seek"
        className={cn("w-full", audioSliderClassName)}
        disabled={duration <= 0}
        max={duration || 1}
        step={0.1}
        value={[currentValue]}
        onValueChange={(nextValue) => {
          const nextTime = nextValue[0] ?? 0

          setPendingTime(nextTime)
          onValueChange?.(nextValue)
        }}
        onValueCommit={(nextValue) => {
          const nextTime = nextValue[0] ?? 0

          setPendingTime(null)
          player.seekTo(nextTime)
          onValueCommit?.(nextValue)
        }}
        {...props}
      />
    </ButtonGroupText>
  )
}

function AudioPlayerDurationDisplay({
  className,
  formatTime = formatAudioTime,
  ...props
}: AudioPlayerDurationDisplayProps) {
  const player = useAudioPlayer()

  return (
    <ButtonGroupText
      className={cn(audioTextClassName, "min-w-10 justify-center", className)}
      {...props}
    >
      {formatTime(player.duration)}
    </ButtonGroupText>
  )
}

function AudioPlayerRemainingTimeDisplay({
  className,
  formatTime = formatAudioTime,
  ...props
}: AudioPlayerRemainingTimeDisplayProps) {
  const player = useAudioPlayer()
  const remainingTime = Math.max(player.duration - player.currentTime, 0)

  return (
    <ButtonGroupText
      className={cn(audioTextClassName, "min-w-10 justify-center", className)}
      {...props}
    >
      {formatTime(remainingTime)}
    </ButtonGroupText>
  )
}

function AudioPlayerMuteButton({
  className,
  onClick,
  type = "button",
  ...props
}: AudioPlayerMuteButtonProps) {
  const player = useAudioPlayer()
  const Icon =
    player.muted || player.volume === 0
      ? VolumeXIcon
      : player.volume < 0.5
        ? Volume1Icon
        : Volume2Icon

  return (
    <Button
      aria-label={player.muted ? "Unmute" : "Mute"}
      className={cn(audioButtonClassName, className)}
      size="icon-sm"
      type={type}
      variant="ghost"
      onClick={composeEventHandlers(onClick, player.toggleMuted)}
      {...props}
    >
      <Icon className={iconClassName} />
    </Button>
  )
}

function AudioPlayerVolumeRange({
  className,
  onValueChange,
  onValueCommit,
  ...props
}: AudioPlayerVolumeRangeProps) {
  const player = useAudioPlayer()
  const value = player.muted ? 0 : Math.round(player.volume * 100)

  return (
    <ButtonGroupText
      className={cn(
        "h-8 w-20 border-0 bg-transparent px-2 shadow-none",
        className
      )}
    >
      <Slider
        aria-label="Volume"
        className={cn("w-full", audioSliderClassName)}
        max={100}
        step={1}
        value={[value]}
        onValueChange={(nextValue) => {
          const nextVolume = (nextValue[0] ?? 0) / 100

          player.setVolume(nextVolume)
          onValueChange?.(nextValue)
        }}
        onValueCommit={(nextValue) => {
          const nextVolume = (nextValue[0] ?? 0) / 100

          player.setVolume(nextVolume)
          onValueCommit?.(nextValue)
        }}
        {...props}
      />
    </ButtonGroupText>
  )
}

function useAudioPlayer() {
  const context = React.useContext(AudioPlayerContext)

  if (!context) {
    throw new Error("AudioPlayer components must be used within AudioPlayer.")
  }

  return context
}

function getDataAudioSource(data: AudioPlayerAudioData) {
  return `data:${data.mediaType ?? data.mimeType ?? "audio/mpeg"};base64,${
    data.base64
  }`
}

function getFiniteTime(time: number) {
  return Number.isFinite(time) ? time : 0
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function composeEventHandlers<Event>(
  userHandler: ((event: Event) => void) | undefined,
  internalHandler: (event: Event) => void
) {
  return (event: Event) => {
    userHandler?.(event)
    internalHandler(event)
  }
}

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00"
  }

  const totalSeconds = Math.max(Math.floor(seconds), 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0")

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${paddedSeconds}`
  }

  return `${minutes}:${paddedSeconds}`
}

export {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerControlRow,
  AudioPlayerControlSeparator,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerMuteButton,
  AudioPlayerPlayButton,
  AudioPlayerRemainingTimeDisplay,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerVolumeRange,
}
