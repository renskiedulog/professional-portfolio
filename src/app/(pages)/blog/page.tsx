"use client";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IoGridOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import BlogCard from "./blog-card";
import { useStorage } from "@/app/UI/global-components/storage-provider";

const blogs = [
  {
    image: "/projects/portfolio.webp",
    title: "Mastering React: A Complete Guide",
    description:
      "Learn everything about React, from the basics to advanced concepts, and become a proficient developer.",
    date: "2025-01-01",
    author: "John Doe",
    categories: ["React", "JavaScript", "Web Development"],
    link: "https://example.com/react-guide",
  },
  {
    image: "/projects/portfolio.webp",
    title: "Top 10 Tips for Next.js Developers",
    description:
      "Enhance your Next.js projects with these practical tips and best practices for optimized performance and scalability.",
    date: "2025-01-15",
    author: "Alice Johnson",
    categories: ["Next.js", "Web Development", "Performance"],
    link: "https://example.com/nextjs-tips",
  },
  {
    image: "/projects/portfolio.webp",
    title: "CSS Tricks You Should Know",
    description:
      "A collection of useful CSS tricks and techniques to elevate your web design skills.",
    date: "2025-01-20",
    author: "Michael Brown",
    categories: ["CSS", "Design", "Frontend"],
    link: "https://example.com/css-tricks",
  },
];

const page = () => {
  const { getItem, setItem } = useStorage();
  const [layout, setLayout] = useState("grid");

  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
    setItem("blog_orientation", layout === "grid" ? "list" : "grid");
  };

  useEffect(() => {
    const initLayout = getItem("blog_orientation");
    setLayout((initLayout as string) ?? "grid");
  }, []);

  return (
    <Container>
      <BlurFade className="px-3 sm:px-5">
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                className="h-max w-[120px] sm:w-[150px] bg-white dark:bg-primary/10 sm:text-base text-sm pl-8 peer focus:w-[250px] sm:focus:w-[300px] transition-all duration-200 ease-in-out"
                placeholder="Search..."
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out peer-focus:opacity-100"
              />
            </div>
            {layout === "grid" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleLayout();
                }}
              >
                <BlurFade key="grid" duration={0.1} yOffset={0}>
                  <IoGridOutline
                    size={20}
                    className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                </BlurFade>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleLayout();
                }}
              >
                <BlurFade key="list" duration={0.1} yOffset={0}>
                  <List
                    size={20}
                    className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                </BlurFade>
              </button>
            )}
          </div>
        </div>
        <BlurFade key={layout}>
          <div
            className={`${layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"} gap-5 py-5`}
          >
            {blogs.map((blog, idx) => (
              <BlogCard blog={blog} key={idx} />
            ))}
          </div>
        </BlurFade>
      </BlurFade>
    </Container>
  );
};

export default page;
