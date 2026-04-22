import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UploadResult {
  url: string;
  publicId: string;
  duration: number | null;
}

const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const { data: sig } = await axios.get<{
        signature: string;
        timestamp: number;
        cloudName: string;
        apiKey: string;
      }>("/api/upload/signature");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "netflix-clone/movies");
      formData.append("timestamp", sig.timestamp.toString());
      formData.append("api_key", sig.apiKey);
      formData.append("signature", sig.signature);
      formData.append("type", "authenticated");

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`,
        formData,
        {
          onUploadProgress: (e) => {
            if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
          },
        },
      );

      return {
        url: data.secure_url,
        publicId: data.public_id,
        duration: data.duration,
      };
    },
    onMutate: () => setProgress(0),
  });

  return { ...mutation, progress };
};

export default useUploadVideo;
