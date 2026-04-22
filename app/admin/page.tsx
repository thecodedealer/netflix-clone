"use client";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/globalContext";
import useDeleteMovie from "@/hooks/movie/useDeleteMovie";
import useFetchMovies from "@/hooks/movie/useFetchMovies";
import { Film, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const { openModal } = useGlobalContext();
  const { data: movies, isLoading } = useFetchMovies();
  const { mutate: deleteMovie } = useDeleteMovie();

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="px-8 pt-10 pb-7 border-b border-white/5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#e50914] mb-2">
              Content Library
            </p>
            <h1 className="text-[1.75rem] font-bold text-white tracking-tight leading-none">
              Movies
            </h1>
            <p className="mt-2 text-sm text-white/35 tabular-nums">
              {isLoading ? (
                <span className="inline-block w-16 h-3 bg-white/10 rounded-sm animate-pulse" />
              ) : (
                `${movies?.length ?? 0} title${(movies?.length ?? 0) !== 1 ? "s" : ""}`
              )}
            </p>
          </div>

          <Button
            variant="brand-primary"
            className="h-9 px-5 text-sm font-semibold"
            onClick={() => openModal("add-movie")}
          >
            <Plus className="mr-2" /> Add Movie
          </Button>
        </div>
      </div>

      {movies?.length === 0 && (
        <div className="px-8 py-6">
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Film className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-white/50 text-sm font-medium">No movies yet</p>
            <p className="text-white/25 text-xs mt-1">
              Add your first title to get started
            </p>
            <Button
              variant="brand-primary"
              className="h-9 mt-6 px-5 text-sm font-semibold"
              onClick={() => openModal("add-movie")}
            >
              <Plus className="mr-2" /> Add Movie
            </Button>
          </div>
        </div>
      )}

      <div className="px-8 py-6">
        {movies && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {movies.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="group relative cursor-pointer rounded-sm overflow-hidden bg-[#1c1c1c] aspect-video"
                  onClick={() => router.push(`/admin/movies/${movie.id}`)}
                >
                  {movie.thumbnailUrl ? (
                    <Image
                      src={movie.thumbnailUrl}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white/20 text-[11px] text-center px-3 leading-snug font-medium">
                        {movie.title}
                      </p>
                    </div>
                  )}

                  {(movie.isTrending || movie.isFeatured) && (
                    <div className="absolute group-hover:opacity-0 top-1.5 left-1.5 flex gap-1 z-10 duration-200">
                      {movie.isTrending && (
                        <span className="text-xs font-bold tracking-wider uppercase bg-[#e50914] text-white px-1.5 py-0.75 rounded-xs leading-none">
                          Trending
                        </span>
                      )}
                      {movie.isFeatured && (
                        <span className="text-xs font-bold tracking-wider uppercase bg-white/15 backdrop-blur-sm text-white px-1.5 py-0.75 rounded-xs leading-none">
                          Featured
                        </span>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 pb-2 px-2 transition-opacity duration-200 group-hover:opacity-0">
                    <p className="text-white text-sm font-medium leading-snug line-clamp-1">
                      {movie.title}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                    <div className="h-full flex flex-col justify-between">
                      <p className="mb-2 text-sm font-medium line-clamp-2">
                        {movie.title}
                      </p>

                      <div className="flex gap-1.5">
                        <Button
                          size="xs"
                          variant="secondary"
                          className="flex-1 h-7 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/movies/${movie.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          variant="destructive"
                          className="flex-1 h-7 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMovie(movie.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
