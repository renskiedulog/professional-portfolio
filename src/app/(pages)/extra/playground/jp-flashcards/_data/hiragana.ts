export type KanaChar = { char: string; romaji: string } | null;

export const hiraganaRows: { consonant: string; chars: KanaChar[] }[] = [
  { consonant: "—", chars: [
    { char: "あ", romaji: "a" }, { char: "い", romaji: "i" },
    { char: "う", romaji: "u" }, { char: "え", romaji: "e" }, { char: "お", romaji: "o" },
  ]},
  { consonant: "k", chars: [
    { char: "か", romaji: "ka" }, { char: "き", romaji: "ki" },
    { char: "く", romaji: "ku" }, { char: "け", romaji: "ke" }, { char: "こ", romaji: "ko" },
  ]},
  { consonant: "s", chars: [
    { char: "さ", romaji: "sa" }, { char: "し", romaji: "shi" },
    { char: "す", romaji: "su" }, { char: "せ", romaji: "se" }, { char: "そ", romaji: "so" },
  ]},
  { consonant: "t", chars: [
    { char: "た", romaji: "ta" }, { char: "ち", romaji: "chi" },
    { char: "つ", romaji: "tsu" }, { char: "て", romaji: "te" }, { char: "と", romaji: "to" },
  ]},
  { consonant: "n", chars: [
    { char: "な", romaji: "na" }, { char: "に", romaji: "ni" },
    { char: "ぬ", romaji: "nu" }, { char: "ね", romaji: "ne" }, { char: "の", romaji: "no" },
  ]},
  { consonant: "h", chars: [
    { char: "は", romaji: "ha" }, { char: "ひ", romaji: "hi" },
    { char: "ふ", romaji: "fu" }, { char: "へ", romaji: "he" }, { char: "ほ", romaji: "ho" },
  ]},
  { consonant: "m", chars: [
    { char: "ま", romaji: "ma" }, { char: "み", romaji: "mi" },
    { char: "む", romaji: "mu" }, { char: "め", romaji: "me" }, { char: "も", romaji: "mo" },
  ]},
  { consonant: "y", chars: [
    { char: "や", romaji: "ya" }, null,
    { char: "ゆ", romaji: "yu" }, null, { char: "よ", romaji: "yo" },
  ]},
  { consonant: "r", chars: [
    { char: "ら", romaji: "ra" }, { char: "り", romaji: "ri" },
    { char: "る", romaji: "ru" }, { char: "れ", romaji: "re" }, { char: "ろ", romaji: "ro" },
  ]},
  { consonant: "w", chars: [
    { char: "わ", romaji: "wa" }, null, null, null, { char: "を", romaji: "wo" },
  ]},
  { consonant: "n", chars: [
    { char: "ん", romaji: "n" }, null, null, null, null,
  ]},
];

export const hiraganaCards = hiraganaRows
  .flatMap((row) => row.chars)
  .filter((c): c is NonNullable<KanaChar> => c !== null);
