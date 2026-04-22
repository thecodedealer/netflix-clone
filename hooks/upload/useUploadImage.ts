import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface UploadRes {
  url: string;
  publicId: string;
}

const useUploadImage = () => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/image", formData, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      return data as UploadRes;
    },

    onMutate: () => setProgress(0),
  });

  return { ...mutation, progress };
};

export default useUploadImage;
