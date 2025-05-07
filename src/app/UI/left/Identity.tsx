import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Identity = () => {
  return (
    <div className="flex flex-col items-center">
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
      <h1 className="text-3xl text-primary mt-2">Renato Dulog</h1>
      <p className="text-sm opacity-50 font-medium text-center">
        Software Engineer | Web Developer
      </p>
    </div>
  );
};

export default Identity;
