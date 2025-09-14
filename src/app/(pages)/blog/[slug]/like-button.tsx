"use client";
import { useStorage } from "@/app/UI/global-components/storage-provider";
import { Badge } from "@/components/ui/badge";
import { Heart, ThumbsUp } from "lucide-react";
import React, { useState } from "react";

const buttonState = {
  unliked:
    "bg-transparent text-primary border-primary hover:bg-primary hover:text-secondary",
  liked: "bg-blue-500 text-secondary border-blue-500 hover:bg-blue-400",
};

const LikeButton = ({
  slug,
  likeCount,
}: {
  slug: string;
  likeCount: number;
}) => {
  const { setItem, getItem } = useStorage();
  const likedBlogs: string[] | null = getItem("likedBlogs") || [];
  const [renderedCount, setRenderedCount] = useState(likeCount ?? 0);
  const [liked, setLiked] = useState<"unliked" | "liked">(
    likedBlogs?.includes(slug) ? "liked" : "unliked"
  );

  const incrementLikeCount = async () => {
    try {
      const response = await fetch("/api/increment-like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to increment view count");
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const handleLike = () => {
    if (liked === "liked") return;
    // If blog is already liked by user - postpone
    if (likedBlogs && likedBlogs?.includes(slug)) {
      return;
    }
    likedBlogs?.push(slug);
    setItem("likedBlogs", likedBlogs);
    setLiked("liked");
    setRenderedCount((prev) => prev + 1);
    incrementLikeCount();
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs">
        {liked === "liked" ? "Thanks!" : "Leave A Like"}
      </p>
      <Badge
        onClick={handleLike}
        className={`flex items-center gap-1.5 px-3 dark:text-white sm:px-4 py-1 sm:py-1.5 ${buttonState[liked]} ${liked === "liked" ? "cursor-auto" : "cursor-pointer"}`}
      >
        <ThumbsUp size={15} />
        <span>{renderedCount}</span>
      </Badge>
    </div>
  );
};

export default LikeButton;
