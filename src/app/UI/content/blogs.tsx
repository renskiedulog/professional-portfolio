import { Blog } from "@/lib/types";
import BlogCard from "../blog/blog-card";
import Heading from "../global-components/heading";
import Link from "next/link";

export default async function Blogs() {
  let blogs = [];

  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-blogs`,
      {
        next: { revalidate: 86400 },
      }
    );
    blogs = await req.json();
  } catch (error) {
    console.log(error);
  }

  if (blogs?.length === 0) return null;

  return (
    <section id="blogs" className="w-full space-y-3">
      <div className="flex justify-between items-end">
        <Heading>Blogs And Case Studies</Heading>
        <Link href="/blog" className="text-sm hover:underline sm:block hidden">
          See More
        </Link>
      </div>
      <div className="gap-2 flex md:flex-col lg:flex-row sm:flex-row flex-col">
        {blogs?.length > 0 &&
          blogs.map((blog: Blog, idx: number) => {
            if (idx >= 2) return null;
            return (
              <BlogCard
                className="flex-grow flex-1"
                key={blog.title}
                blog={blog}
              />
            );
          })}
      </div>
    </section>
  );
}
