import React from "react";
import { Suspense } from "react";
import BlogPage, { BlogPageWithParams } from "./blog-page";
import { pageMetadata } from "@/lib/site";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Articles by Renato Dulog on web development, React, Next.js, TypeScript, AI in programming, and life as a developer.",
  path: "/blog",
});

const getData = async () => {
  const [blogsReq, filtersReq] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-blogs`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-filters`),
  ]);

  if (!blogsReq.ok || !filtersReq.ok) {
    throw new Error("Failed to fetch data");
  }

  const [blogs, filters] = await Promise.all([
    blogsReq.json(),
    filtersReq.json(),
  ]);

  return { blogs, filters };
};

const Page = async () => {
  const { blogs, filters } = await getData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Renato Dulog – Blog",
            url: "https://renato-dulog.is-a.dev/blog",
            description:
              "Articles on web development, React, Next.js, TypeScript, and software engineering by Renato Dulog.",
            author: {
              "@type": "Person",
              name: "Renato Dulog",
              url: "https://renato-dulog.is-a.dev/",
            },
          }),
        }}
      />
      <h1 className="sr-only">Blog by Renato Dulog</h1>
      <Suspense
        fallback={<BlogPage blogs={blogs} filters={filters} category={null} />}
      >
        <BlogPageWithParams blogs={blogs} filters={filters} />
      </Suspense>
    </>
  );
};

export default Page;
