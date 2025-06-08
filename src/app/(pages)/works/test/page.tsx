import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Works",
  description: "My personal projects and works.",
};

const WorksPage = () => {
  return (
    <Container as="main">
      <BlurFade>
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
        <div>
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
        </div>
      </BlurFade>
    </Container>
  );
};

export default WorksPage;
