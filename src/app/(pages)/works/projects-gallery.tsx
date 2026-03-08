"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing my work and skills.",
    images: ["/projects/portfolio.webp"],
    link: "/works/portfolio",
  },
];

export default function ProjectsGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({
      x: e.clientX + 24,
      y: e.clientY + 24,
    });
  };

  return (
    <section onMouseMove={handleMouseMove} className="relative w-full mt-5">
      <div className="flex flex-col divide-y divide-neutral-200">
        {projects.map((project, index) => (
          <Link
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative py-5 px-6 md:px-20 cursor-pointer overflow-hidden font-mono"
            href={project?.link || "#"}
          >
            {/* Content */}
            <div className="relative z-10 max-w-3xl  sm:text-left text-center">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tigh">
                {project.title}
              </h2>

              <p className="mt-3 text-primary">{project.description}</p>
            </div>

            {/* Right Subtle Image with Mask */}
            <div className="absolute right-0 top-0 h-full w-full md:w-[40%] pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to left, black 70%, transparent 100%)",
                }}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-30 sm:opacity-50"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Cursor Preview */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursor.x,
              y: cursor.y,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="pointer-events-none fixed top-0 left-0 z-50 w-56 h-56 overflow-hidden rounded-xl shadow-xl sm:block hidden"
          >
            <motion.img
              src={projects[hoveredIndex].images[0]}
              alt="preview"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
