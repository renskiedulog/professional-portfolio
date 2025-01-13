import LeftSection from "@/app/UI/left/LeftSection";
import AboutMe from "@/app/UI/content/about-me";
import WorkExperience from "@/app/UI/content/work-experience";
import Skills from "@/app/UI/content/skills";
import Education from "@/app/UI/content/education";
import Projects from "@/app/UI/content/projects";
import BlurFade from "@/app/UI/animation-wrappers/fade";

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
