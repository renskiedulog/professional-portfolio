"use client";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IoGridOutline } from "react-icons/io5";
import { useState } from "react";

const page = () => {
  const [layout, setLayout] = useState("grid");

  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <Container>
      <BlurFade>
        <div className="w-full flex justify-between px-3 sm:px-5">
          <BackButton href="/" />
          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                className="h-max w-[150px] bg-white dark:bg-primary/10 sm:text-base text-sm pl-8 peer focus:w-[250px] sm:focus:w-[300px] transition-all duration-200 ease-in-out"
                placeholder="Search..."
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out peer-focus:opacity-100"
              />
            </div>
            {layout === "grid" ? (
              <BlurFade key="grid" duration={0.1} yOffset={0}>
                <IoGridOutline
                  size={20}
                  className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  onClick={toggleLayout}
                />
              </BlurFade>
            ) : (
              <BlurFade key="list" duration={0.1} yOffset={0}>
                <List
                  size={20}
                  className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  onClick={toggleLayout}
                />
              </BlurFade>
            )}
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
