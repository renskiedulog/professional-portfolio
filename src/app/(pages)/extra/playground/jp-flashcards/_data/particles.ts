export type ParticleExample = {
  before: string;
  after: string;
  romaji: string;
  en: string;
};

export type Particle = {
  particle: string;
  romaji: string;
  role: string;
  meaning: string;
  examples: ParticleExample[];
};

export const particleList: Particle[] = [
  {
    particle: "は",
    romaji: "wa",
    role: "Topic Marker",
    meaning: "Marks what the sentence is about. Doesn't mean 'I' — it marks the topic, which could be anything.",
    examples: [
      { before: "わたし", after: "学生です。", romaji: "Watashi ___ gakusei desu.", en: "I am a student." },
      { before: "今日", after: "暑いですね。", romaji: "Kyō ___ atsui desu ne.", en: "Today is hot, isn't it?" },
    ],
  },
  {
    particle: "が",
    romaji: "ga",
    role: "Subject Marker",
    meaning: "Marks the grammatical subject — who or what performs or experiences the action.",
    examples: [
      { before: "猫", after: "います。", romaji: "Neko ___ imasu.", en: "There is a cat." },
      { before: "何", after: "ありますか。", romaji: "Nani ___ arimasu ka?", en: "What is there?" },
    ],
  },
  {
    particle: "を",
    romaji: "wo",
    role: "Object Marker",
    meaning: "Marks the direct object — the thing the action is performed on.",
    examples: [
      { before: "ご飯", after: "食べます。", romaji: "Gohan ___ tabemasu.", en: "I eat rice." },
      { before: "水", after: "飲みます。", romaji: "Mizu ___ nomimasu.", en: "I drink water." },
    ],
  },
  {
    particle: "に",
    romaji: "ni",
    role: "Direction / Time / Location",
    meaning: "Marks destination of movement, a specific point in time, or where something exists.",
    examples: [
      { before: "学校", after: "行きます。", romaji: "Gakkō ___ ikimasu.", en: "I go to school." },
      { before: "七時", after: "起きます。", romaji: "Shichiji ___ okimasu.", en: "I wake up at 7 o'clock." },
    ],
  },
  {
    particle: "で",
    romaji: "de",
    role: "Location (action) / Means",
    meaning: "Marks where an action happens, or the tool/method used to do something.",
    examples: [
      { before: "公園", after: "遊びます。", romaji: "Kōen ___ asobimasu.", en: "I play at the park." },
      { before: "電車", after: "行きます。", romaji: "Densha ___ ikimasu.", en: "I go by train." },
    ],
  },
  {
    particle: "へ",
    romaji: "e",
    role: "Direction (toward)",
    meaning: "Marks direction or destination. Similar to に but emphasizes the direction of movement rather than arrival.",
    examples: [
      { before: "日本", after: "行きたいです。", romaji: "Nihon ___ ikitai desu.", en: "I want to go to Japan." },
      { before: "駅", after: "どうやって行きますか。", romaji: "Eki ___ dōyatte ikimasu ka?", en: "How do I get to the station?" },
    ],
  },
  {
    particle: "と",
    romaji: "to",
    role: "With / And",
    meaning: "Connects nouns ('and') or marks a companion ('together with').",
    examples: [
      { before: "母", after: "買い物します。", romaji: "Haha ___ kaimono shimasu.", en: "I go shopping with my mother." },
      { before: "コーヒー", after: "ケーキ。", romaji: "Kōhī ___ kēki.", en: "Coffee and cake." },
    ],
  },
  {
    particle: "も",
    romaji: "mo",
    role: "Also / Too",
    meaning: "Means 'also' or 'too'. Replaces は or が to add another item into the same statement.",
    examples: [
      { before: "私", after: "学生です。", romaji: "Watashi ___ gakusei desu.", en: "I am also a student." },
      { before: "日本語", after: "好きです。", romaji: "Nihongo ___ suki desu.", en: "I also like Japanese." },
    ],
  },
  {
    particle: "か",
    romaji: "ka",
    role: "Question Marker",
    meaning: "Added to the end of a sentence to form a question. Like a spoken question mark.",
    examples: [
      { before: "日本人です", after: "", romaji: "Nihonjin desu ___?", en: "Are you Japanese?" },
      { before: "何時です", after: "", romaji: "Nanji desu ___?", en: "What time is it?" },
    ],
  },
  {
    particle: "の",
    romaji: "no",
    role: "Possession / Connector",
    meaning: "Links nouns to show possession or attribution, like 's in English.",
    examples: [
      { before: "友達", after: "車です。", romaji: "Tomodachi ___ kuruma desu.", en: "It's my friend's car." },
      { before: "日本語", after: "本です。", romaji: "Nihongo ___ hon desu.", en: "It's a Japanese language book." },
    ],
  },
  {
    particle: "から",
    romaji: "kara",
    role: "From / Because",
    meaning: "Marks a starting point in place or time, or provides a reason (because).",
    examples: [
      { before: "大阪", after: "来ました。", romaji: "Ōsaka ___ kimashita.", en: "I came from Osaka." },
      { before: "六時", after: "始まります。", romaji: "Rokuji ___ hajimarimasu.", en: "It starts from 6 o'clock." },
    ],
  },
  {
    particle: "まで",
    romaji: "made",
    role: "Until / Up to",
    meaning: "Marks an endpoint in time or place.",
    examples: [
      { before: "六時", after: "働きます。", romaji: "Rokuji ___ hatarakimasu.", en: "I work until 6 o'clock." },
      { before: "ここ", after: "来てください。", romaji: "Koko ___ kite kudasai.", en: "Please come up to here." },
    ],
  },
  {
    particle: "ね",
    romaji: "ne",
    role: "Agreement / Confirmation",
    meaning: "Seeks agreement or confirmation from the listener. Like saying 'right?' or 'isn't it?'.",
    examples: [
      { before: "きれいです", after: "。", romaji: "Kirei desu ___.", en: "It's beautiful, isn't it?" },
      { before: "日本語は難しいです", after: "。", romaji: "Nihongo wa muzukashii desu ___.", en: "Japanese is difficult, isn't it?" },
    ],
  },
  {
    particle: "よ",
    romaji: "yo",
    role: "Assertion / Emphasis",
    meaning: "Asserts information the listener may not know. Like saying 'I'm telling you' or 'you know'.",
    examples: [
      { before: "もう遅いです", after: "。", romaji: "Mō osoi desu ___.", en: "It's already late, you know." },
      { before: "これは美味しいです", after: "。", romaji: "Kore wa oishii desu ___.", en: "This is delicious, I tell you." },
    ],
  },
];

export const particleCards = particleList.map((p) => ({
  front: p.particle,
  back: p.role,
  reading: p.romaji,
}));
