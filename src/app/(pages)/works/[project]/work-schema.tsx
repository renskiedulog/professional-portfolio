import Script from "next/script";

export default function WorkSchema({
  title,
  description,
  slug,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `https://renato-dulog.is-a.dev/works/${slug}`,
    image,
    creator: {
      "@type": "Person",
      name: "Renato Dulog",
    },
  };

  return (
    <Script
      id={`schema-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
