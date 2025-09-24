"use client";
import { Badge } from "@/components/ui/badge";
import { SearchResult } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRandom } from "react-icons/fa";

const RandomButton = ({
  recommendations,
}: {
  recommendations: SearchResult[];
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (recommendations.length === 0) return;
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    const randomItem = recommendations[randomIndex];
    router.push(`/extra/recommendations/${randomItem.type}/${randomItem.id}`);
  };

  return (
    <Badge
      onClick={handleClick}
      className="cursor-pointer px-3 py-1.5 flex items-center gap-2 bg-blue-600 hover:bg-blue-400 dark:text-white"
    >
      <FaRandom />
      <span>Random</span>
    </Badge>
  );
};

export default RandomButton;
