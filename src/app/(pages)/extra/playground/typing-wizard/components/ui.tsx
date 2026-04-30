"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { abilities, wordlist } from "../words";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type FallingWord = {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  special?: { power: string };
};

type AcquiredAbility = {
  power: string;
  activationWord: string;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_HP = 5;
const DEFAULT_SPEED = 0.15;
const DEFAULT_SPAWN_MS = 2000;
const SPECIAL_CHANCE = 0.05;
const SCORE_PER_LEVEL = 20;
const MAX_LEVEL = 10;
const MAX_ABILITIES = 5;

const speedForLevel = (lvl: number) => DEFAULT_SPEED + (lvl - 1) * 0.025;
const spawnMsForLevel = (lvl: number) =>
  Math.max(600, DEFAULT_SPAWN_MS - (lvl - 1) * 150);

// ─── Power schools ────────────────────────────────────────────────────────────
type PowerKey = "fire" | "freeze" | "reset" | "time";
type PowerData = {
  name: string;
  desc: string;
  hue: number; // for hsl backgrounds & glows
  hexLight: string;
  hexDark: string;
  Glyph: React.FC<{ className?: string }>;
};

const FireGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3 C9 7 6 9 6 14 a6 6 0 0 0 12 0 c0-3-2-5-3-6 0 2-1 4-2 4-1 0-2-3-1-9z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="15" r="2.2" fill="currentColor" opacity="0.4" />
  </svg>
);

const FreezeGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3" y1="7" x2="21" y2="17" />
      <line x1="3" y1="17" x2="21" y2="7" />
      <path d="M12 2 l-2 2 M12 2 l2 2 M12 22 l-2 -2 M12 22 l2 -2" />
      <path d="M3 7 l2.4 0.5 M3 7 l0.5 2.4 M21 17 l-2.4 -0.5 M21 17 l-0.5 -2.4" />
      <path d="M3 17 l2.4 -0.5 M3 17 l0.5 -2.4 M21 7 l-2.4 0.5 M21 7 l-0.5 2.4" />
    </g>
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

const ResetGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" />
    <path
      d="M12 5 L12 19 M5 12 L19 12"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.5" />
  </svg>
);

const TimeGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M6 3 H18 L13 12 L18 21 H6 L11 12 Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M9 7 H15 M9 17 H15"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const POWERS: Record<PowerKey, PowerData> = {
  fire: {
    name: "Pyromancy",
    desc: "Banish every word",
    hue: 18,
    hexLight: "#c44a18",
    hexDark: "#ff7a3a",
    Glyph: FireGlyph,
  },
  freeze: {
    name: "Cryomancy",
    desc: "Halt time for 3s",
    hue: 198,
    hexLight: "#1f6f96",
    hexDark: "#5fc8e8",
    Glyph: FreezeGlyph,
  },
  reset: {
    name: "Restoration",
    desc: "Heal 1–3 vitality",
    hue: 145,
    hexLight: "#1f7a4e",
    hexDark: "#5ec88a",
    Glyph: ResetGlyph,
  },
  time: {
    name: "Chronomancy",
    desc: "Slow time for 5s",
    hue: 36,
    hexLight: "#9a6e1c",
    hexDark: "#e0b04c",
    Glyph: TimeGlyph,
  },
};

// ─── Roman numerals ───────────────────────────────────────────────────────────
function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

// ─── Audio engine (Web Audio API, all synthesized) ───────────────────────────
class AudioEngine {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  muted = false;

  ensure() {
    if (this.ctx) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.35;
      this.master.connect(this.ctx.destination);
    } catch {
      // audio unavailable; silently no-op
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.35;
  }

  private play(setup: (ctx: AudioContext, dest: AudioNode) => void) {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    setup(this.ctx, this.master);
  }

  private noise(
    ctx: AudioContext,
    dest: AudioNode,
    duration: number,
    volume: number,
    cutoff: number,
    type: BiquadFilterType = "lowpass",
  ) {
    const buffer = ctx.createBuffer(
      1,
      Math.max(1, Math.floor(ctx.sampleRate * duration)),
      ctx.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 1.6);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = cutoff;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    src.connect(filter).connect(gain).connect(dest);
    src.start();
  }

  type() {
    this.play((ctx, dest) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1500 + Math.random() * 400;
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.03);
      osc.connect(gain).connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    });
  }

  destroy(special: boolean) {
    this.play((ctx, dest) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = special ? "triangle" : "sawtooth";
      osc.frequency.setValueAtTime(special ? 1200 : 720, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        special ? 280 : 180,
        ctx.currentTime + 0.18,
      );
      gain.gain.setValueAtTime(0.13, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2000;
      osc.connect(filter).connect(gain).connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
      this.noise(ctx, dest, 0.12, 0.06, 1500, "highpass");
    });
  }

  acquire() {
    this.play((ctx, dest) => {
      [523.25, 659.25, 987.77].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.06;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain).connect(dest);
        osc.start(t);
        osc.stop(t + 0.5);
      });
    });
  }

  fire() {
    this.play((ctx, dest) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      osc.connect(gain).connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.55);
      this.noise(ctx, dest, 0.45, 0.12, 700);
    });
  }

  freeze() {
    this.play((ctx, dest) => {
      [880, 1318.5, 1760, 2349].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.025;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.06, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        osc.connect(gain).connect(dest);
        osc.start(t);
        osc.stop(t + 0.95);
      });
    });
  }

  reset() {
    this.play((ctx, dest) => {
      [261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.05;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
        osc.connect(gain).connect(dest);
        osc.start(t);
        osc.stop(t + 0.75);
      });
    });
  }

  time() {
    this.play((ctx, dest) => {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 220;
      lfo.frequency.value = 6;
      lfoGain.gain.value = 35;
      lfo.connect(lfoGain).connect(osc.frequency);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.connect(gain).connect(dest);
      osc.start();
      lfo.start();
      osc.stop(ctx.currentTime + 0.7);
      lfo.stop(ctx.currentTime + 0.7);
    });
  }

  hpLoss() {
    this.play((ctx, dest) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 380;
      osc.connect(filter).connect(gain).connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.24);
      this.noise(ctx, dest, 0.1, 0.08, 600);
    });
  }

  levelUp() {
    this.play((ctx, dest) => {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.06;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain).connect(dest);
        osc.start(t);
        osc.stop(t + 0.5);
      });
    });
  }

  gameOver() {
    this.play((ctx, dest) => {
      [392, 311, 261.63, 196, 130.81].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.22;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.13, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 700;
        osc.connect(filter).connect(gain).connect(dest);
        osc.start(t);
        osc.stop(t + 0.75);
      });
    });
  }
}

// ─── Decorative components ────────────────────────────────────────────────────
const CornerOrnament: React.FC<{
  position: "tl" | "tr" | "bl" | "br";
}> = ({ position }) => {
  const rot =
    position === "tl"
      ? 0
      : position === "tr"
        ? 90
        : position === "br"
          ? 180
          : 270;
  const pos =
    position === "tl"
      ? "top-1.5 left-1.5"
      : position === "tr"
        ? "top-1.5 right-1.5"
        : position === "br"
          ? "bottom-1.5 right-1.5"
          : "bottom-1.5 left-1.5";
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute w-4 h-4 pointer-events-none text-tw-gold ${pos}`}
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden
    >
      <path
        d="M2 2 L14 2 L14 4 L4 4 L4 14 L2 14 Z"
        fill="currentColor"
        opacity="0.8"
      />
      <circle cx="4" cy="4" r="1.2" fill="currentColor" />
    </svg>
  );
};

// A breathing arcane sigil overlaid on the canvas
const BackgroundSigil: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
    viewBox="0 0 400 400"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
  >
    <g stroke="currentColor" fill="none" strokeWidth="0.6">
      <circle cx="200" cy="200" r="180" />
      <circle cx="200" cy="200" r="140" strokeDasharray="3 4" />
      <circle cx="200" cy="200" r="100" />
      <circle cx="200" cy="200" r="60" strokeDasharray="2 3" />
      <polygon points="200,40 343,275 57,275" />
      <polygon points="200,360 57,125 343,125" />
      <line x1="20" y1="200" x2="380" y2="200" />
      <line x1="200" y1="20" x2="200" y2="380" />
    </g>
  </svg>
);

// ─── Main component ───────────────────────────────────────────────────────────
const TypingWizardUI = () => {
  const [fallingWords, setFallingWordsState] = useState<FallingWord[]>([]);
  const [acquiredAbilities, setAcquiredAbilitiesState] = useState<
    AcquiredAbility[]
  >([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [typedWord, setTypedWord] = useState("");
  const [hp, setHp] = useState(MAX_HP);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [flashPower, setFlashPower] = useState<{
    power: PowerKey;
    key: number;
  } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [muted, setMuted] = useState(false);
  const [shake, setShake] = useState(0); // increments on hp loss
  const [levelPulse, setLevelPulse] = useState(0);

  // Refs
  const wordsRef = useRef<FallingWord[]>([]);
  const abilitiesRef = useRef<AcquiredAbility[]>([]);
  const typedRef = useRef("");
  const pausedRef = useRef(false);
  const frozenRef = useRef(false);
  const gameOverRef = useRef(false);
  const hpRef = useRef(MAX_HP);
  const levelRef = useRef(1);
  const baseSpeedRef = useRef(DEFAULT_SPEED);
  const spawnRateRef = useRef(DEFAULT_SPAWN_MS);
  const nextIdRef = useRef(0);
  const nextParticleIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const audioRef = useRef<AudioEngine | null>(null);
  const flashKeyRef = useRef(0);

  if (audioRef.current === null) audioRef.current = new AudioEngine();

  const setWords = useCallback((w: FallingWord[]) => {
    wordsRef.current = w;
    setFallingWordsState(w);
  }, []);

  const setAbilities = useCallback((a: AcquiredAbility[]) => {
    abilitiesRef.current = a;
    setAcquiredAbilitiesState(a);
  }, []);

  // Particle emitter on word destruction
  const emitParticles = useCallback((x: number, y: number, color: string) => {
    const count = 9;
    const created: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
      const speed = 50 + Math.random() * 70;
      created.push({
        id: nextParticleIdRef.current++,
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        color,
      });
    }
    setParticles((p) => [...p, ...created]);
    const ids = new Set(created.map((c) => c.id));
    setTimeout(() => {
      setParticles((p) => p.filter((part) => !ids.has(part.id)));
    }, 800);
  }, []);

  // Level progression
  useEffect(() => {
    const newLevel = Math.min(
      MAX_LEVEL,
      Math.floor(score / SCORE_PER_LEVEL) + 1,
    );
    if (newLevel !== levelRef.current) {
      const wasUp = newLevel > levelRef.current;
      levelRef.current = newLevel;
      setLevel(newLevel);
      baseSpeedRef.current = speedForLevel(newLevel);
      spawnRateRef.current = spawnMsForLevel(newLevel);
      if (wasUp) {
        audioRef.current?.levelUp();
        setLevelPulse((n) => n + 1);
      }
    }
  }, [score]);

  // Game over
  useEffect(() => {
    if (hp <= 0 && !gameOverRef.current) {
      gameOverRef.current = true;
      setGameOver(true);
      pausedRef.current = true;
      audioRef.current?.gameOver();
    }
  }, [hp]);

  // Pause / resume
  const pause = useCallback(() => {
    pausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (gameOverRef.current) return;
    pausedRef.current = false;
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    if (pausedRef.current) resume();
    else pause();
  }, [pause, resume]);

  useEffect(() => {
    const onVisibility = () => (document.hidden ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", resume);
    };
  }, [pause, resume]);

  // Restart
  const restart = useCallback(() => {
    setWords([]);
    setAbilities([]);
    setParticles([]);
    hpRef.current = MAX_HP;
    setHp(MAX_HP);
    setScore(0);
    levelRef.current = 1;
    setLevel(1);
    baseSpeedRef.current = DEFAULT_SPEED;
    spawnRateRef.current = DEFAULT_SPAWN_MS;
    nextIdRef.current = 0;
    typedRef.current = "";
    setTypedWord("");
    frozenRef.current = false;
    gameOverRef.current = false;
    setGameOver(false);
    pausedRef.current = false;
    setIsPaused(false);
  }, [setAbilities, setWords]);

  // Animation loop
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current && !frozenRef.current) {
        const height = containerRef.current?.offsetHeight ?? 800;
        let hpLoss = 0;
        const next = wordsRef.current
          .map((w) => ({ ...w, y: w.y + w.speed }))
          .filter((w) => {
            if (w.y > height) {
              hpLoss++;
              return false;
            }
            return true;
          });
        setWords(next);
        if (hpLoss > 0) {
          hpRef.current = Math.max(0, hpRef.current - hpLoss);
          setHp(hpRef.current);
          audioRef.current?.hpLoss();
          setShake((s) => s + 1);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [setWords]);

  // Spawn loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const spawn = () => {
      if (!pausedRef.current && !gameOverRef.current) {
        const container = containerRef.current;
        const text = wordlist[Math.floor(Math.random() * wordlist.length)];
        let special: { power: string } | undefined;
        if (
          Math.random() < SPECIAL_CHANCE &&
          abilitiesRef.current.length < MAX_ABILITIES
        ) {
          const ab = abilities[Math.floor(Math.random() * abilities.length)];
          special = { power: ab.power };
        }

        setWords([
          ...wordsRef.current,
          {
            id: nextIdRef.current++,
            text,
            x: container
              ? Math.random() * Math.max(container.offsetWidth - 150, 0)
              : 0,
            y: -40,
            speed: baseSpeedRef.current,
            special,
          },
        ]);
      }
      timer = setTimeout(spawn, spawnRateRef.current);
    };
    timer = setTimeout(spawn, spawnRateRef.current);
    return () => clearTimeout(timer);
  }, [setWords]);

  // Activate ability
  const activateAbility = useCallback(
    (activationWord: string) => {
      const idx = abilitiesRef.current.findIndex(
        (a) => a.activationWord === activationWord,
      );
      if (idx === -1) return;
      const { power } = abilitiesRef.current[idx];

      setAbilities([
        ...abilitiesRef.current.slice(0, idx),
        ...abilitiesRef.current.slice(idx + 1),
      ]);

      flashKeyRef.current++;
      setFlashPower({ power: power as PowerKey, key: flashKeyRef.current });
      setTimeout(() => setFlashPower(null), 1100);

      switch (power) {
        case "fire":
          audioRef.current?.fire();
          // emit particles for each word before clearing
          wordsRef.current.forEach((w) => {
            emitParticles(w.x + 40, w.y + 12, POWERS.fire.hexDark);
          });
          setWords([]);
          break;
        case "freeze":
          audioRef.current?.freeze();
          frozenRef.current = true;
          setTimeout(() => {
            frozenRef.current = false;
          }, 3000);
          break;
        case "reset": {
          audioRef.current?.reset();
          const heal = Math.floor(Math.random() * 3) + 1;
          hpRef.current = Math.min(MAX_HP, hpRef.current + heal);
          setHp(hpRef.current);
          break;
        }
        case "time":
          audioRef.current?.time();
          spawnRateRef.current = spawnMsForLevel(levelRef.current) * 2;
          setWords(
            wordsRef.current.map((w) => ({ ...w, speed: w.speed * 0.5 })),
          );
          setTimeout(() => {
            spawnRateRef.current = spawnMsForLevel(levelRef.current);
            setWords(
              wordsRef.current.map((w) => ({
                ...w,
                speed: baseSpeedRef.current,
              })),
            );
          }, 5000);
          break;
      }
    },
    [setAbilities, setWords, emitParticles],
  );

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      audioRef.current?.ensure();

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        typedRef.current += e.key;
        setTypedWord(typedRef.current);
        audioRef.current?.type();
        return;
      }
      if (e.key === "Backspace") {
        if (typedRef.current.length > 0) audioRef.current?.type();
        typedRef.current = typedRef.current.slice(0, -1);
        setTypedWord(typedRef.current);
        return;
      }
      if (e.key === "Enter") {
        const typed = typedRef.current.toLowerCase();
        const match = wordsRef.current.find(
          (w) => w.text.toLowerCase() === typed,
        );

        if (match) {
          setWords(wordsRef.current.filter((w) => w.id !== match.id));
          const isSpecial = !!match.special;
          const color = isSpecial
            ? POWERS[match.special!.power as PowerKey].hexDark
            : "#c89a4a";
          emitParticles(match.x + 40, match.y + 12, color);

          if (isSpecial && abilitiesRef.current.length < MAX_ABILITIES) {
            const ab = abilities.find((a) => a.power === match.special!.power);
            const pool = ab?.words ?? [];
            const activationWord =
              pool.length > 0
                ? pool[Math.floor(Math.random() * pool.length)]
                : match.special!.power;
            setAbilities([
              ...abilitiesRef.current,
              { power: match.special!.power, activationWord },
            ]);
            audioRef.current?.acquire();
          } else {
            audioRef.current?.destroy(isSpecial);
          }
          setScore((s) => s + 1);
        } else if (
          abilitiesRef.current.some((a) => a.activationWord === typed)
        ) {
          activateAbility(typed);
        }

        typedRef.current = "";
        setTypedWord("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activateAbility, setAbilities, setWords, emitParticles]);

  // Mute toggle
  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      audioRef.current?.setMuted(next);
      return next;
    });
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Custom fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .tw-display { font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif; }
        .tw-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .tw-mono { font-family: 'JetBrains Mono', 'Menlo', monospace; }
        .tw-gold { color: #b88a3e; }
        .text-tw-gold { color: #b88a3e; }
        .border-tw-gold { border-color: #b88a3e; }
        .bg-tw-parchment { background: #f4e8cc; }
        .bg-tw-ink { background: #0c0815; }
        :root {
          --tw-gold: #b88a3e;
          --tw-gold-soft: #d8b07a;
          --tw-parchment: #f4e8cc;
          --tw-parchment-dim: #e6d5ac;
          --tw-ink: #0c0815;
          --tw-ink-soft: #1a1228;
          --tw-crimson: #8a2222;
        }
        @keyframes tw-flicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 0.78; }
          55% { opacity: 0.92; }
        }
        .tw-flicker { animation: tw-flicker 2.4s infinite ease-in-out; }
        @keyframes tw-shimmer {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.18); }
        }
        @keyframes tw-rune-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .tw-noise {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 160px 160px;
        }
        .tw-vignette {
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%);
        }
        .dark .tw-vignette {
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
        }
      `}</style>

      <div
        className="w-full h-full flex gap-3 p-3 relative overflow-hidden tw-serif transition-colors
        bg-[#ede0c4] text-[#2a1f10]
        dark:bg-[#0a0712] dark:text-[#e8d8b8]"
      >
        {/* Atmospheric noise layer */}
        <div className="absolute inset-0 pointer-events-none tw-noise opacity-[0.18] dark:opacity-[0.10] mix-blend-multiply dark:mix-blend-screen" />

        {/* ────── GAME AREA ────── */}
        <motion.div
          key={shake}
          initial={{ x: 0 }}
          animate={{ x: [0, -4, 5, -3, 0] }}
          transition={{ duration: 0.25 }}
          className="flex-grow flex flex-col gap-2.5 min-w-0 relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-1 pb-0.5">
            <div className="flex items-center gap-2">
              <span className="text-tw-gold text-sm tw-flicker">✦</span>
              <h1 className="tw-display tracking-[0.35em] text-xs sm:text-[13px] font-medium text-[#3a2818] dark:text-[#d8b07a]">
                TYPING&nbsp;WIZARD
              </h1>
              <span className="text-tw-gold text-sm tw-flicker">✦</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="w-7 h-7 grid place-items-center rounded-full border border-[#b88a3e]/40 hover:border-[#b88a3e] text-[#7a5828] dark:text-[#d8b07a] hover:bg-[#b88a3e]/10 transition-colors"
              >
                {muted ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 9v6h4l5 4V5L7 9H3zM16 9l5 5M21 9l-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 9v6h4l5 4V5L7 9H3zM16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={togglePause}
                className="px-3 h-7 rounded-full border border-[#b88a3e]/40 hover:border-[#b88a3e] text-[11px] tracking-[0.2em] uppercase tw-display text-[#7a5828] dark:text-[#d8b07a] hover:bg-[#b88a3e]/10 transition-colors"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={containerRef}
            className="relative flex-grow overflow-hidden rounded-sm border-2 border-[#b88a3e]/30
            bg-[#f8edd0] dark:bg-[#0f0a1c]
            shadow-[inset_0_0_60px_rgba(184,138,62,0.12)]
            dark:shadow-[inset_0_0_80px_rgba(184,138,62,0.08)]"
          >
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            {/* Background sigil */}
            <div className="absolute inset-0 grid place-items-center text-[#b88a3e]">
              <BackgroundSigil />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none tw-vignette" />

            {/* Power flash — subtle, behind words */}
            <AnimatePresence>
              {flashPower && (
                <motion.div
                  key={flashPower.key}
                  initial={{ opacity: 0.22 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor:
                      POWERS[flashPower.power as PowerKey].hexDark,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Power flash sigil — center expanding glyph */}
            <AnimatePresence>
              {flashPower && (
                <motion.div
                  key={"sigil-" + flashPower.key}
                  initial={{ opacity: 0.7, scale: 0.4 }}
                  animate={{ opacity: 0, scale: 2.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0 grid place-items-center pointer-events-none z-30"
                  style={{
                    color: POWERS[flashPower.power as PowerKey].hexDark,
                  }}
                >
                  {(() => {
                    const G = POWERS[flashPower.power as PowerKey].Glyph;
                    return <G className="w-32 h-32" />;
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Falling words */}
            {fallingWords.map((word) => {
              const isSpecial = !!word.special;
              const power = isSpecial
                ? POWERS[word.special!.power as PowerKey]
                : null;
              const Glyph = power?.Glyph;
              return (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, scale: 0.8, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute z-20 select-none flex items-center gap-1.5 px-2.5 py-1 tw-serif italic text-[15px] font-semibold tracking-wide`}
                  style={{
                    top: Math.round(word.y),
                    left: Math.round(word.x),
                    backgroundColor: isSpecial
                      ? power!.hexDark
                      : "rgba(244,232,204,0.95)",
                    border: isSpecial
                      ? `1px solid ${power!.hexDark}`
                      : "1px solid rgba(184,138,62,0.45)",
                    boxShadow: isSpecial
                      ? `0 0 14px ${power!.hexDark}55, 0 1px 2px rgba(0,0,0,0.25)`
                      : "0 1px 3px rgba(0,0,0,0.12), inset 0 0 8px rgba(184,138,62,0.08)",
                    borderRadius: "2px",
                  }}
                >
                  {Glyph && (
                    <span className="shrink-0 inline-flex text-white/95">
                      <Glyph className="w-3 h-3" />
                    </span>
                  )}
                  <span
                    className={
                      isSpecial
                        ? "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
                        : "text-[#2a1a0e] dark:text-[#3a2818]"
                    }
                  >
                    {word.text}
                  </span>
                </motion.div>
              );
            })}

            {/* Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: p.dx,
                  y: p.dy,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-25"
                style={{
                  left: p.x,
                  top: p.y,
                  background: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            ))}

            {/* Danger sigil at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 z-10 pointer-events-none">
              <div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #8a2222 20%, #8a2222 80%, transparent)",
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Pause overlay */}
            {isPaused && !gameOver && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 backdrop-blur-md bg-[#f4e8cc]/50 dark:bg-[#0a0712]/70">
                <div className="text-tw-gold opacity-30">
                  <BackgroundSigil />
                </div>
                <div className="absolute flex flex-col items-center gap-3">
                  <div className="tw-display text-[10px] tracking-[0.4em] text-[#b88a3e]">
                    INCANTATION&nbsp;HALTED
                  </div>
                  <div className="tw-display text-3xl tracking-[0.25em] text-[#3a2818] dark:text-[#d8b07a]">
                    PAUSED
                  </div>
                  <button
                    onClick={resume}
                    className="mt-3 px-6 py-2 rounded-sm border border-[#b88a3e] text-[11px] tracking-[0.3em] uppercase tw-display text-[#3a2818] dark:text-[#e8d8b8] hover:bg-[#b88a3e]/15 transition-colors"
                  >
                    Resume
                  </button>
                </div>
              </div>
            )}

            {/* Game over overlay */}
            <AnimatePresence>
              {gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 backdrop-blur-md bg-[#1a0a0a]/85 dark:bg-[#0a0510]/92"
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ color: "#8a2222" }}
                  >
                    <BackgroundSigil />
                  </div>
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative flex flex-col items-center gap-3"
                  >
                    <div className="tw-display text-[10px] tracking-[0.4em] text-[#8a2222]">
                      THE&nbsp;TOWER&nbsp;FALLS
                    </div>
                    <div className="tw-display italic text-5xl tracking-wider text-[#e8d8b8]">
                      Vanquished
                    </div>
                    <div className="flex items-center gap-6 mt-3 text-[#d8b07a]">
                      <div className="flex flex-col items-center">
                        <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">
                          Score
                        </div>
                        <div className="tw-display text-2xl">{score}</div>
                      </div>
                      <div className="text-tw-gold opacity-50">✦</div>
                      <div className="flex flex-col items-center">
                        <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">
                          Rank
                        </div>
                        <div className="tw-display text-2xl">
                          {toRoman(level)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={restart}
                      className="mt-5 px-8 py-2.5 rounded-sm border border-[#b88a3e] text-xs tracking-[0.4em] uppercase tw-display text-[#e8d8b8] hover:bg-[#b88a3e]/20 transition-colors"
                    >
                      Begin&nbsp;Anew
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Incantation bar */}
          <div className="relative h-12 px-4 rounded-sm border border-[#b88a3e]/35 bg-[#f4e8cc]/70 dark:bg-[#15102a]/70 flex items-center justify-center backdrop-blur-sm">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-tw-gold opacity-50 text-xs tw-display tracking-widest">
              ✦
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-tw-gold opacity-50 text-xs tw-display tracking-widest">
              ✦
            </div>
            {typedWord ? (
              <div className="flex gap-0.5 items-baseline">
                {typedWord.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: -6, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 22,
                    }}
                    className="tw-mono text-xl text-[#3a2818] dark:text-[#e8d8b8]"
                    style={{
                      textShadow: "0 0 8px rgba(184,138,62,0.4)",
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="ml-0.5 inline-block w-[2px] h-5 bg-[#b88a3e]"
                />
              </div>
            ) : (
              <span className="text-xs tw-display tracking-[0.4em] text-[#7a5828]/60 dark:text-[#d8b07a]/40 uppercase">
                Speak&nbsp;the&nbsp;words
              </span>
            )}
          </div>
        </motion.div>

        {/* ────── SIDEBAR ────── */}
        <aside className="w-64 min-w-[16rem] flex flex-col gap-2.5 relative">
          {/* Vitality + Score + Level (combined codex card) */}
          <Card title="Codex">
            <div className="space-y-3">
              {/* HP */}
              <div>
                <div className="flex items-end justify-between mb-1.5">
                  <span className="text-[9px] tracking-[0.3em] uppercase tw-display text-[#7a5828] dark:text-[#d8b07a]/70">
                    Vitality
                  </span>
                  <span className="text-[10px] italic tw-serif text-[#b88a3e]">
                    {hp}/{MAX_HP}
                  </span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: MAX_HP }).map((_, i) => (
                    <Heart key={i} alive={i < hp} />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-grow h-px bg-[#b88a3e]/25" />
                <span className="text-tw-gold text-[10px]">✦</span>
                <div className="flex-grow h-px bg-[#b88a3e]/25" />
              </div>

              {/* Score + Level */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase tw-display text-[#7a5828] dark:text-[#d8b07a]/70 mb-1">
                    Score
                  </div>
                  <div className="tw-display text-2xl text-[#3a2818] dark:text-[#e8d8b8] tabular-nums">
                    {score}
                  </div>
                </div>
                <motion.div
                  key={levelPulse}
                  initial={{ scale: levelPulse > 0 ? 1.3 : 1 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-[9px] tracking-[0.3em] uppercase tw-display text-[#7a5828] dark:text-[#d8b07a]/70 mb-1">
                    Rank
                  </div>
                  <div className="tw-display text-2xl text-[#3a2818] dark:text-[#e8d8b8]">
                    {toRoman(level)}
                  </div>
                </motion.div>
              </div>

              {/* Progress to next level */}
              <div>
                <div className="h-[2px] bg-[#b88a3e]/15 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#b88a3e] to-[#d8b07a]"
                    animate={{
                      width: `${
                        ((score % SCORE_PER_LEVEL) / SCORE_PER_LEVEL) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Spellbook (acquired) */}
          <Card title="Spellbook" className="flex-1 min-h-0 flex flex-col">
            <div className="flex-1 overflow-y-auto -mr-1 pr-1">
              {acquiredAbilities.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-2 py-3 text-center">
                  <div className="text-tw-gold opacity-30 text-2xl tw-display">
                    ✦
                  </div>
                  <p className="text-[11px] italic tw-serif text-[#7a5828]/70 dark:text-[#d8b07a]/50 leading-relaxed px-2">
                    Strike down a glowing word to inscribe its rite here
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <AnimatePresence mode="popLayout">
                    {acquiredAbilities.map((ab, i) => {
                      const p = POWERS[ab.power as PowerKey];
                      return (
                        <motion.div
                          key={ab.power + ab.activationWord + i}
                          layout="position"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 26,
                          }}
                          className="relative px-2.5 py-1.5 rounded-sm flex items-center gap-2"
                          style={{
                            backgroundColor: p.hexDark,
                            border: `1px solid ${p.hexDark}`,
                            boxShadow: `0 0 10px ${p.hexDark}40, 0 1px 2px rgba(0,0,0,0.2)`,
                          }}
                        >
                          <span className="shrink-0 inline-flex text-white/95">
                            <p.Glyph className="w-3.5 h-3.5" />
                          </span>
                          <span className="tw-serif italic font-semibold text-sm leading-none truncate text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                            {ab.activationWord}
                          </span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {/* Slot indicators */}
                  <div className="flex gap-1 justify-center mt-1.5">
                    {Array.from({ length: MAX_ABILITIES }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          i < acquiredAbilities.length
                            ? "bg-[#b88a3e]"
                            : "bg-[#b88a3e]/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Schools of Magic legend */}
          <Card title="Schools" compact>
            <div className="grid grid-cols-1 gap-1">
              {(Object.keys(POWERS) as PowerKey[]).map((key) => {
                const p = POWERS[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-2 text-[10.5px]"
                  >
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className="shrink-0 inline-flex"
                        style={{ color: p.hexDark }}
                      >
                        <p.Glyph className="w-3 h-3" />
                      </span>
                      <span
                        className="tw-display tracking-[0.15em]"
                        style={{ color: p.hexDark }}
                      >
                        {p.name.toUpperCase()}
                      </span>
                    </div>
                    <span className="tw-serif italic text-[#7a5828]/80 dark:text-[#d8b07a]/55 text-right">
                      {p.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
};

// ─── Sidebar Card ─────────────────────────────────────────────────────────────
const Card: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}> = ({ title, children, className = "", compact = false }) => (
  <div
    className={`relative rounded-sm border border-[#b88a3e]/35
    bg-[#f4e8cc]/85 dark:bg-[#15102a]/85
    shadow-[0_2px_12px_rgba(184,138,62,0.06)]
    ${compact ? "px-3 py-2" : "px-3.5 py-3"}
    ${className}`}
  >
    <CornerOrnament position="tl" />
    <CornerOrnament position="tr" />
    <CornerOrnament position="bl" />
    <CornerOrnament position="br" />
    <div className="flex items-center gap-2 mb-1.5">
      <div className="flex-grow h-px bg-[#b88a3e]/25" />
      <h3 className="tw-display text-[10px] tracking-[0.35em] uppercase text-[#b88a3e]">
        {title}
      </h3>
      <div className="flex-grow h-px bg-[#b88a3e]/25" />
    </div>
    {children}
  </div>
);

// ─── Heart icon for HP ────────────────────────────────────────────────────────
const Heart: React.FC<{ alive: boolean }> = ({ alive }) => (
  <motion.div
    animate={{
      scale: alive ? 1 : 0.7,
      opacity: alive ? 1 : 0.25,
    }}
    transition={{ type: "spring", stiffness: 380, damping: 18 }}
    className="relative"
  >
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill={alive ? "#8a2222" : "transparent"}
      stroke={alive ? "#5a1212" : "#8a2222"}
      strokeWidth="1.2"
    >
      <path d="M12 21 C 4 14 2 10 5 6 a4 4 0 0 1 7 1 a4 4 0 0 1 7 -1 c 3 4 1 8 -7 15 z" />
    </svg>
    {alive && (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <div
          className="w-[5px] h-[5px] rounded-full"
          style={{ background: "#ff5050", filter: "blur(1px)" }}
        />
      </motion.div>
    )}
  </motion.div>
);

export default TypingWizardUI;
