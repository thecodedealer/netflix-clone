import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CreateMovieInput {
  title: string;
  description: string;
}

const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateMovieInput) => {
      const { data } = await axios.post("/api/movies", input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export default useCreateMovie;
