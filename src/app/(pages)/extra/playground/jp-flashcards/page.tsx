import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";

export const metadata = {
  title: "Japanese Flashcards",
  description:
    "Practice Japanese hiragana, katakana, and vocabulary with interactive flashcards by Renato Dulog.",
  openGraph: {
    title: "Japanese Flashcards | Renato Dulog",
    description:
      "Practice Japanese hiragana, katakana, and vocabulary with interactive flashcards by Renato Dulog.",
    url: "https://renato-dulog.is-a.dev/extra/playground/jp-flashcards",
    siteName: "Renato Dulog | Developer Portfolio",
    images: [{ url: "https://renato-dulog.is-a.dev/me.webp", alt: "Renato Dulog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Flashcards | Renato Dulog",
    description:
      "Practice Japanese hiragana, katakana, and vocabulary with interactive flashcards by Renato Dulog.",
    images: ["https://renato-dulog.is-a.dev/me.webp"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/extra/playground/jp-flashcards`,
  },
};

const Page = () => {
  return (
    <Container as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalApplication",
            name: "Japanese Flashcards",
            url: "https://renato-dulog.is-a.dev/extra/playground/jp-flashcards",
            description:
              "Practice Japanese hiragana, katakana, and vocabulary with interactive flashcards by Renato Dulog.",
            applicationCategory: "EducationalApplication",
            educationalLevel: "Beginner",
            inLanguage: ["en", "ja"],
            author: {
              "@type": "Person",
              name: "Renato Dulog",
              url: "https://renato-dulog.is-a.dev/",
            },
          }),
        }}
      />
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/playground" label="Playground" />
        </div>
        <div className="h-[90dvh] flex items-center justify-center"></div>
      </BlurFade>
    </Container>
  );
};

export default Page;
