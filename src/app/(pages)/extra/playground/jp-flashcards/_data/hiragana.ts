export type KanaChar = { char: string; romaji: string } | null;
export type KanaGroup = "base" | "dakuten" | "handakuten";
export type KanaRow = { consonant: string; chars: KanaChar[]; divider?: boolean; group?: KanaGroup };

export const hiraganaRows: KanaRow[] = [
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
  // Dakuten (゛) — voiced
  { consonant: "g", chars: [
    { char: "が", romaji: "ga" }, { char: "ぎ", romaji: "gi" },
    { char: "ぐ", romaji: "gu" }, { char: "げ", romaji: "ge" }, { char: "ご", romaji: "go" },
  ], divider: true, group: "dakuten" },
  { consonant: "z", chars: [
    { char: "ざ", romaji: "za" }, { char: "じ", romaji: "ji" },
    { char: "ず", romaji: "zu" }, { char: "ぜ", romaji: "ze" }, { char: "ぞ", romaji: "zo" },
  ], group: "dakuten"},
  { consonant: "d", chars: [
    { char: "だ", romaji: "da" }, { char: "ぢ", romaji: "di" },
    { char: "づ", romaji: "du" }, { char: "で", romaji: "de" }, { char: "ど", romaji: "do" },
  ], group: "dakuten"},
  { consonant: "b", chars: [
    { char: "ば", romaji: "ba" }, { char: "び", romaji: "bi" },
    { char: "ぶ", romaji: "bu" }, { char: "べ", romaji: "be" }, { char: "ぼ", romaji: "bo" },
  ], group: "dakuten"},
  // Handakuten (゜) — semi-voiced
  { consonant: "p", chars: [
    { char: "ぱ", romaji: "pa" }, { char: "ぴ", romaji: "pi" },
    { char: "ぷ", romaji: "pu" }, { char: "ぺ", romaji: "pe" }, { char: "ぽ", romaji: "po" },
  ], group: "handakuten"},
];

export type YoonRow = { consonant: string; chars: KanaChar[]; base?: KanaGroup };

export const hiraganaYoonRows: YoonRow[] = [
  { consonant: "ky", chars: [{ char: "きゃ", romaji: "kya" }, { char: "きゅ", romaji: "kyu" }, { char: "きょ", romaji: "kyo" }] },
  { consonant: "sh", chars: [{ char: "しゃ", romaji: "sha" }, { char: "しゅ", romaji: "shu" }, { char: "しょ", romaji: "sho" }] },
  { consonant: "ch", chars: [{ char: "ちゃ", romaji: "cha" }, { char: "ちゅ", romaji: "chu" }, { char: "ちょ", romaji: "cho" }] },
  { consonant: "ny", chars: [{ char: "にゃ", romaji: "nya" }, { char: "にゅ", romaji: "nyu" }, { char: "にょ", romaji: "nyo" }] },
  { consonant: "hy", chars: [{ char: "ひゃ", romaji: "hya" }, { char: "ひゅ", romaji: "hyu" }, { char: "ひょ", romaji: "hyo" }] },
  { consonant: "my", chars: [{ char: "みゃ", romaji: "mya" }, { char: "みゅ", romaji: "myu" }, { char: "みょ", romaji: "myo" }] },
  { consonant: "ry", chars: [{ char: "りゃ", romaji: "rya" }, { char: "りゅ", romaji: "ryu" }, { char: "りょ", romaji: "ryo" }] },
  { consonant: "gy", chars: [{ char: "ぎゃ", romaji: "gya" }, { char: "ぎゅ", romaji: "gyu" }, { char: "ぎょ", romaji: "gyo" }], base: "dakuten" },
  { consonant: "j",  chars: [{ char: "じゃ", romaji: "ja"  }, { char: "じゅ", romaji: "ju"  }, { char: "じょ", romaji: "jo"  }], base: "dakuten" },
  { consonant: "by", chars: [{ char: "びゃ", romaji: "bya" }, { char: "びゅ", romaji: "byu" }, { char: "びょ", romaji: "byo" }], base: "dakuten" },
  { consonant: "py", chars: [{ char: "ぴゃ", romaji: "pya" }, { char: "ぴゅ", romaji: "pyu" }, { char: "ぴょ", romaji: "pyo" }], base: "handakuten" },
];

// Builds a card subset from the selected groups. Yoon rows inherit their
// base group (ぎゃ is dakuten), so they follow the dakuten/handakuten toggles.
export type KanaSet = { base: boolean; dakuten: boolean; handakuten: boolean; yoon: boolean };

export function buildKanaCards(rows: KanaRow[], yoonRows: YoonRow[], set: KanaSet) {
  const allowed = (g: KanaGroup) =>
    g === "base" ? set.base : g === "dakuten" ? set.dakuten : set.handakuten;

  const plain = rows
    .filter((row) => allowed(row.group ?? "base"))
    .flatMap((row) => row.chars);

  const yoon = set.yoon
    ? yoonRows.filter((row) => allowed(row.base ?? "base")).flatMap((row) => row.chars)
    : [];

  return [...plain, ...yoon].filter((c): c is NonNullable<KanaChar> => c !== null);
}

const baseCards = hiraganaRows
  .flatMap((row) => row.chars)
  .filter((c): c is NonNullable<KanaChar> => c !== null);

const yoonCards = hiraganaYoonRows
  .flatMap((row) => row.chars)
  .filter((c): c is NonNullable<KanaChar> => c !== null);

export const hiraganaCards = [...baseCards, ...yoonCards];
