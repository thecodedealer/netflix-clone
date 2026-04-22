import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovieByPublicId = async (publicId: string) => {
  const { data } = await axios.get(`/api/movies/public/${publicId}`);
  return data;
};

const useFetchMovieByPublicId = (publicId: string) => {
  return useQuery({
    queryKey: ["movie", "public", publicId],
    queryFn: () => fetchMovieByPublicId(publicId),
  });
};

export default useFetchMovieByPublicId;
