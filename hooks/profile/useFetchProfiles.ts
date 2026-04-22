import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Profile } from "@/types/types";

const fetchProfiles = async (): Promise<Profile[]> => {
  const { data } = await axios.get("/api/profiles");
  return data;
};

const useFetchProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
  });
};

export default useFetchProfiles;
