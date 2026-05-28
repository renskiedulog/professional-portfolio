import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import TypingWizardUI from "./components/ui";
import Image from "next/image";

export const metadata = {
  title: "Typing Wizard",
  description:
    "Test and improve your typing speed with Typing Wizard — an interactive typing game by Renato Dulog.",
  openGraph: {
    title: "Typing Wizard | Renato Dulog",
    description:
      "Test and improve your typing speed with Typing Wizard — an interactive typing game by Renato Dulog.",
    url: "https://renato-dulog.is-a.dev/extra/playground/typing-wizard",
    siteName: "Renato Dulog | Developer Portfolio",
    images: [{ url: "https://renato-dulog.is-a.dev/me.webp", alt: "Renato Dulog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Wizard | Renato Dulog",
    description:
      "Test and improve your typing speed with Typing Wizard — an interactive typing game by Renato Dulog.",
    images: ["https://renato-dulog.is-a.dev/me.webp"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/extra/playground/typing-wizard`,
  },
};

const Page = () => {
  return (
    <Container as="main" className="!pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GameApplication",
            name: "Typing Wizard",
            url: "https://renato-dulog.is-a.dev/extra/playground/typing-wizard",
            description:
              "Test and improve your typing speed with Typing Wizard — an interactive typing game by Renato Dulog.",
            applicationCategory: "GameApplication",
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
        <div className="w-full flex justify-between mb-3">
          <BackButton href="/extra/playground" label="Playground" />
        </div>
        {/* Desktop only */}
        <div className="hidden md:block h-[92dvh] w-full">
          <TypingWizardUI />
        </div>
        {/* Mobile fallback */}
        <div className="flex md:hidden h-[80dvh] w-full flex-col items-center justify-center gap-y-2 text-center px-4">
          <Image src="/keyboard-key.png" alt="Keyboard" width={80} height={80} className="opacity-80" />
          <h2 className="text-3xl font-semibold">Desktop Only</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Typing Wizard requires a physical keyboard. Open this page on a desktop or laptop to play.
          </p>
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
