import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import { Badge } from "@/components/ui/badge";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import Services from "./services";
import WorkFlow from "./workflow";

export const metadata = {
  title: "Services",
  description:
    "Explore the services I offer — from responsive design to full-stack solutions tailored to your needs or the grunt works you are trying to avoid.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
  },
};

export const states = {
  busy: {
    style: "bg-yellow-500",
    text: "I am currently busy at the moment.",
  },
  open: {
    style: "bg-green-500",
    text: "I am open for any request.",
  },
  project: {
    style: "bg-blue-500",
    text: "I am working on a project/request.",
  },
  unavailable: {
    style: "bg-red-500",
    text: "I am currently unavailable.",
  },
} as const;

export type StatusKey = keyof typeof states;

export type StatusType = "busy" | "open" | "project" | "unavailable";

export const getStatus = async () => {
  try {
    const query = groq`*[_type == "siteData"][0] {
    status
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
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5" key="services-page">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          <Badge className="shadow-sm hover:bg-transparent border-primary border bg-transparent text-primary rounded-none">
            <div className={`w-2 h-2 mr-2 ${states[status]?.style}`}>
              <div
                className={`w-2 h-2 mr-2 animate-ping ${states[status]?.style}`}
              ></div>
            </div>
            {states[status]?.text}
          </Badge>
        </div>
        {/* Services */}
        <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
          <Crown>Services Offered</Crown>
          <Heading className="w-full text-center text-3xl md:text-4xl">
            What I Can Do For You
          </Heading>
          <p>
            Comprehensive development services tailored to bring your vision to
            life with modern technologies and best practices.
          </p>
        </div>
        <Services />
        {/* How I Work */}
        <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
          <Crown>How It Goes</Crown>
          <Heading className="w-full text-center text-3xl md:text-4xl">
            From Task To Deliver
          </Heading>
          <p>
            A streamlined process that transforms your ideas into fully
            delivered, high-quality digital solutions.
          </p>
        </div>
        <WorkFlow />
      </BlurFade>
    </Container>
  );
};

export default ServicePage;
