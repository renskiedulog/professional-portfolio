"use client";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Crown from "@/app/UI/global-components/crown";

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
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);

  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          <div className="flex items-center gap-2">
            <p className="text-xs">Consider following me on</p>
            <Link
              href="https://github.com/renskiedulog"
              target="_blank"
              aria-label="Visit My Github Profile"
            >
              <Badge className="flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5">
                <FaGithub size={15} />
                <span>Github</span>
              </Badge>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
            <Crown>Work Portfolio</Crown>
            <Heading className="w-full text-center text-3xl md:text-4xl">
              Selected Projects
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
                <Dialog key={`${project?.title}-${index}`}>
                  <DialogTrigger asChild>
                    <motion.div
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => setOpenDialogIndex(index)}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="w-full aspect-square relative border-primary border rounded group flex-col justify-center items-center overflow-hidden flex cursor-pointer"
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
                          <span className="transition ease-in-out duration-300 border background-transparent p-2 text-sm font-extralight hover:bg-white hover:border-primary hover:text-primary">
                            MORE INFO
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent
                    className="max-w-3xl w-full p-0 overflow-hidden bg-background"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    open={openDialogIndex === index}
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6 border">
                      <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
                        <div className="flex flex-col gap-2">
                          <Image
                            src={project.image}
                            width={400}
                            height={400}
                            alt={project.title}
                            className="rounded-lg object-cover w-full h-64 md:h-80 border"
                          />
                          <Carousel
                            opts={{
                              align: "start",
                            }}
                            className="w-full "
                          >
                            <CarouselContent>
                              {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem
                                  key={index}
                                  className="basis-1/4 md:basis-1/3"
                                >
                                  <Image
                                    src={project.image}
                                    width={800}
                                    height={800}
                                    alt={project.title}
                                    className="rounded-lg object-cover h-20 w-full border"
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="translate-x-8" />
                            <CarouselNext className="-translate-x-8" />
                          </Carousel>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <DialogHeader>
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogDescription>
                            {project.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.stacks?.map((stack, i) => (
                            <Badge key={i} variant="secondary">
                              {stack}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-4">
                          {project.githubLink && (
                            <Link
                              href={project.githubLink}
                              target="_blank"
                              className="underline text-primary font-medium flex items-center gap-1"
                              aria-label={`Visit ${project?.title}'s github repository`}
                            >
                              <FaGithub /> Github
                            </Link>
                          )}
                          {project.liveUrl && (
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              className="underline text-primary font-medium"
                              aria-label={`Visit ${project?.title}'s live site`}
                            >
                              Live Site
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default ProjectsGallery;
