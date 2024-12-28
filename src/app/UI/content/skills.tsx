import React from "react";
import Heading from "../global-components/heading";
import { DiMongodb } from "react-icons/di";
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
        name: "MongoDB",
        icon: DiMongodb,
      },
      {
        name: "Tailwind",
        icon: RiTailwindCssFill,
      },
      {
        name: "React",
        icon: FaReact,
      },
      {
        name: "Typescript",
        icon: BiLogoTypescript,
      },
    ],
  },
  {
    label: "Studying",
    width: "half",
    items: [
      {
        name: "Supabase",
        icon: RiSupabaseFill,
      },
      {
        name: "React Native",
        icon: RiReactjsLine,
      },
      {
        name: "Shadcn UI",
        icon: SiShadcnui,
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
    ],
  },
];

const Skills = () => {
  return (
    <div>
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
              <div className="flex items-center space-x-3 mt-1">
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
    </div>
  );
};

export default Skills;
