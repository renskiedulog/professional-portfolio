import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import TypingWizardUI from "./components/ui";

const Page = () => {
  return (
    <Container as="main" className="!pb-0">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/playground" label="Playground" />
        </div>
        <div className="h-[92dvh] w-full">
          <TypingWizardUI />
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
