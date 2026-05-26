export type NumberEntry = {
  value: number;
  kanji: string;
  kana: string;
  alt?: string;
  romaji: string;
  altRomaji?: string;
  category: "basic" | "teens" | "tens" | "large";
};

export const numberList: NumberEntry[] = [
  // Basic (0–10)
  { value: 0,     kanji: "零",   kana: "ゼロ",       romaji: "zero",     altRomaji: "rei",      category: "basic" },
  { value: 1,     kanji: "一",   kana: "いち",       romaji: "ichi",                            category: "basic" },
  { value: 2,     kanji: "二",   kana: "に",         romaji: "ni",                              category: "basic" },
  { value: 3,     kanji: "三",   kana: "さん",       romaji: "san",                             category: "basic" },
  { value: 4,     kanji: "四",   kana: "し",         romaji: "shi",      alt: "よん",   altRomaji: "yon",    category: "basic" },
  { value: 5,     kanji: "五",   kana: "ご",         romaji: "go",                              category: "basic" },
  { value: 6,     kanji: "六",   kana: "ろく",       romaji: "roku",                            category: "basic" },
  { value: 7,     kanji: "七",   kana: "しち",       romaji: "shichi",   alt: "なな",   altRomaji: "nana",   category: "basic" },
  { value: 8,     kanji: "八",   kana: "はち",       romaji: "hachi",                           category: "basic" },
  { value: 9,     kanji: "九",   kana: "く",         romaji: "ku",       alt: "きゅう", altRomaji: "kyuu",   category: "basic" },
  { value: 10,    kanji: "十",   kana: "じゅう",     romaji: "juu",                             category: "basic" },
  // Teens (11–19)
  { value: 11,    kanji: "十一", kana: "じゅういち",   romaji: "juuichi",                         category: "teens" },
  { value: 12,    kanji: "十二", kana: "じゅうに",     romaji: "juuni",                           category: "teens" },
  { value: 13,    kanji: "十三", kana: "じゅうさん",   romaji: "juusan",                          category: "teens" },
  { value: 14,    kanji: "十四", kana: "じゅうし",     romaji: "juushi",   alt: "じゅうよん", altRomaji: "juuyon",  category: "teens" },
  { value: 15,    kanji: "十五", kana: "じゅうご",     romaji: "juugo",                           category: "teens" },
  { value: 16,    kanji: "十六", kana: "じゅうろく",   romaji: "juuroku",                         category: "teens" },
  { value: 17,    kanji: "十七", kana: "じゅうしち",   romaji: "juushichi", alt: "じゅうなな", altRomaji: "juunana", category: "teens" },
  { value: 18,    kanji: "十八", kana: "じゅうはち",   romaji: "juuhachi",                        category: "teens" },
  { value: 19,    kanji: "十九", kana: "じゅうきゅう", romaji: "juukyuu",  alt: "じゅうく",   altRomaji: "juuku",   category: "teens" },
  // Tens (20–90)
  { value: 20,    kanji: "二十",  kana: "にじゅう",     romaji: "nijuu",    category: "tens" },
  { value: 30,    kanji: "三十",  kana: "さんじゅう",   romaji: "sanjuu",   category: "tens" },
  { value: 40,    kanji: "四十",  kana: "よんじゅう",   romaji: "yonjuu",   category: "tens" },
  { value: 50,    kanji: "五十",  kana: "ごじゅう",     romaji: "gojuu",    category: "tens" },
  { value: 60,    kanji: "六十",  kana: "ろくじゅう",   romaji: "rokujuu",  category: "tens" },
  { value: 70,    kanji: "七十",  kana: "ななじゅう",   romaji: "nanajuu",  category: "tens" },
  { value: 80,    kanji: "八十",  kana: "はちじゅう",   romaji: "hachijuu", category: "tens" },
  { value: 90,    kanji: "九十",  kana: "きゅうじゅう", romaji: "kyuujuu",  category: "tens" },
  // Large Numbers
  { value: 100,   kanji: "百",    kana: "ひゃく",  romaji: "hyaku", category: "large" },
  { value: 1000,  kanji: "千",    kana: "せん",    romaji: "sen",   category: "large" },
  { value: 10000, kanji: "万",    kana: "まん",    romaji: "man",   category: "large" },
];

export const numberCards = numberList.map((n) => ({
  front: n.kanji,
  back: `${n.romaji}${n.altRomaji ? ` / ${n.altRomaji}` : ""} · ${n.value}`,
  reading: n.kana + (n.alt ? ` / ${n.alt}` : ""),
}));

export const numberCategories: { key: NumberEntry["category"]; label: string }[] = [
  { key: "basic",  label: "Basic (0–10)" },
  { key: "teens",  label: "Teens (11–19)" },
  { key: "tens",   label: "Tens (20–90)" },
  { key: "large",  label: "Large Numbers" },
];
