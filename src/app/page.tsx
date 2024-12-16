import Image from "next/image";
import LeftSection from "./UI/left/LeftSection";
import AboutMe from "./UI/content/about-me";
import WorkExperience from "./UI/content/work-experience";
import Skills from "./UI/content/skills";

export default function Home() {
  return (
    <div className="flex">
      <LeftSection />
      <div className="px-5 py-2 space-y-5 w-full">
        <AboutMe />
        <Skills />
        <WorkExperience />
      </div>
    </div>
  );
}
