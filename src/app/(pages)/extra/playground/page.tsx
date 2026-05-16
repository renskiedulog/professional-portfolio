import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { FaArrowRight, FaKeyboard } from "react-icons/fa6";
import { GrGift } from "react-icons/gr";
import Link from "next/link";

export const metadata = {
  title: "Playground",
  description:
    "Interactive mini-apps and games by Renato Dulog — typing speed tests, Japanese flashcards, and more.",
  openGraph: {
    title: "Playground | Renato Dulog",
    description:
      "Interactive mini-apps and games by Renato Dulog — typing speed tests, Japanese flashcards, and more.",
    url: "https://renato-dulog.is-a.dev/extra/playground",
    siteName: "Renato Dulog | Developer Portfolio",
    images: [{ url: "https://renato-dulog.is-a.dev/me.webp", alt: "Renato Dulog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playground | Renato Dulog",
    description:
      "Interactive mini-apps and games by Renato Dulog — typing speed tests, Japanese flashcards, and more.",
    images: ["https://renato-dulog.is-a.dev/me.webp"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/extra/playground`,
  },
};

const Playground = () => {
  return (
    <Container as="main">
      <script
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
      />
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
        </div>
        <div className="h-[90dvh] flex items-center justify-center">
          <div className="flex flex-wrap w-full gap-2 justify-center">
            <Link
              href="/extra/playground/typing-wizard"
              className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 group text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm"
            >
              <FaKeyboard size={32} />
              <p>Typing Wizard</p>
              <p className="text-xs italic opacity-60 px-2">
                Type falling words to cast spells
              </p>
              <p className="flex items-center gap-2 group-hover:opacity-100 opacity-60">
                <span>PLAY</span>
                <FaArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition ease-in-out duration-200" />
              </p>
            </Link>
            <div className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm opacity-50 cursor-not-allowed">
              <GrGift size={32} />
              <p>Coming Soon...</p>
            </div>
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default Playground;
