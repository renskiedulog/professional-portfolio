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
    label: "renato.dulog.dev@gmail.com",
    icon: MdOutlineMailOutline,
    link: "mailto:renato.dulog.dev@gmail.com",
  },
  {
    label: "+639919016500",
    icon: FaPhoneAlt,
    link: "tel:09919016500",
  },
  {
    label: "renatodulog.27",
    icon: FaFacebookSquare,
    link: "https://facebook.com/renatodulog.27",
  },
  {
    label: "in/renato-dulog-004582276",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/renato-dulog-004582276/",
  },
];

const Address = () => {
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

export default Address;
