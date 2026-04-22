"use client";
import React from "react";
import FormMovieUpdate from "@/components/movie/FormMovieUpdate";
import useUpdateMovie from "@/hooks/movie/useUpdateMovie";
import useFetchMovie from "@/hooks/movie/useFetchMovie";
import { MovieUpdateData } from "@/types/types";

interface Props {
  params: Promise<{ movieId: string }>;
}

function Page({ params }: Props) {
  const { movieId } = React.use(params);
  const { mutate: updateMovie } = useUpdateMovie();
  const { data: movie, isLoading } = useFetchMovie(movieId);

  const handleMovieUpdate = (data: MovieUpdateData) => {
    const { releaseYear, rating, ...rest } = data;

    updateMovie({
      id: movieId,
      ...rest,
      ...(releaseYear !== undefined && { releaseYear: Number(releaseYear) }),
      ...(rating !== undefined && { maturityRating: rating }),
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <FormMovieUpdate handleSubmit={handleMovieUpdate} movie={movie} />
    </div>
  );
}

export default Page;
