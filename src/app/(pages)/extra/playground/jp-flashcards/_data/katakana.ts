import type { KanaChar, KanaRow, YoonRow } from "./hiragana";

export const katakanaRows: KanaRow[] = [
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
  // Dakuten (゛) — voiced
  { consonant: "g", chars: [
    { char: "ガ", romaji: "ga" }, { char: "ギ", romaji: "gi" },
    { char: "グ", romaji: "gu" }, { char: "ゲ", romaji: "ge" }, { char: "ゴ", romaji: "go" },
  ], divider: true, group: "dakuten" },
  { consonant: "z", chars: [
    { char: "ザ", romaji: "za" }, { char: "ジ", romaji: "ji" },
    { char: "ズ", romaji: "zu" }, { char: "ゼ", romaji: "ze" }, { char: "ゾ", romaji: "zo" },
  ], group: "dakuten"},
  { consonant: "d", chars: [
    { char: "ダ", romaji: "da" }, { char: "ヂ", romaji: "di" },
    { char: "ヅ", romaji: "du" }, { char: "デ", romaji: "de" }, { char: "ド", romaji: "do" },
  ], group: "dakuten"},
  { consonant: "b", chars: [
    { char: "バ", romaji: "ba" }, { char: "ビ", romaji: "bi" },
    { char: "ブ", romaji: "bu" }, { char: "ベ", romaji: "be" }, { char: "ボ", romaji: "bo" },
  ], group: "dakuten"},
  // Handakuten (゜) — semi-voiced
  { consonant: "p", chars: [
    { char: "パ", romaji: "pa" }, { char: "ピ", romaji: "pi" },
    { char: "プ", romaji: "pu" }, { char: "ペ", romaji: "pe" }, { char: "ポ", romaji: "po" },
  ], group: "handakuten"},
];

export const katakanaYoonRows: YoonRow[] = [
  { consonant: "ky", chars: [{ char: "キャ", romaji: "kya" }, { char: "キュ", romaji: "kyu" }, { char: "キョ", romaji: "kyo" }] },
  { consonant: "sh", chars: [{ char: "シャ", romaji: "sha" }, { char: "シュ", romaji: "shu" }, { char: "ショ", romaji: "sho" }] },
  { consonant: "ch", chars: [{ char: "チャ", romaji: "cha" }, { char: "チュ", romaji: "chu" }, { char: "チョ", romaji: "cho" }] },
  { consonant: "ny", chars: [{ char: "ニャ", romaji: "nya" }, { char: "ニュ", romaji: "nyu" }, { char: "ニョ", romaji: "nyo" }] },
  { consonant: "hy", chars: [{ char: "ヒャ", romaji: "hya" }, { char: "ヒュ", romaji: "hyu" }, { char: "ヒョ", romaji: "hyo" }] },
  { consonant: "my", chars: [{ char: "ミャ", romaji: "mya" }, { char: "ミュ", romaji: "myu" }, { char: "ミョ", romaji: "myo" }] },
  { consonant: "ry", chars: [{ char: "リャ", romaji: "rya" }, { char: "リュ", romaji: "ryu" }, { char: "リョ", romaji: "ryo" }] },
  { consonant: "gy", chars: [{ char: "ギャ", romaji: "gya" }, { char: "ギュ", romaji: "gyu" }, { char: "ギョ", romaji: "gyo" }], base: "dakuten" },
  { consonant: "j",  chars: [{ char: "ジャ", romaji: "ja"  }, { char: "ジュ", romaji: "ju"  }, { char: "ジョ", romaji: "jo"  }], base: "dakuten" },
  { consonant: "by", chars: [{ char: "ビャ", romaji: "bya" }, { char: "ビュ", romaji: "byu" }, { char: "ビョ", romaji: "byo" }], base: "dakuten" },
  { consonant: "py", chars: [{ char: "ピャ", romaji: "pya" }, { char: "ピュ", romaji: "pyu" }, { char: "ピョ", romaji: "pyo" }], base: "handakuten" },
];

const baseCards = katakanaRows
  .flatMap((row) => row.chars)
  .filter((c): c is NonNullable<KanaChar> => c !== null);

const yoonCards = katakanaYoonRows
  .flatMap((row) => row.chars)
  .filter((c): c is NonNullable<KanaChar> => c !== null);

export const katakanaCards = [...baseCards, ...yoonCards];
