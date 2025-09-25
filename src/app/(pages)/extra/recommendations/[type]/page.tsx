import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { getRecommendations } from "@/lib/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import RandomButton from "./random-button";
import RecommendationCard from "./recommendation-card";

export interface GetRecommendationsParams {
  type: "anime" | "manga" | "manhwa" | "movie";
}

const Page = async ({
  params,
}: {
  params: { type: GetRecommendationsParams["type"] };
}) => {
  const { type } = params;

  const recommendations = await getRecommendations({ type: type });

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
          {recommendations &&
            recommendations?.length > 0 &&
            recommendations?.map((rec) => (
              <RecommendationCard
                recommendation={rec}
                type={type}
                key={rec?.id}
              />
            ))}
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
