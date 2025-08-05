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
    <div className="flex flex-col w-full gap-10 max-w-3xl mx-auto mt-10">
      {flow?.map((step, index) => (
        <div
          key={index}
          className="flex even:flex-row-reverse items-center w-full gap-5 group"
        >
          {/* Icon */}
          <div className="border border-primary/50 dark:bg-primary/10 aspect-square w-28 flex items-center justify-center">
            <step.icon className="size-8" />
          </div>
          {/* Content */}
          <div className="flex flex-col w-full group-even:text-right gap-2">
            {/* Title */}
            <p className="text-2xl font-normal md:font-thin">{step?.title}</p>
            {/* Line */}
            <div className="w-full flex group-even:flex-row-reverse items-center gap-2">
              <div className="w-max whitespace-nowrap break-keep text-xs font-thin">
                STEP {index + 1}
              </div>
              <div className="h-px w-full bg-gradient-to-r group-even:bg-gradient-to-l from-primary to-transparent" />
            </div>
            {/* Description */}
            <p className="text-sm">{step?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkFlow;
