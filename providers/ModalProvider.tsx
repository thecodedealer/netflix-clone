"use client";
import ModalMovies from "@/components/modals/ModalMovies";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import { AnimatePresence } from "motion/react";
import MovieInfoModal from "@/components/modals/MovieInfoModal";

interface Props {
  children: React.ReactNode;
}

function ModalProvider({ children }: Props) {
  const { isModalOpen, modalKey } = useGlobalContext();
  return (
    <>
      <AnimatePresence>
        {isModalOpen && modalKey === "add-movie" && (
          <ModalMovies key={"add-movie"} />
        )}
        {isModalOpen && modalKey === "movie-info" && (
          <MovieInfoModal key={"movie-info"} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

export default ModalProvider;
