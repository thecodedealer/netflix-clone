"use server";
import cloudinary from "@/lib/cloudinary";

export async function getSignedThumbnailUrl(
  cloudinaryId: string,
): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour

  return cloudinary.url(cloudinaryId, {
    resource_type: "video",
    type: "authenticated",
    sign_url: true,
    expires_at: expiresAt,
    raw_transformation: "w_400,h_225,so_50p",
    format: "jpg",
  });
}
