import React from "react";
import Heading from "../global-components/heading";
import { RiNextjsFill } from "react-icons/ri";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

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
    description:
      "Example Description Example Description Example Description Example Description Example Description",
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
    description:
      "Example Description Example Description Example Description Example Description Example Description",
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
    description:
      "Example Description Example Description Example Description Example Description Example Description",
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
    <div className="w-full max-w-2xl space-y-3">
      <Heading>Projects</Heading>
      <div className="grid grid-cols-2 gap-3">
        {projects?.length > 0 &&
          projects?.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="border p-3.5 rounded shadow-sm bg-background space-y-1.5">
      <Image
        className="aspect-video object-cover"
        src="/usc.jpg"
        width={500}
        height={500}
        alt={project?.title as string}
      />
      <h3 className="font-extrabold text-lg">{project?.title}</h3>
      <p className="font-medium text-base">{project?.description}</p>
      <Separator />
      <div>
        <div className="flex gap-1.5">
          {project?.stacks?.map((stack, index) => (
            <div key={index} className="flex flex-col items-center">
              <stack.icon className="text-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Projects;
