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
import { Blog } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

const BlogPage = ({ blogs, filters }: { blogs: Blog[]; filters: string[] }) => {
  const searchParams = useSearchParams();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const category = searchParams.get("category");
  const router = useRouter();

  const removeCategoryParam = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  console.log(search);

  return (
    <Container className="pb-10 sm:pb-10">
      <BlurFade className="px-3 sm:px-5" key="blog-page" yOffset={0}>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" label="Homepage" />
          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                className="h-max w-[125px] sm:w-[150px] bg-white dark:bg-primary/10 sm:text-base text-sm pl-8 peer sm:focus:w-[300px] transition-all duration-200 ease-in-out"
                placeholder="Search..."
                onFocus={() => {
                  setToggleFilter(false);
                  setSelectedFilters([]);
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out peer-focus:opacity-100"
              />
            </div>
            <button
              className="items-center gap-2"
              onClick={() => {
                if (toggleFilter) {
                  setSelectedFilters([]);
                  setToggleFilter((prev) => !prev);
                } else {
                  setToggleFilter((prev) => !prev);
                }
              }}
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
                removeParams={removeCategoryParam}
              />
            </BlurFade>
          )}
          {/* Category Filter */}
          {category && selectedFilters.length === 0 && (
            <motion.section layout>
              <BlurFade id="category-posts">
                <div className="space-y-3">
                  <Heading>{category}</Heading>
                  <div className="columns-1 sm:columns-2 lg:columns-3">
                    {blogs
                      ?.filter((blog) =>
                        blog.categories.some(
                          (cat) => cat.toLowerCase() === category.toLowerCase()
                        )
                      )
                      ?.map((blog) => (
                        <BlurFade key={blog._id}>
                          <BlogCard blog={blog} />
                        </BlurFade>
                      ))}
                  </div>
                </div>
              </BlurFade>
            </motion.section>
          )}
          {/* Filter Results */}
          {selectedFilters?.length > 0 && (
            <section>
              <BlurFade id="filter-posts">
                <div className="space-y-3">
                  <Heading>Filter Results</Heading>
                  <div className="columns-1 sm:columns-2 lg:columns-3">
                    {blogs
                      ?.filter(
                        (blog) =>
                          !selectedFilters?.length ||
                          selectedFilters?.every((filter) =>
                            blog?.categories?.includes(filter as never)
                          )
                      )
                      .map((blog, i, filtered) =>
                        filtered.length ? (
                          <BlurFade key={blog._id}>
                            <BlogCard blog={blog} />
                          </BlurFade>
                        ) : null
                      )}

                    {blogs &&
                      !blogs.some(
                        (blog) =>
                          !selectedFilters?.length ||
                          selectedFilters.every((filter) =>
                            blog?.categories?.includes(filter as never)
                          )
                      ) && (
                        <BlurFade
                          id="empty"
                          className="col-span-full text-center text-xl font-bold text-primary/90 py-5"
                        >
                          No blogs match your selected filters.
                        </BlurFade>
                      )}
                  </div>
                </div>
              </BlurFade>
            </section>
          )}
          {/* Searrch Results */}
          {search !== null && (
            <section>
              <BlurFade id="filter-posts">
                <div className="space-y-3">
                  <Heading>Search Results</Heading>
                  <div className="columns-1 sm:columns-2 lg:columns-3">
                    {search && blogs?.length > 0 ? (
                      blogs
                        .filter((blog) =>
                          blog.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((blog) => (
                          <BlurFade
                            layout
                            key={blog?._id}
                            id={`${blog?._id}-search-result`}
                          >
                            <BlogCard
                              blog={blog}
                              key={blog._id}
                              className="mb-4"
                            />
                          </BlurFade>
                        ))
                    ) : (
                      <BlurFade
                        id="empty"
                        className="text-xl font-bold text-primary/90 py-5"
                      >
                        No blogs found.
                      </BlurFade>
                    )}
                  </div>
                </div>
              </BlurFade>
            </section>
          )}
          {/* Browse Blog Posts */}
          {blogs && (
            <section>
              <BlurFade id="blog-posts">
                <motion.div layout className="space-y-2">
                  <Heading>Browse</Heading>
                  <div className="columns-1 sm:columns-2 lg:columns-3">
                    {blogs.map((blog, idx) => (
                      <BlogCard
                        blog={blog}
                        key={idx}
                        className="mb-4"
                      />
                    ))}
                  </div>
                </motion.div>
              </BlurFade>
            </section>
          )}
        </div>
      </BlurFade>
    </Container>
  );
};

export default BlogPage;

function SearchedBlogs(search, blogs) {
  if (!blogs) return null;

  // Simple case-insensitive filter
  const filteredBlogs = search
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      )
    : blogs;

  if (search && filteredBlogs.length === 0) {
    return <div>No results found.</div>;
  }

  return filteredBlogs.map((blog) => <div key={blog.id}>{blog.title}</div>);
}
