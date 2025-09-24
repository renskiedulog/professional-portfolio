import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { getRecommendations } from "@/lib/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import RandomButton from "./random-button";

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
              <Link
                href={`/extra/recommendations/${type}/${rec?.id}`}
                className="relative rounded overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform duration-200 ease-in-out"
                key={rec?.id}
              >
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-full aspect-[1/1.3] object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70" />
                <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium line-clamp-2 z-20">
                  {rec.title}
                </p>
              </Link>
            ))}
        </div>
      </BlurFade>
    </Container>
  );
};

export default Page;
