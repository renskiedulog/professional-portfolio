import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Identity = () => {
  return (
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
      <p className="text-sm opacity-50 font-medium">Web Developer</p>
    </div>
  );
};

export default Identity;
