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
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import WorkSchema from "./work-schema";
import DynamicCommits from "./commits.dynamic";

const getProjectInfo = async (slug: string) => {
  const query = groq`*[_type == "projects" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    ...,   
  }`;

  const blog = await sanityClient.fetch(query, { slug });

  return blog;
};

const ProjectInfo = async ({ params }: { params: { project: string } }) => {
  const { project } = await params;
  const info: ProjectInfoType = await getProjectInfo(project);

  return (
    <Container as="main">
      <WorkSchema
        slug={info?.slug}
        description={info?.description ?? ""}
        title={info?.title ?? ""}
        image={
          info?.images && info?.images[0]
            ? getSanityImageUrl(info?.images[0])
            : "/placeholder.png"
        }
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
          <div className="flex items-center justify-between">
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
          <p className="text-justify">{info?.description}</p>
        </div>
        {info?.githubLink && <DynamicCommits githubLink={info?.githubLink} />}
      </BlurFade>
    </Container>
  );
};

export default ProjectInfo;
