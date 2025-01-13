import { ScrollArea } from "@/components/ui/scroll-area";
import Identity from "./Identity";
import Badges from "./Badges";
import Characteristics from "./Characteristics";
import Files from "./Files";
import Statistics from "./Statistics";
import Details from "./Details";

const LeftSection = () => {
  return (
    <div className="max-w-[325px] w-full">
      <div className="sticky top-5">
        <ScrollArea className="h-screen px-4 border-r snap-y snap-mandatory">
          <div className="pb-12">
            {/* Personal Details */}
            <div className="space-y-5 mb-5">
              <Identity />
              <Badges />
              <Details />
              <Characteristics />
              <Statistics />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSection;
