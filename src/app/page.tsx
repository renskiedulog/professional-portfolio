import BlurFade from "./UI/animation-wrappers/fade";
import AboutMe from "./UI/content/about-me";
import Education from "./UI/content/education";
import Footer from "./UI/content/footer";
import Projects from "./UI/content/projects";
import Skills from "./UI/content/skills";
import WorkExperience from "./UI/content/work-experience";
import Container from "./UI/global-components/container";
import LeftSection from "./UI/Left/LeftSection";

export const metadata = {
  title: "Renato Dulog",
  description:
    "A digital portfolio showcasing the journey, technical expertise, achievements, and skills behind innovative web development.",
};

export default function Home() {
  return (
    <Container className="!py-0">
      <BlurFade>
        <div className="flex flex-col md:flex-row sm:pt-0 pt-5">
          <LeftSection />
          <div className="px-3 sm:px-5 space-y-8 w-full pb-16 pt-0 sm:pt-5">
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
