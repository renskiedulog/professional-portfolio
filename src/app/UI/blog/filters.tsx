"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const filterOptions = [
  { id: "latest", label: "Latest Posts" },
  { id: "popular", label: "Popular" },
  { id: "trending", label: "Trending" },
  { id: "beginner", label: "For Beginners" },
  { id: "advanced", label: "Advanced Topics" },
  { id: "tutorial", label: "Tutorials" },
  { id: "opinion", label: "Opinion Pieces" },
  { id: "news", label: "Industry News" },
  { id: "productivity", label: "Productivity" },
  { id: "career", label: "Career Advice" },
  { id: "freelance", label: "Freelancing" },
  { id: "remoteWork", label: "Remote Work" },
  { id: "sideProjects", label: "Side Projects" },
  { id: "startups", label: "Startups & Entrepreneurship" },
  { id: "webDev", label: "Web Development" },
  { id: "backend", label: "Backend Engineering" },
  { id: "frontend", label: "Frontend & UI/UX" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "opensource", label: "Open Source" },
  { id: "security", label: "Cybersecurity" },
  { id: "devOps", label: "DevOps & Automation" },
  { id: "testing", label: "Testing & QA" },
  { id: "codeReview", label: "Code Reviews" },
  { id: "debugging", label: "Debugging" },
  { id: "tools", label: "Tools & Resources" },
  { id: "books", label: "Books & Learning" },
  { id: "techCulture", label: "Tech Culture" },
  { id: "gaming", label: "Gaming & Development" },
  { id: "mentalHealth", label: "Mental Health & Burnout" },
  { id: "random", label: "Just for Fun" },
];

const FilterBadge = ({ label, isSelected, onClick }) => (
  <Badge
    variant={isSelected ? "default" : "outline"}
    className={`cursor-pointer text-sm font-normal ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
    onClick={onClick}
  >
    {label}
    {isSelected && <X className="ml-1 h-3 w-3" />}
  </Badge>
);

const Filters = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <section className="pt-5">
      <div className="flex flex-wrap items-center mx-0 md:mx-5 justify-center gap-1.5 sm:gap-2">
        {filterOptions.map((filter) => (
          <FilterBadge
            key={filter.id}
            label={filter.label}
            isSelected={selectedFilters.includes(filter.id)}
            onClick={() => toggleFilter(filter.id)}
          />
        ))}
        <AnimatePresence>
          {selectedFilters.length > 0 && (
            <motion.button
              key="clear-button"
              onClick={clearFilters}
              className="hover:underline text-sm text-red-500"
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              Clear All
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Filters;
