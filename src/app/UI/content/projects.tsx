import Heading from "@/app/UI/global-components/heading";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLink } from "react-icons/fa6";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { getRepoStarsFromLink } from "@/lib/github";
import { Url } from "next/dist/shared/lib/router/router";

export interface Project {
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

const Projects = () => {
  return (
    <section id="projects" className="w-full max-w-2xl space-y-3">
      <div className="flex justify-between items-end">
        <Heading>Projects</Heading>
        <Link
          href="/works"
          aria-label="See more works"
          className="text-sm hover:underline sm:block hidden"
        >
          See More
        </Link>
      </div>

      <div className="columns-1 lg:columns-2">
        {projects?.length > 0 &&
          projects?.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
      </div>
    </section>
  );
};

const ProjectCard = async ({ project }: { project: Project }) => {
  const starCount = await getRepoStarsFromLink(project?.githubLink as string);
  return (
    <div className="border rounded-md overflow-hidden shadow-sm bg-background h-max mb-4">
      <Image
        className="aspect-video object-cover"
        src={project?.image as string}
        width={800}
        height={800}
        alt={project?.title as string}
      />
      <div className="px-3.5 py-2">
        <p className="font-bold text-lg">{project?.title}</p>
        {project?.description && (
          <div>
            <input
              type="checkbox"
              id={`project-${projects?.indexOf(project)}`}
              className="peer hidden"
            />
            {project?.description?.split("")?.length > 150 ? (
              <>
                <p className="font-medium text-sm mt-1 peer-checked:hidden block">
                  {project?.description?.substring(0, 150)}...
                  <label
                    className="text-xs opacity-60 font-medium hover:underline hover:opacity-70 cursor-pointer"
                    htmlFor={`project-${projects?.indexOf(project)}`}
                  >
                    See More
                  </label>
                </p>
                <p className="font-medium text-sm mt-1 peer-checked:flex hidden flex-col">
                  {project?.description}
                  <label
                    className="text-xs opacity-60 font-medium hover:underline hover:opacity-70 cursor-pointer w-max"
                    htmlFor={`project-${projects?.indexOf(project)}`}
                  >
                    See Less
                  </label>
                </p>
              </>
            ) : (
              <p className="font-medium text-sm mt-1">
                {project?.description?.substring(0, 150)}
              </p>
            )}
          </div>
        )}
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
            {starCount !== null ? (
              <Link href={project?.githubLink as Url} target="_blank">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-sm">
                      <Star fill="#eac54f" size={15} />
                      {starCount}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Give This Project A Star
                  </TooltipContent>
                </Tooltip>
              </Link>
            ) : (
              <p></p>
            )}
          </div>
          <div className="space-x-2 flex items-center">
            {/* {project?.blogUrl && ( */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="text-xs hover:underline flex items-center"
                >
                  <NotebookIcon size={15} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">Case Study</TooltipContent>
            </Tooltip> */}
            {/* )} */}
            {project?.githubLink ? (
              <Link
                href={project?.githubLink as string}
                target="_blank"
                aria-label={`Visit ${project?.githubLink}'s github repository`}
              >
                <Button className="text-xs" size="sm" variant="ghost">
                  <FaGithub /> Code
                </Button>
              </Link>
            ) : (
              <Button disabled className="text-xs" size="sm" variant="ghost">
                <FaGithub /> Code
              </Button>
            )}
            {project?.liveUrl ? (
              <Link
                href={project?.liveUrl as Url}
                target="_blank"
                aria-label={`Visit ${project?.title}'s live site`}
              >
                <Button className="text-xs" variant="default" size="sm">
                  <FaLink />
                  {project?.liveUrl ? "Live Preview" : "No Preview"}
                </Button>
              </Link>
            ) : (
              <Button
                disabled
                className="text-xs"
                variant="default"
                size="sm"
                aria-label={`Visit ${project?.title}'s live site`}
              >
                <FaLink />
                {project?.liveUrl ? "Live Preview" : "No Preview"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
