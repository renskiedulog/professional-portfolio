"use client";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import CursorFollower from "@/app/UI/animation-wrappers/cursor-follower";
import { useState } from "react";

const WorksPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          <div className="flex items-center gap-2">
            <p className="text-xs">Consider following me on</p>
            <Link href="https://github.com/renskiedulog" target="_blank">
              <Badge className="flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5">
                <FaGithub size={15} />
                <span>Github</span>
              </Badge>
            </Link>
          </div>
        </div>
        <div className="cursor-none">
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-1">
            <Heading className="w-full text-center text-3xl md:text-4xl">
              Personal Projects
            </Heading>
            <p>
              Browse a variety of projects I’ve worked on, covering different
              goals, features, and use cases. Each one shows how I approach
              development and solve problems through code.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 relative mt-10">
            <div
              className="w-full aspect-square bg-black/20"
              onMouseEnter={() => setHoveredProject(1)}
              onMouseLeave={() => setHoveredProject(null)}
            />
            <div className="w-full aspect-square bg-black/20" />
            <div className="w-full aspect-square bg-black/20" />
            <div className="w-full aspect-square bg-black/20" />
          </div>
        </div>
      </BlurFade>
      <CursorFollower hovered={hoveredProject !== null}>
        <div>
          <h1 className="text-lg font-bold">Project Title</h1>
          <p className="text-sm">More info about this project...</p>
        </div>
      </CursorFollower>
    </Container>
  );
};

export default WorksPage;
