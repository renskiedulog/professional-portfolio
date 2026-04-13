"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { abilities, wordlist } from "../words";
import { AnimatePresence, motion } from "framer-motion";

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

const POWER_STYLES: Record<
  string,
  { text: string; border: string; bg: string; flash: string; desc: string }
> = {
  fire: {
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400 dark:border-orange-600",
    bg: "bg-orange-100 dark:bg-orange-950",
    flash: "bg-orange-400 dark:bg-orange-600",
    desc: "Clears all words",
  },
  freeze: {
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-400 dark:border-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-950",
    flash: "bg-cyan-400 dark:bg-cyan-600",
    desc: "Freezes words for 3s",
  },
  reset: {
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-400 dark:border-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-950",
    flash: "bg-emerald-400 dark:bg-emerald-600",
    desc: "Heals 1–3 HP",
  },
  time: {
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-400 dark:border-yellow-600",
    bg: "bg-yellow-100 dark:bg-yellow-950",
    flash: "bg-yellow-400 dark:bg-yellow-600",
    desc: "Slows time for 5s",
  },
};

const MAX_HP = 5;
const DEFAULT_SPEED = 0.15;
const DEFAULT_SPAWN_MS = 2000;
const SPECIAL_CHANCE = 0.05;
// Score thresholds for each level-up (cumulative)
const SCORE_PER_LEVEL = 20;
const MAX_LEVEL = 10;

const speedForLevel = (lvl: number) => DEFAULT_SPEED + (lvl - 1) * 0.025;
const spawnMsForLevel = (lvl: number) =>
  Math.max(600, DEFAULT_SPAWN_MS - (lvl - 1) * 150);

const TypingWizardUI = () => {
  const [fallingWords, setFallingWordsState] = useState<FallingWord[]>([]);
  const [acquiredAbilities, setAcquiredAbilitiesState] = useState<
    AcquiredAbility[]
  >([]);
  const [typedWord, setTypedWord] = useState("");
  const [hp, setHp] = useState(MAX_HP);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [flashPower, setFlashPower] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Refs mirror state for synchronous reads inside callbacks/loops
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const setWords = useCallback((w: FallingWord[]) => {
    wordsRef.current = w;
    setFallingWordsState(w);
  }, []);

  const setAbilities = useCallback((a: AcquiredAbility[]) => {
    abilitiesRef.current = a;
    setAcquiredAbilitiesState(a);
  }, []);

  // Level progression — recalculate whenever score changes
  useEffect(() => {
    const newLevel = Math.min(
      MAX_LEVEL,
      Math.floor(score / SCORE_PER_LEVEL) + 1,
    );
    if (newLevel !== levelRef.current) {
      levelRef.current = newLevel;
      setLevel(newLevel);
      baseSpeedRef.current = speedForLevel(newLevel);
      // Only update spawnRate if time-ability isn't currently active
      // (time-ability manages spawnRate on its own timer)
      spawnRateRef.current = spawnMsForLevel(newLevel);
    }
  }, [score]);

  // Game over when HP reaches 0
  useEffect(() => {
    if (hp <= 0 && !gameOverRef.current) {
      gameOverRef.current = true;
      setGameOver(true);
      pausedRef.current = true; // freeze everything
    }
  }, [hp]);

  // ── Pause / resume ──────────────────────────────────────────────────────────
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

  // ── Restart ─────────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setWords([]);
    setAbilities([]);
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

  // ── Animation loop — detects words falling off bottom and deducts HP ────────
  // Freeze is handled entirely by frozenRef — the loop simply skips movement
  // while frozen. Word speeds are never mutated for freeze, avoiding oscillation.
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
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [setWords]);

  // ── Spawn loop ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const spawn = () => {
      if (!pausedRef.current && !gameOverRef.current) {
        const container = containerRef.current;
        const text = wordlist[Math.floor(Math.random() * wordlist.length)];
        let special: { power: string } | undefined;

        if (Math.random() < SPECIAL_CHANCE && abilitiesRef.current.length < 5) {
          const ab = abilities[Math.floor(Math.random() * abilities.length)];
          special = { power: ab.power };
        }

        setWords([
          ...wordsRef.current,
          {
            id: nextIdRef.current++,
            text,
            x: container
              ? Math.random() * Math.max(container.offsetWidth - 130, 0)
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

  // ── Activate ability ─────────────────────────────────────────────────────────
  const activateAbility = useCallback(
    (activationWord: string) => {
      const idx = abilitiesRef.current.findIndex(
        (a) => a.activationWord === activationWord,
      );
      if (idx === -1) return;

      const { power } = abilitiesRef.current[idx];

      // Remove exactly one instance
      setAbilities([
        ...abilitiesRef.current.slice(0, idx),
        ...abilitiesRef.current.slice(idx + 1),
      ]);

      setFlashPower(power);
      setTimeout(() => setFlashPower(null), 800);

      switch (power) {
        case "fire":
          setWords([]);
          break;

        case "freeze":
          frozenRef.current = true;
          setTimeout(() => {
            frozenRef.current = false;
          }, 3000);
          break;

        case "reset": {
          const heal = Math.floor(Math.random() * 3) + 1; // 1–3
          hpRef.current = Math.min(MAX_HP, hpRef.current + heal);
          setHp(hpRef.current);
          break;
        }

        case "time":
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
    [setAbilities, setWords],
  );

  // ── Keyboard input ───────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        typedRef.current += e.key;
        setTypedWord(typedRef.current);
        return;
      }

      if (e.key === "Backspace") {
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

          if (match.special && abilitiesRef.current.length < 5) {
            const ab = abilities.find((a) => a.power === match.special!.power);
            const pool = ab?.words ?? [];
            const activationWord =
              pool.length > 0
                ? pool[Math.floor(Math.random() * pool.length)]
                : match.special.power;
            setAbilities([
              ...abilitiesRef.current,
              { power: match.special.power, activationWord },
            ]);
          }

          // Score for every correctly typed word
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
  }, [activateAbility, setAbilities, setWords]);

  return (
    <div className="w-full h-full flex gap-4 p-4 dark:bg-gray-950 text-gray-900 dark:text-white font-mono transition-colors">
      {/* Game Area */}
      <div className="flex-grow flex flex-col gap-3 min-w-0">
        <div
          ref={containerRef}
          className="relative flex-grow bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          {/* Ability flash */}
          <AnimatePresence>
            {flashPower && (
              <motion.div
                key={flashPower + Date.now()}
                initial={{ opacity: 0.18 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className={`absolute inset-0 pointer-events-none ${POWER_STYLES[flashPower]?.flash}`}
              />
            )}
          </AnimatePresence>

          {/* Danger strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400/40 z-10" />

          {/* Pause overlay */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white/80 dark:bg-black/70 backdrop-blur-sm">
              <div className="text-3xl font-bold tracking-[0.3em] text-gray-700 dark:text-white/80">
                PAUSED
              </div>
              <button
                onClick={resume}
                className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Resume
              </button>
            </div>
          )}

          {/* Game over overlay */}
          {gameOver && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-white/90 dark:bg-black/85 backdrop-blur-sm">
              <div className="text-3xl font-bold tracking-widest text-red-500">
                GAME OVER
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Score{" "}
                <span className="font-bold text-gray-800 dark:text-white">
                  {score}
                </span>
                {"  ·  "}Level{" "}
                <span className="font-bold text-gray-800 dark:text-white">
                  {level}
                </span>
              </div>
              <button
                onClick={restart}
                className="mt-2 px-6 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                Play Again
              </button>
            </div>
          )}

          {/* Falling words */}
          {fallingWords.map((word) => {
            const style = word.special
              ? POWER_STYLES[word.special.power]
              : null;
            return (
              <div
                key={word.id}
                className={`absolute px-2 py-0.5 rounded border text-sm font-semibold whitespace-nowrap select-none ${
                  style
                    ? `${style.text} ${style.border} ${style.bg}`
                    : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
                }`}
                style={{ top: Math.round(word.y), left: Math.round(word.x) }}
              >
                {word.text}
              </div>
            );
          })}
        </div>

        {/* Typing bar */}
        <div className="h-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center px-4">
          {typedWord ? (
            <div className="flex gap-0.5">
              {typedWord.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 700, damping: 25 }}
                  className="text-xl text-gray-900 dark:text-white"
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-400 dark:text-gray-600">
              start typing...
            </span>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 min-w-[16rem] flex flex-col gap-3">
        {/* Stats card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          {/* HP */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
                HP
              </div>
              <div className="flex gap-1">
                {Array.from({ length: MAX_HP }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i < hp ? 1 : 0.75,
                      opacity: i < hp ? 1 : 0.3,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`w-4 h-4 rounded-sm ${i < hp ? "bg-red-500" : "bg-gray-200 dark:bg-gray-700"}`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={togglePause}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>

          {/* Score + Level */}
          <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div>
              <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Score
              </div>
              <div className="text-2xl font-bold">{score}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Level
              </div>
              <div className="text-2xl font-bold">{level}</div>
            </div>
          </div>

          {/* Level progress bar */}
          <div className="mt-2 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-400 dark:bg-gray-500 rounded-full"
              animate={{
                width: `${((score % SCORE_PER_LEVEL) / SCORE_PER_LEVEL) * 100}%`,
              }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
        </div>

        {/* Acquired Abilities */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex-1 overflow-y-auto">
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Abilities
          </div>
          {acquiredAbilities.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Destroy colored words to acquire powers
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {acquiredAbilities.map((ab, i) => {
                  const s = POWER_STYLES[ab.power];
                  return (
                    <motion.div
                      key={ab.power + ab.activationWord + i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`px-3 py-2 rounded-lg border ${s.border} ${s.bg}`}
                    >
                      <div className={`text-sm font-bold ${s.text}`}>
                        {ab.activationWord}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Powers legend */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
            Powers
          </div>
          <div className="flex flex-col gap-1">
            {Object.entries(POWER_STYLES).map(([power, s]) => (
              <div key={power} className="flex items-center gap-2">
                <span className={`text-xs font-bold w-12 shrink-0 ${s.text}`}>
                  {power.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingWizardUI;
