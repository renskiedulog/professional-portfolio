"use client";
import { SearchResult } from "@/lib/types";
import React from "react";
import { GetRecommendationsParams } from "./page";
import Link from "next/link";
import { motion } from "framer-motion";

const RecommendationCard = ({
  recommendation,
  type,
  index,
}: {
  type: GetRecommendationsParams["type"];
  recommendation: SearchResult;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
      className="w-full"
    >
      <Link
        href={`/extra/recommendations/${type}/${recommendation?.id}`}
        className="relative rounded overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform duration-200 ease-in-out block"
        key={recommendation?.id}
      >
        <img
          src={recommendation.image}
          alt={recommendation.title}
          className="w-full aspect-[1/1.3] object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80" />

        {/* Title */}
        <p
          title={recommendation.title}
          className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium line-clamp-2 z-20 group-hover:line-clamp-3"
        >
          {recommendation.title}
        </p>
      </Link>
    </motion.div>
  );
};

export default RecommendationCard;
