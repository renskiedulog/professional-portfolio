import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaFacebookSquare,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const addresses = [
  {
    label: "Pandacan Pinamungajan Cebu",
    icon: MapPin,
    link: "",
  },
  {
    label: "renato.larayos.dulog@gmail.com",
    icon: MdOutlineMailOutline,
    link: "mailto:renato.larayos.dulog@gmail.com",
  },
  {
    label: "+639919016500",
    icon: FaPhoneAlt,
    link: "tel:09919016500",
  },
  {
    label: "renato.dulog",
    icon: FaFacebookSquare,
    link: "https://facebook.com/renato.dulog",
  },
  {
    label: "in/renato-dulog-004582276",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/renato-dulog-004582276/",
  },
];

const Details = () => {
  return (
    <div className="space-y-2.5">
      {addresses?.length > 0 &&
        addresses?.map((address, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {address?.icon && <address.icon size={18} className="mb-0.5" />}
            {address?.link ? (
              <Link
                href={address?.link}
                className="hover:underline"
                target="_blank"
              >
                {address?.label}
              </Link>
            ) : (
              <span>{address?.label}</span>
            )}
          </div>
        ))}
    </div>
  );
};

export default Details;
