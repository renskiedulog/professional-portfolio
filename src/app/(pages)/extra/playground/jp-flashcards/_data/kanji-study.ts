// Explanatory data for Kanji Study mode — origin, components, compounds, sentences.
// Etymologies follow the traditional/standard accounts; where a shape is a
// phonetic loan rather than a picture, the entry says so instead of inventing a story.

export type KanjiComponent = { part: string; meaning: string };
export type KanjiCompound = { word: string; reading: string; meaning: string; note?: string };
export type KanjiSentence = { jp: string; romaji: string; en: string };

export type KanjiStudyEntry = {
  char: string;
  strokes: number;
  on: string[];
  kun: string[];
  origin: string;
  components: KanjiComponent[];
  compounds: KanjiCompound[];
  sentences: KanjiSentence[];
  nuance?: string;
};

export const kanjiStudyEntries: KanjiStudyEntry[] = [
  // ── Numbers ────────────────────────────────────────────────────────────────
  {
    char: "一", strokes: 1, on: ["イチ", "イツ"], kun: ["ひと-つ"],
    origin: "One tally stroke. The oldest counting marks were simply lines scratched side by side — 一, 二, 三 are that system frozen into writing.",
    components: [{ part: "一", meaning: "a single line = a single thing" }],
    compounds: [
      { word: "一番", reading: "いちばん", meaning: "number one / the most", note: "Also used as an adverb: 一番好き = like the most." },
      { word: "一人", reading: "ひとり", meaning: "one person / alone", note: "Irregular reading — not いちにん." },
      { word: "一日", reading: "いちにち / ついたち", meaning: "one day / the 1st of the month", note: "Same spelling, two readings, two meanings — context decides." },
    ],
    sentences: [
      { jp: "一番好きな色は青です。", romaji: "Ichiban suki na iro wa ao desu.", en: "My favourite colour is blue." },
      { jp: "一人で行きます。", romaji: "Hitori de ikimasu.", en: "I'll go alone." },
    ],
    nuance: "一 shrinks to a prefix meaning 'single / same': 一緒 (together), 一生 (a whole life).",
  },
  {
    char: "二", strokes: 2, on: ["ニ"], kun: ["ふた-つ"],
    origin: "Two tally strokes. The lower line is drawn longer to keep it from being read as a stretched 一.",
    components: [{ part: "二", meaning: "two stacked lines = two things" }],
    compounds: [
      { word: "二人", reading: "ふたり", meaning: "two people", note: "Irregular, like 一人." },
      { word: "二月", reading: "にがつ", meaning: "February" },
      { word: "二十歳", reading: "はたち", meaning: "twenty years old", note: "Fully irregular — a leftover of an older counting system." },
    ],
    sentences: [
      { jp: "二人で映画を見ました。", romaji: "Futari de eiga o mimashita.", en: "The two of us watched a movie." },
      { jp: "二月は寒いです。", romaji: "Nigatsu wa samui desu.", en: "February is cold." },
    ],
  },
  {
    char: "三", strokes: 3, on: ["サン"], kun: ["みっ-つ"],
    origin: "Three tally strokes — the last of the pure counting pictographs. From four onward, the shapes are borrowed characters, not stacked lines.",
    components: [{ part: "三", meaning: "three lines = three things" }],
    compounds: [
      { word: "三人", reading: "さんにん", meaning: "three people", note: "Back to the regular pattern after 一人・二人." },
      { word: "三日", reading: "みっか", meaning: "3rd of the month / three days" },
      { word: "三角", reading: "さんかく", meaning: "triangle", note: "三 + 角 (corner) = three corners." },
    ],
    sentences: [
      { jp: "三人の学生が来ました。", romaji: "Sannin no gakusei ga kimashita.", en: "Three students came." },
      { jp: "三日かかります。", romaji: "Mikka kakarimasu.", en: "It takes three days." },
    ],
  },
  {
    char: "四", strokes: 5, on: ["シ"], kun: ["よ-つ", "よん"],
    origin: "Originally written as four stacked lines (亖). That was too easy to misread, so scribes borrowed an unrelated character — a mouth with breath escaping — purely for its sound, and it stuck.",
    components: [
      { part: "囗", meaning: "enclosure / mouth outline" },
      { part: "儿", meaning: "the two legs inside" },
    ],
    compounds: [
      { word: "四月", reading: "しがつ", meaning: "April", note: "Always し here — よんがつ is wrong." },
      { word: "四時", reading: "よじ", meaning: "4 o'clock", note: "Neither し nor よん — clock time uses よ." },
      { word: "四つ", reading: "よっつ", meaning: "four things" },
    ],
    sentences: [
      { jp: "四月に日本へ行きます。", romaji: "Shigatsu ni Nihon e ikimasu.", en: "I'm going to Japan in April." },
      { jp: "四時に会いましょう。", romaji: "Yoji ni aimashou.", en: "Let's meet at four." },
    ],
    nuance: "し sounds like 死 (death), so よん is preferred when counting out loud or reading phone numbers.",
  },
  {
    char: "五", strokes: 4, on: ["ゴ"], kun: ["いつ-つ"],
    origin: "Two lines with a crossed X between them — a counting knot tied at the halfway point of ten. The crossing marks the midpoint of a hand's worth of counting.",
    components: [
      { part: "一 (top & bottom)", meaning: "the boundary lines" },
      { part: "X (middle)", meaning: "the crossing that marks five" },
    ],
    compounds: [
      { word: "五月", reading: "ごがつ", meaning: "May" },
      { word: "五十音", reading: "ごじゅうおん", meaning: "the kana syllabary", note: "Literally 'fifty sounds' — the kana chart you drill." },
      { word: "五つ", reading: "いつつ", meaning: "five things" },
    ],
    sentences: [
      { jp: "五月の天気はいいです。", romaji: "Gogatsu no tenki wa ii desu.", en: "May's weather is good." },
      { jp: "りんごを五つ買いました。", romaji: "Ringo o itsutsu kaimashita.", en: "I bought five apples." },
    ],
  },
  {
    char: "六", strokes: 4, on: ["ロク"], kun: ["むっ-つ"],
    origin: "A picture of a simple hut or shelter, borrowed for its sound to write 'six'. The meaning of the picture was dropped entirely — only the pronunciation survived.",
    components: [
      { part: "亠", meaning: "the roof / lid on top" },
      { part: "八", meaning: "the two supporting legs" },
    ],
    compounds: [
      { word: "六月", reading: "ろくがつ", meaning: "June" },
      { word: "六時", reading: "ろくじ", meaning: "6 o'clock" },
      { word: "六本", reading: "ろっぽん", meaning: "six long objects", note: "ろく + ほん → ろっぽん; the sound changes when counting." },
    ],
    sentences: [
      { jp: "六時に起きます。", romaji: "Rokuji ni okimasu.", en: "I get up at six." },
      { jp: "ペンが六本あります。", romaji: "Pen ga roppon arimasu.", en: "There are six pens." },
    ],
  },
  {
    char: "七", strokes: 2, on: ["シチ"], kun: ["なな", "なな-つ"],
    origin: "Originally a cross-shaped cut mark (the ancestor of 切, 'to cut'). When the number sense took over, the vertical stroke was bent to keep the two characters apart.",
    components: [{ part: "七", meaning: "a horizontal line cut by a bent stroke" }],
    compounds: [
      { word: "七月", reading: "しちがつ", meaning: "July" },
      { word: "七つ", reading: "ななつ", meaning: "seven things" },
      { word: "七夕", reading: "たなばた", meaning: "Star Festival (July 7th)", note: "Completely irregular reading tied to the festival's name." },
    ],
    sentences: [
      { jp: "七月は暑いです。", romaji: "Shichigatsu wa atsui desu.", en: "July is hot." },
      { jp: "七時に始まります。", romaji: "Shichiji ni hajimarimasu.", en: "It starts at seven." },
    ],
    nuance: "しち and いち sound alike over the phone, so なな is the safer spoken choice.",
  },
  {
    char: "八", strokes: 2, on: ["ハチ"], kun: ["やっ-つ"],
    origin: "Two strokes pulling apart from each other — the original meaning was 'to split'. That sense still lives inside 分 (divide) and 半 (half); the number is a borrowed use.",
    components: [{ part: "八", meaning: "two lines separating = division" }],
    compounds: [
      { word: "八月", reading: "はちがつ", meaning: "August" },
      { word: "八つ", reading: "やっつ", meaning: "eight things" },
      { word: "八百屋", reading: "やおや", meaning: "greengrocer", note: "Literally '800 shop' — 八百 was old slang for 'a huge variety'." },
    ],
    sentences: [
      { jp: "八月に休みを取ります。", romaji: "Hachigatsu ni yasumi o torimasu.", en: "I'll take time off in August." },
      { jp: "八百屋で野菜を買います。", romaji: "Yaoya de yasai o kaimasu.", en: "I buy vegetables at the greengrocer." },
    ],
    nuance: "八 is considered lucky — the shape widens as it goes down, suggesting growing fortune.",
  },
  {
    char: "九", strokes: 2, on: ["キュウ", "ク"], kun: ["ここの-つ"],
    origin: "A bent arm reaching and hooking back — the sense of 'stretched to the limit', one short of the full ten. Borrowed early for the number.",
    components: [{ part: "九", meaning: "a hooked, bent stroke = reaching the end" }],
    compounds: [
      { word: "九月", reading: "くがつ", meaning: "September", note: "く, never きゅう." },
      { word: "九時", reading: "くじ", meaning: "9 o'clock", note: "Clock time also takes く." },
      { word: "九つ", reading: "ここのつ", meaning: "nine things" },
    ],
    sentences: [
      { jp: "九月に学校が始まります。", romaji: "Kugatsu ni gakkou ga hajimarimasu.", en: "School starts in September." },
      { jp: "九時まで働きました。", romaji: "Kuji made hatarakimashita.", en: "I worked until nine." },
    ],
    nuance: "く also sounds like 苦 (suffering), so きゅう is used when counting freely.",
  },
  {
    char: "十", strokes: 2, on: ["ジュウ", "ジッ"], kun: ["とお"],
    origin: "A vertical line crossed by a horizontal one — a full bundle of counting rods tied at the middle. Ten is where a count is complete, so 十 also carries 'whole, full'.",
    components: [{ part: "十", meaning: "a crossed bundle = a complete set" }],
    compounds: [
      { word: "十分", reading: "じゅっぷん", meaning: "ten minutes" },
      { word: "十分", reading: "じゅうぶん", meaning: "enough / sufficient", note: "Same two kanji — じゅっぷん is a time, じゅうぶん is 'plenty'. Pure context." },
      { word: "十字", reading: "じゅうじ", meaning: "a cross (shape)", note: "Named after the shape of the character itself." },
    ],
    sentences: [
      { jp: "十分待ってください。", romaji: "Juppun matte kudasai.", en: "Please wait ten minutes." },
      { jp: "お金は十分あります。", romaji: "Okane wa juubun arimasu.", en: "There's plenty of money." },
    ],
    nuance: "The 十分 pair is the classic proof that reading follows meaning, not the other way round.",
  },
  {
    char: "百", strokes: 6, on: ["ヒャク"], kun: [],
    origin: "一 (one) placed on top of 白 (white), which supplies the sound. Read it as 'one 白' — one full hundred.",
    components: [
      { part: "一", meaning: "one" },
      { part: "白", meaning: "white — here only for its sound (haku → hyaku)" },
    ],
    compounds: [
      { word: "百円", reading: "ひゃくえん", meaning: "100 yen" },
      { word: "三百", reading: "さんびゃく", meaning: "three hundred", note: "Sound shift: ひゃく → びゃく after 三." },
      { word: "八百", reading: "はっぴゃく", meaning: "eight hundred", note: "And → ぴゃく after 六・八・百." },
    ],
    sentences: [
      { jp: "これは百円です。", romaji: "Kore wa hyaku en desu.", en: "This is 100 yen." },
      { jp: "八百円払いました。", romaji: "Happyaku en haraimashita.", en: "I paid 800 yen." },
    ],
    nuance: "百 in speech often just means 'loads': 百も承知 = 'I'm well aware'.",
  },
  {
    char: "千", strokes: 3, on: ["セン"], kun: ["ち"],
    origin: "十 (ten) with a person's slanted stroke written across the top — a person carrying ten tens. The added stroke is what separates it from 十.",
    components: [
      { part: "丿 (from 人)", meaning: "person — supplies the sound" },
      { part: "十", meaning: "ten, the unit being multiplied" },
    ],
    compounds: [
      { word: "千円", reading: "せんえん", meaning: "1,000 yen" },
      { word: "三千", reading: "さんぜん", meaning: "three thousand", note: "せん → ぜん after 三." },
      { word: "千葉", reading: "ちば", meaning: "Chiba (place name)", note: "The kun reading ち survives mostly in names." },
    ],
    sentences: [
      { jp: "千円貸してください。", romaji: "Sen en kashite kudasai.", en: "Please lend me 1,000 yen." },
      { jp: "三千人が来ました。", romaji: "Sanzen nin ga kimashita.", en: "Three thousand people came." },
    ],
  },
  {
    char: "万", strokes: 3, on: ["マン", "バン"], kun: [],
    origin: "A simplification of 萬, which was originally a picture of a scorpion. The insect had nothing to do with counting — the character was borrowed for its sound and the animal meaning was forgotten.",
    components: [{ part: "万", meaning: "the reduced remains of the old 萬 shape" }],
    compounds: [
      { word: "一万", reading: "いちまん", meaning: "10,000", note: "Never just 万 on its own for the number — always 一万." },
      { word: "万年筆", reading: "まんねんひつ", meaning: "fountain pen", note: "'Ten-thousand-year brush' — a pen that never runs dry." },
      { word: "万が一", reading: "まんがいち", meaning: "just in case / if by any chance", note: "'One in ten thousand' — the odds become the phrase." },
    ],
    sentences: [
      { jp: "一万円あります。", romaji: "Ichiman en arimasu.", en: "I have 10,000 yen." },
      { jp: "万が一の時は電話してください。", romaji: "Man ga ichi no toki wa denwa shite kudasai.", en: "Call me just in case." },
    ],
    nuance: "Japanese counts in units of 10,000, not 1,000 — 100万 is one million. Retraining that instinct is half of learning big numbers.",
  },

  // ── Time & Days ────────────────────────────────────────────────────────────
  {
    char: "日", strokes: 4, on: ["ニチ", "ジツ"], kun: ["ひ", "か"],
    origin: "A circle with a mark in the middle — the sun with its spot. Squared off by brush writing. Because a sun-cycle is a day, the same character carries both meanings.",
    components: [
      { part: "囗", meaning: "the disc of the sun" },
      { part: "一", meaning: "the mark inside it" },
    ],
    compounds: [
      { word: "日本", reading: "にほん / にっぽん", meaning: "Japan", note: "'Sun origin' — the land where the sun comes from." },
      { word: "今日", reading: "きょう", meaning: "today", note: "Irregular — you cannot build きょう from either reading." },
      { word: "日曜日", reading: "にちようび", meaning: "Sunday", note: "Same kanji twice, read にち then び." },
    ],
    sentences: [
      { jp: "今日は日曜日です。", romaji: "Kyou wa nichiyoubi desu.", en: "Today is Sunday." },
      { jp: "日が出ました。", romaji: "Hi ga demashita.", en: "The sun came out." },
    ],
    nuance: "日 is the workhorse of the calendar — every weekday name ends in it.",
  },
  {
    char: "月", strokes: 4, on: ["ゲツ", "ガツ"], kun: ["つき"],
    origin: "A crescent moon on its side. The moon was never drawn full, precisely so it wouldn't be confused with 日. One moon cycle is a month, so the character covers both.",
    components: [{ part: "月", meaning: "the crescent with its two inner lines" }],
    compounds: [
      { word: "月曜日", reading: "げつようび", meaning: "Monday" },
      { word: "一月", reading: "いちがつ", meaning: "January", note: "Months take ガツ; counting months takes ゲツ (一ヶ月 = ikkagetsu)." },
      { word: "お月見", reading: "おつきみ", meaning: "moon viewing", note: "Here it is literally the moon again." },
    ],
    sentences: [
      { jp: "月曜日に会議があります。", romaji: "Getsuyoubi ni kaigi ga arimasu.", en: "There's a meeting on Monday." },
      { jp: "月がきれいですね。", romaji: "Tsuki ga kirei desu ne.", en: "The moon is beautiful, isn't it." },
    ],
    nuance: "A 月-shaped element inside other kanji is often not the moon at all but 肉 (flesh) — that's why body-part kanji look moon-ish.",
  },
  {
    char: "火", strokes: 4, on: ["カ"], kun: ["ひ"],
    origin: "A flame rising with sparks flying off both sides. Compressed into four strokes: the central blaze plus two flying embers.",
    components: [
      { part: "人-like centre", meaning: "the rising flame" },
      { part: "the two side strokes", meaning: "sparks thrown off" },
    ],
    compounds: [
      { word: "火曜日", reading: "かようび", meaning: "Tuesday" },
      { word: "花火", reading: "はなび", meaning: "fireworks", note: "'Flower fire' — and the reading softens ひ → び." },
      { word: "火事", reading: "かじ", meaning: "a fire / blaze (disaster)", note: "Fire as an event, not as an element." },
    ],
    sentences: [
      { jp: "火曜日は忙しいです。", romaji: "Kayoubi wa isogashii desu.", en: "Tuesday is busy." },
      { jp: "夏に花火を見ました。", romaji: "Natsu ni hanabi o mimashita.", en: "I watched fireworks in summer." },
    ],
    nuance: "At the bottom of a kanji, 火 flattens into 灬 (four dots) — as in 無 or 黒.",
  },
  {
    char: "水", strokes: 4, on: ["スイ"], kun: ["みず"],
    origin: "A stream running down the middle with droplets splashing off each side. The centre stroke is the current; the outer strokes are the spray.",
    components: [
      { part: "the vertical hook", meaning: "the flowing current" },
      { part: "the side strokes", meaning: "droplets breaking off" },
    ],
    compounds: [
      { word: "水曜日", reading: "すいようび", meaning: "Wednesday" },
      { word: "お水", reading: "おみず", meaning: "water (polite)", note: "This is what you ask for in a restaurant." },
      { word: "水泳", reading: "すいえい", meaning: "swimming" },
    ],
    sentences: [
      { jp: "お水をください。", romaji: "Omizu o kudasai.", en: "Water, please." },
      { jp: "水曜日に水泳をします。", romaji: "Suiyoubi ni suiei o shimasu.", en: "I swim on Wednesdays." },
    ],
    nuance: "As a left-hand radical, 水 becomes 氵 (three drops) — 海, 泳, 酒 all carry it.",
  },
  {
    char: "木", strokes: 4, on: ["モク", "ボク"], kun: ["き", "こ"],
    origin: "A tree: the trunk down the middle, branches spreading above, roots reaching below. One of the clearest surviving pictographs.",
    components: [
      { part: "十", meaning: "trunk and branches" },
      { part: "the two lower strokes", meaning: "roots into the ground" },
    ],
    compounds: [
      { word: "木曜日", reading: "もくようび", meaning: "Thursday" },
      { word: "木材", reading: "もくざい", meaning: "lumber / timber", note: "The material, not the living tree." },
      { word: "木", reading: "き", meaning: "tree / wood", note: "Alone, it's the living tree." },
    ],
    sentences: [
      { jp: "公園に大きい木があります。", romaji: "Kouen ni ookii ki ga arimasu.", en: "There's a big tree in the park." },
      { jp: "木曜日に帰ります。", romaji: "Mokuyoubi ni kaerimasu.", en: "I'm going home on Thursday." },
    ],
    nuance: "Two trees make 林 (grove), three make 森 (forest) — the writing system stacks meaning literally.",
  },
  {
    char: "金", strokes: 8, on: ["キン", "コン"], kun: ["かね"],
    origin: "A roof (今, also giving the sound) over 土 (earth), with two dots for nuggets buried in the soil — metal found in the ground.",
    components: [
      { part: "亼", meaning: "cover / roof, carrying the sound kin" },
      { part: "土", meaning: "earth — where the metal lies" },
      { part: "the two dots", meaning: "nuggets of ore" },
    ],
    compounds: [
      { word: "金曜日", reading: "きんようび", meaning: "Friday" },
      { word: "お金", reading: "おかね", meaning: "money", note: "The everyday meaning — metal became currency." },
      { word: "金魚", reading: "きんぎょ", meaning: "goldfish", note: "Here 金 is the colour gold." },
    ],
    sentences: [
      { jp: "お金がありません。", romaji: "Okane ga arimasen.", en: "I don't have money." },
      { jp: "金曜日の夜は自由です。", romaji: "Kinyoubi no yoru wa jiyuu desu.", en: "Friday night I'm free." },
    ],
    nuance: "Three meanings hang off one shape — metal, gold, money — and only context separates them.",
  },
  {
    char: "土", strokes: 3, on: ["ド", "ト"], kun: ["つち"],
    origin: "A mound of earth heaped on the ground line. The lower stroke is the ground; everything above it is the pile.",
    components: [
      { part: "the lower 一", meaning: "the ground surface" },
      { part: "十 above it", meaning: "a mound raised on it" },
    ],
    compounds: [
      { word: "土曜日", reading: "どようび", meaning: "Saturday" },
      { word: "土地", reading: "とち", meaning: "land / a plot of land", note: "Land as property, not as soil." },
      { word: "お土産", reading: "おみやげ", meaning: "souvenir", note: "Fully irregular — 'local product' written with earth + produce." },
    ],
    sentences: [
      { jp: "土曜日に買い物へ行きます。", romaji: "Doyoubi ni kaimono e ikimasu.", en: "I'll go shopping on Saturday." },
      { jp: "お土産を買いました。", romaji: "Omiyage o kaimashita.", en: "I bought a souvenir." },
    ],
  },
  {
    char: "年", strokes: 6, on: ["ネン"], kun: ["とし"],
    origin: "Originally 禾 (grain) above 人 (person) — someone carrying the harvest home. One harvest per cycle, so the character came to mean one year.",
    components: [
      { part: "traces of 禾", meaning: "ripened grain" },
      { part: "traces of 人", meaning: "the person bearing it" },
    ],
    compounds: [
      { word: "今年", reading: "ことし", meaning: "this year", note: "Irregular — not こんねん." },
      { word: "去年", reading: "きょねん", meaning: "last year" },
      { word: "年上", reading: "としうえ", meaning: "older (in age)", note: "Here 年 is a person's age, not the calendar." },
    ],
    sentences: [
      { jp: "今年は日本語を勉強します。", romaji: "Kotoshi wa nihongo o benkyou shimasu.", en: "This year I'll study Japanese." },
      { jp: "姉は三つ年上です。", romaji: "Ane wa mittsu toshiue desu.", en: "My older sister is three years older." },
    ],
  },
  {
    char: "時", strokes: 10, on: ["ジ"], kun: ["とき"],
    origin: "日 (sun) beside 寺 (temple). The sun is what time is read from; 寺 supplies the sound and contains 寸, a measuring hand — a measured reading of the sun.",
    components: [
      { part: "日", meaning: "sun — the thing being read" },
      { part: "寺", meaning: "temple; sound ji, and holds 寸 (a hand's measure)" },
    ],
    compounds: [
      { word: "時間", reading: "じかん", meaning: "time / an hour", note: "'Time-interval' — duration rather than a point." },
      { word: "何時", reading: "なんじ", meaning: "what time" },
      { word: "時々", reading: "ときどき", meaning: "sometimes", note: "々 repeats the kanji — 'time, time'." },
    ],
    sentences: [
      { jp: "何時に起きましたか。", romaji: "Nanji ni okimashita ka.", en: "What time did you get up?" },
      { jp: "時々日本の映画を見ます。", romaji: "Tokidoki nihon no eiga o mimasu.", en: "I sometimes watch Japanese films." },
    ],
    nuance: "とき after a verb means 'when …': 食べる時 = when I eat.",
  },
  {
    char: "分", strokes: 4, on: ["フン", "ブン", "ブ"], kun: ["わ-ける", "わ-かる"],
    origin: "八 (splitting apart) above 刀 (knife) — a blade cutting something into parts. Every meaning it carries grows out of that one image.",
    components: [
      { part: "八", meaning: "two halves separating" },
      { part: "刀", meaning: "knife doing the cutting" },
    ],
    compounds: [
      { word: "五分", reading: "ごふん", meaning: "five minutes", note: "A minute is a cut-up piece of an hour." },
      { word: "半分", reading: "はんぶん", meaning: "half" },
      { word: "分かる", reading: "わかる", meaning: "to understand", note: "To understand is to separate one thing from another in your head." },
    ],
    sentences: [
      { jp: "十五分かかります。", romaji: "Juugofun kakarimasu.", en: "It takes fifteen minutes." },
      { jp: "意味が分かりません。", romaji: "Imi ga wakarimasen.", en: "I don't understand the meaning." },
    ],
    nuance: "One kanji, three jobs — minute, portion, understanding — all reachable from 'to divide'.",
  },
  {
    char: "今", strokes: 4, on: ["コン", "キン"], kun: ["いま"],
    origin: "A cover drawn over a mark — the moment held under the lid, the instant being pointed at right now. Compare 金, which reuses the same cover on top.",
    components: [
      { part: "亼", meaning: "a cover / roof over things" },
      { part: "the mark beneath", meaning: "the point in time being covered" },
    ],
    compounds: [
      { word: "今日", reading: "きょう", meaning: "today", note: "Irregular reading, extremely common." },
      { word: "今月", reading: "こんげつ", meaning: "this month" },
      { word: "今度", reading: "こんど", meaning: "next time / this time", note: "Ambiguous by design — context tells you which." },
    ],
    sentences: [
      { jp: "今、忙しいです。", romaji: "Ima, isogashii desu.", en: "I'm busy right now." },
      { jp: "今度一緒に行きましょう。", romaji: "Kondo issho ni ikimashou.", en: "Let's go together next time." },
    ],
    nuance: "今度 pointing forward or backward is decided entirely by the surrounding sentence — a classic learner trap.",
  },

  // ── Nature ─────────────────────────────────────────────────────────────────
  {
    char: "山", strokes: 3, on: ["サン"], kun: ["やま"],
    origin: "Three peaks rising from a base line — a mountain range seen from a distance. The middle peak is drawn tallest.",
    components: [
      { part: "the three verticals", meaning: "peaks, the centre one highest" },
      { part: "the base stroke", meaning: "the ground they rise from" },
    ],
    compounds: [
      { word: "富士山", reading: "ふじさん", meaning: "Mt. Fuji", note: "Mountain names take さん, not やま." },
      { word: "火山", reading: "かざん", meaning: "volcano", note: "'Fire mountain' — literal and obvious once you know 火." },
      { word: "たくさん", reading: "たくさん", meaning: "a lot", note: "Sometimes written 沢山 — 'a swamp and a mountain' of something." },
    ],
    sentences: [
      { jp: "山に登りました。", romaji: "Yama ni noborimashita.", en: "I climbed a mountain." },
      { jp: "富士山が見えます。", romaji: "Fujisan ga miemasu.", en: "You can see Mt. Fuji." },
    ],
  },
  {
    char: "川", strokes: 3, on: ["セン"], kun: ["かわ"],
    origin: "Three lines of running water between two banks — the outer strokes are the banks, the middle one is the current.",
    components: [
      { part: "the outer strokes", meaning: "the river banks" },
      { part: "the middle stroke", meaning: "water flowing between them" },
    ],
    compounds: [
      { word: "川", reading: "かわ", meaning: "river" },
      { word: "小川", reading: "おがわ", meaning: "stream / brook", note: "Also an extremely common surname." },
      { word: "川口", reading: "かわぐち", meaning: "river mouth / (surname)", note: "口 = mouth, here the opening where a river meets the sea." },
    ],
    sentences: [
      { jp: "川で泳ぎました。", romaji: "Kawa de oyogimashita.", en: "I swam in the river." },
      { jp: "この川は長いです。", romaji: "Kono kawa wa nagai desu.", en: "This river is long." },
    ],
    nuance: "In compounds after another word, かわ often voices to がわ: 江戸川 = Edogawa.",
  },
  {
    char: "田", strokes: 5, on: ["デン"], kun: ["た"],
    origin: "A plot of farmland seen from above, divided by irrigation paths into four squares. It is a map, not a picture of a plant.",
    components: [
      { part: "囗", meaning: "the boundary of the field" },
      { part: "the cross inside", meaning: "paths dividing it into plots" },
    ],
    compounds: [
      { word: "田んぼ", reading: "たんぼ", meaning: "rice paddy" },
      { word: "田中", reading: "たなか", meaning: "Tanaka (surname)", note: "'Middle of the fields' — Japan's family names are full of farmland." },
      { word: "水田", reading: "すいでん", meaning: "flooded rice field" },
    ],
    sentences: [
      { jp: "田んぼが広がっています。", romaji: "Tanbo ga hirogatte imasu.", en: "Rice fields stretch out." },
      { jp: "田中さんは先生です。", romaji: "Tanaka-san wa sensei desu.", en: "Mr./Ms. Tanaka is a teacher." },
    ],
  },
  {
    char: "空", strokes: 8, on: ["クウ"], kun: ["そら", "あ-く", "から"],
    origin: "穴 (a hole / cave) above 工 (which gives the sound). A hollow with nothing in it — hence 'empty', and by extension the great emptiness overhead: the sky.",
    components: [
      { part: "穴", meaning: "hole / hollow space" },
      { part: "工", meaning: "craft — here for the sound kou → kuu" },
    ],
    compounds: [
      { word: "空", reading: "そら", meaning: "sky" },
      { word: "空気", reading: "くうき", meaning: "air / atmosphere", note: "Also social atmosphere — 空気を読む = read the room." },
      { word: "空港", reading: "くうこう", meaning: "airport", note: "'Sky harbour'." },
    ],
    sentences: [
      { jp: "空が青いです。", romaji: "Sora ga aoi desu.", en: "The sky is blue." },
      { jp: "空港まで電車で行きます。", romaji: "Kuukou made densha de ikimasu.", en: "I'll go to the airport by train." },
    ],
    nuance: "Empty and sky live in one character: 空いている = 'it's vacant', 空 = 'the sky'.",
  },
  {
    char: "海", strokes: 9, on: ["カイ"], kun: ["うみ"],
    origin: "氵 (water) beside 毎 (every / always) — water that goes on without end. The water radical marks the category; 毎 gives the sound.",
    components: [
      { part: "氵", meaning: "water radical — a squeezed 水" },
      { part: "毎", meaning: "every / always; sound mai → kai" },
    ],
    compounds: [
      { word: "海", reading: "うみ", meaning: "sea / ocean" },
      { word: "海外", reading: "かいがい", meaning: "overseas / abroad", note: "'Outside the sea' — the Japanese way of saying 'foreign'." },
      { word: "日本海", reading: "にほんかい", meaning: "the Sea of Japan" },
    ],
    sentences: [
      { jp: "夏に海へ行きます。", romaji: "Natsu ni umi e ikimasu.", en: "I go to the sea in summer." },
      { jp: "海外で働きたいです。", romaji: "Kaigai de hatarakitai desu.", en: "I want to work abroad." },
    ],
  },

  // ── People & Body ──────────────────────────────────────────────────────────
  {
    char: "人", strokes: 2, on: ["ジン", "ニン"], kun: ["ひと"],
    origin: "A standing person seen from the side — two legs and a leaning body. Two strokes, no torso, no head: the walk is enough.",
    components: [{ part: "人", meaning: "a figure standing on two legs" }],
    compounds: [
      { word: "日本人", reading: "にほんじん", meaning: "Japanese person", note: "Nationalities take ジン." },
      { word: "三人", reading: "さんにん", meaning: "three people", note: "Counting people takes ニン." },
      { word: "人気", reading: "にんき", meaning: "popularity", note: "'People-feeling' — how the crowd feels about you." },
    ],
    sentences: [
      { jp: "あの人は先生です。", romaji: "Ano hito wa sensei desu.", en: "That person is a teacher." },
      { jp: "この店は人気があります。", romaji: "Kono mise wa ninki ga arimasu.", en: "This shop is popular." },
    ],
    nuance: "As a left radical it becomes 亻 — 休 (person + tree = rest), 何, 作 all carry it.",
  },
  {
    char: "女", strokes: 3, on: ["ジョ", "ニョ"], kun: ["おんな", "め"],
    origin: "A figure kneeling with arms crossed in front — the seated posture of ancient formal dress. Over time it narrowed to mean 'woman'.",
    components: [{ part: "女", meaning: "a kneeling figure with folded arms" }],
    compounds: [
      { word: "女の人", reading: "おんなのひと", meaning: "woman", note: "The neutral everyday phrase." },
      { word: "女性", reading: "じょせい", meaning: "female / woman (formal)", note: "What forms and news use." },
      { word: "彼女", reading: "かのじょ", meaning: "she / girlfriend", note: "Same word, two meanings — context only." },
    ],
    sentences: [
      { jp: "女の人が待っています。", romaji: "Onna no hito ga matte imasu.", en: "A woman is waiting." },
      { jp: "彼女は日本語が上手です。", romaji: "Kanojo wa nihongo ga jouzu desu.", en: "She is good at Japanese." },
    ],
  },
  {
    char: "男", strokes: 7, on: ["ダン", "ナン"], kun: ["おとこ"],
    origin: "田 (rice field) above 力 (strength) — the one who puts muscle into the fields. A compound of meaning, not sound.",
    components: [
      { part: "田", meaning: "rice field" },
      { part: "力", meaning: "strength / power" },
    ],
    compounds: [
      { word: "男の人", reading: "おとこのひと", meaning: "man" },
      { word: "男性", reading: "だんせい", meaning: "male / man (formal)" },
      { word: "長男", reading: "ちょうなん", meaning: "eldest son" },
    ],
    sentences: [
      { jp: "男の人が三人います。", romaji: "Otoko no hito ga sannin imasu.", en: "There are three men." },
      { jp: "彼は長男です。", romaji: "Kare wa chounan desu.", en: "He is the eldest son." },
    ],
    nuance: "男性/女性 are the neutral formal pair; 男/女 alone can sound blunt about a person.",
  },
  {
    char: "子", strokes: 3, on: ["シ", "ス"], kun: ["こ"],
    origin: "A baby with a large head and arms out, wrapped so the legs read as one stroke. The swaddled infant is still visible in the shape.",
    components: [
      { part: "the top stroke", meaning: "the head" },
      { part: "the cross stroke", meaning: "outstretched arms" },
      { part: "the hook", meaning: "the wrapped body" },
    ],
    compounds: [
      { word: "子供", reading: "こども", meaning: "child" },
      { word: "女の子", reading: "おんなのこ", meaning: "girl" },
      { word: "椅子", reading: "いす", meaning: "chair", note: "Nothing to do with children — 子 is a noun-forming suffix here." },
    ],
    sentences: [
      { jp: "子供が二人います。", romaji: "Kodomo ga futari imasu.", en: "I have two children." },
      { jp: "椅子に座ってください。", romaji: "Isu ni suwatte kudasai.", en: "Please sit on the chair." },
    ],
    nuance: "子 ends a huge number of girls' names (花子, 陽子) and also acts as a plain 'small thing' suffix.",
  },
  {
    char: "父", strokes: 4, on: ["フ"], kun: ["ちち", "とう"],
    origin: "A hand gripping a stone axe or staff — the figure of authority who wields the tool. The crossed strokes are the raised implement.",
    components: [
      { part: "the upper strokes", meaning: "the hand raised" },
      { part: "the crossing below", meaning: "the tool being held" },
    ],
    compounds: [
      { word: "父", reading: "ちち", meaning: "my father", note: "Used when talking about your own father to others." },
      { word: "お父さん", reading: "おとうさん", meaning: "father (someone else's / address)", note: "What you actually call him, and how you refer to another's father." },
      { word: "父親", reading: "ちちおや", meaning: "father (as a role)" },
    ],
    sentences: [
      { jp: "父は会社員です。", romaji: "Chichi wa kaishain desu.", en: "My father is an office worker." },
      { jp: "お父さんはお元気ですか。", romaji: "Otousan wa ogenki desu ka.", en: "How is your father?" },
    ],
    nuance: "Humble form for your own family, polite form for someone else's — getting this backwards sounds rude.",
  },
  {
    char: "母", strokes: 5, on: ["ボ"], kun: ["はは", "かあ"],
    origin: "The 女 shape with two dots added for the breasts — a woman who is nursing. The dots are the whole difference between 'woman' and 'mother'.",
    components: [
      { part: "女 (reshaped)", meaning: "the kneeling woman" },
      { part: "the two dots", meaning: "breasts — the nursing mother" },
    ],
    compounds: [
      { word: "母", reading: "はは", meaning: "my mother", note: "Humble, for your own mother." },
      { word: "お母さん", reading: "おかあさん", meaning: "mother (someone else's / address)" },
      { word: "母語", reading: "ぼご", meaning: "mother tongue / native language" },
    ],
    sentences: [
      { jp: "母は料理が上手です。", romaji: "Haha wa ryouri ga jouzu desu.", en: "My mother is good at cooking." },
      { jp: "母語は英語です。", romaji: "Bogo wa eigo desu.", en: "My native language is English." },
    ],
  },
  {
    char: "口", strokes: 3, on: ["コウ", "ク"], kun: ["くち"],
    origin: "An open mouth drawn as a square. From 'mouth' it stretches to any opening — an entrance, a river mouth, a slot.",
    components: [{ part: "口", meaning: "an open mouth / any opening" }],
    compounds: [
      { word: "口", reading: "くち", meaning: "mouth" },
      { word: "出口", reading: "でぐち", meaning: "exit", note: "'Come-out opening' — station signs everywhere." },
      { word: "人口", reading: "じんこう", meaning: "population", note: "'People mouths' — mouths to feed, counted." },
    ],
    sentences: [
      { jp: "口を開けてください。", romaji: "Kuchi o akete kudasai.", en: "Please open your mouth." },
      { jp: "出口はどこですか。", romaji: "Deguchi wa doko desu ka.", en: "Where is the exit?" },
    ],
    nuance: "口 is one of the busiest building blocks in the whole system — it sits inside 名, 味, 品, 和 and dozens more.",
  },
  {
    char: "目", strokes: 5, on: ["モク", "ボク"], kun: ["め"],
    origin: "An eye. Originally drawn on its side with the pupil inside; brush writing stood it upright, so the lids became the box and the pupil the two inner lines.",
    components: [
      { part: "the outer box", meaning: "the eyelids" },
      { part: "the two inner lines", meaning: "the pupil" },
    ],
    compounds: [
      { word: "目", reading: "め", meaning: "eye" },
      { word: "目的", reading: "もくてき", meaning: "purpose / objective", note: "'What the eye is aimed at'." },
      { word: "一番目", reading: "いちばんめ", meaning: "the first one", note: "As a suffix, 目 turns a number into an ordinal." },
    ],
    sentences: [
      { jp: "目が痛いです。", romaji: "Me ga itai desu.", en: "My eyes hurt." },
      { jp: "二番目の部屋です。", romaji: "Nibanme no heya desu.", en: "It's the second room." },
    ],
    nuance: "The ordinal 目 is everywhere: 三日目 = the third day, 二回目 = the second time.",
  },
  {
    char: "耳", strokes: 6, on: ["ジ"], kun: ["みみ"],
    origin: "An ear seen from the side — the outer rim and the inner folds drawn as horizontal lines.",
    components: [
      { part: "the outer frame", meaning: "the rim of the ear" },
      { part: "the inner lines", meaning: "folds of the ear canal" },
    ],
    compounds: [
      { word: "耳", reading: "みみ", meaning: "ear" },
      { word: "耳鼻科", reading: "じびか", meaning: "ENT clinic (ear-nose department)" },
      { word: "早耳", reading: "はやみみ", meaning: "quick to hear news / in the know" },
    ],
    sentences: [
      { jp: "耳が聞こえません。", romaji: "Mimi ga kikoemasen.", en: "I can't hear." },
      { jp: "犬の耳は大きいです。", romaji: "Inu no mimi wa ookii desu.", en: "The dog's ears are big." },
    ],
    nuance: "耳 sits inside 聞 (to hear) — an ear framed by a gate.",
  },
  {
    char: "手", strokes: 4, on: ["シュ"], kun: ["て"],
    origin: "A hand with the fingers spread and the wrist below — the strokes across the top are fingers, the hook is the arm.",
    components: [
      { part: "the three horizontals", meaning: "fingers" },
      { part: "the hooked vertical", meaning: "wrist and arm" },
    ],
    compounds: [
      { word: "手", reading: "て", meaning: "hand" },
      { word: "上手", reading: "じょうず", meaning: "skilful / good at", note: "'Upper hand' — irregular reading, essential word." },
      { word: "切手", reading: "きって", meaning: "postage stamp", note: "'Cut hand' historically — a cut-off receipt slip. Nothing to do with hands today." },
    ],
    sentences: [
      { jp: "手を洗ってください。", romaji: "Te o aratte kudasai.", en: "Please wash your hands." },
      { jp: "日本語が上手ですね。", romaji: "Nihongo ga jouzu desu ne.", en: "Your Japanese is good." },
    ],
    nuance: "As a left radical 手 becomes 扌 — 持つ (hold), 押す (push), 打つ (hit) all keep a hand on the left.",
  },
  {
    char: "足", strokes: 7, on: ["ソク"], kun: ["あし", "た-りる"],
    origin: "口 (here a kneecap, not a mouth) above 止 (a footprint) — the leg from knee to foot. From 'foot' it extends to 'enough', as in having footing to stand on.",
    components: [
      { part: "口", meaning: "the knee joint" },
      { part: "止", meaning: "a footprint — the foot planted" },
    ],
    compounds: [
      { word: "足", reading: "あし", meaning: "foot / leg" },
      { word: "足りる", reading: "たりる", meaning: "to be enough", note: "Same kanji, completely different meaning branch." },
      { word: "不足", reading: "ふそく", meaning: "shortage / insufficiency", note: "不 (not) + 足 (enough)." },
    ],
    sentences: [
      { jp: "足が疲れました。", romaji: "Ashi ga tsukaremashita.", en: "My legs are tired." },
      { jp: "お金が足りません。", romaji: "Okane ga tarimasen.", en: "There isn't enough money." },
    ],
    nuance: "足 covers foot and leg both — Japanese doesn't split them the way English does.",
  },

  // ── Size & Direction ───────────────────────────────────────────────────────
  {
    char: "大", strokes: 3, on: ["ダイ", "タイ"], kun: ["おお-きい"],
    origin: "A person standing with arms and legs stretched as wide as they go — the gesture for 'this big'. It is 人 with the arms thrown open.",
    components: [
      { part: "人 (spread)", meaning: "a standing person" },
      { part: "the horizontal", meaning: "arms flung wide" },
    ],
    compounds: [
      { word: "大きい", reading: "おおきい", meaning: "big" },
      { word: "大学", reading: "だいがく", meaning: "university", note: "'Big learning' — the school above all others." },
      { word: "大丈夫", reading: "だいじょうぶ", meaning: "OK / no problem", note: "One of the most used words in the language." },
    ],
    sentences: [
      { jp: "大きい犬がいます。", romaji: "Ookii inu ga imasu.", en: "There's a big dog." },
      { jp: "大丈夫ですか。", romaji: "Daijoubu desu ka.", en: "Are you all right?" },
    ],
    nuance: "大 as a prefix means 'greatly': 大好き = love it, 大変 = seriously tough.",
  },
  {
    char: "小", strokes: 3, on: ["ショウ"], kun: ["ちい-さい", "こ", "お"],
    origin: "A small object with two specks splitting off either side — tiny fragments. The centre hook is the thing; the side dots are what makes it look small.",
    components: [
      { part: "the centre hook", meaning: "the object itself" },
      { part: "the two side dots", meaning: "fragments — smallness" },
    ],
    compounds: [
      { word: "小さい", reading: "ちいさい", meaning: "small" },
      { word: "小学校", reading: "しょうがっこう", meaning: "elementary school", note: "'Small school' in the ladder 小・中・高." },
      { word: "小川", reading: "おがわ", meaning: "stream / (surname)", note: "Here 小 reads お." },
    ],
    sentences: [
      { jp: "小さい部屋に住んでいます。", romaji: "Chiisai heya ni sunde imasu.", en: "I live in a small room." },
      { jp: "妹は小学校に行っています。", romaji: "Imouto wa shougakkou ni itte imasu.", en: "My little sister goes to elementary school." },
    ],
    nuance: "Three kun readings (ちい・こ・お) all mean small — which one appears is set by the word, not by rule.",
  },
  {
    char: "上", strokes: 3, on: ["ジョウ"], kun: ["うえ", "あ-がる", "のぼ-る"],
    origin: "A mark placed above a baseline — a pure diagram, not a picture. 上 and 下 are the same line with the mark flipped.",
    components: [
      { part: "the base line", meaning: "the reference level" },
      { part: "the stroke above it", meaning: "something positioned higher" },
    ],
    compounds: [
      { word: "上", reading: "うえ", meaning: "above / on top" },
      { word: "上手", reading: "じょうず", meaning: "good at / skilful" },
      { word: "値上げ", reading: "ねあげ", meaning: "price increase", note: "上げる = to raise, so the price goes up." },
    ],
    sentences: [
      { jp: "机の上に本があります。", romaji: "Tsukue no ue ni hon ga arimasu.", en: "There's a book on the desk." },
      { jp: "階段を上がりました。", romaji: "Kaidan o agarimashita.", en: "I went up the stairs." },
    ],
    nuance: "Beyond position, 上 marks rank and improvement: 目上の人 = someone senior to you.",
  },
  {
    char: "下", strokes: 3, on: ["カ", "ゲ"], kun: ["した", "さ-がる", "くだ-さい"],
    origin: "The mirror image of 上 — a mark set below the baseline. The pair was designed together as a matched diagram.",
    components: [
      { part: "the top line", meaning: "the reference level" },
      { part: "the stroke below it", meaning: "something positioned lower" },
    ],
    compounds: [
      { word: "下", reading: "した", meaning: "below / under" },
      { word: "下手", reading: "へた", meaning: "bad at / unskilful", note: "The exact opposite of 上手, and just as irregular." },
      { word: "ください", reading: "ください", meaning: "please give me", note: "From 下さる — 'to hand down' from a superior. The politeness comes from the direction." },
    ],
    sentences: [
      { jp: "椅子の下に猫がいます。", romaji: "Isu no shita ni neko ga imasu.", en: "There's a cat under the chair." },
      { jp: "料理は下手です。", romaji: "Ryouri wa heta desu.", en: "I'm bad at cooking." },
    ],
  },
  {
    char: "中", strokes: 4, on: ["チュウ"], kun: ["なか"],
    origin: "A line driven straight through the centre of a box — the target struck dead centre. Hitting the middle is the original image.",
    components: [
      { part: "口", meaning: "the enclosure / target" },
      { part: "the vertical stroke", meaning: "a line through its centre" },
    ],
    compounds: [
      { word: "中", reading: "なか", meaning: "inside / middle" },
      { word: "中国", reading: "ちゅうごく", meaning: "China", note: "'Middle kingdom'." },
      { word: "勉強中", reading: "べんきょうちゅう", meaning: "in the middle of studying", note: "As a suffix, 中 means 'currently doing'." },
    ],
    sentences: [
      { jp: "かばんの中に財布があります。", romaji: "Kaban no naka ni saifu ga arimasu.", en: "My wallet is in the bag." },
      { jp: "今、仕事中です。", romaji: "Ima, shigotochuu desu.", en: "I'm at work right now." },
    ],
    nuance: "The 〜中 suffix is everywhere on signs: 営業中 (open), 工事中 (under construction).",
  },
  {
    char: "左", strokes: 5, on: ["サ"], kun: ["ひだり"],
    origin: "A hand above 工 (a carpenter's tool) — the hand that steadies the work while the other one strikes. 左 and 右 are the same hand shape with different objects beneath.",
    components: [
      { part: "the top strokes", meaning: "a hand" },
      { part: "工", meaning: "a craftsman's square / tool" },
    ],
    compounds: [
      { word: "左", reading: "ひだり", meaning: "left" },
      { word: "左手", reading: "ひだりて", meaning: "left hand" },
      { word: "左側", reading: "ひだりがわ", meaning: "the left side" },
    ],
    sentences: [
      { jp: "次の角を左へ曲がってください。", romaji: "Tsugi no kado o hidari e magatte kudasai.", en: "Please turn left at the next corner." },
      { jp: "左手にコンビニがあります。", romaji: "Hidarite ni konbini ga arimasu.", en: "There's a convenience store on your left." },
    ],
    nuance: "Stroke order splits the pair: 左 starts with the horizontal, 右 starts with the sweeping diagonal.",
  },
  {
    char: "右", strokes: 5, on: ["ウ", "ユウ"], kun: ["みぎ"],
    origin: "A hand above 口 (mouth) — the hand that brings food to the mouth, the dominant one. Its partner 左 holds the tool instead.",
    components: [
      { part: "the top strokes", meaning: "a hand" },
      { part: "口", meaning: "mouth — what the hand feeds" },
    ],
    compounds: [
      { word: "右", reading: "みぎ", meaning: "right" },
      { word: "右側", reading: "みぎがわ", meaning: "the right side" },
      { word: "左右", reading: "さゆう", meaning: "left and right / to influence", note: "左右する = to sway or control something." },
    ],
    sentences: [
      { jp: "右に曲がってください。", romaji: "Migi ni magatte kudasai.", en: "Please turn right." },
      { jp: "駅は右側です。", romaji: "Eki wa migigawa desu.", en: "The station is on the right." },
    ],
  },

  // ── Education ──────────────────────────────────────────────────────────────
  {
    char: "本", strokes: 5, on: ["ホン"], kun: ["もと"],
    origin: "木 (tree) with an extra stroke marking the base of the trunk — pointing at the root. From 'root' come 'origin', 'the main one', and eventually 'book', the root of knowledge.",
    components: [
      { part: "木", meaning: "tree" },
      { part: "the low horizontal", meaning: "a marker on the roots" },
    ],
    compounds: [
      { word: "本", reading: "ほん", meaning: "book" },
      { word: "日本", reading: "にほん", meaning: "Japan", note: "'Sun's origin' — 本 as root, not book." },
      { word: "三本", reading: "さんぼん", meaning: "three long objects", note: "As a counter, 本 counts cylindrical things — pens, bottles, trains." },
    ],
    sentences: [
      { jp: "本を読んでいます。", romaji: "Hon o yonde imasu.", en: "I'm reading a book." },
      { jp: "ビールを二本ください。", romaji: "Biiru o nihon kudasai.", en: "Two beers, please." },
    ],
    nuance: "Book, origin, and a counter for long objects — one shape, three unrelated-looking jobs.",
  },
  {
    char: "語", strokes: 14, on: ["ゴ"], kun: ["かた-る"],
    origin: "言 (words / speech) beside 吾 (I, myself) — words coming from a person, i.e. speaking a language. 言 has a mouth 口 under lines of sound.",
    components: [
      { part: "言", meaning: "speech — sound lines above a mouth" },
      { part: "吾", meaning: "I / myself; also gives the sound go" },
    ],
    compounds: [
      { word: "日本語", reading: "にほんご", meaning: "Japanese language", note: "〜語 attaches to any country: 英語, 韓国語." },
      { word: "単語", reading: "たんご", meaning: "vocabulary word" },
      { word: "物語", reading: "ものがたり", meaning: "story / tale", note: "'Telling of things' — the kun reading かたる." },
    ],
    sentences: [
      { jp: "日本語を勉強しています。", romaji: "Nihongo o benkyou shite imasu.", en: "I'm studying Japanese." },
      { jp: "単語を覚えました。", romaji: "Tango o oboemashita.", en: "I memorised the words." },
    ],
  },
  {
    char: "学", strokes: 8, on: ["ガク"], kun: ["まな-ぶ"],
    origin: "Simplified from 學: hands reaching down to a child (子) under a roof — an adult guiding a child indoors. The modern top is what remains of those hands.",
    components: [
      { part: "the top strokes", meaning: "hands passing knowledge down (reduced from 學)" },
      { part: "冖", meaning: "a roof — the school building" },
      { part: "子", meaning: "child — the one learning" },
    ],
    compounds: [
      { word: "学生", reading: "がくせい", meaning: "student", note: "学 + 生 — 'learning life'." },
      { word: "大学", reading: "だいがく", meaning: "university" },
      { word: "学ぶ", reading: "まなぶ", meaning: "to learn", note: "The verb form, more formal than 勉強する." },
    ],
    sentences: [
      { jp: "私は学生です。", romaji: "Watashi wa gakusei desu.", en: "I'm a student." },
      { jp: "大学で日本語を学びます。", romaji: "Daigaku de nihongo o manabimasu.", en: "I learn Japanese at university." },
    ],
  },
  {
    char: "校", strokes: 10, on: ["コウ"], kun: [],
    origin: "木 (wood) beside 交 (to cross / exchange). Originally crossed wooden frames; the school sense grew from the fenced compound where people gathered.",
    components: [
      { part: "木", meaning: "wood — the built structure" },
      { part: "交", meaning: "crossing / mixing; sound kou" },
    ],
    compounds: [
      { word: "学校", reading: "がっこう", meaning: "school", note: "がく + こう → がっこう, a doubled consonant." },
      { word: "高校", reading: "こうこう", meaning: "high school" },
      { word: "校長", reading: "こうちょう", meaning: "principal / headteacher" },
    ],
    sentences: [
      { jp: "学校へ行きます。", romaji: "Gakkou e ikimasu.", en: "I'm going to school." },
      { jp: "高校の先生に会いました。", romaji: "Koukou no sensei ni aimashita.", en: "I met my high school teacher." },
    ],
    nuance: "校 almost never stands alone — treat it as a school-word building block.",
  },
  {
    char: "先", strokes: 6, on: ["セン"], kun: ["さき"],
    origin: "A footprint above a person — someone whose step has already landed ahead of you. From 'ahead in space' it slid into 'ahead in time', i.e. previous.",
    components: [
      { part: "the top strokes", meaning: "a foot stepping forward" },
      { part: "儿", meaning: "a person's legs beneath" },
    ],
    compounds: [
      { word: "先生", reading: "せんせい", meaning: "teacher", note: "'Born before' — one who came ahead of you in life." },
      { word: "先週", reading: "せんしゅう", meaning: "last week", note: "先 = the one that went ahead = the previous one." },
      { word: "お先に", reading: "おさきに", meaning: "excuse me for going first", note: "Said when leaving the office before your colleagues." },
    ],
    sentences: [
      { jp: "先生に質問しました。", romaji: "Sensei ni shitsumon shimashita.", en: "I asked the teacher a question." },
      { jp: "お先に失礼します。", romaji: "Osaki ni shitsurei shimasu.", en: "Excuse me for leaving first." },
    ],
    nuance: "先 pointing to the past (先週) and to the front (この先) is the same idea seen from two directions.",
  },
  {
    char: "生", strokes: 5, on: ["セイ", "ショウ"], kun: ["い-きる", "う-まれる", "なま"],
    origin: "A young shoot pushing up out of the ground line — new growth breaking the surface. Everything the character means grows from that sprout.",
    components: [
      { part: "the lower 一", meaning: "the ground" },
      { part: "the sprout above", meaning: "a plant pushing up = life beginning" },
    ],
    compounds: [
      { word: "生きる", reading: "いきる", meaning: "to live" },
      { word: "学生", reading: "がくせい", meaning: "student", note: "Here 生 is a person in a role." },
      { word: "生ビール", reading: "なまビール", meaning: "draft beer", note: "なま = raw / unprocessed. Same kanji, no connection to 'life' at the surface." },
    ],
    sentences: [
      { jp: "東京で生まれました。", romaji: "Tokyo de umaremashita.", en: "I was born in Tokyo." },
      { jp: "生ビールを一つください。", romaji: "Nama biiru o hitotsu kudasai.", en: "One draft beer, please." },
    ],
    nuance: "生 is the classic many-reading kanji: life, birth, raw, student, teacher (先生). Read the word, not the character.",
  },

  // ── Actions ────────────────────────────────────────────────────────────────
  {
    char: "食", strokes: 9, on: ["ショク"], kun: ["た-べる", "く-う"],
    origin: "A lid over a heaped bowl of food on a stand — a covered serving dish. The top triangle is the cover, everything below is the vessel and its contents.",
    components: [
      { part: "亼", meaning: "the lid over the dish" },
      { part: "the lower block", meaning: "a bowl of piled-up food" },
    ],
    compounds: [
      { word: "食べる", reading: "たべる", meaning: "to eat" },
      { word: "食事", reading: "しょくじ", meaning: "a meal", note: "'Eating matter' — the occasion, not the food." },
      { word: "食堂", reading: "しょくどう", meaning: "cafeteria / dining hall" },
    ],
    sentences: [
      { jp: "朝ご飯を食べましたか。", romaji: "Asagohan o tabemashita ka.", en: "Did you eat breakfast?" },
      { jp: "食堂で昼ご飯を食べます。", romaji: "Shokudou de hirugohan o tabemasu.", en: "I eat lunch in the cafeteria." },
    ],
    nuance: "食う is the same verb spoken roughly — fine among close male friends, rude in most other settings.",
  },
  {
    char: "飲", strokes: 12, on: ["イン"], kun: ["の-む"],
    origin: "食 squeezed into 飠 (food radical) beside 欠 — a person with mouth wide open, leaning in. Food-vessel plus gaping mouth: drinking it down.",
    components: [
      { part: "飠", meaning: "the food/vessel radical, a compressed 食" },
      { part: "欠", meaning: "a person with mouth open wide" },
    ],
    compounds: [
      { word: "飲む", reading: "のむ", meaning: "to drink", note: "Also 'to take' medicine — 薬を飲む." },
      { word: "飲み物", reading: "のみもの", meaning: "a drink / beverage" },
      { word: "飲み会", reading: "のみかい", meaning: "drinking party", note: "A whole social institution in one word." },
    ],
    sentences: [
      { jp: "毎朝コーヒーを飲みます。", romaji: "Maiasa koohii o nomimasu.", en: "I drink coffee every morning." },
      { jp: "金曜日に飲み会があります。", romaji: "Kinyoubi ni nomikai ga arimasu.", en: "There's a drinking party on Friday." },
    ],
    nuance: "Japanese 'drinks' pills and soup — anything swallowed without chewing takes 飲む.",
  },
  {
    char: "見", strokes: 7, on: ["ケン"], kun: ["み-る", "み-える"],
    origin: "目 (an eye) set on top of 儿 (a person's legs) — a person walking around with their eye out front. Looking is an eye carried by a body.",
    components: [
      { part: "目", meaning: "eye" },
      { part: "儿", meaning: "legs — the person doing the looking" },
    ],
    compounds: [
      { word: "見る", reading: "みる", meaning: "to see / watch", note: "Deliberate looking." },
      { word: "見える", reading: "みえる", meaning: "to be visible", note: "No effort involved — it just appears to you." },
      { word: "意見", reading: "いけん", meaning: "opinion", note: "'Thought-view' — how you see it." },
    ],
    sentences: [
      { jp: "テレビを見ます。", romaji: "Terebi o mimasu.", en: "I watch TV." },
      { jp: "ここから海が見えます。", romaji: "Koko kara umi ga miemasu.", en: "You can see the sea from here." },
    ],
    nuance: "見る vs 見える is the intent split: watching on purpose vs something being in view.",
  },
  {
    char: "聞", strokes: 14, on: ["ブン", "モン"], kun: ["き-く", "き-こえる"],
    origin: "耳 (an ear) inside 門 (a gate) — an ear pressed at the gate, catching what comes through. 門 also supplies the sound.",
    components: [
      { part: "門", meaning: "gate — two doors; also the sound mon/bun" },
      { part: "耳", meaning: "an ear listening at it" },
    ],
    compounds: [
      { word: "聞く", reading: "きく", meaning: "to listen / to ask", note: "Two meanings in one verb — 先生に聞く = ask the teacher." },
      { word: "聞こえる", reading: "きこえる", meaning: "to be audible" },
      { word: "新聞", reading: "しんぶん", meaning: "newspaper", note: "'New hearings' — the news you hear about." },
    ],
    sentences: [
      { jp: "音楽を聞きます。", romaji: "Ongaku o kikimasu.", en: "I listen to music." },
      { jp: "先生に聞いてください。", romaji: "Sensei ni kiite kudasai.", en: "Please ask the teacher." },
    ],
    nuance: "Listening and asking share one verb — the particle tells you which: を聞く (listen to it), に聞く (ask them).",
  },
  {
    char: "話", strokes: 13, on: ["ワ"], kun: ["はな-す", "はなし"],
    origin: "言 (speech) beside 舌 (tongue) — words moving over a tongue. Both halves are about the mouth, which is why it means talking rather than just words.",
    components: [
      { part: "言", meaning: "speech — sound lines over a mouth" },
      { part: "舌", meaning: "tongue" },
    ],
    compounds: [
      { word: "話す", reading: "はなす", meaning: "to speak / talk" },
      { word: "電話", reading: "でんわ", meaning: "telephone", note: "'Electric talk'." },
      { word: "会話", reading: "かいわ", meaning: "conversation" },
    ],
    sentences: [
      { jp: "日本語を話せますか。", romaji: "Nihongo o hanasemasu ka.", en: "Can you speak Japanese?" },
      { jp: "後で電話します。", romaji: "Ato de denwa shimasu.", en: "I'll call you later." },
    ],
    nuance: "話 as a noun (はなし) means 'a story' or 'the matter at hand': 話がある = I need to talk to you.",
  },
  {
    char: "読", strokes: 14, on: ["ドク", "トク"], kun: ["よ-む"],
    origin: "言 (speech) beside 売 (sell, here for sound) — reading was reading aloud, putting written words back into speech. The speech radical is the meaningful half.",
    components: [
      { part: "言", meaning: "speech — reading was done out loud" },
      { part: "売", meaning: "sell; here purely phonetic (doku)" },
    ],
    compounds: [
      { word: "読む", reading: "よむ", meaning: "to read" },
      { word: "読書", reading: "どくしょ", meaning: "reading (as a pastime)", note: "読 + 書 — the reading-and-writing pair." },
      { word: "音読み", reading: "おんよみ", meaning: "the Chinese-derived reading of a kanji" },
    ],
    sentences: [
      { jp: "毎晩本を読みます。", romaji: "Maiban hon o yomimasu.", en: "I read a book every night." },
      { jp: "この漢字が読めません。", romaji: "Kono kanji ga yomemasen.", en: "I can't read this kanji." },
    ],
    nuance: "空気を読む — 'read the air' — is reading a room, and it uses this same verb.",
  },
  {
    char: "書", strokes: 10, on: ["ショ"], kun: ["か-く"],
    origin: "A hand gripping a brush (聿) above 日, originally an inkstone or writing surface. The whole character is the act of putting brush to page.",
    components: [
      { part: "聿", meaning: "a hand holding a writing brush" },
      { part: "日", meaning: "the surface being written on" },
    ],
    compounds: [
      { word: "書く", reading: "かく", meaning: "to write" },
      { word: "辞書", reading: "じしょ", meaning: "dictionary", note: "'Word book'." },
      { word: "図書館", reading: "としょかん", meaning: "library", note: "'Picture-book hall'." },
    ],
    sentences: [
      { jp: "名前を書いてください。", romaji: "Namae o kaite kudasai.", en: "Please write your name." },
      { jp: "図書館で勉強します。", romaji: "Toshokan de benkyou shimasu.", en: "I study at the library." },
    ],
    nuance: "書 as a noun means a written document: 説明書 (manual), 契約書 (contract).",
  },
  {
    char: "来", strokes: 7, on: ["ライ"], kun: ["く-る", "き-", "こ-"],
    origin: "A picture of a wheat plant with its ears drooping. It was borrowed for the sound of 'come' and the grain meaning was handed off to other characters.",
    components: [
      { part: "the top and cross strokes", meaning: "ears of wheat" },
      { part: "the stem", meaning: "the stalk" },
    ],
    compounds: [
      { word: "来る", reading: "くる", meaning: "to come", note: "Irregular verb: 来ます (kimasu), 来ない (konai) — the reading changes with the form." },
      { word: "来年", reading: "らいねん", meaning: "next year" },
      { word: "来週", reading: "らいしゅう", meaning: "next week" },
    ],
    sentences: [
      { jp: "友達が家に来ます。", romaji: "Tomodachi ga ie ni kimasu.", en: "A friend is coming to my house." },
      { jp: "来年日本へ行きます。", romaji: "Rainen Nihon e ikimasu.", en: "I'm going to Japan next year." },
    ],
    nuance: "来 flips between three kun readings (く・き・こ) depending on conjugation — one of only two truly irregular verbs.",
  },
  {
    char: "行", strokes: 6, on: ["コウ", "ギョウ"], kun: ["い-く", "おこな-う"],
    origin: "A crossroads seen from above — two roads meeting. From the intersection come 'go', 'a line of things', and 'to conduct'.",
    components: [
      { part: "the left half", meaning: "one road" },
      { part: "the right half", meaning: "the crossing road" },
    ],
    compounds: [
      { word: "行く", reading: "いく", meaning: "to go" },
      { word: "銀行", reading: "ぎんこう", meaning: "bank", note: "'Silver shop' — 行 here means a place of business." },
      { word: "旅行", reading: "りょこう", meaning: "travel / a trip" },
    ],
    sentences: [
      { jp: "駅へ行きます。", romaji: "Eki e ikimasu.", en: "I'm going to the station." },
      { jp: "銀行はどこですか。", romaji: "Ginkou wa doko desu ka.", en: "Where is the bank?" },
    ],
    nuance: "ギョウ shows up in a different sense: 一行 = one line of text, 行事 = an event.",
  },
  {
    char: "出", strokes: 5, on: ["シュツ"], kun: ["で-る", "だ-す"],
    origin: "A foot stepping up and out of a hollow or doorway — traditionally read as a plant pushing out of an enclosure, stacked twice to show emergence.",
    components: [
      { part: "the lower 凵", meaning: "the hollow being left" },
      { part: "the upper shape", meaning: "something rising out of it" },
    ],
    compounds: [
      { word: "出る", reading: "でる", meaning: "to go out / to leave", note: "Intransitive — it exits by itself." },
      { word: "出す", reading: "だす", meaning: "to take out / to send", note: "Transitive — you push it out." },
      { word: "出口", reading: "でぐち", meaning: "exit" },
    ],
    sentences: [
      { jp: "七時に家を出ます。", romaji: "Shichiji ni ie o demasu.", en: "I leave home at seven." },
      { jp: "手紙を出しました。", romaji: "Tegami o dashimashita.", en: "I sent a letter." },
    ],
    nuance: "出る/出す is the cleanest intransitive-transitive pair in the language — learn it as one unit.",
  },
  {
    char: "入", strokes: 2, on: ["ニュウ"], kun: ["はい-る", "い-れる"],
    origin: "A narrowing opening or an arrowhead pointing in — the shape of going into something. Note it is not 人: the top stroke starts from the right.",
    components: [{ part: "入", meaning: "a wedge shape driving inward" }],
    compounds: [
      { word: "入る", reading: "はいる", meaning: "to enter", note: "Intransitive." },
      { word: "入れる", reading: "いれる", meaning: "to put in", note: "Transitive — the pair to 入る." },
      { word: "入口", reading: "いりぐち", meaning: "entrance" },
    ],
    sentences: [
      { jp: "部屋に入ってもいいですか。", romaji: "Heya ni haitte mo ii desu ka.", en: "May I enter the room?" },
      { jp: "砂糖を入れてください。", romaji: "Satou o irete kudasai.", en: "Please put in sugar." },
    ],
    nuance: "入 and 人 differ by which stroke reaches over the other — a two-stroke trap worth drilling.",
  },
  {
    char: "帰", strokes: 10, on: ["キ"], kun: ["かえ-る"],
    origin: "Simplified from 歸: a figure with a broom (帚) at the bottom — going back to the household you sweep. Home is where you return to.",
    components: [
      { part: "the left element", meaning: "movement / going (reduced from 歸)" },
      { part: "帚", meaning: "a broom — the household" },
    ],
    compounds: [
      { word: "帰る", reading: "かえる", meaning: "to go home / return", note: "Specifically home or your home base." },
      { word: "帰国", reading: "きこく", meaning: "returning to one's country" },
      { word: "お帰りなさい", reading: "おかえりなさい", meaning: "welcome home", note: "The set reply to ただいま." },
    ],
    sentences: [
      { jp: "六時に帰ります。", romaji: "Rokuji ni kaerimasu.", en: "I'll go home at six." },
      { jp: "来月帰国します。", romaji: "Raigetsu kikoku shimasu.", en: "I'm returning to my country next month." },
    ],
    nuance: "帰る is homeward only. Returning an object or coming back to a random place is 戻る.",
  },

  // ── Things & Places ────────────────────────────────────────────────────────
  {
    char: "電", strokes: 13, on: ["デン"], kun: [],
    origin: "雨 (rain) over a bent tail that was originally lightning forking out of a storm cloud. Lightning became the word for electricity.",
    components: [
      { part: "雨", meaning: "rain — drops inside a cloud frame" },
      { part: "the hooked lower part", meaning: "a lightning bolt" },
    ],
    compounds: [
      { word: "電車", reading: "でんしゃ", meaning: "train", note: "'Electric vehicle' — an electric train, the default in Japan." },
      { word: "電話", reading: "でんわ", meaning: "telephone" },
      { word: "電気", reading: "でんき", meaning: "electricity / the light", note: "電気をつけて = turn on the light." },
    ],
    sentences: [
      { jp: "電車で会社へ行きます。", romaji: "Densha de kaisha e ikimasu.", en: "I go to work by train." },
      { jp: "電気を消してください。", romaji: "Denki o keshite kudasai.", en: "Please turn off the light." },
    ],
  },
  {
    char: "車", strokes: 7, on: ["シャ"], kun: ["くるま"],
    origin: "A cart seen from above: the long vertical is the axle, the box in the middle is the carriage, the horizontals are the wheels. A top-down technical drawing.",
    components: [
      { part: "the vertical stroke", meaning: "the axle" },
      { part: "田-like box", meaning: "the cart body" },
      { part: "the two horizontals", meaning: "wheels on each end" },
    ],
    compounds: [
      { word: "車", reading: "くるま", meaning: "car" },
      { word: "自転車", reading: "じてんしゃ", meaning: "bicycle", note: "'Self-turning vehicle'." },
      { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "parking lot" },
    ],
    sentences: [
      { jp: "車で行きましょう。", romaji: "Kuruma de ikimashou.", en: "Let's go by car." },
      { jp: "自転車が好きです。", romaji: "Jitensha ga suki desu.", en: "I like bicycles." },
    ],
    nuance: "〜車 names every vehicle class: 電車, 自動車, 救急車 — learn the suffix and the words come free.",
  },
  {
    char: "気", strokes: 6, on: ["キ", "ケ"], kun: [],
    origin: "Simplified from 氣: steam or vapour rising, originally over 米 (rice) — the steam off cooking rice. Invisible-but-real stuff: air, mood, energy.",
    components: [
      { part: "the outer strokes", meaning: "rising vapour / drifting air" },
      { part: "the inner mark", meaning: "the remains of 米 (rice) in the old form" },
    ],
    compounds: [
      { word: "元気", reading: "げんき", meaning: "healthy / energetic", note: "'Original energy' — the standard 'how are you' word." },
      { word: "天気", reading: "てんき", meaning: "weather", note: "'Sky air'." },
      { word: "気をつけて", reading: "きをつけて", meaning: "take care / be careful", note: "'Attach your spirit' to what you're doing." },
    ],
    sentences: [
      { jp: "お元気ですか。", romaji: "Ogenki desu ka.", en: "How are you?" },
      { jp: "今日は天気がいいです。", romaji: "Kyou wa tenki ga ii desu.", en: "The weather is nice today." },
    ],
    nuance: "気 is the most idiom-heavy kanji at this level: 気になる (bothers me), 気に入る (like it), 気がする (feel that…).",
  },
  {
    char: "国", strokes: 8, on: ["コク"], kun: ["くに"],
    origin: "Simplified from 國. 囗 is a border wall; inside, the old form held 或 — a weapon guarding territory. The modern form swaps in 玉 (jewel): treasure inside the borders.",
    components: [
      { part: "囗", meaning: "a border / enclosing wall" },
      { part: "玉", meaning: "jewel — what the walls protect" },
    ],
    compounds: [
      { word: "国", reading: "くに", meaning: "country" },
      { word: "外国", reading: "がいこく", meaning: "foreign country", note: "外国人 = foreigner." },
      { word: "中国", reading: "ちゅうごく", meaning: "China", note: "こく → ごく after 中." },
    ],
    sentences: [
      { jp: "お国はどちらですか。", romaji: "Okuni wa dochira desu ka.", en: "Where are you from?" },
      { jp: "外国語を勉強したいです。", romaji: "Gaikokugo o benkyou shitai desu.", en: "I want to study a foreign language." },
    ],
  },
  {
    char: "何", strokes: 7, on: ["カ"], kun: ["なに", "なん"],
    origin: "亻 (person) beside 可 (can / permissible, giving the sound). It originally meant a person carrying a load; the question word is a borrowed use that took over completely.",
    components: [
      { part: "亻", meaning: "person radical" },
      { part: "可", meaning: "can / possible; sound ka" },
    ],
    compounds: [
      { word: "何", reading: "なに / なん", meaning: "what", note: "なん before counters and た/だ/な sounds: 何時, 何ですか. Otherwise なに." },
      { word: "何人", reading: "なんにん", meaning: "how many people" },
      { word: "何か", reading: "なにか", meaning: "something", note: "何 + か turns 'what' into 'some'." },
    ],
    sentences: [
      { jp: "これは何ですか。", romaji: "Kore wa nan desu ka.", en: "What is this?" },
      { jp: "何か食べましょう。", romaji: "Nanika tabemashou.", en: "Let's eat something." },
    ],
    nuance: "なに vs なん is decided by the sound that follows, not by meaning — say it out loud and pick the easier one.",
  },
];

export const kanjiStudyMap: Record<string, KanjiStudyEntry> = Object.fromEntries(
  kanjiStudyEntries.map((e) => [e.char, e]),
);
