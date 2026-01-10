import Head from "next/head";
import BlurFade from "./UI/animation-wrappers/fade";
import AboutMe from "./UI/content/about-me";
import Blogs from "./UI/content/blogs";
import Education from "./UI/content/education";
import Footer from "./UI/content/footer";
import Projects from "./UI/content/projects";
import Skills from "./UI/content/skills";
import WorkExperience from "./UI/content/work-experience";
import Container from "./UI/global-components/container";
import LeftSection from "./UI/left/LeftSection";
import TestimonialsSection from "./UI/content/testimonials";
import { getEnrichedTestimonials } from "@/lib/github";
import SeasonalEntranceEffect from "./UI/season-animations/seasonal-entrance-effect";
import SiteVisitScript from "./scripts/site-visit-script";

export const revalidate = 86400;

export const metadata = {
  title: "Renato Dulog | Web Portfolio",
  description:
    "A digital portfolio showcasing the journey, technical expertise, achievements, and skills behind innovative web development.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
};

export default async function Home() {
  const testimonials = await getEnrichedTestimonials();

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/me.webp" fetchPriority="high" />
      </Head>
      <SeasonalEntranceEffect
        presetName="winter"
        oncePerSession
        cooldownMs={1000 * 60 * 60 * 12}
        storageKey="entranceEffect"
      />
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
              <Blogs />
              <TestimonialsSection testimonials={testimonials} />
              <Footer />
            </div>
          </div>
        </BlurFade>
      </Container>
      <SiteVisitScript />
    </>
  );
}
