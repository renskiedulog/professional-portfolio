"use client";

import { useEffect, useState } from "react";
import { FALL_PRESETS } from "./fall-presets";
import FallingParticles from "./falling-particles";

type Props = {
  presetName: keyof typeof FALL_PRESETS;
  /** show once per session (default true) */
  oncePerSession?: boolean;
  /** minimum time between shows (ms) */
  cooldownMs?: number;
  /** storage key for multiple effects */
  storageKey?: string;
};

export default function SeasonalEntranceEffect({
  presetName,
  oncePerSession = true,
  cooldownMs,
  storageKey = "entranceEffect",
}: Props) {
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    const now = Date.now();

    const sessionSeen = sessionStorage.getItem(storageKey);
    const lastShown = localStorage.getItem(`${storageKey}-ts`);

    let shouldShow = true;

    if (oncePerSession && sessionSeen) {
      shouldShow = false;
    }

    if (cooldownMs && lastShown) {
      if (now - Number(lastShown) < cooldownMs) {
        shouldShow = false;
      }
    }

    if (shouldShow) {
      setShowEffect(true);
      sessionStorage.setItem(storageKey, "true");
      localStorage.setItem(`${storageKey}-ts`, String(now));
    }
  }, [oncePerSession, cooldownMs, storageKey]);

  if (!showEffect) return null;

  return <FallingParticles preset={FALL_PRESETS[presetName]} />;
}
