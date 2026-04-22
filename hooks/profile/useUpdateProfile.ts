import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Profile } from "@/types/types";

interface UpdateProfileInput {
  id: string;
  name?: string;
  avatar?: string;
  isKids?: boolean;
}

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...fields
    }: UpdateProfileInput): Promise<Profile> => {
      const { data } = await axios.patch(`/api/profiles/${id}`, fields);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export default useUpdateProfile;
