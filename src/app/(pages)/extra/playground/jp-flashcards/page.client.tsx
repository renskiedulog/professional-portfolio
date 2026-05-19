"use client";
import { useState, useCallback } from "react";
import { ArrowLeft, ChevronRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import BackButton from "@/app/UI/global-components/back-button";
import { hiraganaRows, hiraganaCards } from "./_data/hiragana";
import { katakanaRows, katakanaCards } from "./_data/katakana";
import { kanjiCards, kanjiCategories } from "./_data/kanji";
import { triviaList } from "./_data/trivia";

// ── Types ─────────────────────────────────────────────────────────────────────
type DeckKey = "hiragana" | "katakana" | "kanji" | "vocabulary";
type TableKey = "hiragana" | "katakana" | "kanji";
type View = "home" | `table-${TableKey}`;
type BadgeKey = "rose" | "sky" | "amber" | "emerald";

// ── Config ────────────────────────────────────────────────────────────────────
const DECK_CONFIG: Record<DeckKey, {
  label: string; jp: string; desc: string;
  preview: string[]; count: number; badge: BadgeKey; href: string;
}> = {
  hiragana: {
    label: "Hiragana", jp: "平仮名", desc: "Basic Japanese syllabary",
    preview: ["あ", "い", "う", "え", "お"],
    count: hiraganaCards.length, badge: "rose",
    href: "/extra/playground/jp-flashcards/hiragana",
  },
  katakana: {
    label: "Katakana", jp: "片仮名", desc: "Foreign words & loanwords",
    preview: ["ア", "イ", "ウ", "エ", "オ"],
    count: katakanaCards.length, badge: "sky",
    href: "/extra/playground/jp-flashcards/katakana",
  },
  kanji: {
    label: "Kanji", jp: "漢字", desc: "Chinese characters (N5 level)",
    preview: ["一", "山", "日", "人", "大"],
    count: kanjiCards.length, badge: "amber",
    href: "/extra/playground/jp-flashcards/kanji",
  },
  vocabulary: {
    label: "Vocabulary", jp: "語彙", desc: "Common N5 words",
    preview: ["食", "行", "見", "話", "好"],
    count: 37, badge: "emerald",
    href: "/extra/playground/jp-flashcards/vocabulary",
  },
};

const BADGE: Record<BadgeKey, string> = {
  rose:    "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  sky:     "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  amber:   "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
};

const COLS = ["a", "i", "u", "e", "o"];

const TABLE_META: Record<TableKey, { label: string; jp: string; desc: string; count: string }> = {
  hiragana: { label: "Hiragana", jp: "平仮名", desc: "Basic Japanese syllabary",  count: "46 characters" },
  katakana: { label: "Katakana", jp: "片仮名", desc: "Foreign words & onomatopoeia", count: "46 characters" },
  kanji:    { label: "Kanji",    jp: "漢字",   desc: "N5 level kanji reference",   count: "68 characters" },
};

const TABLE_PREVIEWS: Record<TableKey, string[]> = {
  hiragana: ["あ", "い", "う", "え", "お", "か", "き", "く", "さ", "し"],
  katakana: ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "サ", "シ"],
  kanji:    ["一", "二", "山", "川", "日", "月", "人", "大", "小", "国"],
};

// ── Kana Table ────────────────────────────────────────────────────────────────
function KanaTable({ type }: { type: "hiragana" | "katakana" }) {
  const rows = type === "hiragana" ? hiraganaRows : katakanaRows;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-center text-sm font-mono min-w-[340px]">
        <thead>
          <tr>
            <th className="px-2 py-2 text-xs text-muted-foreground border border-border w-8 font-normal">—</th>
            {COLS.map((c) => (
              <th key={c} className="px-3 py-2 text-xs text-muted-foreground border border-border font-normal">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              <td className="px-2 py-1 text-xs text-muted-foreground border border-border font-sans">{row.consonant}</td>
              {row.chars.map((cell, ci) => (
                <td key={ci} className="border border-border p-0">
                  {cell ? (
                    <div className="flex flex-col items-center py-2 px-2">
                      <span className="text-2xl leading-none jp-char">{cell.char}</span>
                      <span className="text-[10px] text-muted-foreground mt-1 jp-mono">{cell.romaji}</span>
                    </div>
                  ) : (
                    <div className="py-2 px-2 text-muted-foreground/20 text-sm">—</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Kanji Table ───────────────────────────────────────────────────────────────
function KanjiTableView() {
  const grouped = kanjiCards.reduce<Record<string, typeof kanjiCards>>((acc, card) => {
    if (!acc[card.category]) acc[card.category] = [];
    acc[card.category].push(card);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {kanjiCategories.map((cat) => {
        const cards = grouped[cat];
        if (!cards?.length) return null;
        return (
          <div key={cat}>
            <h4 className="text-[10px] font-semibold text-muted-foreground mb-3 uppercase tracking-widest">{cat}</h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
              {cards.map((card, i) => (
                <div key={i} className="border border-border rounded-lg p-2.5 text-center bg-background">
                  <div className="text-3xl leading-none mb-1.5 jp-char">{card.front}</div>
                  <div className="text-[9px] text-muted-foreground leading-tight jp-mono">{card.reading.split(" ")[0]}</div>
                  <div className="text-[9px] font-medium mt-0.5 leading-tight line-clamp-2">{card.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Table Page View ───────────────────────────────────────────────────────────
function TablePageView({ tableKey, onBack }: { tableKey: TableKey; onBack: () => void }) {
  const meta = TABLE_META[tableKey];
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        .jp-char { font-family: 'Noto Serif JP', serif; }
        .jp-mono  { font-family: 'DM Mono', monospace; font-size: 0.85em; }
      `}</style>
      <div className="space-y-6 pb-20">
        <button
          onClick={onBack}
          className="flex items-center text-base gap-1 hover:-translate-x-2 transition duration-300 ease-in-out opacity-60 hover:opacity-100 font-semibold"
        >
          <ArrowLeft size={18} className="mb-0.5" /> Back
        </button>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold jp-char">{meta.label}</h1>
            <span className="text-lg text-muted-foreground jp-char">{meta.jp}</span>
          </div>
          <p className="text-sm text-muted-foreground">{meta.desc}</p>
          <p className="text-xs text-muted-foreground/60">{meta.count}</p>
        </div>
        <div className="border border-border rounded-xl p-4 overflow-hidden">
          {tableKey === "hiragana" && <KanaTable type="hiragana" />}
          {tableKey === "katakana" && <KanaTable type="katakana" />}
          {tableKey === "kanji" && <KanjiTableView />}
        </div>
      </div>
    </>
  );
}

// ── Home View ─────────────────────────────────────────────────────────────────
function HomeView({ onOpenTable }: { onOpenTable: (t: TableKey) => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        .jp-char { font-family: 'Noto Serif JP', serif; }
        .jp-mono  { font-family: 'DM Mono', monospace; font-size: 0.85em; }
      `}</style>
      <div className="space-y-14 pb-20">
        <div className="w-full">
          <BackButton href="/extra/playground" label="Playground" />
        </div>

        {/* Hero */}
        <div className="text-center space-y-3 py-2">
          <div className="jp-char text-6xl font-light tracking-widest opacity-90">日本語</div>
          <h1 className="text-3xl font-bold tracking-tight">Japanese Flashcards</h1>
          <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
            Practice hiragana, katakana, kanji, and vocabulary. Pick a deck to start.
          </p>
        </div>

        {/* Deck cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.entries(DECK_CONFIG) as [DeckKey, (typeof DECK_CONFIG)[DeckKey]][]).map(([key, cfg]) => (
            <Link
              key={key}
              href={cfg.href}
              className="border border-border rounded-2xl p-4 text-left transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 bg-card group relative overflow-hidden"
            >
              {/* Character watermark */}
              <div className="absolute -right-3 -top-2 jp-char text-8xl font-bold opacity-[0.04] select-none pointer-events-none leading-none">
                {cfg.preview[0]}
              </div>
              <div className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border mb-3 ${BADGE[cfg.badge]}`}>
                {cfg.jp}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {cfg.preview.map((ch, i) => (
                  <span key={i} className="jp-char text-base leading-none opacity-50 group-hover:opacity-80 transition-opacity duration-300" style={{ transitionDelay: `${i * 30}ms` }}>{ch}</span>
                ))}
              </div>
              <div className="font-semibold text-sm">{cfg.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{cfg.count} cards</div>
              <div className="mt-3 text-[11px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-muted-foreground group-hover:text-foreground">
                Study <ChevronRight size={10} />
              </div>
            </Link>
          ))}
        </div>

        {/* Reference Tables */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">Reference Tables</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {(Object.entries(TABLE_META) as [TableKey, (typeof TABLE_META)[TableKey]][]).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => onOpenTable(key)}
                className="border border-border rounded-2xl p-5 text-left bg-card hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex flex-wrap gap-1 mb-4 h-8 overflow-hidden">
                  {TABLE_PREVIEWS[key].map((char, i) => (
                    <span key={i} className="jp-char text-lg leading-none opacity-40 group-hover:opacity-80 transition-opacity duration-200" style={{ transitionDelay: `${i * 25}ms` }}>
                      {char}
                    </span>
                  ))}
                </div>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-semibold text-sm jp-char">{meta.label}</span>
                  <span className="text-xs text-muted-foreground jp-char">{meta.jp}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">{meta.count}</div>
                <div className="mt-3 text-[11px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-muted-foreground group-hover:text-foreground">
                  View Table <ChevronRight size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trivia */}
        <Link
          href="/extra/playground/jp-flashcards/trivia"
          className="border border-border rounded-2xl p-5 text-left bg-card hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200 group flex items-start gap-4"
        >
          <Lightbulb size={28} className="opacity-60 shrink-0 mt-0.5 group-hover:opacity-100 transition-opacity" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm mb-0.5">Did You Know?</div>
            <div className="text-[11px] text-muted-foreground">{triviaList.length} Japanese language facts</div>
            <div className="mt-3 text-[11px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all text-muted-foreground group-hover:text-foreground">
              Read Facts <ChevronRight size={10} />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function JpFlashcardsClient() {
  const [view, setView] = useState<View>("home");

  const handleOpenTable = useCallback((table: TableKey) => setView(`table-${table}`), []);
  const handleBack = useCallback(() => setView("home"), []);

  if (view === "table-hiragana") return <TablePageView tableKey="hiragana" onBack={handleBack} />;
  if (view === "table-katakana") return <TablePageView tableKey="katakana" onBack={handleBack} />;
  if (view === "table-kanji")    return <TablePageView tableKey="kanji"    onBack={handleBack} />;

  return <HomeView onOpenTable={handleOpenTable} />;
}
