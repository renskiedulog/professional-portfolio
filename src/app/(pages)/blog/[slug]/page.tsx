import BlurFade from "@/app/UI/animation-wrappers/fade";
import PhotoPaper from "@/app/UI/blog/photopaper";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import ScrollProgress from "@/app/UI/global-components/scroll-progress";
import React from "react";

const page = () => {
  return (
    <Container>
      <ScrollProgress />
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex items-center gap-5">
          <BackButton href="/blog" />
          <p className="text-2xl font-bold text-primary/80 line-clamp-1">
            A very long title for the blog as an example
          </p>
        </div>
        {/* Content */}
        <div className="mt-20">
          <div className="flex gap-5">
            <PhotoPaper
              src="/cat.jpg"
              size={{ width: 500, height: 500 }}
              wrapperClassName="!w-1/2"
            />
            <div className="w-1/2">
              <Heading className="text-4xl">
                A very long title for the blog as an example
              </Heading>
            </div>
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
