import { useProfileContext } from "@/context/profileContext";
import { useQuery } from "@tanstack/react-query";
import { fetchMyListMovies, myListQueryKey } from "./useFetchMyList";
import { Movie } from "@/types/types";

const useFetchMyListMovies = () => {
  const { activeProfileId } = useProfileContext();

  return useQuery<Movie[]>({
    queryKey: myListQueryKey(activeProfileId ?? ""),
    queryFn: () => fetchMyListMovies(activeProfileId!),
    enabled: !!activeProfileId,
  });
};

export default useFetchMyListMovies;
