"use client";

import { useEffect, useState } from "react";
import { FallPreset } from "@/lib/types";
import { FallingItem } from "./falling-item";

type Props = {
  preset: FallPreset;
  lifetime?: number;
};

export default function FallingParticles({ preset, lifetime = 12000 }: Props) {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(Array.from({ length: preset.count }, (_, i) => i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {items.map((id) => (
        <FallingItem
          key={id}
          preset={preset}
          onComplete={() => setItems((prev) => prev.filter((x) => x !== id))}
        />
      ))}
    </>
  );
}
