import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export const metadata = {
  title: "Works",
  description: "My personal projects and works.",
};

const ServicePage = () => {
  const states = {
    busy: {
      style: "bg-yellow-500 hover:bg-yellow-500",
      text: "I am currently busy at the moment.",
    },
    open: {
      style: "bg-green-500 hover:bg-green-500",
      text: "I am open for any request.",
    },
    project: {
      style: "bg-blue-500 hover:bg-blue-500",
      text: "I am working on a project/request.",
    },
    unavailable: {
      style: "bg-red-500 hover:bg-red-500",
      text: "I am current unavailable.",
    },
  };

  return (
    <Container as="main">
      <BlurFade>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          <Badge
            className={`shadow-sm border-primary/10 border ${states["project"]?.style}`}
          >
            {states["project"]?.text}
          </Badge>
        </div>
        
      </BlurFade>
    </Container>
  );
};

export default ServicePage;
