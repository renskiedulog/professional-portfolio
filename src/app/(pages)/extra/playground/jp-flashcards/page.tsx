import BlurFade from "@/app/UI/animation-wrappers/fade";
import Container from "@/app/UI/global-components/container";
import JpFlashcardsClient from "./page.client";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Japanese Flashcards",
  description:
    "Practice Japanese hiragana, katakana, and vocabulary with interactive flashcards by Renato Dulog.",
  path: "/extra/playground/jp-flashcards",
});

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
        <JpFlashcardsClient />
      </BlurFade>
    </Container>
  );
};

export default Page;
