"use client";

import { useEffect } from "react";

export default function IncrementView({ slug }: { slug: string }) {
  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        const response = await fetch("/api/increment-view", {
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

    incrementViewCount();
  }, [slug]);

  return null;
}
