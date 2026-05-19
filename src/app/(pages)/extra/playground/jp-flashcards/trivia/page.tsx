import Container from "@/app/UI/global-components/container";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import { triviaList } from "../_data/trivia";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japanese Trivia | Renato Dulog",
  description:
    "Fun and interesting facts about the Japanese language — writing systems, grammar, culture, and history.",
};

export default function TriviaPage() {
  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        <div className="space-y-10 pb-20 pt-4">
          <BackButton href="/extra/playground/jp-flashcards" label="JP Flashcards" />

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Did You Know?</h1>
            <p className="text-sm text-muted-foreground">
              Interesting facts about the Japanese language, writing systems, and culture.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {triviaList.map((item, i) => (
              <div key={i} className="border border-border rounded-2xl p-4 bg-card space-y-2">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed">{item.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>
    </Container>
  );
}
