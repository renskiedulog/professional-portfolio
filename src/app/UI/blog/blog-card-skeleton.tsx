import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <article className="border rounded-md overflow-hidden shadow-sm bg-background h-max animate-pulse">
      <div className="w-full aspect-video bg-muted" />
      <div className="px-3.5 py-3.5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <div className="mt-2 flex gap-1 flex-wrap">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-5 w-12 rounded" />
          ))}
        </div>
        <div className="mt-2 border-t border-muted pt-2 flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;
