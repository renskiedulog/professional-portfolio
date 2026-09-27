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
import { cache } from "react";
import { pageMetadata } from "@/lib/site";

type Params = { type: GetRecommendationsParams["type"]; id: string };

// Shared by generateMetadata and the page so the lookup runs once per request
const getInfo = cache((type: Params["type"], id: string) =>
  GetRecommendationInfo({ searchType: type, id })
);

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { type, id } = await params;
  const info: RecommendationInfo | undefined = (await getInfo(type, id))?.data;
  if (!info) return { title: "Recommendation Not Found" };

  const title = info.title_english || info.title;
  const synopsis = info.synopsis?.replace(/\s+/g, " ").trim() ?? "";

  return pageMetadata({
    title: `${title} (${type.charAt(0).toUpperCase() + type.slice(1)})`,
    description: synopsis
      ? synopsis.length > 155 ? `${synopsis.slice(0, 152).trimEnd()}...` : synopsis
      : `${title}, a ${type} recommendation handpicked by Renato Dulog.`,
    path: `/extra/recommendations/${type}/${id}`,
  });
}

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
    getInfo(type, id),
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
