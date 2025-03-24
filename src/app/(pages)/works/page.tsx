import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import Heading from "@/app/UI/global-components/heading";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const WorksPage = () => {
  return (
    <Container as="main">
      <BlurFade>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                className="h-max w-[120px] sm:w-[150px] bg-white dark:bg-primary/10 sm:text-base text-sm pl-8 peer focus:w-[180px] sm:focus:w-[300px] transition-all duration-200 ease-in-out"
                placeholder="Search..."
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out peer-focus:opacity-100"
              />
            </div>
          </div>
        </div>
        <div>
          <Heading className="w-full text-center my-5">
            Personal Projects
          </Heading>
        </div>
      </BlurFade>
    </Container>
  );
};

export default WorksPage;
