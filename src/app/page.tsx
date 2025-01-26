import BlurFade from "./UI/animation-wrappers/fade";
import AboutMe from "./UI/content/about-me";
import Education from "./UI/content/education";
import Footer from "./UI/content/footer";
import Projects from "./UI/content/projects";
import Skills from "./UI/content/skills";
import WorkExperience from "./UI/content/work-experience";
import LeftSection from "./UI/left/LeftSection";
import Container from "./UI/global-components/container";

export const metadata = {
  title: "Web Portfolio",
};

export default function Home() {
  return (
    <Container>
      <BlurFade>
        <div className="flex flex-col md:flex-row">
          <LeftSection />
          <div className="px-3 sm:px-5 space-y-8 w-full pb-16">
            <AboutMe />
            <Skills />
            <WorkExperience />
            <Education />
            <Projects />
            <Footer />
          </div>
        </div>
      </BlurFade>
    </Container>
  );
}
