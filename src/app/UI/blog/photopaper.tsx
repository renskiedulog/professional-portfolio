import { cn } from "@/lib/utils";
import Image from "next/image";

const PhotoPaper = ({
  src,
  alt,
  size,
  className,
}: {
  src: string;
  alt?: string;
  size?: { width: number; height: number };
  className?: string;
}) => {
  return (
    <div className="relative p-2 bg-white shadow-xl rounded-md border border-gray-300 rotate-[-4deg] w-fit">
      <Image
        src={src}
        alt={alt || "Photograph"}
        width={size?.width ?? 1000}
        height={size?.height ?? 1000}
        quality={100}
        loading="lazy"
        className={cn(className, "rounded-md")}
      />
    </div>
  );
};

export default PhotoPaper;
