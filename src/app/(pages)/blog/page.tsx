"use client";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { Filter, Search, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import BlogCard from "@/app/UI/blog/blog-card";
import Filters from "@/app/UI/blog/filters";
import { motion } from "framer-motion";
import Heading from "@/app/UI/global-components/heading";
import BlogCardSkeleton from "@/app/UI/blog/blog-card-skeleton";

const page = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [blogsRes, filtersRes] = await Promise.all([
          fetch("/api/get-blogs"),
          fetch("/api/get-filters"),
        ]);

        if (!blogsRes.ok || !filtersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const blogsData = await blogsRes.json();
        const filtersData = await filtersRes.json();

        setBlogs(blogsData);
        setFilters(filtersData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container>
      <BlurFade className="px-3 sm:px-5" key="blog-page" yOffset={0}>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                className="h-max w-[120px] sm:w-[150px] bg-white dark:bg-primary/10 sm:text-base text-sm pl-8 peer focus:w-[180px] sm:focus:w-[300px] transition-all duration-200 ease-in-out"
                placeholder="Search..."
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out peer-focus:opacity-100"
              />
            </div>
            <button
              className="items-center gap-2"
              onClick={() => setToggleFilter((prev) => !prev)}
            >
              {!toggleFilter ? (
                <BlurFade key="filter" duration={0.1} yOffset={0}>
                  <Filter
                    size={20}
                    className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                </BlurFade>
              ) : (
                <BlurFade key="close" duration={0.1} yOffset={0}>
                  <XIcon
                    size={20}
                    className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                </BlurFade>
              )}
            </button>
          </div>
        </div>
        <div className="pt-5 space-y-5">
          {toggleFilter && (
            <BlurFade key="filter" duration={0.3} yOffset={0}>
              <Filters
                filters={filters}
                setSelectedFilters={setSelectedFilters}
                selectedFilters={selectedFilters}
              />
            </BlurFade>
          )}
          {/* Filter Results */}
          <div>
            {selectedFilters?.length > 0 && (
              <BlurFade id="blog-posts">
                <div className="space-y-3">
                  <Heading>Filter Results</Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                    {blogs
                      ?.filter(
                        (blog) =>
                          !selectedFilters?.length ||
                          blog.categories.some((category: string) =>
                            selectedFilters.includes(category as never)
                          )
                      )
                      .map((blog) => (
                        <BlurFade key={blog._id}>
                          <BlogCard blog={blog} />
                        </BlurFade>
                      ))}
                  </div>
                </div>
              </BlurFade>
            )}
          </div>
          {/* Browse Blog Posts */}
          <div>
            {!loading && (
              <BlurFade id="blog-posts">
                <motion.div layout className="space-y-2">
                  <Heading>Browse</Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                    {blogs.map((blog, idx) => (
                      <BlogCard blog={blog} key={idx} />
                    ))}
                  </div>
                </motion.div>
              </BlurFade>
            )}
            {loading && (
              <motion.div layout className="space-y-2">
                <Heading>Browse</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                  {Array.from({ length: 6 }, (_, idx) => (
                    <BlogCardSkeleton key={idx} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
