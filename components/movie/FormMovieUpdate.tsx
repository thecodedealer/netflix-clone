import { Movie, MovieUpdateData } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Field,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldDescription,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import FileDropzone from "./FileDropzone";
import { Film, ImageIcon, Upload } from "lucide-react";
import useUploadImage from "@/hooks/upload/useUploadImage";
import useUploadVideo from "@/hooks/upload/useUploadVideo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RATINGS } from "@/lib/constants";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { getSignedThumbnailUrl } from "@/app/actions/thumbnail";

interface Prop {
  handleSubmit: (data: MovieUpdateData) => void;
  movie?: Movie;
}

function FormMovieUpdate({ handleSubmit, movie }: Prop) {
  const {
    mutateAsync: uploadImage,
    isPending: isUploadingImage,
    progress: imageProgress,
  } = useUploadImage();

  const {
    mutateAsync: uploadVideo,
    isPending: isUploadingVideo,
    progress: videoProgress,
  } = useUploadVideo();

  const [title, setTitle] = useState(movie?.title ?? "");
  const [description, setDescription] = useState(movie?.description ?? "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(
    movie?.thumbnailUrl ?? null,
  );
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(
    movie?.videoUrl ?? null,
  );
  const [currentCloudinaryId, setCurrentCloudinaryId] = useState<string | null>(
    movie?.cloudinaryId ?? null,
  );

  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [rating, setRating] = useState(movie?.maturityRating ?? "");
  const [isFeatured, setIsFeatured] = useState(movie?.isFeatured ?? false);
  const [isTrending, setIsTrending] = useState(movie?.isTrending ?? false);
  //   const [selectedGenres, setSelectedGenres] = useState<string[]>(
  //     movie?.genres?.map((g) => g.genreId) ?? [],
  //   );
  const [releaseYear, setReleaseYear] = useState(
    movie?.releaseYear?.toString() ?? "",
  );

  useEffect(() => {
    if (!currentCloudinaryId) return;

    getSignedThumbnailUrl(currentCloudinaryId).then(setVideoPreviewUrl);
  }, [currentCloudinaryId]);

  const handleThumbnailDrop = async (file: File | null) => {
    setThumbnailFile(file);
    if (!file) return;

    const { url } = await uploadImage(file);
    setCurrentThumbnailUrl(url);
    handleSubmit({ thumbnailUrl: url });
  };

  const handleVideoDrop = async (file: File | null) => {
    setVideoFile(file);
    if (!file) return;
    const { url, publicId, duration } = await uploadVideo(file);
    setCurrentVideoUrl(url);
    setCurrentCloudinaryId(publicId);
    handleSubmit({ videoUrl: url, cloudinaryId: publicId, duration });
  };

  const getVideoMidFrame = (url: string) =>
    url
      .replace("/video/upload/", "/video/upload/so_50p/")
      .replace(/\.(mp4|mov|avi|mkv|webm)$/i, ".jpg");

  const videoPreviewSrc = currentCloudinaryId
    ? videoPreviewUrl
    : currentVideoUrl
      ? getVideoMidFrame(currentVideoUrl)
      : null;

  const currentYear = new Date().getFullYear();

  console.log(movie);

  return (
    <div className="max-w-2xl py-6 w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6 text-center w-full">
        Update Movie
      </h1>
      <form
        className="p-6 rounded-lg shadow-md"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            title,
            description,
            rating,
            isFeatured,
            isTrending,
            releaseYear,
          });
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Enter a brief description of the movie"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </Field>

          <Field>
            <FieldContent>
              <FieldLabel>Thumbnail Image</FieldLabel>
              <FieldDescription>
                Upload a thumbnail image (JPG, PNG, WebP)
              </FieldDescription>

              <div
                className={currentThumbnailUrl ? "grid grid-cols-2 gap-4" : ""}
              >
                <FileDropzone
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                    "image/webp": [],
                  }}
                  label="Upload Thumbnail"
                  icon={<ImageIcon className="h-6 w-6 text-muted-foreground" />}
                  file={thumbnailFile}
                  onFileSelect={handleThumbnailDrop}
                  isUploading={isUploadingImage}
                  progress={imageProgress}
                />

                {currentThumbnailUrl && (
                  <div className="overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={currentThumbnailUrl}
                      alt="Current Thumbnail"
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </FieldContent>
          </Field>

          <Field>
            <FieldContent>
              <FieldLabel>Video File</FieldLabel>
              <FieldDescription>
                Upload the video file (MP4, MOV, AVI, MKV)
              </FieldDescription>
              <div className={videoPreviewSrc ? "grid grid-cols-2 gap-4" : ""}>
                <FileDropzone
                  accept={{
                    "video/mp4": [],
                    "video/quicktime": [],
                    "video/x-msvideo": [],
                    "video/x-matroska": [],
                  }}
                  label="Upload Video"
                  icon={<Film className="h-6 w-6 text-muted-foreground" />}
                  file={videoFile}
                  onFileSelect={handleVideoDrop}
                  isUploading={isUploadingVideo}
                  progress={videoProgress}
                />

                {videoPreviewSrc && (
                  <div className="overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={videoPreviewSrc}
                      alt="Video preview"
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </FieldContent>
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="rating">Rating</FieldLabel>
              <Select value={rating} onValueChange={setRating} required>
                <SelectTrigger id="rating" className="w-full">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {RATINGS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="releaseYear">Release Year</FieldLabel>
              <Input
                id="releaseYear"
                type="number"
                placeholder="e.g. 2024"
                min={1900}
                max={currentYear + 5}
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                required
              />
            </Field>
          </div>

          <Field orientation="horizontal">
            <Switch
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
            <FieldContent>
              <FieldLabel htmlFor="isFeatured">Featured Content</FieldLabel>
              <FieldDescription>
                Display this content prominently on the homepage
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field orientation="horizontal">
            <Switch
              id="isTrending"
              checked={isTrending}
              onCheckedChange={setIsTrending}
            />
            <FieldContent>
              <FieldLabel htmlFor="isTrending">Trending</FieldLabel>
              <FieldDescription>
                Show this content in the trending row
              </FieldDescription>
            </FieldContent>
          </Field>

          <Button type="submit" size="lg" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Update Movie
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default FormMovieUpdate;
