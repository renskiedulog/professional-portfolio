import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { getStatus, states, StatusType } from "@/app/(pages)/services/page";

export const revalidate = 3600;

const Identity = async () => {
  const status: StatusType = (await getStatus()) ?? "busy";
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="size-28 border">
          <AvatarImage
            src="/me.webp"
            alt="renato-dulog"
            className="object-cover object-bottom"
            loading="eager"
            fetchPriority="high"
            width={100}
            height={100}
          />
          <AvatarFallback>RD</AvatarFallback>
        </Avatar>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`absolute sm:block hidden size-5 rounded-full p-1 bottom-2 right-2 border-primary/70 border-2 !z-50 ${states[status]?.style}`}
            />
          </TooltipTrigger>
          <TooltipContent
            className={`max-w-xs text-secondary ${states[status]?.style}`}
          >
            {states[status].text}
          </TooltipContent>
        </Tooltip>
      </div>
      <h1 className="text-3xl text-primary mt-2">Renato Dulog</h1>
      <p className="text-sm opacity-50 font-medium text-center">
        Software Engineer | Web Developer
      </p>
      <Badge className="shadow-sm border-primary/50 hover:bg-transparent rounded border bg-transparent text-primary mt-2 py-1 md:hidden">
        <div className={`w-2 h-2 mr-2 ${states[status]?.style}`}>
          <div
            className={`w-2 h-2 mr-2 animate-ping ${states[status]?.style}`}
          ></div>
        </div>
        {states[status]?.text}
      </Badge>
    </div>
  );
};

export default Identity;
