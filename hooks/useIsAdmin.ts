import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useIsAdmin = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axios.get<{ isAdmin: boolean }>("/api/me");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return data?.isAdmin ?? false;
};

export default useIsAdmin;
