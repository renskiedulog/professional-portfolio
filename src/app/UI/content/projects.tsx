import Heading from "../global-components/heading";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLink } from "react-icons/fa6";
import { NotebookIcon, Star } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Project {
  title: String;
  description?: String;
  image?: String;
  videoUrl?: String;
  blogUrl?: String;
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
    blogUrl: "",
    stacks: ["Next.js", "Tailwind CSS", "Consumet API", "Shadcn UI"],
  },
  {
    title: "AnimeSensei",
    description:
      "AnimeSensei is a sleek platform for anime enthusiasts to explore, discover, and watch their favorite shows. Built with modern technologies for a seamless user experience.",
    image: "https://example.com/images/animesensei-banner.jpg",
    videoUrl: "https://example.com/videos/animesensei-demo.mp4",
    githubLink: "https://github.com/username/animesensei",
    liveUrl: "https://animesensei.example.com",
    blogUrl: "",
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
    blogUrl: "",
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
    blogUrl: "",
    stacks: ["NextJS", "Tailwind CSS"],
  },
];

const Projects = () => {
  return (
    <div className="w-full max-w-2xl space-y-3">
      <Heading>Projects</Heading>
      <div className="columns-2">
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
    <div className="border rounded-md overflow-hidden shadow-sm bg-background h-max mb-4">
      <Image
        className="aspect-video object-cover"
        src="/usc.jpg"
        width={800}
        height={800}
        alt={project?.title as string}
      />
      <div className="px-3.5 py-2">
        <h3 className="font-bold text-lg">{project?.title}</h3>
        <div>
          <p className="font-medium text-sm mt-1">{project?.description}</p>
        </div>
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
        <div className="mt-2 flex justify-between">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm">
                  <Star fill="#eac54f" size={15} />5
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Give This Project A Star
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-x-2 flex items-center">
            {/* {project?.blogUrl && ( */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="text-xs hover:underline flex items-center"
                >
                  <NotebookIcon size={15} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">Case Study</TooltipContent>
            </Tooltip>
            {/* )} */}
            {project?.githubLink && (
              <Button className="text-xs" size="sm" variant="ghost">
                <FaGithub /> Code
              </Button>
            )}
            {project?.liveUrl && (
              <Button className="text-xs" variant="default" size="sm">
                <FaLink />
                Live Preview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
