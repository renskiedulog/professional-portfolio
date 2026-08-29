"use client";
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { kanjiCards, kanjiCategories } from "../_data/kanji";
import { kanjiStudyMap, type KanjiStudyEntry } from "../_data/kanji-study";

type StudyItem = {
  char: string;
  meaning: string;
  reading: string;
  category: string;
  entry: KanjiStudyEntry;
};

// Deck order, minus any kanji that has no written explanation yet.
const ITEMS: StudyItem[] = kanjiCards
  .filter((c) => kanjiStudyMap[c.front])
  .map((c) => ({
    char: c.front,
    meaning: c.meaning,
    reading: c.reading,
    category: c.category,
    entry: kanjiStudyMap[c.front],
  }));

// ── Section heading ───────────────────────────────────────────────────────────
function Section({ title, jp, children }: { title: string; jp: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
        <span className="text-[11px] text-muted-foreground/70 jp-char">{jp}</span>
      </div>
      {children}
    </section>
  );
}

// Bolds every occurrence of the kanji inside an example sentence.
function HighlightedSentence({ text, char }: { text: string; char: string }) {
  const parts = text.split(char);
  return (
    <p className="text-lg jp-char leading-relaxed">
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="font-bold underline decoration-2 underline-offset-4 decoration-foreground/30">
              {char}
            </span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
}

// ── Detail panel ──────────────────────────────────────────────────────────────
function KanjiDetail({ item, position, total }: { item: StudyItem; position: number; total: number }) {
  const { entry } = item;
  return (
    <article className="space-y-10">
      <header className="flex flex-wrap items-end gap-6">
        <div className="text-[110px] leading-none jp-char">{item.char}</div>
        <div className="space-y-2 pb-2">
          <div className="text-xl font-bold">{item.meaning}</div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-2.5 py-1">{item.category}</span>
            <span className="rounded-full border border-border px-2.5 py-1">{entry.strokes} strokes</span>
            <span className="tabular-nums">{position} / {total}</span>
          </div>
        </div>
      </header>

      <Section title="Readings" jp="読み">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-border p-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              On&apos;yomi · 音読み
            </div>
            <div className="text-lg jp-char">{entry.on.length ? entry.on.join("・") : "—"}</div>
            <p className="mt-2 text-xs text-muted-foreground">Chinese-derived. Shows up in compounds.</p>
          </div>
          <div className="rounded-xl border-2 border-border p-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Kun&apos;yomi · 訓読み
            </div>
            <div className="text-lg jp-char">{entry.kun.length ? entry.kun.join("・") : "—"}</div>
            <p className="mt-2 text-xs text-muted-foreground">Native Japanese. Shows up when the kanji stands alone.</p>
          </div>
        </div>
      </Section>

      <Section title="Where the shape comes from" jp="成り立ち">
        <p className="text-[15px] leading-relaxed text-muted-foreground">{entry.origin}</p>
      </Section>

      <Section title="Built from" jp="部首">
        <div className="grid gap-2 sm:grid-cols-2">
          {entry.components.map((comp, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
              <span className="text-2xl jp-char shrink-0">{comp.part}</span>
              <span className="text-sm text-muted-foreground leading-snug">{comp.meaning}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="In context" jp="熟語">
        <div className="space-y-2">
          {entry.compounds.map((c, i) => (
            <div key={i} className="rounded-xl border border-border px-4 py-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xl jp-char font-medium">{c.word}</span>
                <span className="text-sm text-muted-foreground jp-char">{c.reading}</span>
                <span className="text-sm font-semibold">{c.meaning}</span>
              </div>
              {c.note && <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{c.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sentences" jp="例文">
        <div className="space-y-4">
          {entry.sentences.map((s, i) => (
            <div key={i} className="border-l-2 border-border pl-4 space-y-1">
              <HighlightedSentence text={s.jp} char={item.char} />
              <p className="text-xs text-muted-foreground jp-mono">{s.romaji}</p>
              <p className="text-sm text-muted-foreground">{s.en}</p>
            </div>
          ))}
        </div>
      </Section>

      {entry.nuance && (
        <Section title="Worth knowing" jp="要点">
          <p className="rounded-xl bg-foreground/[0.04] px-4 py-3 text-[15px] leading-relaxed">{entry.nuance}</p>
        </Section>
      )}
    </article>
  );
}

// ── Study Mode ────────────────────────────────────────────────────────────────
export default function KanjiStudyMode({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(ITEMS[0]?.char ?? "");
  const [query, setQuery] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (it) =>
        it.char.includes(q) ||
        it.meaning.toLowerCase().includes(q) ||
        it.reading.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q),
    );
  }, [query]);

  const index = ITEMS.findIndex((it) => it.char === selected);
  const item = ITEMS[index];

  const go = useCallback((delta: number) => {
    setSelected((cur) => {
      const i = ITEMS.findIndex((it) => it.char === cur);
      const next = (i + delta + ITEMS.length) % ITEMS.length;
      return ITEMS[next].char;
    });
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!item) {
    return <p className="text-sm text-muted-foreground">No study entries available yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <h1 className="text-3xl font-bold jp-char">Kanji Study</h1>
            <span className="text-xl text-muted-foreground jp-char">漢字研究</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Read the character, not just the answer · {ITEMS.length} entries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous kanji"
            className="rounded-xl border-2 border-border p-2.5 hover:border-foreground/40 transition-all active:scale-[0.98]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next kanji"
            className="rounded-xl border-2 border-border p-2.5 hover:border-foreground/40 transition-all active:scale-[0.98]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        {/* Index */}
        <aside className="lg:sticky lg:top-6 lg:self-start space-y-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search meaning or reading"
              className="w-full rounded-xl border-2 border-border bg-transparent py-2.5 pl-9 pr-9 text-sm outline-none focus:border-foreground/40 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="max-h-[30vh] lg:max-h-[70vh] overflow-y-auto pr-1 space-y-5">
            {kanjiCategories.map((cat) => {
              const group = filtered.filter((it) => it.category === cat);
              if (!group.length) return null;
              return (
                <div key={cat}>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    {cat}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.map((it) => {
                      const active = it.char === selected;
                      return (
                        <button
                          key={it.char}
                          onClick={() => {
                            setSelected(it.char);
                            detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          title={it.meaning}
                          className={`h-10 w-10 rounded-lg border-2 text-xl jp-char transition-all active:scale-[0.96] ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground/40"
                          }`}
                        >
                          {it.char}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {!filtered.length && (
              <p className="text-xs text-muted-foreground">Nothing matches “{query}”.</p>
            )}
          </div>
        </aside>

        {/* Detail */}
        <div ref={detailRef} className="min-w-0">
          <KanjiDetail item={item} position={index + 1} total={ITEMS.length} />

          <div className="mt-12 flex items-center justify-between gap-3 border-t border-border pt-6">
            <button
              onClick={() => go(-1)}
              className="flex items-center gap-2 rounded-xl border-2 border-border px-4 py-2.5 text-sm font-semibold hover:border-foreground/40 transition-all active:scale-[0.98]"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <button
              onClick={onBack}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Change mode
            </button>
            <button
              onClick={() => go(1)}
              className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-85 active:scale-[0.98]"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Use ← → to move between kanji
          </p>
        </div>
      </div>
    </div>
  );
}
