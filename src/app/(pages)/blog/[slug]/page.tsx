import BlurFade from "@/app/UI/animation-wrappers/fade";
import PhotoPaper from "@/app/UI/blog/photopaper";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import ScrollProgress from "@/app/UI/global-components/scroll-progress";
import React from "react";

const page = () => {
  const title =
    "A very long title for the blog as an example but more longer description and more and more";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc fermentum fermentum. Curabitur et malesuada odio. Aenean ac nunc nec nunc fermentum fermentum. Curabitur et malesuada odio. Aenean ac nunc nec nunc fermentum fermentum.";

  const titleLength = title.length;
  const descLength = description.length;

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
          <div className="flex gap-3 sm:gap-5 sm:flex-row flex-col items-center">
            <PhotoPaper
              src="/cat.jpg"
              size={{ width: 500, height: 500 }}
              wrapperClassName="!w-full sm:!w-1/2 sm:rotate-[-4deg] rotate-0 sm:shadow-2xl shadow-md h-max"
              className="w-full"
            />
            <div className="w-full sm:w-1/2 translate-y-0 sm:-translate-y-5">
              <Heading
                style={{
                  fontSize: `clamp(1.8rem, ${310 / titleLength}vw, 2.5rem)`,
                }}
              >
                {title}
              </Heading>
              <div className="mt-5 md:block hidden">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                  {description}
                </p>
              </div>
            </div>
            {/* Description - Mobile */}
          </div>
          <div className="!mt-2 sm:!mt-5">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 md:hidden block">
              {description}
            </p>
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
