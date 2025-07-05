import { Database } from "lucide-react";
import React from "react";
import { FaComputer } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import { FaRegKeyboard } from "react-icons/fa";
import { GiRobotGrab } from "react-icons/gi";
import { LuNotebookPen } from "react-icons/lu";

const services = [
  {
    logo: FaComputer,
    title: "Frontend Development",
    description:
      "Modern, responsive websites and apps using React, Next.js, and TypeScript with pixel-perfect design implementation.",
    stacks: [
      "One-Page Websites",
      "Portfolios",
      "Product Sites",
      "Landing Pages",
      "Full Websites",
    ],
  },
  {
    logo: Database,
    title: "Backend Development",
    description:
      "Scalable server-side solutions using Node.js, Express, Supabase, and Sanity for API development and database management.",
    stacks: [
      "Content Management",
      "Admin Panels",
      "REST APIs",
      "Auth Systems",
      "Dashboards",
    ],
  },
  {
    logo: HiLightningBolt,
    title: "Performance Optimizations",
    description:
      "Speed optimization, SEO improvements, and best practices for exceptional user experiences.",
    stacks: [
      "SEO",
      "Lighthouse",
      "Google Search Console",
      "Speed Optimizations",
      "UI/UX Testing",
      "QA Testing",
    ],
  },
  {
    logo: FaRegKeyboard,
    title: "Data Entry Services",
    description:
      "Accurate and efficient data input across CMS platforms, documents, spreadsheets, and more.",
    stacks: [
      "CMS (Wordpress, Sanity, etc.)",
      "Google Docs",
      "Spreadsheets",
      "Content Uploads",
      "Database Entry",
    ],
  },
  {
    logo: GiRobotGrab,
    title: "Workflow Automation",
    description:
      "Streamline repetitive tasks with no-code tools, custom scripts, and smart integrations.",
    stacks: ["n8n", "Google Apps Script", "Zapier", "Sheet Integrations"],
  },
  {
    logo: LuNotebookPen,
    title: "Technical Consulting",
    description:
      "Expert guidance on choosing the right tech stack, improving infrastructure, and solving complex problems.",
    stacks: [
      "Architecture Planning",
      "Tech Stack Advising",
      "API Integrations",
      "System Optimization",
      "Scalability Planning",
    ],
  },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-10">
      {services?.length > 0 &&
        services?.map((service, idx) => (
          <div
            key={idx}
            className="col-span-1 w-full border-primary/60 border p-4 group"
          >
            <div className="flex items-center gap-4">
              <div className="border w-max p-2.5 border-primary">
                <service.logo size={24} />
              </div>
              <div className="transition-all">
                <h2 className="font-normal sm:font-thin text-lg mt-2 transition-all">
                  {service?.title}
                </h2>
                <div className="w-10 h-[0.5px] group-hover:h-[2px] bg-primary group-hover:w-full transition-all ease-in-out duration-150" />
              </div>
            </div>
            <p className="mt-4">{service?.description}</p>
            <div className="mt-4 space-y-1 sm:columns-1 columns-2">
              {service?.stacks?.length > 0 &&
                service?.stacks?.map((stack, index) => (
                  <div
                    className="flex items-center gap-2 text-sm font-normal sm:font-thin"
                    key={index}
                  >
                    <div className="w-1.5 h-1.5 bg-primary/80" />
                    <p>{stack}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Services;
