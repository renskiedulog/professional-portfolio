import ClientStatsPage from "./page.client";

export const metadata = {
  title: "Stats",
  description:
    "Live coding stats and GitHub activity from Renato Dulog — contributions, streaks, languages, and more.",
  openGraph: {
    title: "Stats | Renato Dulog",
    description:
      "Live coding stats and GitHub activity from Renato Dulog — contributions, streaks, languages, and more.",
    url: "https://renato-dulog.is-a.dev/extra/stats",
    siteName: "Renato Dulog | Developer Portfolio",
    images: [{ url: "https://renato-dulog.is-a.dev/me.webp", alt: "Renato Dulog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stats | Renato Dulog",
    description:
      "Live coding stats and GitHub activity from Renato Dulog — contributions, streaks, languages, and more.",
    images: ["https://renato-dulog.is-a.dev/me.webp"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/extra/stats`,
  },
};

const StatsPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Stats | Renato Dulog",
            url: "https://renato-dulog.is-a.dev/extra/stats",
            description:
              "Live coding stats and GitHub activity from Renato Dulog — contributions, streaks, languages, and more.",
            author: {
              "@type": "Person",
              name: "Renato Dulog",
              url: "https://renato-dulog.is-a.dev/",
            },
          }),
        }}
      />
      <ClientStatsPage />
    </>
  );
};

export default StatsPage;
