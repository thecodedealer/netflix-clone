import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Film, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  accept: Record<string, string[]>;
  label: string;
  icon: React.ReactNode;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  isUploading?: boolean;
  progress?: number;
}

function FileDropzone({
  accept,
  label,
  icon,
  file,
  onFileSelect,
  isUploading,
  progress,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple: false,
    onDrop: (accepted) => accepted[0] && onFileSelect(accepted[0]),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex min-h-[180px] flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        file && "border-solid border-primary/50 bg-primary/5",
      )}
    >
      <input {...getInputProps()} disabled={isUploading} />

      {isUploading ? (
        <div className="flex flex-col items-center gap-3 p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Uploading…</p>
          {progress !== undefined && (
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      ) : file ? (
        <div className="flex w-full flex-col items-center gap-3 p-4">
          {preview ? (
            <div className="relative h-24 w-40 overflow-hidden rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Film className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="max-w-[200px] truncate text-sm font-medium">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect(null);
            }}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex cursor-pointer flex-col items-center gap-3 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            {icon}
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">
              Drag and drop or click to browse
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileDropzone;
