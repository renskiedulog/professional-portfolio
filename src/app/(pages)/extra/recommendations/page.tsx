import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
          <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
            Powered By
            <Link
              className="hover:text-black"
              href="https://jikan.moe/"
              target="_blank"
            >
              Jikan API
            </Link>
          </div>
        </div>
        {/* Heading */}
        <div>
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
            <Heading as="h1" className="text-3xl md:text-3xl sm:px-0 px-5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 gap-5">
          <Link
            href="/extra/recommendations/anime"
            className="w-full aspect-[1/0.5] sm:aspect-square bg-white/20 rounded-lg relative overflow-hidden flex flex-col justify-end items-center p-5 group"
          >
            <Image
              src="/anime.jpg"
              width={500}
              height={500}
              loading="eager"
              alt="anime-img"
              className="absolute bottom-0 left-0 w-full h-full object-cover brightness-75 group-hover:brightness-100"
            />
            <p className="text-3xl font-black text-white z-20 group-hover:translate-y-0 translate-y-[500px] transition-all ease-in-out">
              Anime
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/70 group-hover:translate-y-0 translate-y-full transition-all ease-in-out" />
          </Link>

          <Link
            href="/extra/recommendations/manga"
            className="w-full aspect-[1/0.5] sm:aspect-square bg-white/20 rounded-lg relative overflow-hidden flex flex-col justify-end items-center p-5 group"
          >
            <Image
              src="/manga.jpg"
              width={500}
              height={500}
              loading="eager"
              alt="manga-img"
              className="absolute bottom-0 left-0 w-full h-full object-cover brightness-75 group-hover:brightness-100"
            />
            <p className="text-3xl font-black text-white z-20 group-hover:translate-y-0 translate-y-[500px] transition-all ease-in-out">
              Manga
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/70 group-hover:translate-y-0 translate-y-full transition-all ease-in-out" />
          </Link>

          <Link
            href="/extra/recommendations/manhwa"
            className="w-full aspect-[1/0.5] sm:aspect-square bg-white/20 rounded-lg relative overflow-hidden flex flex-col justify-end items-center p-5 group"
          >
            <Image
              src="/manhwa.jpg"
              width={500}
              height={500}
              loading="eager"
              alt="manhwa-img"
              className="absolute bottom-0 left-0 w-full h-full object-cover brightness-75 group-hover:brightness-100"
            />
            <p className="text-3xl font-black text-white z-20 group-hover:translate-y-0 translate-y-[500px] transition-all ease-in-out">
              Manhwa
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/70 group-hover:translate-y-0 translate-y-full transition-all ease-in-out" />
          </Link>

          <Link
            href="/extra/recommendations/movie"
            className="w-full aspect-[1/0.5] sm:aspect-square bg-white/20 rounded-lg relative overflow-hidden flex flex-col justify-end items-center p-5 group"
          >
            <Image
              src="/movies.avif"
              width={500}
              height={500}
              loading="eager"
              alt="movie-img"
              className="absolute bottom-0 left-0 w-full h-full object-cover brightness-75 group-hover:brightness-100"
            />
            <p className="text-3xl font-black text-white z-20 group-hover:translate-y-0 translate-y-[500px] transition-all ease-in-out">
              Movie
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/70 group-hover:translate-y-0 translate-y-full transition-all ease-in-out" />
          </Link>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
