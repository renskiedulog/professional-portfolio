import LeftSection from "./UI/left/LeftSection";
import AboutMe from "./UI/content/about-me";
import WorkExperience from "./UI/content/work-experience";
import Skills from "./UI/content/skills";
import Education from "./UI/content/education";
import Projects from "./UI/content/projects";

export default function Home() {
  return (
    <div className="flex">
      <LeftSection />
      <div className="px-5 space-y-5 w-full pb-16">
        <AboutMe />
        <Skills />
        <WorkExperience />
        <Education />
        <Projects />
      </div>
    </div>
  );
}
