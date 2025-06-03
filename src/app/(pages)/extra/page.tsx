import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export const metadata = {
  title: "Extra",
  description: "My personal projects and works.",
};

const Extra = () => {
  return (
    <Container as="main">
      <BlurFade>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
        </div>
        <div></div>
      </BlurFade>
    </Container>
  );
};

export default Extra;
