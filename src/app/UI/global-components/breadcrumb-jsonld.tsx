"use client";
import { usePathname } from "next/navigation";

const SEGMENT_LABELS: Record<string, string> = {
  works: "Works",
  blog: "Blog",
  services: "Services",
  extra: "Extra",
  playground: "Playground",
  "typing-wizard": "Typing Wizard",
  "jp-flashcards": "Japanese Flashcards",
  "questions-you-might-ask": "Questions You Might Ask",
  stats: "Stats",
  "dev-tools": "Dev Tools",
  "current-specs": "Current Specs",
  recommendations: "Recommendations",
  anime: "Anime",
  manga: "Manga",
  manhwa: "Manhwa",
  movie: "Movie",
  settings: "Settings",
  login: "Login",
  testimonials: "Testimonials",
  add: "Add",
};

const BASE_URL = "https://renato-dulog.is-a.dev";

function toLabel(segment: string): string {
  return (
    SEGMENT_LABELS[segment] ??
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const items = [
    { name: "Home", url: BASE_URL },
    ...segments.map((seg, i) => ({
      name: toLabel(seg),
      url: `${BASE_URL}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
