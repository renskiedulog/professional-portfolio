import { ScrollArea } from "@/components/ui/scroll-area";
import Identity from "./Identity";
import Badges from "./Badges";
import Address from "./Address";
import Characteristics from "./Characteristics";

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
              <Address />
              <Characteristics />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSection;
