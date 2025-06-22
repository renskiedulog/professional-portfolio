import Heading from "@/app/UI/global-components/heading";
import { Blog } from "@/lib/types";
import Link from "next/link";
import React from "react";

const BottomSection = ({
  prevAndNext,
}: {
  prevAndNext: { previousBlog: Blog; nextBlog: Blog };
}) => {
  return (
    <section className="flex justify-between mt-5 sm:mt-10 sm:gap-0 gap-5">
      {prevAndNext?.previousBlog ? (
        <div className="flex flex-col gap-2 max-w-xs">
          <Heading className="!text-xl sm:!text-3xl">Previous</Heading>
          <Link
            aria-label={`Read previous post: ${prevAndNext?.previousBlog?.title}`}
            href={`/blog/${prevAndNext?.previousBlog?.slug}`}
            className="hover:text-blue-500 text-sm sm:text-base"
          >
            {prevAndNext?.previousBlog?.title}
          </Link>
        </div>
      ) : (
        <span></span>
      )}
      {prevAndNext?.nextBlog !== null ? (
        <div className="flex flex-col gap-2 max-w-xs text-right">
          <Heading className="!text-xl sm:!text-3xl">Next</Heading>
          <Link
            aria-label={`Read next post: ${prevAndNext?.nextBlog?.title}`}
            href={`/blog/${prevAndNext?.nextBlog?.slug}`}
            className="hover:text-blue-500 text-sm sm:text-base"
          >
            {prevAndNext?.nextBlog?.title}
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default BottomSection;
