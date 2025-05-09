import { Blog } from "@/lib/types";
import BlogCard from "../blog/blog-card";
import Heading from "../global-components/heading";

export default async function Blogs() {
  const blogsReq = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-blogs`,
    {
      cache: "no-store",
    }
  );
  const blogs = await blogsReq.json();

  return (
    <section id="blogs" className="w-full space-y-3">
      <Heading>Blogs And Case Studies</Heading>
      <div className="gap-2 flex sm:flex-row flex-col">
        {blogs.map((blog: Blog, idx: number) => {
          if (idx > 2) return null;
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
