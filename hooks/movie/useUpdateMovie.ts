import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Movie } from "@/types/types";

interface UpdateMovieData {
  id: string;
}

const updateMovie = async ({
  id,
  ...data
}: UpdateMovieData): Promise<Movie> => {
  const response = await axios.patch(`/api/movies/${id}`, data);
  return response.data;
};

const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export default useUpdateMovie;
