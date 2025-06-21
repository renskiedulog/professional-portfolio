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
        "flex items-center gap-5 uppercase text-xs font-thin justify-center",
        className
      )}
    >
      <div className={`${width ? width : "w-10"} h-[0.5px] bg-black`}></div>
      <span>{children}</span>
      <div className={`${width ? width : "w-10"} h-[0.5px] bg-black`}></div>
    </div>
  );
};

export default Crown;
