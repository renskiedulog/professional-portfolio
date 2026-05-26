"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Github, Link as LinkIcon } from "lucide-react";
import type { ProjectPreview } from "./projects-gallery";

const CATEGORY_LABEL: Record<string, string> = {
  "example site": "Example Site",
  application: "Application",
  website: "Website",
  game: "Game",
  tool: "Tool",
  template: "Template",
  playground: "Playground",
  integration: "Integration",
  "web app": "Web App",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/works/${project.slug}`}
            className="block group"
          >
            <div className="border rounded-md overflow-hidden shadow-sm bg-background hover:shadow-md transition-shadow duration-200">
              <div className="relative">
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
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  {project.category && (
                    <Badge className="text-[10px] bg-background/80 hover:bg-background/80 text-foreground border backdrop-blur-sm">
                      {CATEGORY_LABEL[project.category] ?? project.category}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1.5 ml-auto">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background/80 backdrop-blur-sm rounded p-1 text-foreground hover:bg-background transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={12} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background/80 backdrop-blur-sm rounded p-1 text-foreground hover:bg-background transition-colors"
                        aria-label="Live site"
                      >
                        <LinkIcon size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-3.5 py-3 space-y-1.5">
                <p className="font-bold text-lg leading-snug">
                  {project.title}
                </p>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                )}
                {project.stacks && project.stacks.length > 0 && (
                  <div className="flex gap-1 flex-wrap pt-0.5">
                    {project.stacks.slice(0, 3).map((stack, i) => (
                      <span
                        key={i}
                        className="bg-primary-foreground dark:bg-white/20 text-primary text-[11px] py-0.5 px-1.5 border border-opacity-10 rounded text-nowrap font-semibold"
                      >
                        {stack}
                      </span>
                    ))}
                    {project.stacks.length > 3 && (
                      <span className="bg-primary-foreground dark:bg-white/20 text-primary text-[11px] py-0.5 px-1.5 border border-opacity-10 rounded text-nowrap font-semibold">
                        +{project.stacks.length - 3} more
                      </span>
                    )}
                  </div>
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
