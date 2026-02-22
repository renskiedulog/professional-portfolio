import Script from "next/script";
import React from "react";

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

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default WorkSchema;
