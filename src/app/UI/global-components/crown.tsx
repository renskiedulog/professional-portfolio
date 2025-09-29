import { cn } from "@/lib/utils";
import React from "react";

const Crown = ({
  className,
  width,
  children,
}: {
  className?: string;
  width?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 sm:gap-5 uppercase text-[10px] sm:text-xs font-thin justify-center",
        className
      )}
    >
      <div
        className={`${width ? width : "w-5 sm:w-10"} h-[0.5px] bg-primary`}
      ></div>
      <span>{children}</span>
      <div
        className={`${width ? width : "w-5 sm:w-10"} h-[0.5px] bg-primary`}
      ></div>
    </div>
  );
};

export default Crown;
