import Link from "next/link";
import React from "react";
import ProjectsGallery from "./projects-gallery";
import Container from "@/app/UI/global-components/container";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { FaGithub } from "react-icons/fa";
import BackButton from "@/app/UI/global-components/back-button";
import { Badge } from "@/components/ui/badge";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Works",
  description:
    "Projects by Renato Dulog, a full-stack web developer: web apps, websites, Chrome extensions and tools built with React, Next.js and TypeScript.",
  path: "/works",
});

const Page = () => {
  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Works | Renato Dulog",
            url: "https://renato-dulog.is-a.dev/works",
            description:
              "A showcase of modern, scalable web applications built with React and Next.js by Renato Dulog.",
            author: {
              "@type": "Person",
              name: "Renato Dulog",
              url: "https://renato-dulog.is-a.dev/",
            },
          }),
        }}
      />
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
            <Heading as="h1" className="w-full text-center text-3xl md:text-4xl">
              Selected Projects
            </Heading>
            <p>
              Browse a variety of projects I’ve worked on, covering different
              goals, features, and use cases. Each one shows how I approach
              development and solve problems through code.
            </p>
          </div>
          <ProjectsGallery />
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
