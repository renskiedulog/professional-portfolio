import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import { Brush, HammerIcon, Lightbulb, Pen, Rocket } from "lucide-react";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiPaper } from "react-icons/gi";

const flow = [
  {
    title: "Discovery",
    description: "Understanding the client's needs and requirements.",
    icon: FaMagnifyingGlass,
  },
  {
    title: "Research & Analysis",
    description:
      "Gathering data, analyzing competitors, and identifying opportunities.",
    icon: Lightbulb,
  },
  {
    title: "Planning",
    description:
      "Defining scope, timeline, and resources to ensure a smooth execution.",
    icon: Pen,
  },
  {
    title: "Design",
    description:
      "Creating wireframes, mockups, and prototypes aligned with client vision.",
    icon: Brush,
  },
  {
    title: "Development",
    description:
      "Bringing designs to life with code, integrations, and backend logic.",
    icon: HammerIcon,
  },
  {
    title: "Testing & QA",
    description:
      "Ensuring everything works flawlessly across devices and use cases.",
    icon: GiPaper,
  },
  {
    title: "Launch & Support",
    description:
      "Deploying the final product and providing ongoing maintenance or updates.",
    icon: Rocket,
  },
];

const WorkFlow = () => {
  return (
    <div>
      <div className="text-center flex flex-col mx-auto mt-10 gap-2">
        <Crown>How It Goes</Crown>
        <Heading className="w-full text-center text-3xl md:text-4xl">
          From Task To Deliver
        </Heading>
        <p>
          A streamlined process that transforms your ideas into fully delivered,
          high-quality digital solutions.
        </p>
      </div>
      <div className="flex flex-col w-full gap-10 max-w-3xl mx-auto mt-10">
        {flow?.map((step, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default WorkFlow;
