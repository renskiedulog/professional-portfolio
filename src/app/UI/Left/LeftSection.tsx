import { ScrollArea } from "@/components/ui/scroll-area";
import Badges from "./Badges";
import Identity from "./Identity";
import Address from "./Address";
import Characteristics from "./Characteristics";

const LeftSection = () => {
  return (
    <div className="max-w-xs w-full border-r">
      <div className="sticky top-5">
        <ScrollArea className="h-screen px-4">
          {/* Personal Details */}
          <div className="space-y-5">
            <Identity />
            <Badges />
            <Address />
            <Characteristics />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSection;
