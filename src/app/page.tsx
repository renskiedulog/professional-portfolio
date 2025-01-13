import LeftSection from "./UI/left/LeftSection";
import AboutMe from "./UI/content/about-me";
import WorkExperience from "./UI/content/work-experience";
import Skills from "./UI/content/skills";
import Education from "./UI/content/education";
import Projects from "./UI/content/projects";
import BlurFade from "./UI/animation-wrappers/fade";

export const metadata = {
  title: "Web Portfolio"
}

export default function Home() {
  return (
    <BlurFade>
      <div className="flex flex-col md:flex-row">
        <LeftSection />
        <div className="px-5 space-y-8 w-full pb-16">
          <AboutMe />
          <Skills />
          <WorkExperience />
          <Education />
          <Projects />
        </div>
      </div>
    </BlurFade>
  );
}
