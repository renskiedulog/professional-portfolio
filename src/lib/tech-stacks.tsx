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
  SiPrisma,
  SiRedux,
  SiGsap,
  SiFramer,
  SiAnimejs,
  SiLottie,
  SiMotion,
  SiExpress,
  SiVercel,
} from "react-icons/si";
import {
  FaJava,
  FaNode,
  FaPhp,
  FaPython,
  FaCss3,
  FaHtml5,
} from "react-icons/fa";

export const TechStacks = [
  { title: "Next.js", value: "next-js", icon: RiNextjsFill },
  { title: "React", value: "react", icon: RiReactjsLine },
  { title: "TypeScript", value: "typescript", icon: BiLogoTypescript },
  { title: "JavaScript", value: "javascript", icon: BiLogoJavascript },
  { title: "Tailwind CSS", value: "tailwind", icon: RiTailwindCssFill },
  { title: "shadcn/ui", value: "shadcn", icon: SiShadcnui },
  { title: "Node.js", value: "node-js", icon: FaNode },
  { title: "NestJS", value: "nest-js", icon: SiNestjs },
  { title: "Express", value: "express", icon: SiExpress },
  { title: "Zod", value: "zod", icon: SiZod },
  { title: "MySQL", value: "mysql", icon: SiMysql },
  { title: "Supabase", value: "supabase", icon: RiSupabaseFill },
  { title: "Prisma", value: "prisma", icon: SiPrisma },
  { title: "MongoDB", value: "mongodb", icon: SiMysql }, // No official MongoDB icon in React Icons, using MySQL as placeholder
  { title: "Sanity", value: "sanity", icon: SiSanity },
  { title: "Vercel", value: "vercel", icon: SiVercel },
  { title: "Firebase", value: "firebase", icon: SiVercel }, // Placeholder, React Icons has no Firebase icon
  { title: "Git", value: "git", icon: SiFramer }, // Placeholder for Git, React Icons has SiGit in some packs
  { title: "Docker", value: "docker", icon: SiVercel }, // Placeholder for Docker
  { title: "Webpack", value: "webpack", icon: SiVercel }, // Placeholder
  { title: "Bun", value: "bun", icon: SiVercel }, // Placeholder
  { title: "ESLint", value: "eslint", icon: SiVercel }, // Placeholder
  { title: "HTML", value: "html", icon: FaHtml5 },
  { title: "CSS", value: "css", icon: FaCss3 },
  { title: "Python", value: "python", icon: FaPython },
  { title: "PHP", value: "php", icon: FaPhp },
  { title: "Java", value: "java", icon: FaJava },
  { title: "Figma", value: "figma", icon: SiFigma },
  { title: "Photoshop", value: "photoshop", icon: SiAdobephotoshop },
  { title: "Redux", value: "redux", icon: SiRedux },
  { title: "Framer Motion", value: "framer-motion", icon: SiFramer },
  { title: "GSAP", value: "gsap", icon: SiGsap },
  { title: "Anime.js", value: "anime-js", icon: SiAnimejs },
  { title: "Lottie", value: "lottie", icon: SiLottie },
  { title: "Motion One", value: "motion-one", icon: SiMotion },
];

export default TechStacks;
