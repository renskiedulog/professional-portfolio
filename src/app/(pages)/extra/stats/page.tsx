import ClientStatsPage from "./page.client";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Stats",
  description:
    "Live coding stats and GitHub activity from Renato Dulog — contributions, streaks, languages, and more.",
  path: "/extra/stats",
});

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
