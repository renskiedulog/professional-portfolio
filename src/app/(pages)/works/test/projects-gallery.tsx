"use client";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import CursorFollower from "@/app/UI/animation-wrappers/cursor-follower";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts that are looking for the updated, and streamline animes to date. Crafted with great insight about speed and aesthetics, and served with an external server of the all time anime provider, gogoanime.",
    image: "/projects/animesensei.webp",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/renskiedulog/AnimeSenseiPro",
    stacks: ["Next.js", "Typescript", "Tailwind CSS", "Consumet API", "Axios"],
  },
  {
    title: "MangaSensei",
    description:
      "Using mangadex's api service, mangasensei offers the best and updated manga in your page at an optimal speed enough to engross and immerse you in your favorite stories, while also looking clean and aesthetically pleasing, suited for reading.",
    image: "/projects/mangasensei.webp",
    githubLink: "https://github.com/renskiedulog/MangaSenseiPro",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    stacks: [
      "NextJS",
      "Typescript",
      "Tailwind CSS",
      "Shadcn UI",
      "Axios",
      "Mangadex API",
    ],
    // liveUrl: "https://manga-sensei-pro.vercel.app",
  },
  {
    title: "Portfolio",
    description:
      "A customizable portfolio using Sanity and Next JS, aiming to create a site to centralize my efforts and dedication on the field, while also documenting my journey.",
    image: "/projects/portfolio.webp",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    stacks: [
      "NextJS",
      "Typescript",
      "Tailwind CSS",
      "Sanity",
      "Shadcn UI",
      "Framer Motion",
    ],
    liveUrl: "https://renato-dulog.is-a.dev/",
  },
  {
    title: "Quenique: Queueing Management System For Boats",
    description:
      "Our capstone project on the category of transportation, aiming to help unorganized ports on controlling the fairness and access to pumpboats. Easy and accessible and can be both deployed or used in a local machine, interactive and intuitive UI and Statistics chart for the business side.",
    image: "/projects/capstone.webp",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/renskiedulog/capstone",
    stacks: ["NextJS", "Typescript", "Tailwind CSS", "Mongo DB", "Shadcn UI"],
  },
];

const ProjectsGallery = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          <div className="flex items-center gap-2">
            <p className="text-xs">Consider following me on</p>
            <Link href="https://github.com/renskiedulog" target="_blank">
              <Badge className="flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5">
                <FaGithub size={15} />
                <span>Github</span>
              </Badge>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-1">
            <Heading className="w-full text-center text-3xl md:text-4xl">
              Personal Projects
            </Heading>
            <p>
              Browse a variety of projects I’ve worked on, covering different
              goals, features, and use cases. Each one shows how I approach
              development and solve problems through code.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 relative mt-10">
            {projects?.length > 0 &&
              projects?.map((project, index) => (
                <motion.div
                  key={`${project?.title}-${index}`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="w-full aspect-square relative border-primary border rounded group flex-col justify-center items-center overflow-hidden flex"
                >
                  {project?.image && (
                    <Image
                      src={project?.image}
                      width={400}
                      height={400}
                      alt={project?.title}
                      className="absolute inset-0 w-full h-full object-cover rounded group-hover:brightness-[0.3] transition-all ease-in-out duration-300"
                    />
                  )}
                  {project?.title && (
                    <div className="transition-all ease-in-out duration-300 opacity-0 hidden group-hover:block group-hover:opacity-100 text-white z-50 font-semibold text-xl p-2 text-center">
                      <p className="mb-2">{project?.title}</p>
                      <Link
                        href="#"
                        className="transition ease-in-out duration-300 border background-transparent p-2 text-sm font-extralight hover:bg-white hover:border-primary hover:text-primary"
                      >
                        MORE INFO
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default ProjectsGallery;
