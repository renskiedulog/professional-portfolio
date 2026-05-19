import type { KanaChar } from "./hiragana";

export const katakanaRows: { consonant: string; chars: KanaChar[] }[] = [
  { consonant: "—", chars: [
    { char: "ア", romaji: "a" }, { char: "イ", romaji: "i" },
    { char: "ウ", romaji: "u" }, { char: "エ", romaji: "e" }, { char: "オ", romaji: "o" },
  ]},
  { consonant: "k", chars: [
    { char: "カ", romaji: "ka" }, { char: "キ", romaji: "ki" },
    { char: "ク", romaji: "ku" }, { char: "ケ", romaji: "ke" }, { char: "コ", romaji: "ko" },
  ]},
  { consonant: "s", chars: [
    { char: "サ", romaji: "sa" }, { char: "シ", romaji: "shi" },
    { char: "ス", romaji: "su" }, { char: "セ", romaji: "se" }, { char: "ソ", romaji: "so" },
  ]},
  { consonant: "t", chars: [
    { char: "タ", romaji: "ta" }, { char: "チ", romaji: "chi" },
    { char: "ツ", romaji: "tsu" }, { char: "テ", romaji: "te" }, { char: "ト", romaji: "to" },
  ]},
  { consonant: "n", chars: [
    { char: "ナ", romaji: "na" }, { char: "ニ", romaji: "ni" },
    { char: "ヌ", romaji: "nu" }, { char: "ネ", romaji: "ne" }, { char: "ノ", romaji: "no" },
  ]},
  { consonant: "h", chars: [
    { char: "ハ", romaji: "ha" }, { char: "ヒ", romaji: "hi" },
    { char: "フ", romaji: "fu" }, { char: "ヘ", romaji: "he" }, { char: "ホ", romaji: "ho" },
  ]},
  { consonant: "m", chars: [
    { char: "マ", romaji: "ma" }, { char: "ミ", romaji: "mi" },
    { char: "ム", romaji: "mu" }, { char: "メ", romaji: "me" }, { char: "モ", romaji: "mo" },
  ]},
  { consonant: "y", chars: [
    { char: "ヤ", romaji: "ya" }, null,
    { char: "ユ", romaji: "yu" }, null, { char: "ヨ", romaji: "yo" },
  ]},
  { consonant: "r", chars: [
    { char: "ラ", romaji: "ra" }, { char: "リ", romaji: "ri" },
    { char: "ル", romaji: "ru" }, { char: "レ", romaji: "re" }, { char: "ロ", romaji: "ro" },
  ]},
  { consonant: "w", chars: [
    { char: "ワ", romaji: "wa" }, null, null, null, { char: "ヲ", romaji: "wo" },
  ]},
  { consonant: "n", chars: [
    { char: "ン", romaji: "n" }, null, null, null, null,
  ]},
];

export const katakanaCards = katakanaRows
  .flatMap((row) => row.chars)
  .filter((c): c is NonNullable<KanaChar> => c !== null);
