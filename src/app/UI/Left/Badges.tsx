import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
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

const Badges = () => {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {badges?.length > 0 &&
        badges?.map((badge, idx) => (
          <Badge key={idx} className="flex items-center gap-1">
            {badge?.icon && <badge.icon size={12} className="mb-0.5" />}
            {badge?.label}
          </Badge>
        ))}
    </div>
  );
};

export default Badges;
