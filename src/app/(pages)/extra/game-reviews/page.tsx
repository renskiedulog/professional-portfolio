import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { FaArrowRight, FaKeyboard, FaToriiGate } from "react-icons/fa6";
import Link from "next/link";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import { pageMetadata } from "@/lib/site";

// Placeholder page, noindex until it has real content
export const metadata = pageMetadata({
  title: "Game Reviews",
  description:
    "Reviews, impressions, and honest thoughts from Renato Dulog on recently played games.",
  path: "/extra/game-reviews",
  noindex: true,
});

const Playground = () => {
  return (
    <Container as="main">
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Playground | Renato Dulog",
            url: "https://renato-dulog.is-a.dev/extra/playground",
            description:
              "Interactive mini-apps and games by Renato Dulog — typing speed tests, Japanese flashcards, and more.",
            applicationCategory: "EntertainmentApplication",
            author: {
              "@type": "Person",
              name: "Renato Dulog",
              url: "https://renato-dulog.is-a.dev/",
            },
          }),
        }}
      /> */}
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
        </div>
        {/* Content */}
        <div>
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
            <Crown>Game Reviews</Crown>
            <Heading as="h1" className="text-3xl md:text-4xl sm:px-0 px-5">
              Games Worth Talking About
            </Heading>
            <p>
              Reviews, impressions, and brutally honest thoughts on the games
              I’ve been playing lately.
            </p>
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default Playground;
