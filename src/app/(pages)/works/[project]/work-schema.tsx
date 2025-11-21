import Script from "next/script";

export default function WorkSchema({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified,
  keywords,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    headline: title,
    description,
    url: `https://renato-dulog.is-a.dev/works/${slug}`,
    mainEntityOfPage: `https://renato-dulog.is-a.dev/works/${slug}`,
    image,
    author: {
      "@type": "Person",
      name: "Renato Dulog",
    },
    creator: {
      "@type": "Person",
      name: "Renato Dulog",
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(keywords && { keywords }),
  };

  return (
    <Script
      id={`schema-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
