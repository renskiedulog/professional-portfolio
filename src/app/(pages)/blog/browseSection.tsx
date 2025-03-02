import React from "react";
import { motion } from "framer-motion";
import Heading from "@/app/UI/global-components/heading";

import BlogCardSkeleton from "@/app/UI/blog/blog-card-skeleton";
import BlogCard from "@/app/UI/blog/blog-card";
import { Blog } from "@/lib/types";
import BlurFade from "@/app/UI/animation-wrappers/fade";

const BrowseSection = ({
  loading,
  blogs,
}: {
  loading: boolean;
  blogs: Blog[];
}) => {
  return (
    <section>
      {!loading && (
        <BlurFade>
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
    </section>
  );
};

export default BrowseSection;
