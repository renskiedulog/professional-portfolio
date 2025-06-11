import React from "react";
import BlogPage from "./blog-page";

export const revalidate = 3600;

export const metadata = {
  title: "Blog",
};

const getData = async () => {
  const [blogsReq, filtersReq] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-blogs`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-filters`, {
      cache: "no-store",
    }),
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
  return <BlogPage blogs={blogs} filters={filters} />;
};

export default Page;
