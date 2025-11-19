"use client";

import { RoadmapSections } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export function Roadmap({ sections }: { sections: RoadmapSections }) {
  const months = Object.entries(sections);
  const [visibleCount, setVisibleCount] = useState(2); // show first 2 months
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(
            (prev) => Math.min(prev + 2, months.length) // load 2 more
          );
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [months.length]);

  const visibleMonths = months.slice(0, visibleCount);

  return (
    <div className="h-[600px] overflow-y-auto px-6 py-4 border rounded-xl">
      <div className="relative ml-4">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>

        <div className="space-y-10">
          {visibleMonths.map(([month, items]) => (
            <div key={month} className="relative pl-6">
              <div className="absolute left-[-10px] top-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />

              <h2 className="font-bold text-lg mb-3">{month}</h2>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.sha}
                    className="bg-gray-50 p-3 rounded-lg shadow-sm border"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${commitTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>

                      <p className="font-medium">{item.message}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {item.date.toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sentinel for infinite scroll */}
          <div ref={loadMoreRef} className="h-10"></div>
        </div>
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
