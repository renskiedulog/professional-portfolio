"use client";
import { SearchResult } from "@/lib/types";
import React from "react";
import { GetRecommendationsParams } from "./page";
import Link from "next/link";

const RecommendationCard = ({
  recommendation,
  type,
}: {
  type: GetRecommendationsParams["type"];
  recommendation: SearchResult;
}) => {
  return (
    <Link
      href={`/extra/recommendations/${type}/${recommendation?.id}`}
      className="relative rounded overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform duration-200 ease-in-out"
      key={recommendation?.id}
    >
      <img
        src={recommendation.image}
        alt={recommendation.title}
        className="w-full aspect-[1/1.3] object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80" />
      <p
        title={recommendation.title}
        className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium line-clamp-2 z-20 group-hover:line-clamp-3"
      >
        {recommendation.title}
      </p>
    </Link>
  );
};

export default RecommendationCard;
