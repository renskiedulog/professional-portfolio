import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const addresses = [
  {
    label: "Pandacan Pinamungajan Cebu",
    icon: MapPin,
    link: "https://www.google.com.ph/maps/place/Pandacan,+Pinamungahan,+Cebu/@10.2897883,123.5801877,15z/data=!3m1!4b1!4m6!3m5!1s0x33a96fb6a77461c3:0x343dd582e36c9c56!8m2!3d10.2878673!4d123.586797!16s%2Fg%2F11fyxbvd83?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    label: "renato.larayos.dulog@gmail.com",
    icon: MdOutlineMailOutline,
    link: "mailto:renato.larayos.dulog@gmail.com",
  },
  {
    label: "renato.dulog",
    icon: FaFacebookSquare,
    link: "https://facebook.com/renato.dulog",
  },
  {
    label: "in/renato-dulog",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/renato-dulog/",
  },
  {
    label: "renskiedulog",
    icon: FaGithub,
    link: "https://github.com/renskiedulog",
  },
];

const Details = () => {
  return (
    <div className="space-y-2.5">
      <h2 className="font-bold text-primary/90">Contact</h2>
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
