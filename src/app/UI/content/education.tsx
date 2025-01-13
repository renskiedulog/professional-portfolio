import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Heading from "../global-components/heading";

interface EducationType {
  school: string;
  grade: string;
  period: string;
  logo: string;
  link?: string;
}

const experiences: EducationType[] = [
  {
    school: "University Of San Carlos",
    grade: "Certificate Of Computer Technology",
    period: "August 2022 - February 2025",
    logo: "/usc.jpg",
  },
  {
    school: "Pinamungajan National High School",
    grade: "Junior To Senior High School",
    period: "June 2015 - March 2022",
    logo: "/pnhs.jpg",
  },
  {
    school: "Pinamungajan Central Elementary School",
    grade: "Primary School",
    period: "June 2008 - March 2015",
    logo: "/pces.jpg",
  },
];

export default function Education() {
  return (
    <div className="w-full max-w-xl space-y-3">
      <Heading>Education</Heading>
      <div className="space-y-3">
        {experiences.map((experience, index) => {
          if (experience?.link) {
            return (
              <Link
                href={experience?.link || "#"}
                target="_blank"
                key={index}
                className="flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={experience.logo}
                      alt={experience.school}
                    />
                    <AvatarFallback>{experience.school[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg flex items-center group-hover:underline text-primary">
                      {experience.school}
                      <ChevronRight
                        size={18}
                        className="group-hover:opacity-100 opacity-0 transition-all duration-300 translate-x-0 group-hover:translate-x-2"
                      />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {experience.grade}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium whitespace-nowrap block md:hidden">
                      {experience.period}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium whitespace-nowrap hidden md:block">
                  {experience.period}
                </p>
              </Link>
            );
          } else {
            return (
              <div
                className="flex items-center justify-between gap-4"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={experience.logo}
                      alt={experience.school}
                    />
                    <AvatarFallback>{experience.school[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg flex items-center group-hover:underline text-primary">
                      {experience.school}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {experience.grade}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium whitespace-nowrap block md:hidden">
                      {experience.period}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium whitespace-nowrap hidden md:block">
                  {experience.period}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
