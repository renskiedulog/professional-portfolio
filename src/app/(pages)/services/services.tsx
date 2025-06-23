import { Database } from "lucide-react";
import React from "react";
import { FaComputer } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";

const services = [
  {
    logo: FaComputer,
    title: "Frontend Development",
    description:
      "Modern, responsive web applications using React, Next.js, and TypeScript with pixel-perfect design implementation",
    stacks: ["Next JS", "Typescript", "React", "Responsive Design"],
  },
  {
    logo: Database,
    title: "Backend Development",
    description:
      "Scalable server-side solutions with Node.js, databases, and API development for robust applications.",
    stacks: ["Node JS", "Express", "REST API", "Sanity", "Supabase"],
  },
  {
    logo: HiLightningBolt,
    title: "Performance Optimizations",
    description:
      "Speed optimization, SEO improvements, and best practices for exceptional user experiences.",
    stacks: [
      "Core Web Vitals",
      "SEO",
      "Lighthouse",
      "Google Search Console",
      "Speed Optimizations",
    ],
  },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-10">
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
