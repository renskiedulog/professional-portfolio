import * as React from "react";
import Heading from "@/app/UI/global-components/heading";
import { CharacterData } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function CharacterCarousel({
  characters,
}: {
  characters: CharacterData[];
}) {
  return (
    <div className="flex flex-col">
      <Heading as="h2" className="text-xl mb-2">
        Characters
      </Heading>
      <div className="grid grid-cols-4 gap-5">
        {characters?.map((char, idx) => (
          <div key={idx}>
            {char?.character?.images && (
              <Image
                src={
                  char?.character?.images?.webp?.image_url ??
                  char?.character?.images?.jpg?.image_url
                }
                width={200}
                height={200}
                alt={char?.character?.name ?? "Character Image"}
                className="aspect-square object-cover w-full"
              />
            )}
            {char?.character?.name && <span>{char?.character?.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
