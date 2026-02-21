"use client";

import { RoadmapSections } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export function Roadmap({ sections }: { sections: RoadmapSections }) {
  const months = Object.entries(sections);
  const [visibleCount, setVisibleCount] = useState(2);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 2, months.length));
        }
      },
      { rootMargin: "200px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [months.length]);

  const visibleMonths = months.slice(0, visibleCount);

  // Commit Section On Hover Expansion
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setExpanded(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setExpanded(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h-[100px] overflow-y-auto border rounded-xl bg-blue-50 transition-all duration-300 ${expanded ? "h-[500px]" : ""}`}
    >
      <div className="flex flex-col p-4 pb-0">
        {visibleMonths.map(([month, items], monthIdx) => (
          <div key={month} className="flex flex-col">
            {/* Month Header */}
            <h3 className="font-semibold text-base mb-4">{month}</h3>

            {items.map((item, idx) => {
              const isLastItem =
                monthIdx === visibleMonths.length - 1 &&
                idx === items.length - 1;

              return (
                <div
                  key={item.sha}
                  className="flex items-stretch gap-3 sm:gap-4"
                >
                  {/* Timeline Column */}
                  <div className="flex flex-col items-center pt-1.5">
                    <div className="bg-primary/70 w-3 h-3 rounded-full" />
                    {!isLastItem && (
                      <div className="flex-1 w-px bg-primary/50 mt-1.5" />
                    )}
                  </div>

                  {/* Content (always right side) */}
                  <div
                    className={`flex flex-col gap-1 ${isLastItem ? "pb-8" : "pb-5"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${commitTypeColor(
                          item.type,
                        )}`}
                      >
                        {item.type}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {item.date.toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm">{item.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div ref={loadMoreRef} className="h-10" />
      </div>
    </div>
  );
}

export const commitTypeColor = (type: string) => {
  switch (type) {
    case "Feature":
      return "bg-blue-100 text-blue-700";
    case "Bug Fix":
      return "bg-red-100 text-red-700";
    case "Refactor":
      return "bg-purple-100 text-purple-700";
    case "Chore":
      return "bg-gray-200 text-gray-700";
    case "Docs":
      return "bg-yellow-100 text-yellow-700";
    case "Performance":
      return "bg-green-100 text-green-700";
    case "Added":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
