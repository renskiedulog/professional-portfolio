import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  //   const req = await fetch(
  //     "https://api.jikan.moe/v4/manga?q=mercenary%20enrollment"
  //   );
  //   const res = await req.json();
  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/recommendations" label="Recommendations" />
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
