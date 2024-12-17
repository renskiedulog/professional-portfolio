"use client";
import React from "react";
import { Home, Moon, Notebook, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  {
    label: "Home",
    icon: Home,
    link: "/",
  },
  {
    label: "Blog",
    icon: Notebook,
    link: "/blog",
  },
];

const socials = [
  {
    label: "Facebook",
    icon: FaFacebookSquare,
    link: "/",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    link: "/blog",
  },
  {
    label: "Github",
    icon: FaGithub,
    link: "/blog",
  },
];

const NavigationBar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="fixed z-50 bottom-5 left-1/2 bg-background -translate-x-1/2 rounded-full flex items-center divide-x divide-primary/20 border border-primary/50">
      {/* Links */}
      <div className="flex overflow-hidden">
        {links?.length > 0 &&
          links?.map((link, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <Link
                  href={link?.link ?? "#"}
                  className="text-xs first:rounded-l-full first:pl-3.5 p-2.5 hover:bg-primary/10 transition-all duration-150 ease-linear"
                >
                  {<link.icon size={18} fontWeight="light" />}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link?.label ?? "Link"}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
      <div className="flex overflow-hidden">
        {socials?.length > 0 &&
          socials?.map((socials, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <Link
                  href={socials?.link ?? "#"}
                  className="text-xs p-2.5 hover:bg-primary/10 transition-all duration-150 ease-linear"
                >
                  {<socials.icon size={18} fontWeight="light" />}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{socials?.label ?? "Link"}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
      {/* <ThemeToggler /> */}
      <div className="relative px-2.5 h-[38px] flex items-center justify-center gap-2 pr-3">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            exit={{ rotate: -90 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          >
            <Moon
              onClick={() => setTheme("light")}
              size={18}
              fontWeight="light"
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90 }}
            animate={{ rotate: 0 }}
            exit={{ rotate: 90 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          >
            <Sun
              onClick={() => setTheme("dark")}
              size={18}
              fontWeight="light"
            />
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
