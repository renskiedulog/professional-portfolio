import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";

const Page = () => {
  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/playground" label="Playground" />
        </div>
        <div className="h-[90dvh] flex items-center justify-center"></div>
      </BlurFade>
    </Container>
  );
};

export default Page;
