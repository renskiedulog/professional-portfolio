import { FallPreset } from "@/lib/types";

export const FALL_PRESETS: Record<string, FallPreset> = {
  // autumn: {
  //   images: ["/assets/maple-leaf.png"],
  //   count: 150,
  //   size: [18, 30],
  //   duration: [3, 4],
  //   sway: 120,
  //   rotate: true,
  //   opacity: [0.8, 1],
  // },
  winter: {
    images: ["/assets/snowflake.png", "/assets/snowflake-2.png"],
    count: 150,
    size: [18, 30],
    duration: [3, 4],
    sway: 120,
    rotate: true,
    opacity: [0.8, 1],
  },
};
