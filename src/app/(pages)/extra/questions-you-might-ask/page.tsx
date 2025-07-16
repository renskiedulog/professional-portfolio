import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import { TypedObject } from "sanity";
import QuestionCards from "./question-cards";
import Crown from "@/app/UI/global-components/crown";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";

export const metadata = {
  title: "Questions You Might Ask",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/extra/questions-you-might-ask`,
  },
};

export interface Item {
  question?: string;
  answer: TypedObject[];
}

export const getData = async () => {
  try {
    const query = groq`*[_type == "siteData"][0] {
    qnaItems
  }`;
    const req = await sanityClient.fetch(query);
    return req.qnaItems;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const QuestionsPage = async () => {
  const items: Item[] = await getData();

  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
          {/* <div className="flex items-center gap-2">
            <p className="text-xs">Or you can personally </p>
            <Link
              href="/#contact-form"
              aria-label="Go to home and contact form section"
            >
              <Badge className="shadow-sm hover:bg-transparent border-primary border bg-transparent text-primary rounded-none flex items-center px-3 py-1.5 gap-1">
                <span className="!font-extrabold">CONTACT ME</span>
              </Badge>
            </Link>
          </div> */}
        </div>
        <div>
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
            <Crown>General Info</Crown>
            <Heading as="h1" className="text-3xl md:text-4xl sm:px-0 px-5">
              Questions You Might Ask
            </Heading>
            <p>
              For your convenience, I have pre-answered some typical questions
              and included relevant information you may find useful.
            </p>
          </div>
          {items?.length > 0 && <QuestionCards questions={items} />}
        </div>
      </BlurFade>
    </Container>
  );
};

export default QuestionsPage;
