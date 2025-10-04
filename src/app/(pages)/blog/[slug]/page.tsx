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
import { format } from "date-fns";
import Link from "next/link";
import PortableTextComponents from "@/app/UI/sanity/portableTextComponents";
import { getSanityImageUrl } from "@/sanity/lib/sanity";
import { Metadata } from "next";
import IncrementView from "./increment-view";
import { Blog } from "@/lib/types";
import BottomSection from "./bottom-section";
import LikeButton from "./like-button";
import BlogSchema from "./blog-schema";

const getBlogPost = async (slug: string) => {
  const query = groq`*[_type == "blog" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    title,
    description,
    body,
    author-> { name },
    publishedAt,
    mainImage,
    likeCount,
    "categories": categories[]->title,
  }`;

  const blog = await sanityClient.fetch(query, { slug });

  return blog;
};

const getNextAndPrevBlogs = async (slug: string) => {
  const query = groq`*[_type == "blog" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) | order(publishedAt desc) {
    "slug": slug.current,
    title,
  }`;

  const blogs: Blog[] = await sanityClient.fetch(query);
  const currentIndex = blogs.findIndex((blog: any) => blog?.slug === slug);

  const previousBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex !== blogs?.length - 1 ? blogs[currentIndex + 1] : null;

  return { previousBlog, nextBlog };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return {
      title: "Blog not found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.publishedAt,
      images: [
        {
          url: blog?.mainImage
            ? getSanityImageUrl(blog?.mainImage)
            : "/placeholder.png",
          alt: blog.title,
        },
      ],
      authors: [blog.author?.name],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.mainImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  const query = groq`*[_type == "blog"] { "slug": slug.current }`;
  const slugs = await sanityClient.fetch(query);

  return slugs.map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export const revalidate = 3600;

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const [blog, prevAndNextBlogs] = await Promise.all([
    getBlogPost(slug),
    getNextAndPrevBlogs(slug),
  ]);

  if (!blog) {
    notFound();
  }

  const {
    title,
    description,
    body,
    author,
    publishedAt,
    categories,
    likeCount,
    mainImage,
  } = blog;

  return (
    <Container as="article">
      <BlogSchema
        coverImage={getSanityImageUrl(mainImage)}
        date={publishedAt}
        description={description}
        slug={params?.slug}
        title={title}
        key={title}
      />
      <ScrollProgress />
      <IncrementView slug={slug} />
      <BlurFade className="px-3 sm:px-5 pb-20">
        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between gap-5">
          <BackButton href="/blog" label="Blogs" />
          <LikeButton slug={slug} likeCount={likeCount} />
        </div>
        {/* Content */}
        <div className="mt-5 sm:mt-20">
          <div className="flex gap-3 sm:gap-5 md:gap-8 sm:flex-row flex-col items-center">
            <PhotoPaper
              src={
                mainImage ? getSanityImageUrl(mainImage) : "/placeholder.png"
              }
              size={{ width: 500, height: 500 }}
              wrapperClassName="!w-full sm:!w-1/2 sm:rotate-[-4deg] rotate-0 sm:shadow-2xl shadow-md h-max"
              className="w-full object-cover aspect-square"
            />
            <div className="w-full sm:w-1/2 translate-y-0 sm:-translate-y-5">
              <Heading
                as="h1"
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
                  <div className="flex flex-wrap gap-x-4 my-1">
                    {categories?.map((category: string) => (
                      <Link
                        href={`/blog?category=${category}`}
                        key={category}
                        className="text-primary/80 text-sm hover:bg-foreground/10 px-1.5 py-1 rounded"
                        aria-label={`View posts in the ${category} category`}
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
                    aria-label={`View posts in the ${category} category`}
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
          <div className="mt-5 md:mt-20 prose prose-lg text-primary/80 dark:text-primary">
            <PortableText
              value={body}
              components={PortableTextComponents as any}
            />
          </div>
        </div>
        <BottomSection prevAndNext={prevAndNextBlogs} />
      </BlurFade>
    </Container>
  );
};

export default page;
