import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import GitHubCalendar from "react-github-calendar";

const ClientStatsPage = () => {
  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
        </div>
        {/* Heading */}
        <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
          <Crown>Numbers That Tell My Story</Crown>
          <Heading as="h1" className="text-3xl md:text-3xl sm:px-0 px-5">
            Personal Stats
          </Heading>
          <p>
            A collection of small details that paint a broader picture — quiet
            measures of growth, rhythm, and the things that keep me moving
            forward.
          </p>
        </div>
        <GitHubCalendar
          username="renskiedulog"
          colorScheme="light"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
        />
      </BlurFade>
    </Container>
  );
};

export default ClientStatsPage;
