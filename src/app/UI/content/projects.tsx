import React from "react";
import Heading from "../global-components/heading";
import { RiNextjsFill } from "react-icons/ri";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

interface Project {
  title: String;
  description?: String;
  image?: String;
  videoUrl?: String;
  githubLink?: String;
  liveUrl?: String;
  stacks?: Stack[];
}

interface Stack {
  title: String;
  icon: React.ReactNode | any;
}

const projects: Project[] = [
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts to explore, discover, and watch their favorite shows. Built with modern technologies for a seamless user experience.",
    image: "https://example.com/images/animesensei-banner.jpg",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/username/animesensei",
    liveUrl: "https://animesensei.example.com",
    stacks: [
      {
        title: "Next.js",
        icon: RiNextjsFill,
      },
      {
        title: "React",
        icon: FaReact, // Add appropriate icon from a library
      },
      {
        title: "TailwindCSS",
        icon: SiTailwindcss, // Add appropriate icon from a library
      },
    ],
  },
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts to explore, discover, and watch their favorite shows. Built with modern technologies for a seamless user experience.",
    image: "https://example.com/images/animesensei-banner.jpg",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/username/animesensei",
    liveUrl: "https://animesensei.example.com",
    stacks: [
      {
        title: "Next.js",
        icon: RiNextjsFill,
      },
      {
        title: "React",
        icon: FaReact, // Add appropriate icon from a library
      },
      {
        title: "TailwindCSS",
        icon: SiTailwindcss, // Add appropriate icon from a library
      },
    ],
  },
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts to explore, discover, and watch their favorite shows. Built with modern technologies for a seamless user experience.",
    image: "https://example.com/images/animesensei-banner.jpg",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/username/animesensei",
    liveUrl: "https://animesensei.example.com",
    stacks: [
      {
        title: "Next.js",
        icon: RiNextjsFill,
      },
      {
        title: "React",
        icon: FaReact, // Add appropriate icon from a library
      },
      {
        title: "TailwindCSS",
        icon: SiTailwindcss, // Add appropriate icon from a library
      },
    ],
  },
];

const Projects = () => {
  return (
    <div className="w-full max-w-2xl space-y-3">
      <Heading>Projects</Heading>
      <div className="grid grid-cols-2 gap-3">
        {projects?.length > 0 &&
          projects?.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm bg-background">
      <Image
        className="aspect-video object-cover"
        src="/usc.jpg"
        width={800}
        height={800}
        alt={project?.title as string}
      />
      <div className="px-3.5 py-2">
        <h3 className="font-bold text-lg">{project?.title}</h3>
        <p className="font-medium text-sm mt-1">
          {project?.description}
        </p>
        <Separator className="mt-2" />
        <div className="mt-2">
          <div className="flex gap-1.5">
            {project?.stacks?.map((stack, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <stack.icon className="text-2xl hover:cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stack?.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
