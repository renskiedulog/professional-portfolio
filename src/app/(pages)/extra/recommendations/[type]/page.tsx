import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { notFound } from "next/navigation";
import RandomButton from "./random-button";
import RecommendationCard from "./recommendation-card";
import Crown from "@/app/UI/global-components/crown";
import Heading from "@/app/UI/global-components/heading";
import { getRecommendations } from "@/lib/recommendations";
import { SearchResult } from "@/lib/types";

export interface GetRecommendationsParams {
  type: "anime" | "manga" | "manhwa" | "movie";
}

const Page = async ({
  params,
}: {
  params: { type: GetRecommendationsParams["type"] };
}) => {
  const { type } = await params;

  const recommendations: SearchResult[] = await getRecommendations({ type });

  if (!["anime", "manga", "manhwa", "movie"].includes(type)) {
    return notFound();
  }

  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/extra/recommendations" label="Recommendations" />
          <div className="flex items-center gap-2">
            <RandomButton recommendations={recommendations} />
          </div>
        </div>
        <div className="max-w-2xl text-center flex flex-col mx-auto mt-10 gap-2">
          <Crown>Handpicked</Crown>
          <Heading className="w-full text-center text-3xl md:text-4xl capitalize">
            {type} Recommendations
          </Heading>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mt-5 sm:mt-10">
          {recommendations &&
            recommendations?.length > 0 &&
            recommendations?.map((rec, idx) => (
              <RecommendationCard
                recommendation={rec}
                type={type}
                key={rec?.id}
                index={idx}
              />
            ))}
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
