import React from "react";
import { breadcrumbSchema, PERSON_ID, SITE_URL } from "@/lib/site";

interface WorkSchemaProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  techStack?: { name: string; icon?: string }[];
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt?: string;
  authorName?: string;
}

const WorkSchema = ({
  title,
  description,
  slug,
  image,
  techStack,
  screenshots,
  githubUrl,
  liveUrl,
  createdAt,
  authorName,
}: WorkSchemaProps) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: title,
    description,
    url: liveUrl,
    image,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: authorName ?? "Renato Dulog",
    },
    datePublished: createdAt,
  };

  if (techStack?.length) {
    schema.programmingLanguage = techStack.map((t) => t.name);
  }

  if (screenshots?.length) {
    schema.screenshot = screenshots.map((src) => ({
      "@type": "ImageObject",
      url: src,
    }));
  }

  if (githubUrl) {
    schema.codeRepository = githubUrl;
  }

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Works", url: `${SITE_URL}/works` },
    { name: title, url: `${SITE_URL}/works/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
};

export default WorkSchema;
