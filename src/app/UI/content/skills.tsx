import React from "react";
import { BiLogoTypescript, BiLogoJavascript } from "react-icons/bi";
import {
  RiTailwindCssFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiReactjsLine,
} from "react-icons/ri";
import {
  SiSanity,
  SiMysql,
  SiAdobephotoshop,
  SiFigma,
  SiShadcnui,
  SiNestjs,
  SiZod,
} from "react-icons/si";
import {
  FaJava,
  FaNode,
  FaPhp,
  FaPython,
  FaCss3,
  FaHtml5,
  FaReact,
} from "react-icons/fa";
import Heading from "../global-components/heading";

const skills = [
  {
    label: "Tech Stack",
    width: "half",
    items: [
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
        name: "Shadcn UI",
        icon: SiShadcnui,
      },
    ],
  },
  {
    label: "Studying",
    width: "half",
    items: [
      {
        name: "Nest JS",
        icon: SiNestjs,
      },
      {
        name: "Zod",
        icon: SiZod,
      },
    ],
  },
  {
    label: "Languages and Tools",
    items: [
      {
        name: "HTML",
        icon: FaHtml5,
      },
      {
        name: "CSS",
        icon: FaCss3,
      },
      {
        name: "Javascript",
        icon: BiLogoJavascript,
      },
      {
        name: "React",
        icon: FaReact,
      },
      {
        name: "Typescript",
        icon: BiLogoTypescript,
      },
      {
        name: "Python",
        icon: FaPython,
      },
      {
        name: "PHP",
        icon: FaPhp,
      },
      {
        name: "Java",
        icon: FaJava,
      },
      {
        name: "Node",
        icon: FaNode,
      },
      {
        name: "Sanity",
        icon: SiSanity,
      },
      {
        name: "MySQL",
        icon: SiMysql,
      },
      {
        name: "Photoshop",
        icon: SiAdobephotoshop,
      },
      {
        name: "Figma",
        icon: SiFigma,
      },
      {
        name: "Supabase",
        icon: RiSupabaseFill,
      },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills">
      <Heading>Skills</Heading>
      <div className="flex flex-wrap items-start">
        {skills?.length > 0 &&
          skills?.map((skill, idx) => (
            <div
              key={idx}
              className={`${
                skill.width === "half"
                  ? "max-w-[300px] w-full mt-3"
                  : "w-full mt-3"
              }`}
            >
              <h3 className="text-lg font-semibold text-primary/90">
                {skill?.label}
              </h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {skill?.items?.length > 0 &&
                  skill?.items?.map((item, index) => (
                    <div
                      key={`${item?.name}-${index}`}
                      className="flex justify-center items-center flex-col gap-1"
                    >
                      {item?.icon && (
                        <item.icon className="text-primary" size={28} />
                      )}
                      {item?.name && (
                        <p className="text-[10px]">{item?.name}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Skills;
