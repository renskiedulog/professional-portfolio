import React from "react";
import BlogPage from "./blog-page";
import { useSearchParams } from "next/navigation";

export const revalidate = 3600;

export const metadata = {
  title: "Blog | Web Portfolio",
};

const getData = async () => {
  const [blogsRes, filtersRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-blogs`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-filters`, {
      cache: "no-store",
    }),
  ]);

  if (!blogsRes.ok || !filtersRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const [blogs, filters] = await Promise.all([
    blogsRes.json(),
    filtersRes.json(),
  ]);

  return { blogs, filters };
};

const Page = async () => {
  const { blogs, filters } = await getData();
  return <BlogPage blogs={blogs} filters={filters} />;
};

export default Page;
