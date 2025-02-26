import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { format } from "date-fns";

interface Blog {
  mainImage: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  categories: {
    title: string;
  }[];
  slug: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <article className="border rounded-md overflow-hidden shadow-sm bg-background h-max">
      <Image
        className="aspect-video object-cover"
        src={blog?.mainImage ?? "/placeholder.png"}
        width={800}
        height={800}
        alt={blog?.title}
      />
      <div className="px-3.5 py-3.5">
        <h3 className="font-bold text-lg leading-tight">{blog?.title}</h3>
        <p className="font-medium text-sm mt-2">
          {blog?.description?.length > 150
            ? `${blog?.description?.substring(0, 150)}...`
            : blog?.description}
        </p>
        <div className="mt-2 flex gap-1 flex-wrap">
          {blog?.categories?.map((category, index) => (
            <span
              key={index}
              className="bg-primary-foreground dark:bg-white/20 text-primary text-[11px] py-0.5 px-1.5 border border-opacity-10 rounded text-nowrap font-semibold"
            >
              {category?.title}
            </span>
          ))}
        </div>
        <Separator className="mt-2" />
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xs text-muted-foreground mt-1">
            {format(new Date(blog?.publishedAt), "MMM dd, yyyy")}
          </p>
          <Link href={`/blog/${blog?.slug}`}>
            <Button className="text-xs" variant="default" size="sm">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
