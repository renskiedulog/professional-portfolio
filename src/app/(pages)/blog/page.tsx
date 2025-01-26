import React from "react";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { List, Search } from "lucide-react";

const page = () => {
  return (
    <Container>
      <BlurFade>
        <div className="w-full h-20">
          <BackButton href="/" />
          {/* Filter Options */}
          <div>
            <div>
              <Search />
            </div>
            <List />
          ~</div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
