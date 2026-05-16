import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { FaArrowRight, FaInfo, FaGamepad } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { GrGift } from "react-icons/gr";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export const metadata = {
  title: "Extra",
  description:
    "Explore extras from Renato Dulog — anime & movie recommendations, live stats, playground games, dev tools, and more.",
  openGraph: {
    title: "Extra | Renato Dulog",
    description:
      "Explore extras from Renato Dulog — anime & movie recommendations, live stats, playground games, dev tools, and more.",
    url: "https://renato-dulog.is-a.dev/extra",
    siteName: "Renato Dulog | Developer Portfolio",
    images: [{ url: "https://renato-dulog.is-a.dev/me.webp", alt: "Renato Dulog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Extra | Renato Dulog",
    description:
      "Explore extras from Renato Dulog — anime & movie recommendations, live stats, playground games, dev tools, and more.",
    images: ["https://renato-dulog.is-a.dev/me.webp"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/extra`,
  },
};

const Extra = () => {
  return (
    <Container as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Extra | Renato Dulog",
            url: "https://renato-dulog.is-a.dev/extra",
            description:
              "Explore extras from Renato Dulog — anime & movie recommendations, live stats, playground games, dev tools, and more.",
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
          <BackButton href="/" label="Homepage" />
        </div>
        <div className="h-[90dvh] flex items-center justify-center">
          <div className="flex flex-wrap w-full gap-2 justify-center">
            <Link
              href="/extra/questions-you-might-ask"
              className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 group text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm"
            >
              <FaInfo size={32} />
              <p>Questions You Might Ask</p>
              <p className="flex items-center gap-2 group-hover:opacity-100 opacity-60">
                <span>EXPLORE</span>
                <FaArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition ease-in-out duration-200" />
              </p>
            </Link>
            <Link
              href="/extra/recommendations"
              className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 group text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm"
            >
              <BiLike size={32} />
              <div className="flex items-center gap-2 md:flex-row flex-col">
                <p>Recommendations</p>
                <div className="hidden md:block">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon size={18} />
                    </TooltipTrigger>
                    <TooltipContent>
                      Anime / Manga / Manhwa / Movie
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-xs italic md:hidden block">
                  Anime / Manga / Manhwa / Movie
                </span>
              </div>
              <p className="flex items-center gap-2 group-hover:opacity-100 opacity-60">
                <span>EXPLORE</span>
                <FaArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition ease-in-out duration-200" />
              </p>
            </Link>
            {/* <Link
              href="/extra/dev-tools"
              className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 group text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm"
            >
              <FaTools size={32} />
              <p>Developer Tools</p>
              <p className="flex items-center gap-2 group-hover:opacity-100 opacity-60">
                <span>EXPLORE</span>
                <FaArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition ease-in-out duration-200" />
              </p>
            </Link> */}
            <Link
              href="/extra/playground"
              className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 group text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm"
            >
              <FaGamepad size={32} />
              <p>Playground</p>
              <p className="flex items-center gap-2 group-hover:opacity-100 opacity-60">
                <span>EXPLORE</span>
                <FaArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition ease-in-out duration-200" />
              </p>
            </Link>
            <Link
              href="#"
              className="border min-w-60 md:min-w-0 basis-1/2 md:basis-1/4 group text-center bg-background rounded-md px-4 py-8 flex flex-col items-center justify-center gap-2 md:text-base text-sm"
            >
              <GrGift size={32} />
              <p>Coming Soon...</p>
            </Link>
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default Extra;
