"use client";
import * as React from "react";
import Heading from "@/app/UI/global-components/heading";
import { CharacterData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Characters({
  characters,
}: {
  characters: CharacterData[];
}) {
  const [showAll, setShowAll] = React.useState(false);

  const visibleCharacters = showAll ? characters : characters.slice(0, 12);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <Heading as="h2" className="text-xl mb-2">
          Characters
        </Heading>

        {characters.length > 12 && (
          <Button
            variant="link"
            className="!text-sm hover:no-underline !p-0"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {visibleCharacters.map((char, idx) => (
          <div key={idx} className="relative rounded-md overflow-hidden">
            {char?.character?.images && (
              <Image
                src={
                  char?.character?.images?.webp?.image_url ??
                  char?.character?.images?.jpg?.image_url
                }
                width={200}
                height={200}
                alt={char?.character?.name ?? "Character Image"}
                className="aspect-[1/1.2] object-cover object-top w-full"
              />
            )}
            <div className="absolute bottom-0 p-2 text-white z-20">
              {char?.role && <p className="text-xs opacity-70">{char?.role}</p>}
              {char?.character?.name && (
                <p className="font-black text-base md:text-lg leading-tight xl:leading-[1.1]">
                  {char?.character?.name}
                </p>
              )}
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80" />
          </div>
        ))}
      </div>
    </div>
  );
}
