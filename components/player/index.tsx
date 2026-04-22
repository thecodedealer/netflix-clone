"use client";
import React from "react";
import { createPlayer, videoFeatures, Container } from "@videojs/react";
import { Video } from "@videojs/react/video";
import VideoControls from "./VideoControls";

interface ThumbnailEntry {
  url: string;
  startTime: number;
  endTime: number;
}

interface MyPlayerProps {
  src: string;
  title: string;
  thumbnails: ThumbnailEntry[];
}

const Player = createPlayer({ features: videoFeatures });

function MyPlayer({ src, title, thumbnails }: MyPlayerProps) {
  return (
    <Player.Provider>
      <Container className="relative h-screen w-full flex items-center justify-center bg-black">
        <Video
          src={src}
          autoPlay
          muted
          className="video-element h-full w-full object-contain"
        />

        <VideoControls title={title} thumbnails={thumbnails} />
      </Container>
    </Player.Provider>
  );
}

export default MyPlayer;
