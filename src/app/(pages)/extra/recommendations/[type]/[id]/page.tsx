import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Badge } from "@/components/ui/badge";
import { GetRecommendationsParams } from "../page";
import { GetRecommendationInfo } from "@/lib/recommendations";
import { RecommendationInfo } from "@/lib/types";
import RecommendationContent from "./recommendation-content";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanityClient";

const Page = async ({
  params,
}: {
  params: {
    type: GetRecommendationsParams["type"];
    id: string;
  };
}) => {
  const { type, id } = await params;

  const [req, sanityRec] = await Promise.all([
    GetRecommendationInfo({ searchType: type, id }),
    sanityClient.fetch<{ favorite?: boolean } | null>(
      `*[_type == "recommendations" && string(id) == $id && type == $type][0]{ favorite }`,
      { id, type }
    ),
  ]);

  const recommendationInfo: RecommendationInfo = req?.data;

  if (!req) {
    return notFound();
  }

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
        <RecommendationContent
          recommendationInfo={recommendationInfo}
          favorite={sanityRec?.favorite}
        />
      </BlurFade>
    </Container>
  );
};

export default Page;
