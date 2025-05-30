import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Identity = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="size-28">
          <AvatarImage
            src="/me.webp"
            alt="renato-dulog"
            className="object-cover object-bottom"
            width={100}
            height={100}
          />
          <AvatarFallback>RD</AvatarFallback>
        </Avatar>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute size-5 rounded-full p-1 bg-yellow-500 bottom-2 right-2 border-primary/70 border-2 !z-50" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs bg-yellow-500 text-secondary">
            Currently Busy
          </TooltipContent>
        </Tooltip>
      </div>
      <h1 className="text-3xl text-primary mt-2">Renato Dulog</h1>
      <p className="text-sm opacity-50 font-medium text-center">
        Software Engineer | Web Developer
      </p>
    </div>
  );
};

export default Identity;
