"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ArrowLeft, ChevronRight, RotateCcw, BookOpen, FlaskConical, Puzzle, PencilLine, Keyboard, Type, Library } from "lucide-react";
import BackButton from "@/app/UI/global-components/back-button";
import KanjiStudyMode from "./kanji-study.client";
import {
  hiraganaCards, hiraganaRows, hiraganaYoonRows, buildKanaCards,
  type KanaSet,
} from "../_data/hiragana";
import { katakanaCards, katakanaRows, katakanaYoonRows } from "../_data/katakana";
import { kanjiCards } from "../_data/kanji";
import { vocabCards } from "../_data/vocabulary";
import { particleList, particleCards } from "../_data/particles";
import { numberCards } from "../_data/numbers";

// ── Types ─────────────────────────────────────────────────────────────────────
type DeckKey = "hiragana" | "katakana" | "kanji" | "vocabulary" | "particles" | "numbers";
type Mode = "select" | "learning" | "test" | "type" | "match" | "fillinblank" | "write" | "study";
type FlashCard = { front: string; back: string; reading?: string };
type MatchTile = { id: number; pairId: number; content: string; isKana: boolean };
type FillQuestion = { before: string; after: string; romaji: string; en: string; answer: string; choices: string[] };

// ── Data ──────────────────────────────────────────────────────────────────────
const CARD_POOLS: Record<DeckKey, FlashCard[]> = {
  hiragana:   hiraganaCards.map((c) => ({ front: c.char, back: c.romaji })),
  katakana:   katakanaCards.map((c) => ({ front: c.char, back: c.romaji })),
  kanji:      kanjiCards.map((c) => ({ front: c.front, back: c.meaning, reading: c.reading })),
  vocabulary: vocabCards.map((c) => ({ front: c.front, back: c.meaning, reading: c.reading })),
  particles:  particleCards.map((c) => ({ front: c.front, back: c.back, reading: c.reading })),
  numbers:    numberCards.map((c) => ({ front: c.front, back: c.back, reading: c.reading })),
};

const DECK_INFO: Record<DeckKey, { label: string; jp: string; desc: string }> = {
  hiragana:   { label: "Hiragana",   jp: "平仮名", desc: "Basic Japanese syllabary · 104 characters" },
  katakana:   { label: "Katakana",   jp: "片仮名", desc: "Foreign words & loanwords · 104 characters" },
  kanji:      { label: "Kanji",      jp: "漢字",   desc: "Chinese characters · N5 level · 68 entries" },
  vocabulary: { label: "Vocabulary", jp: "語彙",   desc: "Common N5 words · 37 entries" },
  particles:  { label: "Particles",  jp: "助詞",   desc: "Japanese particles · N5 level · 14 entries" },
  numbers:    { label: "Numbers",    jp: "数字",   desc: "Japanese numbers · 0 to 10,000 · 31 entries" },
};

// Kana subsets — lets you drill the plain gojuon without dakuten/combos.
const KANA_SET_OPTIONS: {
  key: keyof KanaSet; label: string; jp: string;
  sample: Record<"hiragana" | "katakana", string>;
}[] = [
  { key: "base",       label: "Base",       jp: "五十音", sample: { hiragana: "あ か さ た", katakana: "ア カ サ タ" } },
  { key: "dakuten",    label: "Dakuten",    jp: "濁音",       sample: { hiragana: "が ざ だ ば", katakana: "ガ ザ ダ バ" } },
  { key: "handakuten", label: "Handakuten", jp: "半濁音", sample: { hiragana: "ぱ ぴ ぷ", katakana: "パ ピ プ" } },
  { key: "yoon",       label: "Combos",     jp: "拗音",       sample: { hiragana: "きゃ しゅ ちょ", katakana: "キャ シュ チョ" } },
];

const DEFAULT_KANA_SET: KanaSet = { base: true, dakuten: false, handakuten: false, yoon: false };

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
      <div className="flex flex-col gap-6 pb-20">
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
  label, total, score,
  mode, onRestart, onBack,
}: {
  label: string; total: number;
  score?: number; mode: "learning" | "test";
  onRestart: () => void; onBack: () => void;
}) {
  const pct = Math.round(((score ?? 0) / total) * 100);
  const emoji = mode === "learning" ? "🎉" : pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📚";

  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center gap-10">
      <div className="text-center space-y-2">
        <div className="text-5xl mb-3">{emoji}</div>
        <h2 className="text-2xl font-bold">Session Complete</h2>
        <p className="text-sm text-muted-foreground">{label} · {total} cards</p>
      </div>

      <div className="flex gap-8 text-center">
        {mode === "learning" ? (
          <Stat value={total} label="Cards Reviewed" color="emerald" />
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

  const isDone = index >= cards.length;
  const card = cards[index];

  const handleFlip = useCallback(() => {
    if (!isFlipped) { setAnimate(true); setIsFlipped(true); }
  }, [isFlipped]);

  const handleNext = useCallback(() => {
    setAnimate(false); setIsFlipped(false);
    setIndex((i) => i + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setIndex(0); setAnimate(false); setIsFlipped(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isDone) return;
      if ((e.key === " " || e.key === "Enter") && !isFlipped) {
        e.preventDefault(); setAnimate(true); setIsFlipped(true); return;
      }
      if (isFlipped) {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); handleNext(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFlipped, isDone, handleNext]);

  if (isDone) return (
    <EndScreen label={label} total={cards.length}
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

      {/* Next button */}
      <div className={`flex justify-center transition-opacity duration-200 ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-xl border-2 border-border hover:border-foreground/40 font-semibold text-sm transition-all active:scale-[0.97]"
        >
          Next Card
        </button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wider">
        {isFlipped ? "SPACE OR → TO CONTINUE" : "SPACE OR CLICK TO FLIP"}
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
    generateChoices(cards[0], allCards)
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

// ── Fill-in-the-Blank Game ────────────────────────────────────────────────────
function buildFillQuestions(): FillQuestion[] {
  const allParticles = particleList.map((p) => p.particle);
  const raw = particleList.flatMap((p) =>
    p.examples.map((ex) => ({
      before:  ex.before,
      after:   ex.after,
      romaji:  ex.romaji,
      en:      ex.en,
      answer:  p.particle,
      choices: shuffle([
        p.particle,
        ...allParticles.filter((x) => x !== p.particle).sort(() => Math.random() - 0.5).slice(0, 3),
      ]),
    }))
  );
  return shuffle(raw);
}

function FillInBlankGame({ label, onBack }: { label: string; onBack: () => void }) {
  const [questions]  = useState<FillQuestion[]>(buildFillQuestions);
  const [index, setIndex]     = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore]     = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const isDone = index >= questions.length;
  const q = questions[index];

  const handleChoice = useCallback((choice: string) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnimKey((k) => k + 1);
    }, 1100);
  }, [selected, q]);

  const handleRestart = useCallback(() => {
    setIndex(0); setSelected(null); setScore(0); setAnimKey((k) => k + 1);
  }, []);

  const getVariant = (choice: string) => {
    if (selected === null) return "idle";
    if (choice === q.answer) return "correct";
    if (choice === selected) return "wrong";
    return "idle";
  };

  const CHOICE_STYLES: Record<string, string> = {
    idle:    "border-border hover:border-foreground/40 hover:bg-foreground/[0.03] active:scale-[0.99]",
    correct: "border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-600 scale-[1.02]",
    wrong:   "border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-600",
  };

  const answerInfo = particleList.find((p) => p.particle === q?.answer);

  if (isDone) return (
    <EndScreen label={label} total={questions.length} score={score}
      mode="test" onRestart={handleRestart} onBack={onBack} />
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <ProgressBar current={index} total={questions.length} />
        <span className="ml-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums shrink-0">
          {score} correct
        </span>
      </div>

      {/* Sentence card */}
      <div key={animKey} className="w-full max-w-sm mx-auto rounded-2xl border border-border bg-card shadow-sm flex flex-col items-center gap-3 p-8 min-h-[180px] justify-center">
        <div className="text-center">
          <span className="jp-char text-3xl font-medium leading-relaxed">
            {q.before}
            <span className="inline-block mx-1 w-10 border-b-2 border-foreground/60 align-bottom" />
            {q.after}
          </span>
        </div>
        <div className="jp-mono text-xs text-muted-foreground text-center">{q.romaji}</div>
        <div className="text-sm text-muted-foreground text-center italic">{q.en}</div>
      </div>

      {/* Feedback strip (appears after selection) */}
      <div className={`text-center text-xs transition-opacity duration-200 h-4 ${selected !== null ? "opacity-100" : "opacity-0"}`}>
        {selected !== null && selected !== q.answer && answerInfo && (
          <span className="text-muted-foreground">
            Answer: <span className="jp-char font-semibold">{q.answer}</span> ({answerInfo.romaji}) — {answerInfo.role}
          </span>
        )}
        {selected !== null && selected === q.answer && answerInfo && (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {answerInfo.role} ✓
          </span>
        )}
      </div>

      {/* Particle choices 2×2 */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
        {q.choices.map((choice) => {
          const info = particleList.find((p) => p.particle === choice);
          const variant = getVariant(choice);
          return (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              disabled={selected !== null}
              className={`py-5 px-3 rounded-xl border-2 text-center transition-all duration-150 flex flex-col items-center gap-1 ${CHOICE_STYLES[variant]}`}
            >
              <span className="jp-char text-4xl font-medium leading-none">{choice}</span>
              <span className="jp-mono text-[10px] text-muted-foreground">{info?.romaji}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Type Mode ─────────────────────────────────────────────────────────────────
function TypeMode({ cards: allCards, label, onBack }: {
  cards: FlashCard[]; label: string; onBack: () => void;
}) {
  const [cards] = useState(() => shuffle(allCards));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDone = index >= cards.length;
  const card = cards[index];

  const handleCheck = useCallback(() => {
    if (result !== null || !input.trim()) return;
    const correct = input.trim().toLowerCase() === card.back.toLowerCase();
    setResult(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setInput("");
      setResult(null);
      setAnimKey((k) => k + 1);
    }, 900);
  }, [result, input, card]);

  useEffect(() => {
    if (result === null) inputRef.current?.focus();
  }, [result, animKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleCheck();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleCheck]);

  const handleRestart = useCallback(() => {
    setIndex(0); setInput(""); setResult(null); setScore(0); setAnimKey((k) => k + 1);
  }, []);

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
      <div key={animKey} className={`w-full max-w-sm mx-auto rounded-2xl border-2 bg-card flex flex-col items-center justify-center gap-2.5 p-10 min-h-[200px] transition-all duration-300 ${
        result === null
          ? "border-border shadow-sm"
          : result === "correct"
          ? "border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.2)]"
          : "border-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.2)]"
      }`}>
        <span className="jp-char text-7xl font-medium leading-none">{card.front}</span>
        {card.reading && (
          <span className="jp-char text-sm text-muted-foreground">{card.reading}</span>
        )}
        <div className={`text-sm transition-all duration-200 mt-1 text-center ${result !== null ? "opacity-100" : "opacity-0 h-0 mt-0 overflow-hidden"}`}>
          {result === "correct" && (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ {input}</span>
          )}
          {result === "wrong" && (
            <span className="text-rose-600 dark:text-rose-400">
              <span className="line-through opacity-60">{input}</span>
              {" → "}
              <span className="font-semibold">{card.back}</span>
            </span>
          )}
        </div>
      </div>

      {/* Input + check */}
      <div className="flex gap-2 w-full max-w-sm mx-auto">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={result !== null}
          placeholder="Type the answer..."
          autoComplete="off"
          className="flex-1 h-14 px-4 rounded-xl border-2 border-border focus:border-foreground/40 text-sm font-medium outline-none transition-all duration-200 bg-card"
        />
        <button
          onClick={handleCheck}
          disabled={!input.trim() || result !== null}
          className="px-5 h-14 rounded-xl border-2 border-foreground bg-foreground text-background font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.97]"
        >
          Check
        </button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wider">
        PRESS ENTER TO CHECK
      </p>
    </div>
  );
}

// ── Japanese Flick Keyboard ────────────────────────────────────────────────────
type KanaGroup = { base: string; chars: (string | null)[]; special?: "modifier" };
// chars[]: [center, up, right, down, left]

const HIRAGANA_KB: KanaGroup[] = [
  { base: "あ", chars: ["あ", "い", "う", "え", "お"] },
  { base: "か", chars: ["か", "き", "く", "け", "こ"] },
  { base: "さ", chars: ["さ", "し", "す", "せ", "そ"] },
  { base: "た", chars: ["た", "ち", "つ", "て", "と"] },
  { base: "な", chars: ["な", "に", "ぬ", "ね", "の"] },
  { base: "は", chars: ["は", "ひ", "ふ", "へ", "ほ"] },
  { base: "ま", chars: ["ま", "み", "む", "め", "も"] },
  { base: "や", chars: ["や", null, "ゆ", null, "よ"] },
  { base: "ら", chars: ["ら", "り", "る", "れ", "ろ"] },
  { base: "゛゜小", chars: [], special: "modifier" },
  { base: "わ", chars: ["わ", null, null, null, "を"] },
  { base: "ん", chars: ["ん", null, null, null, null] },
];

const KATAKANA_KB: KanaGroup[] = [
  { base: "ア", chars: ["ア", "イ", "ウ", "エ", "オ"] },
  { base: "カ", chars: ["カ", "キ", "ク", "ケ", "コ"] },
  { base: "サ", chars: ["サ", "シ", "ス", "セ", "ソ"] },
  { base: "タ", chars: ["タ", "チ", "ツ", "テ", "ト"] },
  { base: "ナ", chars: ["ナ", "ニ", "ヌ", "ネ", "ノ"] },
  { base: "ハ", chars: ["ハ", "ヒ", "フ", "ヘ", "ホ"] },
  { base: "マ", chars: ["マ", "ミ", "ム", "メ", "モ"] },
  { base: "ヤ", chars: ["ヤ", null, "ユ", null, "ヨ"] },
  { base: "ラ", chars: ["ラ", "リ", "ル", "レ", "ロ"] },
  { base: "゛゜小", chars: [], special: "modifier" },
  { base: "ワ", chars: ["ワ", null, null, null, "ヲ"] },
  { base: "ン", chars: ["ン", null, null, null, null] },
];

const DAKUTEN_CYCLE: Record<string, string> = {
  "か": "が", "き": "ぎ", "く": "ぐ", "け": "げ", "こ": "ご",
  "が": "か", "ぎ": "き", "ぐ": "く", "げ": "け", "ご": "こ",
  "さ": "ざ", "し": "じ", "す": "ず", "せ": "ぜ", "そ": "ぞ",
  "ざ": "さ", "じ": "し", "ず": "す", "ぜ": "せ", "ぞ": "そ",
  "た": "だ", "ち": "ぢ", "つ": "づ", "て": "で", "と": "ど",
  "だ": "た", "ぢ": "ち", "づ": "つ", "で": "て", "ど": "と",
  "は": "ば", "ひ": "び", "ふ": "ぶ", "へ": "べ", "ほ": "ぼ",
  "ば": "ぱ", "び": "ぴ", "ぶ": "ぷ", "べ": "ぺ", "ぼ": "ぽ",
  "ぱ": "は", "ぴ": "ひ", "ぷ": "ふ", "ぺ": "へ", "ぽ": "ほ",
  "カ": "ガ", "キ": "ギ", "ク": "グ", "ケ": "ゲ", "コ": "ゴ",
  "ガ": "カ", "ギ": "キ", "グ": "ク", "ゲ": "ケ", "ゴ": "コ",
  "サ": "ザ", "シ": "ジ", "ス": "ズ", "セ": "ゼ", "ソ": "ゾ",
  "ザ": "サ", "ジ": "シ", "ズ": "ス", "ゼ": "セ", "ゾ": "ソ",
  "タ": "ダ", "チ": "ヂ", "ツ": "ヅ", "テ": "デ", "ト": "ド",
  "ダ": "タ", "ヂ": "チ", "ヅ": "ツ", "デ": "テ", "ド": "ト",
  "ハ": "バ", "ヒ": "ビ", "フ": "ブ", "ヘ": "ベ", "ホ": "ボ",
  "バ": "パ", "ビ": "ピ", "ブ": "プ", "ベ": "ペ", "ボ": "ポ",
  "パ": "ハ", "ピ": "ヒ", "プ": "フ", "ペ": "ヘ", "ポ": "ホ",
};

const SMALL_CYCLE: Record<string, string> = {
  "あ": "ぁ", "い": "ぃ", "う": "ぅ", "え": "ぇ", "お": "ぉ",
  "ぁ": "あ", "ぃ": "い", "ぅ": "う", "ぇ": "え", "ぉ": "お",
  "や": "ゃ", "ゆ": "ゅ", "よ": "ょ",
  "ゃ": "や", "ゅ": "ゆ", "ょ": "よ",
  "つ": "っ", "っ": "つ",
  "わ": "ゎ", "ゎ": "わ",
  "ア": "ァ", "イ": "ィ", "ウ": "ゥ", "エ": "ェ", "オ": "ォ",
  "ァ": "ア", "ィ": "イ", "ゥ": "ウ", "ェ": "エ", "ォ": "オ",
  "ヤ": "ャ", "ユ": "ュ", "ヨ": "ョ",
  "ャ": "ヤ", "ュ": "ユ", "ョ": "ヨ",
  "ツ": "ッ", "ッ": "ツ",
  "ワ": "ヮ", "ヮ": "ワ",
};

const FLICK_THRESHOLD = 26;

function getFlickDir(dx: number, dy: number): number {
  if (Math.abs(dx) < FLICK_THRESHOLD && Math.abs(dy) < FLICK_THRESHOLD) return 0;
  if (Math.abs(dy) >= Math.abs(dx)) return dy < 0 ? 1 : 3;
  return dx > 0 ? 2 : 4;
}

// Floating char positions around the key: [_, up, right, down, left]
const FLICK_POSITIONS = [
  "",
  "absolute bottom-full left-1/2 -translate-x-1/2 mb-1",
  "absolute left-full top-1/2 -translate-y-1/2 ml-1",
  "absolute top-full left-1/2 -translate-x-1/2 mt-1",
  "absolute right-full top-1/2 -translate-y-1/2 mr-1",
];

function JapaneseFlickKeyboard({
  kbData, onChar, onModifier, pendingChar, disabled,
}: {
  kbData: KanaGroup[];
  onChar: (char: string) => void;
  onModifier: () => void;
  pendingChar: string | null;
  disabled?: boolean;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [flickDir, setFlickDir] = useState(0);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const activeGroup = useRef<KanaGroup | null>(null);

  const lastChar = pendingChar ? pendingChar[pendingChar.length - 1] : null;
  const canModify = lastChar !== null &&
    (lastChar in DAKUTEN_CYCLE || lastChar in SMALL_CYCLE);

  const commit = useCallback((group: KanaGroup, dir: number) => {
    const char = group.chars[dir] ?? group.chars[0];
    if (char) onChar(char);
    setActiveIdx(null);
    setFlickDir(0);
    startPos.current = null;
    activeGroup.current = null;
  }, [onChar]);

  const handlePointerDown = useCallback((e: React.PointerEvent, idx: number, group: KanaGroup) => {
    if (disabled) return;
    if (group.special === "modifier") { onModifier(); return; }
    const valid = group.chars.filter(Boolean);
    if (valid.length === 1) { onChar(valid[0]!); return; }
    e.currentTarget.setPointerCapture(e.pointerId);
    startPos.current = { x: e.clientX, y: e.clientY };
    activeGroup.current = group;
    setActiveIdx(idx);
    setFlickDir(0);
  }, [disabled, onModifier, onChar]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!startPos.current) return;
    const dir = getFlickDir(e.clientX - startPos.current.x, e.clientY - startPos.current.y);
    setFlickDir(dir);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!startPos.current || !activeGroup.current) return;
    const dir = getFlickDir(e.clientX - startPos.current.x, e.clientY - startPos.current.y);
    commit(activeGroup.current, dir);
  }, [commit]);

  const handlePointerCancel = useCallback(() => {
    setActiveIdx(null);
    setFlickDir(0);
    startPos.current = null;
    activeGroup.current = null;
  }, []);

  return (
    <div className="select-none touch-none">
      <div className="grid grid-cols-3 gap-1.5">
        {kbData.map((group, idx) => {
          const isActive = activeIdx === idx;
          const isModifier = group.special === "modifier";
          const chars = group.chars;

          return (
            <div key={idx} className="relative">
              {/* Flick chars floating around the key */}
              {isActive && chars.map((char, dir) =>
                dir > 0 && char ? (
                  <div
                    key={dir}
                    className={`${FLICK_POSITIONS[dir]} z-20 pointer-events-none w-[5.5rem] h-[5.5rem] rounded-xl jp-char text-2xl font-medium flex items-center justify-center transition-all duration-75 shadow-sm ${
                      flickDir === dir
                        ? "bg-foreground text-background scale-110"
                        : "bg-background border-2 border-border text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                    }`}
                  >
                    {char}
                  </div>
                ) : null
              )}

              <button
                onPointerDown={(e) => handlePointerDown(e, idx, group)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                disabled={disabled || (isModifier && !canModify)}
                className={`w-full aspect-square rounded-xl border-2 font-medium flex items-center justify-center transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed
                  ${isModifier
                    ? canModify
                      ? "border-amber-400 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs"
                      : "border-border bg-muted text-muted-foreground text-xs"
                    : isActive
                    ? "border-foreground bg-foreground/10 scale-[0.94] jp-char text-xl"
                    : "border-border bg-card hover:border-foreground/40 hover:bg-foreground/[0.03] jp-char text-xl"
                  }`}
              >
                {group.base}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Write Mode ─────────────────────────────────────────────────────────────────
function WriteMode({ cards: allCards, label, deck, onBack }: {
  cards: FlashCard[]; label: string; deck: DeckKey; onBack: () => void;
}) {
  const [cards] = useState(() => shuffle(allCards));
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const isDone = index >= cards.length;
  const card = cards[index];
  const kbData = deck === "katakana" ? KATAKANA_KB : HIRAGANA_KB;

  const handleChar = useCallback((char: string) => {
    if (result !== null) return;
    setPending((p) => p + char);
  }, [result]);

  const handleBackspace = useCallback(() => {
    if (result !== null) return;
    setPending((p) => p.slice(0, -1));
  }, [result]);

  const handleModifier = useCallback(() => {
    if (!pending || result !== null) return;
    const last = pending[pending.length - 1];
    if (last in DAKUTEN_CYCLE) { setPending(pending.slice(0, -1) + DAKUTEN_CYCLE[last]); return; }
    if (last in SMALL_CYCLE)   { setPending(pending.slice(0, -1) + SMALL_CYCLE[last]); }
  }, [pending, result]);

  const handleCheck = useCallback(() => {
    if (!pending || result !== null) return;
    const correct = pending === card.front;
    setResult(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setPending("");
      setResult(null);
      setAnimKey((k) => k + 1);
    }, 900);
  }, [pending, result, card]);

  const handleRestart = useCallback(() => {
    setIndex(0); setPending(""); setResult(null); setScore(0); setAnimKey((k) => k + 1);
  }, []);

  if (isDone) return (
    <EndScreen label={label} total={cards.length} score={score}
      mode="test" onRestart={handleRestart} onBack={onBack} />
  );

  const isCorrect = result === "correct";

  return (
    <div className="flex flex-col gap-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <ProgressBar current={index} total={cards.length} />
        <span className="ml-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums shrink-0">
          {score} correct
        </span>
      </div>

      {/* Prompt + answer feedback */}
      <div key={animKey} className="w-full rounded-2xl border border-border bg-card shadow-sm flex flex-col items-center justify-center gap-3 py-8 px-6 min-h-[160px]">
        <div className="jp-mono text-5xl font-bold">{card.back}</div>
        {card.reading && <div className="jp-char text-sm text-muted-foreground">{card.reading}</div>}
        <div className={`flex items-center justify-center gap-2 transition-all duration-200 ${result !== null ? "opacity-100 mt-1" : "opacity-0 h-0 overflow-hidden"}`}>
          {result === "correct" && (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold jp-char text-lg">✓ {pending}</span>
          )}
          {result === "wrong" && (
            <span className="text-rose-500 jp-char text-lg">
              <span className="line-through opacity-50">{pending}</span>
              <span className="mx-1.5 text-muted-foreground text-sm">→</span>
              <span className="font-semibold">{card.front}</span>
            </span>
          )}
        </div>
      </div>

      {/* Input + ⌫ + Check */}
      <div className="flex gap-2">
        <div className={`flex-1 rounded-xl border-2 flex items-center justify-center h-14 transition-all duration-200 ${
          result === null
            ? "border-border bg-card"
            : isCorrect
            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 shadow-[0_0_16px_rgba(52,211,153,0.15)]"
            : "border-rose-400 bg-rose-50 dark:bg-rose-950/50 shadow-[0_0_16px_rgba(251,113,133,0.15)]"
        }`}>
          {pending ? (
            <span className="jp-char text-3xl font-medium tracking-widest">{pending}</span>
          ) : (
            <span className="text-muted-foreground/40 text-sm tracking-wide">tap a key below</span>
          )}
        </div>
        <button
          onClick={handleBackspace}
          disabled={!pending || result !== null}
          className="w-14 h-14 rounded-xl border-2 border-border bg-card text-foreground font-semibold text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.97] hover:border-foreground/40"
        >
          ⌫
        </button>
        <button
          onClick={handleCheck}
          disabled={!pending || result !== null}
          className="px-5 h-14 rounded-xl border-2 border-foreground bg-foreground text-background font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.97]"
        >
          Check
        </button>
      </div>

      {/* Keyboard */}
      <JapaneseFlickKeyboard
        kbData={kbData}
        onChar={handleChar}
        onModifier={handleModifier}
        pendingChar={pending || null}
        disabled={result !== null}
      />

      <p className="text-center text-[10px] text-muted-foreground/40 tracking-wider -mt-2">
        ゛゜小 CYCLES DAKUTEN · HANDAKUTEN · SMALL
      </p>
    </div>
  );
}

// ── Match Minigame ────────────────────────────────────────────────────────────
const MATCH_PAIRS = 18;

function buildMatchTiles(allCards: FlashCard[]): MatchTile[] {
  const picked = shuffle(allCards).slice(0, MATCH_PAIRS);
  const tiles: MatchTile[] = [];
  picked.forEach((card, i) => {
    tiles.push({ id: i * 2,     pairId: i, content: card.front, isKana: true  });
    tiles.push({ id: i * 2 + 1, pairId: i, content: card.back,  isKana: false });
  });
  return shuffle(tiles);
}

function MatchGame({ cards: allCards, label, onBack }: {
  cards: FlashCard[]; label: string; onBack: () => void;
}) {
  // A small character-set selection can hold fewer cards than MATCH_PAIRS.
  const pairCount = Math.min(MATCH_PAIRS, allCards.length);
  const [tiles, setTiles]           = useState<MatchTile[]>(() => buildMatchTiles(allCards));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [wrongIds, setWrongIds]     = useState<Set<number>>(new Set());
  const [attempts, setAttempts]     = useState(0);
  const [elapsed, setElapsed]       = useState(0);
  const [done, setDone]             = useState(false);
  const startTimeRef = useRef(Date.now());
  const lockRef      = useRef(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 500);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    if (matchedPairs.size === pairCount) setDone(true);
  }, [matchedPairs, pairCount]);

  const handleClick = useCallback((tile: MatchTile) => {
    if (lockRef.current) return;
    if (flippedIds.includes(tile.id)) return;
    if (matchedPairs.has(tile.pairId)) return;

    const next = [...flippedIds, tile.id];
    setFlippedIds(next);

    if (next.length === 2) {
      const [id1, id2] = next;
      const t1 = tiles.find((t) => t.id === id1)!;
      const t2 = tiles.find((t) => t.id === id2)!;
      setAttempts((a) => a + 1);

      if (t1.pairId === t2.pairId) {
        setMatchedPairs((m) => { const s = new Set(m); s.add(t1.pairId); return s; });
        setFlippedIds([]);
      } else {
        lockRef.current = true;
        setWrongIds(new Set([id1, id2]));
        setTimeout(() => {
          setFlippedIds([]);
          setWrongIds(new Set());
          lockRef.current = false;
        }, 900);
      }
    }
  }, [flippedIds, matchedPairs, tiles]);

  const restart = useCallback(() => {
    setTiles(buildMatchTiles(allCards));
    setFlippedIds([]);
    setMatchedPairs(new Set());
    setWrongIds(new Set());
    setAttempts(0);
    setElapsed(0);
    setDone(false);
    startTimeRef.current = Date.now();
    lockRef.current = false;
  }, [allCards]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const accuracy = attempts > 0 ? Math.round((pairCount / attempts) * 100) : 100;

  if (done) {
    const emoji = attempts <= pairCount + 1 ? "🏆" : attempts <= pairCount * 2 ? "🎉" : "👍";
    return (
      <div className="min-h-[70dvh] flex flex-col items-center justify-center gap-10">
        <div className="text-center space-y-2">
          <div className="text-5xl mb-3">{emoji}</div>
          <h2 className="text-2xl font-bold">All Matched!</h2>
          <p className="text-sm text-muted-foreground">{label} · {pairCount} pairs</p>
        </div>
        <div className="flex gap-8 text-center">
          <Stat value={attempts} label="Attempts" />
          <Divider />
          <Stat value={fmt(elapsed)} label="Time" />
          <Divider />
          <Stat value={`${accuracy}%`} label="Accuracy" color="emerald" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={restart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border hover:border-foreground/40 font-semibold text-sm transition-all hover:-translate-y-px active:scale-[0.98]"
          >
            <RotateCcw size={13} /> Play Again
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{matchedPairs.size}</span>
          <span className="opacity-60"> / {pairCount} matched</span>
        </span>
        <span className="flex gap-3">
          <span>{attempts} attempts</span>
          <span className="font-mono tabular-nums">{fmt(elapsed)}</span>
        </span>
      </div>

      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${(matchedPairs.size / pairCount) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-6 gap-2 w-full max-w-lg mx-auto">
        {tiles.map((tile) => {
          const isFlipped  = flippedIds.includes(tile.id) || matchedPairs.has(tile.pairId);
          const isMatched  = matchedPairs.has(tile.pairId);
          const isWrong    = wrongIds.has(tile.id);

          return (
            <div
              key={tile.id}
              className="[perspective:600px] aspect-square cursor-pointer"
              onClick={() => { if (!isFlipped) handleClick(tile); }}
            >
              <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-300 ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
                {/* Face down */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl border-2 border-border bg-muted flex items-center justify-center select-none">
                  <span className="text-xl opacity-15 jp-char">語</span>
                </div>
                {/* Face up */}
                <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border-2 flex items-center justify-center p-1 transition-colors duration-200 ${
                  isMatched
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 dark:border-emerald-700"
                    : isWrong
                    ? "border-rose-400 bg-rose-50 dark:bg-rose-950/50 dark:border-rose-700"
                    : "border-foreground/20 bg-card"
                }`}>
                  {tile.isKana ? (
                    <span className="jp-char text-2xl font-medium leading-none select-none">{tile.content}</span>
                  ) : (
                    <span className="jp-mono text-[10px] font-semibold text-center leading-tight select-none px-0.5 line-clamp-3">{tile.content}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wider mt-1">
        MATCH EACH CHARACTER WITH ITS READING
      </p>
    </div>
  );
}

// ── Mode Select ───────────────────────────────────────────────────────────────
function ModeSelect({ info, deck, kanaSet, onToggleKanaSet, cardCount, onSelect }: {
  info: (typeof DECK_INFO)[DeckKey];
  deck: DeckKey;
  kanaSet: KanaSet;
  onToggleKanaSet: (key: keyof KanaSet) => void;
  cardCount: number;
  onSelect: (mode: Exclude<Mode, "select">) => void;
}) {
  const isParticles = deck === "particles";
  const isKana = deck === "hiragana" || deck === "katakana";
  const isKanji = deck === "kanji";
  return (
    <div className="flex flex-col gap-10 py-4">
      <div>
        <div className="flex items-baseline gap-3 mb-1">
          <h1 className="text-3xl font-bold jp-char">{info.label}</h1>
          <span className="text-xl text-muted-foreground jp-char">{info.jp}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {isKana ? `${info.desc.split(" · ")[0]} · ${cardCount} characters selected` : info.desc}
        </p>
      </div>

      {isKana && (
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
            Character sets
          </p>
          <div className="flex flex-wrap gap-3">
            {KANA_SET_OPTIONS.map((opt) => {
              const active = kanaSet[opt.key];
              return (
                <button
                  key={opt.key}
                  onClick={() => onToggleKanaSet(opt.key)}
                  aria-pressed={active}
                  className={`rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 active:scale-[0.98] ${
                    active
                      ? "border-foreground bg-foreground/[0.04]"
                      : "border-border opacity-55 hover:opacity-100 hover:border-foreground/40"
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold">{opt.label}</span>
                    <span className="text-xs text-muted-foreground jp-char">{opt.jp}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground jp-char">
                    {opt.sample[deck as "hiragana" | "katakana"]}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Applies to every mode below. At least one set stays on.
          </p>
        </div>
      )}

      <div>
        <p className="text-[11px] font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
          Choose a study mode
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {isKanji && (
            <button
              onClick={() => onSelect("study")}
              className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99] sm:col-span-2"
            >
              <Library size={28} className="mb-4 opacity-70" />
              <div className="font-bold text-lg mb-2">Study</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Not flashcards. Read each kanji properly — where the shape came from, which parts it is
                built from and what they mean, how the meaning shifts across compounds, and example
                sentences that use it in place.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Open Study <ChevronRight size={14} />
              </div>
            </button>
          )}

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

          <button
            onClick={() => onSelect("type")}
            className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
          >
            <Type size={28} className="mb-4 opacity-70" />
            <div className="font-bold text-lg mb-2">Type</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              See the character, type the answer yourself. No hints, no choices — pure recall.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
              Start Typing <ChevronRight size={14} />
            </div>
          </button>

          {isParticles ? (
            <button
              onClick={() => onSelect("fillinblank")}
              className="border-2 border-violet-300 dark:border-violet-800 rounded-2xl p-7 text-left group hover:border-violet-500 dark:hover:border-violet-600 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
            >
              <PencilLine size={28} className="mb-4 opacity-70 text-violet-600 dark:text-violet-400" />
              <div className="font-bold text-lg mb-2">Fill in the Blank</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See a real sentence with the particle removed. Pick the correct particle from 4 options.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 group-hover:gap-2.5 transition-all">
                Start Practice <ChevronRight size={14} />
              </div>
            </button>
          ) : (
            <button
              onClick={() => onSelect("match")}
              className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
            >
              <Puzzle size={28} className="mb-4 opacity-70" />
              <div className="font-bold text-lg mb-2">Flip Cards</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Memory matching minigame. Flip tiles to pair each character with its reading. Beat it in the fewest attempts.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Play Minigame <ChevronRight size={14} />
              </div>
            </button>
          )}

          {isParticles && (
            <button
              onClick={() => onSelect("match")}
              className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
            >
              <Puzzle size={28} className="mb-4 opacity-70" />
              <div className="font-bold text-lg mb-2">Flip Cards</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Memory matching minigame. Pair each particle with its role. Beat it in the fewest attempts.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Play Minigame <ChevronRight size={14} />
              </div>
            </button>
          )}

          {isKana && (
            <button
              onClick={() => onSelect("write")}
              className="border-2 border-border rounded-2xl p-7 text-left group hover:border-foreground/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99]"
            >
              <Keyboard size={28} className="mb-4 opacity-70" />
              <div className="font-bold text-lg mb-2">Write</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reverse test — see the romaji, type the kana using a Japanese phone keyboard with flick input.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Start Writing <ChevronRight size={14} />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DeckClient({ deck }: { deck: DeckKey }) {
  const [mode, setMode] = useState<Mode>("select");
  const [kanaSet, setKanaSet] = useState<KanaSet>(DEFAULT_KANA_SET);
  const info = DECK_INFO[deck];
  const isKana = deck === "hiragana" || deck === "katakana";

  const cards = useMemo(() => {
    if (!isKana) return CARD_POOLS[deck];
    const rows = deck === "hiragana" ? hiraganaRows : katakanaRows;
    const yoonRows = deck === "hiragana" ? hiraganaYoonRows : katakanaYoonRows;
    return buildKanaCards(rows, yoonRows, kanaSet).map((c) => ({ front: c.char, back: c.romaji }));
  }, [deck, isKana, kanaSet]);

  const handleToggleKanaSet = useCallback((key: keyof KanaSet) => {
    setKanaSet((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Never leave the deck empty.
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  }, []);

  const handleBack = useCallback(() => setMode("select"), []);

  return (
    <PageShell onBack={mode !== "select" ? handleBack : undefined}>
      {mode === "select" && (
        <ModeSelect
          info={info}
          deck={deck}
          kanaSet={kanaSet}
          onToggleKanaSet={handleToggleKanaSet}
          cardCount={cards.length}
          onSelect={setMode}
        />
      )}
      {mode === "learning" && (
        <LearningMode cards={cards} label={info.label} onBack={handleBack} />
      )}
      {mode === "test" && (
        <TestMode cards={cards} label={info.label} onBack={handleBack} />
      )}
      {mode === "type" && (
        <TypeMode cards={cards} label={info.label} onBack={handleBack} />
      )}
      {mode === "match" && (
        <MatchGame cards={cards} label={info.label} onBack={handleBack} />
      )}
      {mode === "fillinblank" && (
        <FillInBlankGame label={info.label} onBack={handleBack} />
      )}
      {mode === "study" && <KanjiStudyMode onBack={handleBack} />}
      {mode === "write" && (
        <WriteMode cards={cards} label={info.label} deck={deck} onBack={handleBack} />
      )}
    </PageShell>
  );
}
