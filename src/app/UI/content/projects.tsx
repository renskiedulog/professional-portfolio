import React from "react";
import Heading from "../global-components/heading";
import { RiNextjsFill } from "react-icons/ri";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Project {
  title: String;
  description?: String;
  image?: String;
  videoUrl?: String;
  githubLink?: String;
  liveUrl?: String;
  stacks?: Stack[];
}

interface Stack {
  title: String;
  icon: React.ReactNode | any;
}

const projects: Project[] = [
  {
    title: "Example",
    description: "Example Description",
    image: "",
    videoUrl: "",
    githubLink: "",
    liveUrl: "",
    stacks: [
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
    ],
  },
  {
    title: "Example",
    description: "Example Description",
    image: "",
    videoUrl: "",
    githubLink: "",
    liveUrl: "",
    stacks: [
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
    ],
  },
  {
    title: "Example",
    description: "Example Description",
    image: "",
    videoUrl: "",
    githubLink: "",
    liveUrl: "",
    stacks: [
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
      {
        title: "NextJS",
        icon: RiNextjsFill,
      },
    ],
  },
];

const Projects = () => {
  return (
    <div className="w-full max-w-xl space-y-3">
      <Heading>Projects</Heading>
      <div className="grid grid-cols-2 gap-3">
        {projects?.length > 0 &&
          projects?.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="border p-3.5 rounded shadow-sm bg-background">
      <Image className="aspect-video object-cover" src="/usc.jpg" width={500} height={500} alt={project?.title as string} />
      <h3>{project?.title}</h3>
    </div>
  );
};
export default Projects;
