import { cn } from "@/lib/utils";
import Image from "next/image";

const PhotoPaper = ({
  src,
  alt,
  size,
  className,
  wrapperClassName,
}: {
  src: string;
  alt?: string;
  size?: { width: number; height: number };
  className?: string;
  wrapperClassName?: string;
}) => {
  return (
    <div
      className={cn(
        wrapperClassName,
        "relative p-2 bg-white dark:bg-white/80 dark:shadow-primary/20 rounded-md border border-gray-300 w-fit"
      )}
    >
      <Image
        src={src}
        alt={alt || "Photograph"}
        width={size?.width ?? 500}
        height={size?.height ?? 500}
        loading="lazy"
        className={cn(className, "rounded-md")}
      />
    </div>
  );
};

export default PhotoPaper;
