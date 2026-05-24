"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ProjectPreview } from "./projects-gallery";

const CATEGORY_LABEL: Record<string, string> = {
  "example site": "Example Site",
  application: "Application",
  website: "Website",
  game: "Game",
  tool: "Tool",
  template: "Template",
  playground: "Playground",
};

export default function ProjectsList({
  projects,
}: {
  projects: ProjectPreview[];
}) {
  const categories = [
    "all",
    ...Array.from(
      new Set(projects.map((p) => p.category).filter(Boolean) as string[])
    ),
  ];

  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="w-full mt-6">
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}>
            <Badge
              variant={active === cat ? "default" : "outline"}
              className="cursor-pointer text-xs capitalize"
            >
              {cat === "all" ? "All" : (CATEGORY_LABEL[cat] ?? cat)}
            </Badge>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/works/${project.slug}`}
            className="block mb-4 group"
          >
            <div className="border rounded-md overflow-hidden shadow-sm bg-background hover:shadow-md transition-shadow duration-200">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    No preview
                  </span>
                </div>
              )}
              <div className="px-3.5 py-3 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-lg leading-snug">
                    {project.title}
                  </p>
                  {project.category && (
                    <Badge
                      variant="outline"
                      className="text-[10px] shrink-0 mt-0.5"
                    >
                      {CATEGORY_LABEL[project.category] ?? project.category}
                    </Badge>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground py-6">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
