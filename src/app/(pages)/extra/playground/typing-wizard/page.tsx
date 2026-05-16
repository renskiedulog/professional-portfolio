import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import TypingWizardUI from "./components/ui";

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
        <div className="h-[92dvh] w-full">
          <TypingWizardUI />
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
