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
import { Star, ArrowUpRight } from "lucide-react";
import { getRepoStarsFromLink } from "@/lib/github";
import { Url } from "next/dist/shared/lib/router/router";
import { sanityClient } from "@/lib/sanityClient";

export interface Project {
  title: String;
  slug?: String;
  description?: String;
  image?: String;
  videoUrl?: String;
  blogUrl?: String;
  githubLink?: String;
  liveUrl?: String;
  stacks?: String[];
}

async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch<Project[]>(
    `*[_type == "projects" && featured == true] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      description,
      githubLink,
      liveUrl,
      "image": images[0].asset->url,
      "stacks": techStack[]->.name
    }`
  );
}

const Projects = async () => {
  const projects = await getProjects();
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
          <span className="sr-only">
            Navigate to the Works page to view more projects
          </span>
        </Link>
      </div>

      <div className="columns-1 lg:columns-2">
        {projects?.length > 0 &&
          projects?.map((project, index) => (
            <ProjectCard key={index} index={index} project={project} />
          ))}
      </div>
    </section>
  );
};

const ProjectCard = async ({ project, index }: { project: Project; index: number }) => {
  const starCount = await getRepoStarsFromLink(project?.githubLink as string);
  return (
    <div className="border rounded-md overflow-hidden shadow-sm bg-background h-max mb-4">
      {project?.image && (
        project?.slug ? (
          <Link href={`/works/${project.slug}`} aria-label={`View ${project.title} details`} className="relative group block">
            <Image
              className="aspect-video object-cover"
              src={project.image as string}
              width={400}
              height={400}
              alt={project.title as string}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white text-xl font-bold flex items-center gap-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                View Project <ArrowUpRight size={22} />
              </span>
            </div>
          </Link>
        ) : (
          <Image
            className="aspect-video object-cover"
            src={project.image as string}
            width={400}
            height={400}
            alt={project.title as string}
            loading="lazy"
          />
        )
      )}
      <div className="px-3.5 py-2">
        <p className="font-bold text-lg">{project?.title}</p>
        {project?.description && (
          <div>
            <input
              type="checkbox"
              id={`project-${index}`}
              className="peer hidden"
            />
            {project?.description?.split("")?.length > 150 ? (
              <>
                <p className="font-medium text-sm mt-1 peer-checked:hidden block">
                  {project?.description?.substring(0, 150)}...
                  <label
                    className="text-xs opacity-60 font-medium hover:underline hover:opacity-70 cursor-pointer"
                    htmlFor={`project-${index}`}
                  >
                    See More
                  </label>
                </p>
                <p className="font-medium text-sm mt-1 peer-checked:flex hidden flex-col">
                  {project?.description}
                  <label
                    className="text-xs opacity-60 font-medium hover:underline hover:opacity-70 cursor-pointer w-max"
                    htmlFor={`project-${index}`}
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
          <div className="space-x-1 flex items-center">
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
                <Button className="text-xs" size="sm" variant="default">
                  <FaLink /> Live Preview
                </Button>
              </Link>
            ) : (
              <Button disabled className="text-xs" size="sm" variant="default">
                <FaLink /> Live Preview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
