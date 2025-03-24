"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickX = e.clientX;
    const totalWidth = window.innerWidth;
    const targetScroll =
      (clickX / totalWidth) *
      (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-0.5 transition ease-in-out duration-200 bg-black/10 cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        className="h-full bg-primary/30"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "easeOut", duration: 0.15 }}
      />
    </div>
  );
};

export default ScrollProgress;
