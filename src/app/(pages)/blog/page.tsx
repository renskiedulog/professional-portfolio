import React from "react";
import BlogPage from "./blog-page";

export const revalidate = 3600;

export const metadata = {
  title: "Blog",
  description:
    "Read articles on web development, React, Next.js, TypeScript, and software engineering by Renato Dulog.",
  openGraph: {
    title: "Blog | Renato Dulog",
    description:
      "Read articles on web development, React, Next.js, TypeScript, and software engineering by Renato Dulog.",
    url: "https://renato-dulog.is-a.dev/blog",
    siteName: "Renato Dulog | Developer Portfolio",
    images: [{ url: "https://renato-dulog.is-a.dev/me.webp", alt: "Renato Dulog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Renato Dulog",
    description:
      "Read articles on web development, React, Next.js, TypeScript, and software engineering by Renato Dulog.",
    images: ["https://renato-dulog.is-a.dev/me.webp"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
};

const getData = async () => {
  const [blogsReq, filtersReq] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-blogs`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-filters`),
  ]);

  if (!blogsReq.ok || !filtersReq.ok) {
    throw new Error("Failed to fetch data");
  }

  const [blogs, filters] = await Promise.all([
    blogsReq.json(),
    filtersReq.json(),
  ]);

  return { blogs, filters };
};

const Page = async () => {
  const { blogs, filters } = await getData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Renato Dulog – Blog",
            url: "https://renato-dulog.is-a.dev/blog",
            description:
              "Articles on web development, React, Next.js, TypeScript, and software engineering by Renato Dulog.",
            author: {
              "@type": "Person",
              name: "Renato Dulog",
              url: "https://renato-dulog.is-a.dev/",
            },
          }),
        }}
      />
      <BlogPage blogs={blogs} filters={filters} />
    </>
  );
};

export default Page;
