"use client";
import { useEffect } from "react";

export default function IncrementView({ slug }: { slug: string }) {
  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        const response = await fetch(`/api/increment-view?slug=${slug}`);

        if (!response.ok) {
          throw new Error("Failed to increment view count");
        }
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    incrementViewCount();
  }, [slug]);

  return null;
}
