import BlogCard from "@/app/UI/blog/blog-card";
import Container from "@/app/UI/global-components/container";
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
    <section className="flex justify-between mt-10">
      {prevAndNext?.previousBlog ? (
        <div className="flex flex-col gap-2 max-w-xs">
          <Heading>Previous</Heading>
          <Link href={`/blog/${prevAndNext?.previousBlog?.slug}`} className="hover:text-blue-500">
            {prevAndNext?.previousBlog?.title}
          </Link>
        </div>
      ) : null}
      {prevAndNext?.nextBlog !== null ? (
        <div className="flex flex-col gap-2 max-w-xs text-right">
          <Heading>Next</Heading>
          <Link href={`/blog/${prevAndNext?.nextBlog?.slug}`} className="hover:text-blue-500">
            {prevAndNext?.nextBlog?.title}
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default BottomSection;
