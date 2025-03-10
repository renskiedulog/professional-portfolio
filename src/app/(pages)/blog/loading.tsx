"use client";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Heading from "@/app/UI/global-components/heading";
import BlogCardSkeleton from "@/app/UI/blog/blog-card-skeleton";

const loading = () => {
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
                disabled
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50"
              />
            </div>
            <Filter size={20} className="opacity-50" />
          </div>
        </div>
        <motion.div layout className="space-y-2 mt-10">
          <Heading>Browse</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: 6 }, (_, idx) => (
              <BlogCardSkeleton key={idx} />
            ))}
          </div>
        </motion.div>
      </BlurFade>
    </Container>
  );
};

export default loading;
