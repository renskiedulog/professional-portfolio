"use client";
import React from "react";
import { Home, Moon, Notebook, Sun } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
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
    link: "https://web.facebook.com/renato.dulog",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/renato-dulog-004582276/",
  },
  {
    label: "Github",
    icon: FaGithub,
    link: "https://github.com/renskiedulog",
  },
];

const NavigationBar = () => {
  const { setTheme, theme } = useTheme();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const popToUpVariants: Variants = {
    hidden: {
      scale: 0.8,
      y: 50,
      filter: `blur(50px)`,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    up: {
      scale: 1,
      y: 0,
      filter: `blur(0px)`,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      },
    },
    down: {
      scale: 0.9,
      y: 30,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.4,
      },
      filter: `blur(50px)`,
      opacity: 0,
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className="fixed z-50 bottom-5 left-1/2 -translate-x-1/2">
      <motion.div
        className="bg-background rounded-full flex items-center divide-x divide-primary/20 border border-primary/50"
        initial="hidden" 
        animate={scrollDirection} 
        variants={popToUpVariants} 
      >
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
                    target="_blank"
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
      </motion.div>
    </nav>
  );
};

export default NavigationBar;
