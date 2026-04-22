import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movied: string) => {
      await axios.delete(`/api/movies/${movied}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};

export default useDeleteMovie;
