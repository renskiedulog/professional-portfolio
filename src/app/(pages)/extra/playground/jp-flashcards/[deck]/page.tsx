import Container from "@/app/UI/global-components/container";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import DeckClient from "./page.client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID = ["hiragana", "katakana", "kanji", "vocabulary", "particles", "numbers"] as const;
type DeckParam = (typeof VALID)[number];

const META: Record<DeckParam, { title: string; description: string }> = {
  hiragana: {
    title: "Hiragana Flashcards | Renato Dulog",
    description: "Study all 46 hiragana characters with flip cards or multiple-choice tests.",
  },
  katakana: {
    title: "Katakana Flashcards | Renato Dulog",
    description: "Study all 46 katakana characters with flip cards or multiple-choice tests.",
  },
  kanji: {
    title: "Kanji Flashcards | Renato Dulog",
    description: "Study N5-level kanji with flip cards or multiple-choice tests.",
  },
  vocabulary: {
    title: "Japanese Vocabulary Flashcards | Renato Dulog",
    description: "Study common N5 Japanese vocabulary with flip cards or multiple-choice tests.",
  },
  particles: {
    title: "Japanese Particles Flashcards | Renato Dulog",
    description: "Study common Japanese particles with flashcards and fill-in-the-blank practice.",
  },
  numbers: {
    title: "Japanese Numbers Flashcards | Renato Dulog",
    description: "Study Japanese numbers 0–10,000 with kanji, kana readings, and flashcards.",
  },
};

export function generateStaticParams() {
  return VALID.map((deck) => ({ deck }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ deck: string }>;
}): Promise<Metadata> {
  const { deck } = await params;
  const meta = META[deck as DeckParam];
  if (!meta) return { title: "Not Found" };
  return { title: meta.title, description: meta.description };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deck: string }>;
}) {
  const { deck } = await params;
  if (!VALID.includes(deck as DeckParam)) notFound();

  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        <DeckClient deck={deck as DeckParam} />
      </BlurFade>
    </Container>
  );
}
