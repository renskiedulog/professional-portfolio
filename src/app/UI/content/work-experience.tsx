import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Heading from "../global-components/heading";

interface WorkExperience {
  company: string;
  role: string;
  period: string;
  logo: string;
  link: string;
}

const experiences: WorkExperience[] = [
  {
    company: "WebriQ",
    role: "Web Developer",
    period: "Feb 2025 - Current",
    logo: "/webriq.webp",
    link: "https://webriq.com",
  },
  {
    company: "WebriQ",
    role: "Web Developer - Part Time",
    period: "Nov 2024 - Feb 2025",
    logo: "/webriq.webp",
    link: "https://webriq.com",
  },
  {
    company: "WebriQ",
    role: "Intern",
    period: "Feb 2024 - Nov 2024",
    logo: "/webriq.webp",
    link: "https://webriq.com",
  },
];

export default function WorkExperience() {
  return (
    <section id="work-experience" className="w-full max-w-xl space-y-3">
      <Heading>Work Experience</Heading>
      <div className="space-y-3">
        {experiences.map((experience, index) => (
          <Link
            href={experience?.link}
            target="_blank"
            key={index}
            className="flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={experience.logo} alt={experience.company} />
                <AvatarFallback>{experience.company[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg flex items-center group-hover:underline text-primary">
                  {experience.company}
                  <ChevronRight
                    size={18}
                    className="group-hover:opacity-100 opacity-0 transition-all duration-300 translate-x-0 group-hover:translate-x-2"
                  />
                </p>
                <p className="text-sm text-muted-foreground">
                  {experience.role}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium whitespace-nowrap">
              {experience.period}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
