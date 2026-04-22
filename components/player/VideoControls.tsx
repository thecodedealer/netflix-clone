"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";

import {
  usePlayer,
  CaptionsButton,
  FullscreenButton,
  MuteButton,
  PlayButton,
  SeekButton,
  Slider,
  VolumeSlider,
  selectTime,
  selectBuffer,
} from "@videojs/react";
import {
  BackIcon,
  HighVolumeIcon,
  LowVolumeIcon,
  MediumVolumeIcon,
  MuteVolumeIcon,
  PauseButtonIcon,
  PlayButtonIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "@/lib/Icons";
import Link from "next/link";
import { formatTime } from "@/lib/utils";

import {
  MdClosedCaption,
  MdClosedCaptionDisabled,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";

interface ThumbnailEntry {
  url: string;
  startTime: number;
  endTime: number;
}

interface Props {
  title: string;
  thumbnails: ThumbnailEntry[];
}

function VideoControls({ title, thumbnails }: Props) {
  const timeSate = usePlayer(selectTime);
  const bufferState = usePlayer(selectBuffer);

  const duration = timeSate?.duration ?? 0;
  const currentTime = timeSate?.currentTime ?? 0;
  const buffered = bufferState?.buffered ?? [];
  const bufferedEnd =
    buffered.length > 0 ? buffered[buffered.length - 1][1] : 0;
  const bufferedPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  const [controlsVisible, setControlsVisible] = React.useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    hideTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full ${!controlsVisible ? "cursor-none" : ""}`}
      onMouseMove={resetTimer}
    >
      <motion.div
        className="p-8 flex flex-col justify-between h-full"
        animate={{
          opacity: controlsVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <PlayButton
            render={(props, state) => (
              <button
                className="w-full h-full flex items-center justify-center"
                {...props}
              >
                <span className="w-22 h-22 rounded-full flex items-center justify-center bg-brand-background/25">
                  {state.paused ? (
                    <PlayButtonIcon className="ml-1" size={50} />
                  ) : (
                    <PauseButtonIcon className="ml-1" size={50} />
                  )}
                </span>
              </button>
            )}
          />
        </div>

        <Link href={"/"} className="relative z-20">
          <BackIcon size={45} />
        </Link>

        <div className="relative z-20 flex flex-col gap-6 items-center">
          <div className="w-full flex items-center gap-4">
            <div className="flex-1">
              <Slider.Root
                min={0}
                max={duration}
                value={currentTime}
                onValueChange={(t) => timeSate?.seek(t)}
                onValueCommit={(t) => timeSate?.seek(t)}
                className="group relative flex items-center w-full h-4 cursor-pointer"
                style={
                  {
                    "--media-slider-buffer": `${bufferedPercent.toFixed(3)}%`,
                  } as React.CSSProperties
                }
              >
                <Slider.Track
                  className={
                    "relative w-full h-1 group-hover:h-2 bg-white/50 rounded-full overflow-hidden"
                  }
                >
                  <Slider.Buffer
                    className="absolute inset-y-0 left-0 bg-white/70 rounded-full"
                    style={{
                      width: "var(--media-slider-fill)",
                    }}
                  />
                  <Slider.Fill
                    className="absolute inset-y-0 left-0 bg-red-500 rounded-full"
                    style={{ width: "var(--media-slider-fill)" }}
                  />
                </Slider.Track>

                <Slider.Thumb
                  className="absolute w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
                  style={{ left: "var(--media-slider-fill)" }}
                />

                <Slider.Preview
                  overflow="clamp"
                  className="flex flex-col items-center gap-1 opacity-0 data-pointing:opacity-100 transition-opacity duration-150"
                  style={{ bottom: "calc(100% + 8px)" }}
                >
                  <Slider.Thumbnail
                    thumbnails={thumbnails}
                    className={"ronded overflow-hidden"}
                  />
                  <Slider.Value
                    type="pointer"
                    format={formatTime}
                    className="text-white text-xs"
                  />
                </Slider.Preview>
              </Slider.Root>
            </div>
            <p className="w-16 flex justify-between items-center">
              {formatTime(duration - currentTime)}
            </p>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-8">
              <PlayButton
                render={(props, state) => (
                  <button
                    {...props}
                    className="transition-transform duration-200 hover:scale-140"
                  >
                    {state.paused ? (
                      <PlayButtonIcon size={50} />
                    ) : (
                      <PauseButtonIcon size={50} />
                    )}
                  </button>
                )}
              />
              <SeekButton
                seconds={-10}
                render={(props) => (
                  <button
                    {...props}
                    className="relative transition-transform duration-200 hover:scale-140"
                  >
                    <RotateCcwIcon size={50} />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-sm flex items-center justify-center">
                      10
                    </span>
                  </button>
                )}
              />
              <SeekButton
                seconds={10}
                render={(props) => (
                  <button
                    {...props}
                    className="relative transition-transform duration-200 hover:scale-140"
                  >
                    <RotateCwIcon size={50} />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-sm flex items-center justify-center">
                      10
                    </span>
                  </button>
                )}
              />

              <div className="group relative flex items-center">
                <MuteButton
                  render={(props, state) => (
                    <button
                      className="transition-transform duration-200 hover:scale-140"
                      {...props}
                    >
                      {state.volumeLevel === "off" && (
                        <MuteVolumeIcon size={50} />
                      )}
                      {state.volumeLevel === "low" && (
                        <LowVolumeIcon size={50} />
                      )}
                      {state.volumeLevel === "medium" && (
                        <MediumVolumeIcon size={50} />
                      )}
                      {state.volumeLevel === "high" && (
                        <HighVolumeIcon size={50} />
                      )}
                    </button>
                  )}
                />

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 hidden group-hover:flex">
                  <div className="px-2 py-6 bg-brand-background/90 rounded-[0.135rem]">
                    <VolumeSlider.Root
                      orientation="vertical"
                      className="relative flex flex-col items-center h-[17vh] w-5 cursor-pointer"
                    >
                      <VolumeSlider.Track
                        className={
                          "relative h-full w-3 bg-white/30 rounded-xs overflow-hidden"
                        }
                      >
                        <VolumeSlider.Fill
                          className="absolute bottom-0 left-0 right-0 bg-red-500 rounded-xs"
                          style={{ height: "var(--media-slider-fill)" }}
                        />
                      </VolumeSlider.Track>
                      <VolumeSlider.Thumb
                        className="absolute w-5 h-5 bg-red-500 rounded-full translate-y-1/2 -translate-x-1/2 left-1/2"
                        style={{ bottom: "var(--media-slider-fill)" }}
                      />
                    </VolumeSlider.Root>
                  </div>
                </div>
              </div>
            </div>
            <p className="u-text-shadow text-xl font-semibold line-clamp-1">
              {title}
            </p>
            <div className="flex items-center gap-6">
              <CaptionsButton
                render={(props, state) => (
                  <button
                    className="transition-transform duration-200 hover:scale-140"
                    {...props}
                  >
                    {state.subtitlesShowing ? (
                      <MdClosedCaption size={42} />
                    ) : (
                      <MdClosedCaptionDisabled size={42} />
                    )}
                  </button>
                )}
              />
              <FullscreenButton
                render={(props, state) => (
                  <button
                    className="transition-transform duration-200 hover:scale-140"
                    {...props}
                  >
                    {state.fullscreen ? (
                      <MdFullscreenExit size={50} />
                    ) : (
                      <MdFullscreen size={50} />
                    )}
                  </button>
                )}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VideoControls;
