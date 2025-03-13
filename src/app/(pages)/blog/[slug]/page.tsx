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
import { format } from "date-fns";
import Link from "next/link";

const getBlogPost = async (slug: string) => {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] {
    title,
    description,
    body,
    author-> { name },
    publishedAt,
    mainImage,
    "categories": categories[]->title,
  }`;

  const blog = await sanityClient.fetch(query, { slug });

  return blog;
};

export async function generateStaticParams() {
  const query = groq`*[_type == "blog"] { "slug": slug.current }`;
  const slugs = await sanityClient.fetch(query);

  return slugs.map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export const dynamic = "force-static";

const page = async ({ params }: { params: { slug: string } }) => {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    notFound();
  }

  const { title, description, body, author, publishedAt, categories } = blog;

  return (
    <Container>
      <ScrollProgress />
      <BlurFade className="px-3 sm:px-5 pb-20">
        {/* Navigation Bar */}
        <div className="w-full flex items-center gap-5">
          <BackButton href="/blog" />
        </div>
        {/* Content */}
        <div className="mt-5 sm:mt-20">
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
              {/* Description - Desktop */}
              <div className="mt-5 md:block hidden">
                <p
                  className={`${title?.length > 90 ? "text-sm" : "text-base"} leading-relaxed text-gray-700 dark:text-gray-200`}
                >
                  {description}
                </p>
                {categories?.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {categories?.map((category: string) => (
                      <Link
                        href={`/blog?category=${category}`}
                        key={category}
                        className="text-primary/80 text-sm hover:bg-foreground/10 px-1.5 py-1 mt-1 rounded"
                      >
                        # {category}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="flex text-gray-500 dark:text-gray-200 w-full justify-between mt-1 font-semibold">
                  {author?.name && <p>{author?.name}</p>}
                  {publishedAt && (
                    <p>{format(new Date(publishedAt), "MMM dd, yyyy")}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Description - Mobile */}
          </div>
          <div className="!mt-2 sm:!mt-5">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 md:hidden block">
              {description}
            </p>
            {categories?.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 md:hidden mt-1.5">
                {categories?.map((category: string) => (
                  <Link
                    href={`/blog?category=${category}`}
                    key={category}
                    className="text-primary/80 text-sm hover:bg-foreground/10 px-1.5 py-1 rounded"
                  >
                    # {category}
                  </Link>
                ))}
              </div>
            )}
            <div className="flex text-gray-500 dark:text-gray-200 w-full justify-between mt-1.5 font-semibold md:hidden">
              {author?.name && <p>{author?.name}</p>}
              {publishedAt && (
                <p>{format(new Date(publishedAt), "MMM dd, yyyy")}</p>
              )}
            </div>
          </div>
          <div className="mt-5 md:mt-20 prose prose-lg">
            <PortableText
              value={body}
              components={PortableTextComponents as any}
            />
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
