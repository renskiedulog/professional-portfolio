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
import { Badge } from "@/components/ui/badge";

interface Project {
  title: String;
  description?: String;
  image?: String;
  videoUrl?: String;
  githubLink?: String;
  liveUrl?: String;
  stacks?: String[];
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
    stacks: ["Next.js", "Tailwind CSS", "Consumet API","Shadcn UI"],
  },
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts to explore, discover, and watch their favorite shows. Built with modern technologies for a seamless user experience.",
    image: "https://example.com/images/animesensei-banner.jpg",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/username/animesensei",
    liveUrl: "https://animesensei.example.com",
    stacks: ["NextJS", "Tailwind CSS"],
  },
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts to explore, discover, and watch their favorite shows. Built with modern technologies for a seamless user experience.",
    image: "https://example.com/images/animesensei-banner.jpg",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/username/animesensei",
    liveUrl: "https://animesensei.example.com",
    stacks: ["NextJS", "Tailwind CSS"],
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
        <p className="font-medium text-sm mt-1">{project?.description}</p>
        <div className="flex gap-1 flex-wrap mt-1">
          {project?.stacks?.map((stack, index) => (
            <span
              key={index}
              className="bg-primary-foreground dark:bg-white/20 text-primary text-[11px] py-0.5 px-1.5 border border-opacity-10 rounded text-nowrap font-semibold"
            >
              {stack}
            </span>
          ))}
        </div>
        <Separator className="mt-2" />
      </div>
    </div>
  );
};
export default Projects;
