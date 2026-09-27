// Single source of truth for identity facts used by metadata, JSON-LD and agent files (llms.txt).
import type { Metadata } from "next";

export const SITE_URL = "https://renato-dulog.is-a.dev";
export const PERSON_ID = `${SITE_URL}/#person`;

export const SITE_NAME = "Renato Dulog";
export const JOB_TITLE = "Full-Stack Web Developer";
export const SITE_TITLE =
  "Renato Dulog – Full-Stack Web Developer in Cebu, Philippines";
export const SITE_DESCRIPTION =
  "Renato Dulog is a full-stack web developer based in Cebu, Philippines, specializing in React, Next.js, and TypeScript. Browse projects, blog posts, and web apps.";
export const SHORT_BIO =
  "Renato Dulog is a full-stack web developer based in Cebu, Philippines, building with React, Next.js, TypeScript and Node.js. Currently a web developer at WebriQ and open to freelance projects.";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SAME_AS = [
  "https://www.linkedin.com/in/renato-dulog/",
  "https://github.com/renskiedulog",
  "https://facebook.com/renato.dulog",
];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/me.webp`,
  jobTitle: JOB_TITLE,
  description: SHORT_BIO,
  email: "mailto:renato.larayos.dulog@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cebu",
    addressRegion: "Central Visayas",
    addressCountry: "PH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of San Carlos",
    url: "https://usc.edu.ph/",
  },
  sameAs: SAME_AS,
  worksFor: {
    "@type": "Organization",
    name: "WebriQ",
    url: "https://www.webriq.com/",
  },
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "UI/UX Design",
  ],
};

// Per-page metadata with self-referencing canonical + og:url. Pages without their own
// metadata must not inherit the homepage canonical, so the root layout sets none.
export const pageMetadata = ({
  title,
  description,
  path,
  image = OG_IMAGE,
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata => {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: "Renato Dulog | Developer Portfolio",
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
      type: "website",
      locale: "en_PH",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
};

export type BreadcrumbItem = { name: string; url: string };

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});
