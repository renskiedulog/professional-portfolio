import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { FaRandom } from "react-icons/fa";

const Page = async ({
  params,
}: {
  params: { type: "anime" | "manga" | "manhwa" | "movie" };
}) => {
  const { type } = params;

  if (!["anime", "manga", "manhwa", "movie"].includes(type)) {
    return notFound();
  }

  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/recommendations" label="Recommendations" />
          <div className="flex items-center gap-2">
            <Badge className="cursor-pointer px-3 py-1.5 flex items-center gap-2 bg-blue-600 hover:bg-blue-400 dark:text-white">
              <FaRandom />
              <span>Random</span>
            </Badge>
          </div>
        </div>
        <div></div>
      </BlurFade>
    </Container>
  );
};

export default Page;
