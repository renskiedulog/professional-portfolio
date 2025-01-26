import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React from "react";

interface BackButtonProps extends LinkProps {
  className?: string;
  label?: string;
}

const BackButton = ({
  href,
  className,
  label = "Back",
  ...rest
}: BackButtonProps) => {
  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        "flex items-center text-base gap-1 hover:-translate-x-2 transition duration-300 ease-in-out opacity-60 hover:opacity-100 font-semibold",
        className
      )}
    >
      <ArrowLeft size={18} className="mb-0.5" />
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;
