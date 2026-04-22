import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string): Promise<void> => {
      await axios.delete(`/api/profiles/${profileId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export default useDeleteProfile;
