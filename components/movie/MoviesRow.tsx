import { Movie } from "@/types/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "../ui/carousel";
import MovieCard from "./MovieCard";

interface Props {
  title: string;
  movies: Movie[];
}

function CarouselPreviousConditional() {
  const { canScrollPrev } = useCarousel();
  if (!canScrollPrev) return null;
  return (
    <CarouselPrevious className="hover:scale-150 duration-200 opacity-90" />
  );
}

function CarouselNextConditional() {
  const { canScrollNext } = useCarousel();
  if (!canScrollNext) return null;
  return <CarouselNext className="hover:scale-150 duration-200 opacity-90" />;
}

function MoviesRow({ title, movies }: Props) {
  return (
    <section className="relative z-0 has-data-elevated:z-10 flex flex-col gap-2 md:gap-4">
      {movies.length > 0 && (
        <h2 className="font-semibold text-lg md:text-2xl">{title}</h2>
      )}
      <Carousel opts={{ align: "start" }} className="ml-4">
        <CarouselContent className="gap-2">
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="relative basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-0"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPreviousConditional />
        <CarouselNextConditional />
      </Carousel>
    </section>
  );
}

export default MoviesRow;
