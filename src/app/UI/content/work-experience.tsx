import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Heading from "../global-components/heading";
import Image from "next/image";
import React from "react";
import { BiLogoTypescript } from "react-icons/bi";
import {
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiSanity,
  SiShadcnui,
  SiGooglesearchconsole,
  SiMedusa,
  SiClaude,
  SiVercel,
  SiNetlify,
} from "react-icons/si";
import { getDuration } from "@/lib/utils";

interface WorkExperience {
  company: string;
  logo: string;
  link: string;
  address?: string;
  setup?: "Remote" | "On-site" | "Hybrid";
  history: {
    role: string;
    period: {
      start: Date;
      end: Date | null;
    };
    status: "Full-time" | "Part-time" | "Contract" | "Internship";
    responsibilities: string[];
  }[];
  techStack: {
    name: string;
    icon: React.ComponentType<{ size?: string | number; color?: string }>;
  }[];
}

export function formatWorkPeriod(start: Date, end: Date | null) {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };

  const startText = start.toLocaleDateString("en-US", options);
  const endText = end ? end.toLocaleDateString("en-US", options) : "Present";

  return `${startText} - ${endText}`;
}

const experiences: WorkExperience[] = [
  {
    company: "WebriQ",
    logo: "/webriq.webp",
    address: "Cebu, Central Visayas, Philippines",
    setup: "Hybrid",
    link: "https://webriq.com",
    history: [
      {
        role: "Full Stack Developer",
        period: {
          start: new Date(2025, 1),
          end: null,
        },
        status: "Full-time",
        responsibilities: [
          "Developing and maintaining web applications using modern frameworks like NextJS, Supabase and Tailwind CSS.",
          "Collaborating with cross-functional teams to define, design, and ship new features on existing and new projects.",
        ],
      },
      {
        role: "Frontend Web Developer",
        period: {
          start: new Date(2024, 10),
          end: new Date(2025, 1),
        },
        status: "Part-time",
        responsibilities: [
          "Maintaining client websites and tending to update requests.",
          "Improving SEO performance using PageSpeed, GSC, and other tools.",
        ],
      },
      {
        role: "Frontend Web Developer",
        period: {
          start: new Date(2024, 1),
          end: new Date(2024, 10),
        },
        status: "Internship",
        responsibilities: [
          "Building CMS-driven websites using a custom Sanity setup with Next.js.",
          "Managing structured content for dynamic and scalable page rendering.",
          "Creating responsive and accessible user interfaces.",
        ],
      },
    ],
    techStack: [
      {
        name: "Next.js",
        icon: RiNextjsFill,
      },
      {
        name: "Tailwind",
        icon: RiTailwindCssFill,
      },
      {
        name: "Typescript",
        icon: BiLogoTypescript,
      },
      {
        name: "Sanity",
        icon: SiSanity,
      },
      {
        name: "Supabase",
        icon: RiSupabaseFill,
      },
      {
        name: "Shadcn UI",
        icon: SiShadcnui,
      },
      {
        name: "GSC",
        icon: SiGooglesearchconsole,
      },
      {
        name: "Claude",
        icon: SiClaude,
      },
      {
        name: "Vercel",
        icon: SiVercel,
      },
      {
        name: "Netlify",
        icon: SiNetlify,
      },
    ],
  },
];

export default function WorkExperience() {
  return (
    <section id="work-experience" className="w-full max-w-xl space-y-3">
      <Heading>Work Experience</Heading>
      <div className="space-y-3">
        {experiences.map((experience, index) => (
          <div key={index} className="w-full">
            <Link
              href={experience?.link}
              target="_blank"
              className="flex items-center justify-between gap-4 group"
            >
              <div className="flex sm:flex-row items-center gap-2 w-full">
                <Image
                  width={40}
                  height={40}
                  src={experience.logo}
                  alt={experience.company}
                />
                {/* Details */}
                <div className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="font-bold text-lg flex items-center group-hover:underline text-primary leading-tight">
                      {experience.company}
                      <ChevronRight
                        size={18}
                        className="group-hover:opacity-100 opacity-0 transition-all duration-300 translate-x-0 group-hover:translate-x-2"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium whitespace-nowrap sm:hidden block">
                      {(() => {
                        const start = experience.history.at(-1)?.period.start;
                        if (!start) return null;

                        const { years, months } = getDuration(start, null);

                        return `${years} years ${months > 0 ? `and ${months} month${months > 1 ? "s" : ""}` : ""}`;
                      })()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    {experience?.address && <p>{experience?.address}</p>}
                    {experience?.setup && (
                      <>
                        <span>•</span>
                        <p>{experience?.setup}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium whitespace-nowrap sm:block hidden">
                {(() => {
                  const start = experience.history.at(-1)?.period.start;
                  if (!start) return null;

                  const { years, months } = getDuration(start, null);

                  return `${years} years ${months > 0 ? `and ${months} month${months > 1 ? "s" : ""}` : ""}`;
                })()}
              </p>
            </Link>
            {/* Experience */}
            {experience?.history && experience?.history?.length > 0 && (
              <div className="flex flex-col p-3 pb-0">
                {experience?.history?.map((item, idx) => (
                  <div
                    className="flex items-stretch gap-2 sm:gap-4 relative"
                    key={idx}
                  >
                    {/* Timeline column */}
                    <div className="flex flex-col items-center pt-1.5">
                      <div className="bg-primary/70 w-3 h-3 rounded-full" />
                      <div className={`flex-1 w-px bg-primary/50 mt-1.5`} />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex flex-col gap-1 ${idx === experience.history.length - 1 ? "pb-8" : "pb-5"}`}
                    >
                      {item?.role && (
                        <h4 className="font-semibold">{item?.role}</h4>
                      )}

                      <p className="text-sm text-muted-foreground font-medium">
                        {formatWorkPeriod(item.period.start, item.period.end)} •{" "}
                        {item.status}
                      </p>

                      {item?.responsibilities && (
                        <ul className="list-disc pl-5 space-y-1 mt-1">
                          {item.responsibilities.map((responsibility, rIdx) => (
                            <li key={rIdx} className="text-sm">
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="border border-primary/70 w-full h-max rounded-md relative p-2">
              <div className="absolute -top-3 left-8 font-geist font-bold px-2 text-sm bg-background rounded-full">
                <span className="opacity-70">Technologies</span>
              </div>
              <div className="flex flex-wrap just gap-3 mt-2">
                {experience.techStack.map((tech, techIdx) => (
                  <div
                    key={`${tech?.name}-${index}`}
                    className="flex justify-center items-center flex-col gap-1 basis-full sm:basis-0 max-w-[48px] flex-1 dark:opacity-100 opacity-80"
                  >
                    {tech?.icon && (
                      <tech.icon className="text-primary" size={28} />
                    )}
                    {tech?.name && (
                      <p className="text-[10px] whitespace-nowrap">
                        {tech?.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
