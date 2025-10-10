import Script from "next/script";

export default function BlogSchema({
  title,
  description,
  slug,
  coverImage,
  date,
}: {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  date: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    author: {
      url: "https://renato-dulog.is-a.dev/",
      "@type": "Person",
      name: "Renato Dulog",
    },
    datePublished: date,
    image: coverImage,
    url: `https://renato-dulog.is-a.dev/post/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Renato Dulog",
      logo: {
        "@type": "ImageObject",
        url: "https://renato-dulog.is-a.dev/me.webp",
      },
    },
  };

  return (
    <Script
      id={`schema-post-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
