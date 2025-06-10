import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import { TypedObject } from "sanity";
import QuestionCard from "./question-card";

export const metadata = {
  title: "Questions You Might Ask",
  description: "My personal projects and works.",
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

  console.log(items);
  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra" label="Extra" />
        </div>
        <div>
          <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-1">
            <Heading as="h1" className="text-3xl md:text-4xl">
              Questions You Might Ask
            </Heading>
            <p>
              For your convenience, I have pre-answered some typical questions
              and included relevant information you may find useful.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-5 items-center md:mb-20">
            {items &&
              items?.map((item, idx) => (
                <QuestionCard key={idx} item={item} index={idx} />
              ))}
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default QuestionsPage;
