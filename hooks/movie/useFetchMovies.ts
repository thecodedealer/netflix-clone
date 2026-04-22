import { Movie } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovies = async (): Promise<Movie[]> => {
  const { data } = await axios.get("/api/movies");
  return data;
};

const useFetchMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};

export default useFetchMovies;
