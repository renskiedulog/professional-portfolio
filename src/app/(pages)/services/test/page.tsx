import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const metadata = {
  title: "Works",
  description: "My personal projects and works.",
};

export const states = {
  busy: {
    style: "bg-yellow-500 hover:bg-yellow-500",
    text: "I am currently busy at the moment.",
  },
  open: {
    style: "bg-green-500 hover:bg-green-500",
    text: "I am open for any request.",
  },
  project: {
    style: "bg-blue-500 hover:bg-blue-500",
    text: "I am working on a project/request.",
  },
  unavailable: {
    style: "bg-red-500 hover:bg-red-500",
    text: "I am current unavailable.",
  },
} as const;

export type StatusKey = keyof typeof states;

export type StatusType = "busy" | "open" | "project" | "unavailable";

export const getStatus = async () => {
  try {
    const query = groq`*[_type == "siteData"][0] {
    ...,
  }`;
    const req = await sanityClient.fetch(query);
    return req.status;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ServicePage = async () => {
  const status: StatusType = (await getStatus()) ?? "busy";

  return (
    <Container as="main">
      <BlurFade>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          <Badge
            className={`shadow-sm border-primary/10 border ${states[status]?.style}`}
          >
            {states[status]?.text}
          </Badge>
        </div>
      </BlurFade>
    </Container>
  );
};

export default ServicePage;
