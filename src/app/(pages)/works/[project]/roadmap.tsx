"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapSections } from "@/lib/types";
import { useRef, useState } from "react";

export function Roadmap({ sections }: { sections: RoadmapSections }) {
  const months = Object.entries(sections);

  // Hover expansion
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

  if (!sections && months.length === 0) return null;

  return (
    <ScrollArea
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h-[200px] overflow-y-auto border rounded-xl transition-all duration-300 ${
        expanded ? "h-[450px]" : ""
      }`}
    >
      <div className="flex flex-col p-4 pb-0 w-full">
        {months.map(([month, items], monthIdx) => (
          <div key={month} className="flex flex-col w-full">
            <h3 className="font-semibold text-base mb-4">{month}</h3>

            {items.map((item, idx) => {
              const isLastItemInMonth = idx === items.length - 1;

              return (
                <div
                  key={item.sha}
                  className="flex items-stretch gap-2 sm:gap-3"
                >
                  {/* Timeline Column */}
                  <div className="flex flex-col items-center pt-1.5">
                    <div className="bg-primary/70 w-3 h-3 rounded-full" />
                    {!isLastItemInMonth && (
                      <div className="flex-1 w-px bg-primary/50 mt-1.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col gap-1 w-full pb-4`}>
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
                    <p className="text-sm w-full break-all">
                      {item.message?.split(":").slice(1).join(":").trim()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </ScrollArea>
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
