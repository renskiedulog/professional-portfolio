"use client";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ChevronRight, RotateCcw, BookOpen, FlaskConical } from "lucide-react";
import BackButton from "@/app/UI/global-components/back-button";
import { hiraganaCards } from "../_data/hiragana";
import { katakanaCards } from "../_data/katakana";
import { kanjiCards } from "../_data/kanji";
import { vocabCards } from "../_data/vocabulary";

// ── Types ─────────────────────────────────────────────────────────────────────
type DeckKey = "hiragana" | "katakana" | "kanji" | "vocabulary";
type Mode = "select" | "learning" | "test";
type FlashCard = { front: string; back: string; reading?: string };

// ── Data ──────────────────────────────────────────────────────────────────────
const CARD_POOLS: Record<DeckKey, FlashCard[]> = {
  hiragana:   hiraganaCards.map((c) => ({ front: c.char, back: c.romaji })),
  katakana:   katakanaCards.map((c) => ({ front: c.char, back: c.romaji })),
  kanji:      kanjiCards.map((c) => ({ front: c.front, back: c.meaning, reading: c.reading })),
  vocabulary: vocabCards.map((c) => ({ front: c.front, back: c.meaning, reading: c.reading })),
};

const DECK_INFO: Record<DeckKey, { label: string; jp: string; desc: string }> = {
  hiragana:   { label: "Hiragana",   jp: "平仮名", desc: "Basic Japanese syllabary · 46 characters" },
  katakana:   { label: "Katakana",   jp: "片仮名", desc: "Foreign words & loanwords · 46 characters" },
  kanji:      { label: "Kanji",      jp: "漢字",   desc: "Chinese characters · N5 level · 68 entries" },
  vocabulary: { label: "Vocabulary", jp: "語彙",   desc: "Common N5 words · 37 entries" },
};

// ── Utilities ─────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateChoices(correct: FlashCard, pool: FlashCard[]): string[] {
  const distractors = pool
    .filter((c) => c.back !== correct.back)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((c) => c.back);
  return shuffle([correct.back, ...distractors]);
}

// ── Shared: Page shell ────────────────────────────────────────────────────────
function PageShell({ children, onBack }: { children: React.ReactNode; onBack?: () => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        .jp-char { font-family: 'Noto Serif JP', serif; }
        .jp-mono  { font-family: 'DM Mono', monospace; font-size: 0.85em; }
      `}</style>
      <div className="flex flex-col gap-6 py-4 pb-20">
        <div>
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center text-base gap-1 hover:-translate-x-2 transition duration-300 ease-in-out opacity-60 hover:opacity-100 font-semibold"
            >
              <ArrowLeft size={18} className="mb-0.5" />
              <span>Back</span>
            </button>
          ) : (
            <BackButton href="/extra/playground/jp-flashcards" label="JP Flashcards" />
          )}
        </div>
        {children}
      </div>
    </>
  );
}

// ── Shared: End screen ────────────────────────────────────────────────────────
function EndScreen({
  label, total, know, dontKnow, score,
  mode, onRestart, onBack,
}: {
  label: string; total: number; know?: number; dontKnow?: number;
  score?: number; mode: "learning" | "test";
  onRestart: () => void; onBack: () => void;
}) {
  const pct = mode === "learning"
    ? Math.round(((know ?? 0) / total) * 100)
    : Math.round(((score ?? 0) / total) * 100);
  const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📚";

  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center gap-10">
      <div className="text-center space-y-2">
        <div className="text-5xl mb-3">{emoji}</div>
        <h2 className="text-2xl font-bold">Session Complete</h2>
        <p className="text-sm text-muted-foreground">{label} · {total} cards</p>
      </div>

      <div className="flex gap-8 text-center">
        {mode === "learning" ? (
          <>
            <Stat value={know ?? 0} label="Got it" color="emerald" />
            <Divider />
            <Stat value={dontKnow ?? 0} label="Still learning" color="rose" />
            <Divider />
            <Stat value={`${pct}%`} label="Accuracy" />
          </>
        ) : (
          <>
            <Stat value={score ?? 0} label="Correct" color="emerald" />
            <Divider />
            <Stat value={total - (score ?? 0)} label="Wrong" color="rose" />
            <Divider />
            <Stat value={`${pct}%`} label="Score" />
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border hover:border-foreground/40 font-semibold text-sm transition-all hover:-translate-y-px active:scale-[0.98]"
        >
          <RotateCcw size={13} /> Try Again
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm transition-all hover:opacity-85 active:scale-[0.98]"
        >
          Change Mode <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: number | string; label: string; color?: "emerald" | "rose" }) {
  const cls = color === "emerald"
    ? "text-emerald-600 dark:text-emerald-400"
    : color === "rose"
    ? "text-rose-600 dark:text-rose-400"
    : "";
  return (
    <div className="space-y-1">
      <div className={`text-3xl font-bold ${cls}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="w-px bg-border self-stretch" />;
}

// ── Shared: Progress bar ──────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums shrink-0">
        {current} / {total}
      </span>
    </div>
  );
}

// ── Learning Mode ─────────────────────────────────────────────────────────────
function LearningMode({ cards: allCards, label, onBack }: {
  cards: FlashCard[]; label: string; onBack: () => void;
}) {
  const [cards] = useState(() => shuffle(allCards));
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [know, setKnow] = useState(0);
  const [dontKnow, setDontKnow] = useState(0);

  const isDone = index >= cards.length;
  const card = cards[index];

  const handleFlip = useCallback(() => {
    if (!isFlipped) { setAnimate(true); setIsFlipped(true); }
  }, [isFlipped]);

  const handleAnswer = useCallback((knew: boolean) => {
    if (knew) setKnow((k) => k + 1); else setDontKnow((d) => d + 1);
    setAnimate(false); setIsFlipped(false);
    setIndex((i) => i + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setIndex(0); setAnimate(false); setIsFlipped(false);
    setKnow(0); setDontKnow(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isDone) return;
      if ((e.key === " " || e.key === "Enter") && !isFlipped) {
        e.preventDefault(); setAnimate(true); setIsFlipped(true); return;
      }
      if (isFlipped) {
        if (e.key === "ArrowRight" || e.key === "1") handleAnswer(true);
        if (e.key === "ArrowLeft"  || e.key === "2") handleAnswer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFlipped, isDone, handleAnswer]);

  if (isDone) return (
    <EndScreen label={label} total={cards.length} know={know} dontKnow={dontKnow}
      mode="learning" onRestart={handleRestart} onBack={onBack} />
  );

  return (
    <div className="flex flex-col gap-5">
      <ProgressBar current={index} total={cards.length} />

      {/* Flip card */}
      <div
        className="[perspective:1200px] w-full max-w-sm mx-auto cursor-pointer select-none"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-64 [transform-style:preserve-3d] ${
          animate ? "transition-transform duration-500" : ""
        } ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col items-center justify-center gap-3 p-8">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <span className="jp-char text-7xl font-medium leading-none">{card.front}</span>
            <span className="text-[11px] text-muted-foreground/50 tracking-widest uppercase">tap to reveal</span>
          </div>
          {/* Back */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2.5 p-8">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <span className="text-3xl font-bold text-center jp-mono">{card.back}</span>
            {card.reading && (
              <span className="jp-char text-sm text-muted-foreground text-center leading-snug">{card.reading}</span>
            )}
          </div>
        </div>
      </div>

      {/* Answer buttons */}
      <div className={`flex gap-3 justify-center transition-opacity duration-200 ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 max-w-[160px] py-3 rounded-xl border-2 border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-300 font-semibold text-sm hover:bg-rose-50 dark:hover:bg-rose-950 transition-all active:scale-[0.97]"
        >
          Still Learning
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 max-w-[160px] py-3 rounded-xl border-2 border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300 font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all active:scale-[0.97]"
        >
          Got it!
        </button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wider">
        {isFlipped ? "→ GOT IT  ·  ← STILL LEARNING" : "SPACE OR CLICK TO FLIP"}
      </p>
    </div>
  );
}

// ── Test Mode ─────────────────────────────────────────────────────────────────
function TestMode({ cards: allCards, label, onBack }: {
  cards: FlashCard[]; label: string; onBack: () => void;
}) {
  const [cards] = useState(() => shuffle(allCards));
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>(() =>
    generateChoices(allCards[0], allCards)
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const isDone = index >= cards.length;
  const card = cards[index];

  const handleChoice = useCallback((choice: string) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === card.back) setScore((s) => s + 1);
    setTimeout(() => {
      const next = index + 1;
      setIndex(next);
      setSelected(null);
      setAnimKey((k) => k + 1);
      if (next < cards.length) {
        setChoices(generateChoices(cards[next], allCards));
      }
    }, 950);
  }, [selected, card, index, cards, allCards]);

  const handleRestart = useCallback(() => {
    setIndex(0); setSelected(null); setScore(0); setAnimKey((k) => k + 1);
    setChoices(generateChoices(cards[0], allCards));
  }, [cards, allCards]);

  const getChoiceVariant = (choice: string) => {
    if (selected === null) return "idle";
    if (choice === card.back) return "correct";
    if (choice === selected) return "wrong";
    return "idle";
  };

  const CHOICE_STYLES: Record<string, string> = {
    idle:    "border-border hover:border-foreground/40 hover:bg-foreground/[0.03] active:scale-[0.99]",
    correct: "border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-600 scale-[1.01]",
    wrong:   "border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-600",
  };

  if (isDone) return (
    <EndScreen label={label} total={cards.length} score={score}
      mode="test" onRestart={handleRestart} onBack={onBack} />
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <ProgressBar current={index} total={cards.length} />
        <span className="ml-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums shrink-0">
          {score} correct
        </span>
      </div>

      {/* Question card */}
      <div key={animKey} className="w-full max-w-sm mx-auto rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2.5 p-10 min-h-[200px]">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <span className="jp-char text-7xl font-medium leading-none">{card.front}</span>
      </div>

      {/* Choices 2×2 grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm mx-auto">
        {choices.map((choice, i) => {
          const variant = getChoiceVariant(choice);
          return (
            <button
              key={i}
              onClick={() => handleChoice(choice)}
              disabled={selected !== null}
              className={`py-4 px-3 rounded-xl border-2 text-sm font-semibold text-center transition-all duration-150 jp-mono ${CHOICE_STYLES[variant]}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Mode Select ───────────────────────────────────────────────────────────────
function ModeSelect({ info, onSelect }: {
  info: (typeof DECK_INFO)[DeckKey];
  onSelect: (mode: "learning" | "test") => void;
}) {
  return (
    <div className="flex flex-col gap-10 py-4">
      <div>
        <div className="flex items-baseline gap-3 mb-1">
          <h1 className="text-3xl font-bold jp-char">{info.label}</h1>
          <span className="text-xl text-muted-foreground jp-char">{info.jp}</span>
        </div>
        <p className="text-sm text-muted-foreground">{info.desc}</p>
      </div>

      <div>
        <p className="text-[11px] font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
          Choose a study mode
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelect("learning")}
            className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
          >
            <BookOpen size={28} className="mb-4 opacity-70" />
            <div className="font-bold text-lg mb-2">Learning</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Flip through cards at your own pace. Reveal the answer when ready, then mark if you knew it.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
              Start Learning <ChevronRight size={14} />
            </div>
          </button>

          <button
            onClick={() => onSelect("test")}
            className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
          >
            <FlaskConical size={28} className="mb-4 opacity-70" />
            <div className="font-bold text-lg mb-2">Test</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multiple-choice quiz. Pick the correct answer from 4 options and track your score.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
              Start Test <ChevronRight size={14} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DeckClient({ deck }: { deck: DeckKey }) {
  const [mode, setMode] = useState<Mode>("select");
  const info = DECK_INFO[deck];
  const cards = CARD_POOLS[deck];

  const handleBack = useCallback(() => setMode("select"), []);

  return (
    <PageShell onBack={mode !== "select" ? handleBack : undefined}>
      {mode === "select" && <ModeSelect info={info} onSelect={setMode} />}
      {mode === "learning" && (
        <LearningMode cards={cards} label={info.label} onBack={handleBack} />
      )}
      {mode === "test" && (
        <TestMode cards={cards} label={info.label} onBack={handleBack} />
      )}
    </PageShell>
  );
}
