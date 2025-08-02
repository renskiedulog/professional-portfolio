import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
        </div>
        {/* Heading */}
        <div>
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
            <Heading as="h1" className="text-3xl md:text-4xl sm:px-0 px-5">
              Recommendations
            </Heading>
            <p>
              Discover my most recommended manga, manhwa, and anime. Filled with
              epic stories, and unique experience waiting to be tackled. Find
              something new to enjoy!
            </p>
          </div>
        </div>
        {/* Link Cards */}
        <div className="grid grid-cols-3 mt-10 gap-5">
          <Link
            href="/extra/recommendations/anime"
            className="w-full h-80 bg-white/20"
          >
            Anime
          </Link>
          <Link
            href="/extra/recommendations/manga"
            className="w-full h-80 bg-white/20"
          >
            Manga
          </Link>
          <Link
            href="/extra/recommendations/manhwa"
            className="w-full h-80 bg-white/20"
          >
            Manhwa
          </Link>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
