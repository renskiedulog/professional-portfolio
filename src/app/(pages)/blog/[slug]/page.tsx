import BlurFade from "@/app/UI/animation-wrappers/fade";
import PhotoPaper from "@/app/UI/blog/photopaper";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import ScrollProgress from "@/app/UI/global-components/scroll-progress";
import React from "react";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/sanity/portableTextComponents";

const page = async ({ params }: { params: { slug: string } }) => {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] {
    title,
    description,
    body,
    author-> { name },
    publishedAt,
    mainImage
  }`;

  const blog = await sanityClient.fetch(query, { slug: params.slug });

  const { title, description, body, author, publishedAt, category } = blog;

  if (!blog) {
    notFound();
  }

  return (
    <Container>
      <ScrollProgress />
      <BlurFade className="px-3 sm:px-5 pb-20">
        {/* Navigation Bar */}
        <div className="w-full flex items-center gap-5">
          <BackButton href="/blog" />
          <p className="text-2xl font-bold text-primary/80 line-clamp-1 text-center w-full sm:block hidden">
            {title}
          </p>
        </div>
        {/* Content */}
        <div className="mt-20">
          <div className="flex gap-3 sm:gap-5 md:gap-8 sm:flex-row flex-col items-center">
            <PhotoPaper
              src="/cat.jpg"
              size={{ width: 500, height: 500 }}
              wrapperClassName="!w-full sm:!w-1/2 sm:rotate-[-4deg] rotate-0 sm:shadow-2xl shadow-md h-max"
              className="w-full"
            />
            <div className="w-full sm:w-1/2 translate-y-0 sm:-translate-y-5">
              <Heading
                style={{
                  fontSize: `clamp(1.8rem, ${310 / title?.length}vw, 2.5rem)`,
                }}
              >
                {title}
              </Heading>
              <div className="mt-5 md:block hidden">
                <p
                  className={`${title?.length > 90 ? "text-sm" : "text-base"} leading-relaxed text-gray-700 dark:text-gray-200`}
                >
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
          <div className="mt-5 md:mt-20 prose prose-lg">
            <PortableText
              value={blog.body}
              components={PortableTextComponents}
            />
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
