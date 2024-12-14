import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code } from "lucide-react";
import React from "react";
import {
  FaCalendarCheck,
  FaGamepad,
  FaIdCard,
  FaMale,
  FaPhotoVideo,
} from "react-icons/fa";

const badges = [
  {
    label: "Male",
    icon: FaMale,
  },
  {
    label: "21 Years Old",
    icon: FaCalendarCheck,
  },
  {
    label: "HE / HIM",
    icon: FaMale,
  },
  {
    label: "Renren",
    icon: FaIdCard,
  },
  {
    label: "Programming",
    icon: Code,
  },
  {
    label: "Anime",
    icon: FaPhotoVideo,
  },
  {
    label: "Manga",
    icon: FaPhotoVideo,
  },
  {
    label: "Gaming",
    icon: FaGamepad,
  },
];

const LeftSection = () => {
  return (
    <div className="max-w-xs w-full border-r pt-5">
      <div className="sticky top-10">
        <ScrollArea className="h-screen px-4">
          {/* Personal Details */}
          <div>
            <div className="flex flex-col items-center">
              <Avatar className="size-28 mb-3">
                <AvatarImage
                  src="/me.webp"
                  alt="renato-dulog"
                  className="object-cover object-bottom"
                />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-medium opacity-90">Renato Dulog</h1>
              <p className="text-sm opacity-50 font-medium">
                Frontend Developer
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-5 justify-center">
              {badges?.length > 0 &&
                badges?.map((badge, idx) => (
                  <Badge key={idx} className="flex items-center gap-1">
                    {badge?.icon && <badge.icon size={12} className="mb-0.5" />}
                    {badge?.label}
                  </Badge>
                ))}
            </div>
            
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSection;
