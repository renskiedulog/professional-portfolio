import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import ScrollProgress from "@/app/UI/global-components/scroll-progress";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import React from "react";

const getProjectInfo = async (slug: string) => {
  const query = groq`*[_type == "projects" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    ...,   
  }`;

  const blog = await sanityClient.fetch(query, { slug });

  return blog;
};

const ProjectInfo = async ({ params }: { params: { project: string } }) => {
  const { project } = await params;
  const info = await getProjectInfo(project);

  return (
    <Container as="main">
      <ScrollProgress />
      <BlurFade className="px-3 sm:px-5 pb-20">
        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between gap-5">
          <BackButton href="/works" label="Works" />
        </div>
      </BlurFade>
    </Container>
  );
};

export default ProjectInfo;
