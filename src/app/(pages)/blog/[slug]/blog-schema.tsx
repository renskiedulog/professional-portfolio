import { breadcrumbSchema, PERSON_ID, SITE_NAME, SITE_URL } from "@/lib/site";

export default function BlogSchema({
  title,
  description,
  slug,
  coverImage,
  date,
  modifiedDate,
}: {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  date: string;
  modifiedDate?: string;
}) {
  const url = `${SITE_URL}/blog/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: date,
    dateModified: modifiedDate ?? date,
    image: coverImage,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
    },
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: title, url },
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
}
