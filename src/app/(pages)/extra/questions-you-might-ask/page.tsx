import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { sanityClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import { TypedObject } from "sanity";
import QuestionCard from "./question-cards";
import QuestionCards from "./question-cards";

export const metadata = {
  title: "Questions You Might Ask",
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
          {items?.length > 0 && <QuestionCards questions={items} />}
        </div>
      </BlurFade>
    </Container>
  );
};

export default QuestionsPage;
