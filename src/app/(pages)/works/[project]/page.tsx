import BlurFade from "@/app/UI/animation-wrappers/fade";
import PhotoPaper from "@/app/UI/blog/photopaper";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import ScrollProgress from "@/app/UI/global-components/scroll-progress";
import { Badge } from "@/components/ui/badge";
import { sanityClient } from "@/lib/sanityClient";
import { ProjectInfo as ProjectInfoType } from "@/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/sanity";
import { groq, PortableText } from "next-sanity";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import DynamicCommits from "./commits.dynamic";
import NotFound from "@/app/not-found";
import ProjectImages from "./images";
import PortableTextComponents from "@/app/UI/sanity/portableTextComponents";
import WorkSchema from "./project-schema";

export async function generateStaticParams() {
  const query = groq`*[_type == "project"] { "slug": slug.current }`;
  const slugs = await sanityClient.fetch(query);

  return slugs.map((project: { slug: string }) => ({ slug: project.slug }));
}

const getProjectInfo = async (slug: string) => {
  const query = groq`*[_type == "projects" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    ...,
    techStack[]-> {
      name,
      "icon": icon.asset->url
    },
    "images": images[].asset->url
  }`;

  const blog = await sanityClient.fetch(query, { slug });

  return blog;
};

const ProjectInfo = async ({ params }: { params: { project: string } }) => {
  const { project } = await params;
  const info: ProjectInfoType = await getProjectInfo(project);

  if (!info) return NotFound();

  return (
    <Container as="main">
      <WorkSchema
        slug={info.slug}
        title={info.title}
        description={info.description ?? ""}
        image={
          info.images?.[0]
            ? getSanityImageUrl(info.images[0])
            : "/placeholder.png"
        }
        techStack={info.techStack}
        screenshots={info.images}
        githubUrl={info.githubLink}
        liveUrl={info.liveUrl}
        createdAt={info.createdAt}
      />
      <ScrollProgress />
      <BlurFade className="px-3 sm:px-5 pb-20">
        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between gap-5">
          <BackButton href="/works" label="Works" />
        </div>
        {/* Heading */}
        <div className="max-w-2xl mx-auto mt-10">
          <Crown>Project Info</Crown>
          {info?.images && info?.images?.length > 0 && (
            <PhotoPaper
              src={
                info?.images[0]
                  ? getSanityImageUrl(info?.images[0])
                  : "/placeholder.png"
              }
              wrapperClassName="!w-full sm:!w-[80%] mx-auto sm:shadow-xl shadow-md h-max my-5"
              className="!w-full object-cover aspect-video"
            />
          )}
          <div className="flex items-center justify-between sm:flex-row flex-col-reverse sm:gap-0 gap-4">
            <Heading>{info?.title}</Heading>
            <div className="flex items-center gap-2">
              {info?.liveUrl && (
                <Link href={info?.liveUrl} target="_blank">
                  <Badge className="hover:bg-black/5 py-1 bg-transparent border shadow-none border-primary/80 text-primary/80 flex items-center gap-1">
                    <FaLink /> Live Preview
                  </Badge>
                </Link>
              )}
              {info?.githubLink && (
                <Link href={info?.githubLink} target="_blank">
                  <Badge className="flex gap-1 items-center py-1">
                    <FaGithub /> Github Repo
                  </Badge>
                </Link>
              )}
            </div>
          </div>
          <p className="text-center sm:text-justify">{info?.description}</p>
        </div>
        <div className="flex gap-4 max-w-2xl flex-wrap mx-auto justify-center sm:justify-around mt-4">
          {info?.techStack?.map((tech, idx) => {
            return (
              <div
                key={tech.name}
                className="text-center opacity-70 py-6 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 flex flex-col items-center justify-center"
              >
                {tech?.icon && (
                  <img
                    src={tech?.icon}
                    alt={tech?.name}
                    className="w-12 h-12 mb-2"
                  />
                )}
                <span className="text-base font-semibold">{tech?.name}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full rounded-full h-px bg-primary/30"></div>
        <div className="w-full flex p-2 gap-5">
          {/* Content */}
          <div className="w-full">
            <div className="prose prose-lg text-primary/80 dark:text-primary">
              <PortableText
                value={info?.body}
                components={PortableTextComponents as any}
              />
            </div>
          </div>
          <aside className="max-w-[300px] w-full min-w-[300px] h-max sticky top-5 space-y-2">
            {info?.githubLink && (
              <div className="space-y-2 w-full">
                <h2 className="font-bold text-primary/90">Recent Commits</h2>
                <DynamicCommits githubLink={info?.githubLink} />
              </div>
            )}
            {info?.images && info?.images?.length > 0 && (
              <div className="space-y-2">
                <h2 className="font-bold text-primary/90">
                  Project Screenshots
                </h2>
                <ProjectImages images={info?.images} />
              </div>
            )}
          </aside>
        </div>
      </BlurFade>
    </Container>
  );
};

export default ProjectInfo;
