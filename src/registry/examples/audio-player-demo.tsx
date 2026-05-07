"use client"

import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerControlRow,
  AudioPlayerElement,
  AudioPlayerPlayButton,
  AudioPlayerRemainingTimeDisplay,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerVolumeRange,
} from "@/registry/components/audio-player/audio-player"

export default function AudioPlayerDemo() {
  return (
    <div
      className="space-y-3"
      style={{ maxWidth: "calc(100vw - 3rem)", width: "32rem" }}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">Narration sample</p>
        <p className="text-sm text-muted-foreground">
          A short audio clip served from Mux.
        </p>
      </div>
      <AudioPlayer>
        <AudioPlayerElement src="https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a" />
        <AudioPlayerControlBar>
          <AudioPlayerControlRow>
            <AudioPlayerVolumeRange className="w-24 px-1.5 max-sm:w-20" />
            <div className="flex flex-1 items-center justify-center gap-1">
              <AudioPlayerSeekBackwardButton seekOffset={10} />
              <AudioPlayerPlayButton />
              <AudioPlayerSeekForwardButton seekOffset={10} />
            </div>
            <div className="w-24 max-sm:w-20" />
          </AudioPlayerControlRow>
          <AudioPlayerControlRow className="gap-2">
            <AudioPlayerTimeDisplay />
            <AudioPlayerTimeRange className="px-1.5" />
            <AudioPlayerRemainingTimeDisplay />
          </AudioPlayerControlRow>
        </AudioPlayerControlBar>
      </AudioPlayer>
    </div>
  )
}
