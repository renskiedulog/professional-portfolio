import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (auth?.value !== "true") {
    redirect("/extra/recommendations/settings/login"); // Redirect if cookie missing or invalid
  }
  const req = await fetch(
    "https://api.jikan.moe/v4/manga?q=mercenary%20enrollment"
  );
  const res = await req.json();
  console.log(res);
  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/recommendations" label="Recommendations" />
        </div>
        <div className="grid grid-cols-4">
          {res?.data?.map((item, idx) => (
            <div key={idx}>
              {item?.images?.jpg?.large_image_url && (
                <Image
                  unoptimized
                  src={item?.images?.jpg?.large_image_url}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              )}
              <p>{item?.title}</p>
            </div>
          ))}
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
