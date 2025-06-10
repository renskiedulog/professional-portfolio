"use client";
import CursorFollower from "@/app/UI/animation-wrappers/cursor-follower";
import React from "react";

const ProjectsGallery = () => {
  return (
    <div className="flex flex-col gap-5 relative">
      <div className="w-full h-80 bg-black/20" />
      <div className="w-full h-80 bg-black/20" />
      <div className="w-full h-80 bg-black/20" />
      <div className="w-full h-80 bg-black/20" />
      <CursorFollower className="bg-green-500" />
    </div>
  );
};

export default ProjectsGallery;
