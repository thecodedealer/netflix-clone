import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const GET = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const paramsToSign = {
    folder: "netflix-clone/movies",
    timestamp,
    type: "authenticated",
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
};
