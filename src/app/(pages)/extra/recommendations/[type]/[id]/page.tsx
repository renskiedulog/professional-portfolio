import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Badge } from "@/components/ui/badge";
import { GetRecommendationsParams } from "../page";
import { GetRecommendationInfo } from "@/lib/server";
import { RecommendationInfo } from "@/lib/types";
import RecommendationContent from "./recommendation-content";

const Page = async ({
  params,
}: {
  params: {
    type: GetRecommendationsParams["type"];
    id: string;
  };
}) => {
  const { type, id } = await params;

  const req = await GetRecommendationInfo({
    searchType: type,
    id,
  });

  const recommendationInfo: RecommendationInfo = req?.data;
  console.log(recommendationInfo);

  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between mb-6">
          <BackButton
            href={`/extra/recommendations/${type}`}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
          />
        </div>

        {/* Client Component for Animated UI */}
        <RecommendationContent recommendationInfo={recommendationInfo} />
      </BlurFade>
    </Container>
  );
};

export default Page;
