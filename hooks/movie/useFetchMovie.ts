import { Movie } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovie = async (id: string): Promise<Movie> => {
  const { data } = await axios.get(`/api/movies/${id}`);
  return data;
};

export const useFetchMovie = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
  });
};

export default useFetchMovie;
