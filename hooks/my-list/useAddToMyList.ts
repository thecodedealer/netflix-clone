import { useProfileContext } from "@/context/profileContext";
import { Movie } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { myListQueryKey } from "./useFetchMyList";

const useAddToMyList = () => {
  const queryClient = useQueryClient();
  const { activeProfileId } = useProfileContext();

  return useMutation({
    mutationFn: async (movie: Movie) => {
      await axios.post("/api/my-list", {
        profileId: activeProfileId,
        movieId: movie.id,
      });
    },
    onMutate: async (movie: Movie) => {
      const key = myListQueryKey(activeProfileId ?? "");
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Movie[]>(key);
      queryClient.setQueryData<Movie[]>(key, (old = []) => [...old, movie]);

      return { previous };
    },
    onError: (_err, _movie, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData<Movie[]>(
          myListQueryKey(activeProfileId ?? ""),
          context.previous,
        );
      }
    },
    onSettled: () => {
      const key = myListQueryKey(activeProfileId ?? "");
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export default useAddToMyList;
