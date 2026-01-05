import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import { Button } from "@/components/ui/button";
import { PriceItem } from "@/lib/types";
import { StatusType } from "./page";
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";

const prices: PriceItem[] = [
  {
    title: "Student",
    description: "For students looking to delegate their school projects.",
    asLowAs: true,
    price: "$9",
    priceSubtitle: "per instance",
    samplesLabel: "Common Requests",
    samples: [
      "Simple CRUD Applications",
      "Frontend Assignments",
      "API Integration Tasks",
      "Bug Fixes & Code Cleanup",
      "Technical Consultations",
    ],
  },
  {
    title: "Business",
    description:
      "For small to medium businesses needing professional web solutions.",
    asLowAs: true,
    price: "$99",
    priceSubtitle: "per instance",
    samplesLabel: "Typical Builds",
    samples: [
      "Marketing & Landing Pages",
      "Company Websites",
      "Portfolios & Blogs",
      "Process Automations",
      "SEO Optimizations",
    ],
  },
  {
    title: "Scope Based",
    description:
      "Customized solutions based on your use cases and requirements.",
    startsAt: "Price Varies",
    price: "Custom",
    buttonLabel: "Let's Talk",
    samplesLabel: "Custom Work",
    samples: [
      "Web Applications",
      "Internal Tools",
      "Integrations & Automations",
      "Capstone & Final Projects",
      "Custom Software Solutions",
    ],
  },
];

const Pricing = async ({ status }: { status: "unavailable" | "busy" }) => {
  const statusContent = {
    busy: {
      label: "BUSY",
      message: "My apologies, I am still preoccupied on a lot of things.",
    },
    unavailable: {
      label: "UNAVAILABLE",
      message: "My apologies, I am unavailable for the time being.",
    },
  };

  const current = statusContent[status];

  return (
    <section>
      <div className="text-center flex flex-col mx-auto mt-10 gap-2 ">
        <Crown>My Service Price</Crown>
        <Heading className="w-full text-center text-3xl md:text-4xl">
          How Little It Would Cost You
        </Heading>
        <p>
          Reliable development services built with modern tools to help your
          ideas become real, working products.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mt-10 relative">
        {prices?.length > 0 &&
          prices?.map((price, idx) => (
            <Card index={idx} card={price} key={idx} />
          ))}
        {status === "busy" ||
          (status === "unavailable" && (
            <div className="absolute inset-0 dark:bg-background/90 bg-background/80 backdrop-blur-md sm:border border-white/10 shadow-lg rounded-xl flex items-center justify-center">
              <div className="w-full min-h-[calc(100vh-40px)] flex flex-col items-center justify-center space-y-2 px-5 text-center">
                <p>{current?.message}</p>

                <h1 className="text-5xl font-black text-primary/90 dark:text-primary">
                  {current?.label}
                </h1>

                <p className="max-w-sm text-xs">
                  You can also try to inquire more thoroughly by sending me a
                  message on my social media accounts.
                </p>
              </div>
            </div>
          ))}
      </div>
      <blockquote className="max-w-2xl mt-4 text-xs mx-auto text-center">
        Note: Prices may vary depending on the scope of work, features required,
        and overall project timeline. Any adjustments will be clearly
        communicated before proceeding.
      </blockquote>
    </section>
  );
};

const Card = ({ card, index }: { card: PriceItem; index: number }) => {
  return (
    <div className="col-span-1 w-full border-primary/60 border rounded-xl p-6 group">
      <div className="transition-all space-y-4">
        {card?.title && (
          <h3 className="font-bold text-xl mt-2 transition-all opacity-80 font-geist">
            {card?.title}
          </h3>
        )}
        <div>
          <span className="text-sm">{card?.startsAt ?? "For as low as:"}</span>
          <div className="flex items-center gap-1.5">
            {card?.price && (
              <p className="font-bold text-black dark:text-primary text-4xl font-sans">
                {card?.price}
              </p>
            )}
            {card?.priceSubtitle && (
              <span className="self-end mb-1 text-sm opacity-80">
                {card?.priceSubtitle}
              </span>
            )}
          </div>
        </div>
        {card?.description && <p className="mt-4">{card?.description}</p>}
        <Button
          className="w-full shadow-md"
          variant={index % 2 === 0 ? "outline" : "default"}
        >
          {card?.buttonLabel || "Get Started"}
        </Button>
      </div>
      <div className="w-full h-[1px] border-b border-primary/80 mt-6 mb-4 rounded-full" />
      <div className="mt-4 space-y-2">
        {card?.samplesLabel && (
          <h4 className="text-lg font-geist">{card?.samplesLabel}</h4>
        )}
        {card?.samples?.length > 0 &&
          card?.samples?.map((sample, index) => (
            <div
              className="flex items-center gap-1.5 text-sm font-normal sm:font-thin"
              key={index}
            >
              <IoMdCheckmark className="size-4" />
              <p>{sample}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pricing;
