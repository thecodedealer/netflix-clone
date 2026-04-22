"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useGlobalContext } from "@/context/globalContext";
import { Movie } from "@/types/types";
import Image from "next/image";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
import { X } from "lucide-react";
import {
  AddIcon,
  CheckIcon,
  PlayButtonIcon,
  VolumeFullIcon,
  VolumeOffIcon,
} from "@/lib/Icons";
import { formatDuration } from "@/lib/utils";
import MaturityBadge from "../movie/MaturityBadge";
import useFetchMyList from "@/hooks/my-list/useFetchMyList";
import useAddToMyList from "@/hooks/my-list/useAddToMyList";
import useRemoveFromMyList from "@/hooks/my-list/useRemoveFromMyList";

function MovieInfoModal() {
  const { activeMovie, closeModal } = useGlobalContext();

  const { data: myList = [] } = useFetchMyList();
  const { mutate: addToMyList } = useAddToMyList();
  const { mutate: removeFromMyList } = useRemoveFromMyList();

  const [movie, setMovie] = useState<Movie | null>(activeMovie);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useDetectOutsideClick(contentRef, closeModal);

  if (activeMovie !== null && activeMovie !== movie) {
    setMovie(activeMovie);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timer = setTimeout(() => {
      video.play().catch(() => {});
    }, 400);

    return () => {
      clearTimeout(timer);
      video.pause();
      video.currentTime = 0;
    };
  }, []);

  if (!movie) return null;

  console.log(movie);

  const isInMyList = movie ? myList.includes(movie.id) : false;

  const handleMyListToggle = () => {
    if (!movie) return;

    if (isInMyList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-1000"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>

      <motion.div
        ref={contentRef}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative max-w-212 w-full bg-[#181818] rounded-lg overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="relative w-full aspect-video bg-black">
          {movie.thumbnailUrl && (
            <Image
              src={movie.thumbnailUrl}
              alt={movie.title}
              width={1280}
              height={720}
              className={`w-full object-cover transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
            />
          )}

          <video
            ref={videoRef}
            src={movie.videoUrl ?? undefined}
            muted={isMuted}
            loop
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
          />

          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#181818] to-transparent pointer-events-none" />

          <button
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-[#181818] hover:bg-[#2a2a2a] text-white z-10 transition-colors"
            onClick={closeModal}
          >
            <X size={18} />
          </button>

          <div className="absolute inset-x-0 bottom-0 px-8 pb-6 flex items-end justify-between z-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-white font-bold text-3xl drop-shadow-lg">
                {movie.title}
              </h2>
              <div className="flex items-center gap-2">
                <button className="btn-play" onClick={() => {}}>
                  <PlayButtonIcon size={22} className="ml-0.5" />
                  Play
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/50 hover:border-white text-white transition-colors"
                  onClick={handleMyListToggle}
                >
                  {isInMyList ? <CheckIcon size={20} /> : <AddIcon size={20} />}
                </button>
              </div>
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/50 hover:border-white text-white transition-colors"
              onClick={() => setIsMuted((p) => !p)}
            >
              {isMuted ? (
                <VolumeOffIcon size={20} />
              ) : (
                <VolumeFullIcon size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="px-8 py-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {movie.releaseYear && (
              <span className="text-white/80 font-medium">
                {movie.releaseYear}
              </span>
            )}
            {movie.duration && (
              <span className="text-white/60">
                {formatDuration(movie.duration)}
              </span>
            )}
            <MaturityBadge rating={movie.maturityRating} size="sm" />
          </div>

          {movie.description && (
            <p className="text-white/90 text-sm leading-relaxed">
              {movie.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MovieInfoModal;
