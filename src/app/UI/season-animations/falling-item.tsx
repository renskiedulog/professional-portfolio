"use client";

import { FallPreset } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  preset: FallPreset & { images?: string[] }; // allow multiple images
  onComplete: () => void;
};

export function FallingItem({ preset, onComplete }: Props) {
  const [screen, setScreen] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setScreen({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  const values = useRef<{
    startX: number;
    sway: number;
    size: number;
    duration: number;
    rotation: number;
    opacity: number;
    delay: number;
    image: string;
  } | null>(null);

  if (screen.w && !values.current) {
    // pick random image from array or fallback to preset.image
    const image =
      preset.images && preset.images.length > 0
        ? preset.images[Math.floor(Math.random() * preset.images.length)]
        : preset.image;

    values.current = {
      startX: Math.random() * screen.w,
      sway: (Math.random() - 0.5) * preset.sway,
      size: preset.size[0] + Math.random() * (preset.size[1] - preset.size[0]),
      duration:
        preset.duration[0] +
        Math.random() * (preset.duration[1] - preset.duration[0]),
      rotation: preset.rotate ? Math.random() * 360 : 0,
      opacity: preset.opacity
        ? preset.opacity[0] +
          Math.random() * (preset.opacity[1] - preset.opacity[0])
        : 1 - Math.random() * 0.2,
      delay: Math.random() * 3,
      image,
    };
  }

  if (!values.current) return null;

  const { startX, sway, size, duration, rotation, opacity, delay, image } =
    values.current;

  return (
    <motion.img
      src={image}
      alt=""
      className="pointer-events-none fixed top-0 left-0 select-none !z-[900]"
      style={{ width: size, opacity }}
      initial={{ x: startX, y: -100, rotate: rotation }}
      animate={{
        x: [startX, startX + sway, startX - sway],
        y: screen.h + 200,
        rotate: preset.rotate ? rotation + 720 : 0,
      }}
      transition={{ duration, delay, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    />
  );
}
