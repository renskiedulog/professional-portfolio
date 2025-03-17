import { ScrollArea } from "@/components/ui/scroll-area";
import Characteristics from "./Characteristics";
import Identity from "./Identity";
import Badges from "./Badges";
import Details from "./Details";
import Statistics from "./Statistics";
import JobBadge from "./JobBadge";

const LeftSection = () => {
  return (
    <div className="max-w-6xl md:max-w-[325px] w-full">
      <div className="sticky top-5">
        <ScrollArea className="h-full md:h-screen px-3 sm:px-4 md:border-r snap-y snap-mandatory">
          <div className="pb-2 md:pb-12">
            {/* Personal Details */}
            <div className="space-y-5 mb-5">
              <Identity />
              {/* <JobBadge /> */}
              <Badges />
              <Details />
              <Characteristics />
              <Statistics />
              {/* <Files /> */}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSection;
