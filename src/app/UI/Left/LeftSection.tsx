import { ScrollArea } from "@/components/ui/scroll-area";
import Identity from "@/app/UI/left/Identity";
import Badges from "@/app/UI/left/Badges";
import Characteristics from "@/app/UI/left/Characteristics";
import Files from "@/app/UI/left/Files";
import Statistics from "@/app/UI/left/Statistics";
import Details from "@/app/UI/left/Details";

const LeftSection = () => {
  return (
    <div className="max-w-6xl md:max-w-[325px] w-full">
      <div className="sticky top-5">
        <ScrollArea className="h-full md:h-screen px-4 border-r snap-y snap-mandatory">
          <div className="pb-2 md:pb-12">
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
