import { useProfileContext } from "@/context/profileContext";
import { Movie } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const myListQueryKey = (profileId: string) =>
  ["my-list", profileId] as const;

export const fetchMyListMovies = async (
  profileId: string,
): Promise<Movie[]> => {
  const { data } = await axios.get<Movie[]>(
    `/api/my-list?profileId=${profileId}`,
  );
  return data;
};

const useFetchMyList = () => {
  const { activeProfileId } = useProfileContext();

  return useQuery({
    queryKey: myListQueryKey(activeProfileId ?? ""),
    queryFn: () => fetchMyListMovies(activeProfileId!),
    enabled: !!activeProfileId,
    select: (movies) => movies.map((m) => m.id),
  });
};

export default useFetchMyList;
