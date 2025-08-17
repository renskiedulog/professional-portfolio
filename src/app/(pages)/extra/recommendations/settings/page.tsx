import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ControllerTab from "./controller-tab";

const page = async () => {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (auth?.value !== "true") {
    redirect("/extra/recommendations/settings/login");
  }

  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/recommendations" label="Recommendations" />
        </div>
        <div>
          <ControllerTab />
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
