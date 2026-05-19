export type KanjiCard = {
  front: string;
  reading: string;
  meaning: string;
  category: string;
};

export const kanjiCards: KanjiCard[] = [
  // Numbers
  { front: "一", reading: "いち (ichi)", meaning: "one", category: "Numbers" },
  { front: "二", reading: "に (ni)", meaning: "two", category: "Numbers" },
  { front: "三", reading: "さん (san)", meaning: "three", category: "Numbers" },
  { front: "四", reading: "し・よん (shi/yon)", meaning: "four", category: "Numbers" },
  { front: "五", reading: "ご (go)", meaning: "five", category: "Numbers" },
  { front: "六", reading: "ろく (roku)", meaning: "six", category: "Numbers" },
  { front: "七", reading: "しち・なな (shichi/nana)", meaning: "seven", category: "Numbers" },
  { front: "八", reading: "はち (hachi)", meaning: "eight", category: "Numbers" },
  { front: "九", reading: "く・きゅう (ku/kyuu)", meaning: "nine", category: "Numbers" },
  { front: "十", reading: "じゅう (juu)", meaning: "ten", category: "Numbers" },
  { front: "百", reading: "ひゃく (hyaku)", meaning: "hundred", category: "Numbers" },
  { front: "千", reading: "せん (sen)", meaning: "thousand", category: "Numbers" },
  { front: "万", reading: "まん (man)", meaning: "ten thousand", category: "Numbers" },

  // Time & Days
  { front: "日", reading: "にち・ひ (nichi/hi)", meaning: "day / sun", category: "Time" },
  { front: "月", reading: "つき・げつ (tsuki/getsu)", meaning: "month / moon", category: "Time" },
  { front: "火", reading: "ひ・か (hi/ka)", meaning: "fire / Tuesday", category: "Time" },
  { front: "水", reading: "みず・すい (mizu/sui)", meaning: "water / Wednesday", category: "Time" },
  { front: "木", reading: "き・もく (ki/moku)", meaning: "tree / Thursday", category: "Time" },
  { front: "金", reading: "かね・きん (kane/kin)", meaning: "gold / Friday", category: "Time" },
  { front: "土", reading: "つち・ど (tsuchi/do)", meaning: "earth / Saturday", category: "Time" },
  { front: "年", reading: "ねん・とし (nen/toshi)", meaning: "year", category: "Time" },
  { front: "時", reading: "じ・とき (ji/toki)", meaning: "time / hour", category: "Time" },
  { front: "分", reading: "ふん・ぶん (fun/bun)", meaning: "minute / part", category: "Time" },
  { front: "今", reading: "いま・こん (ima/kon)", meaning: "now / present", category: "Time" },

  // Nature
  { front: "山", reading: "やま・さん (yama/san)", meaning: "mountain", category: "Nature" },
  { front: "川", reading: "かわ・せん (kawa/sen)", meaning: "river", category: "Nature" },
  { front: "田", reading: "た・でん (ta/den)", meaning: "rice field", category: "Nature" },
  { front: "空", reading: "そら・くう (sora/kuu)", meaning: "sky / empty", category: "Nature" },
  { front: "海", reading: "うみ・かい (umi/kai)", meaning: "sea", category: "Nature" },

  // People & Body
  { front: "人", reading: "ひと・じん (hito/jin)", meaning: "person", category: "People" },
  { front: "女", reading: "おんな・じょ (onna/jo)", meaning: "woman", category: "People" },
  { front: "男", reading: "おとこ・だん (otoko/dan)", meaning: "man", category: "People" },
  { front: "子", reading: "こ・し (ko/shi)", meaning: "child", category: "People" },
  { front: "父", reading: "ちち・ふ (chichi/fu)", meaning: "father", category: "People" },
  { front: "母", reading: "はは・も (haha/mo)", meaning: "mother", category: "People" },
  { front: "口", reading: "くち・こう (kuchi/kou)", meaning: "mouth", category: "People" },
  { front: "目", reading: "め・もく (me/moku)", meaning: "eye", category: "People" },
  { front: "耳", reading: "みみ・じ (mimi/ji)", meaning: "ear", category: "People" },
  { front: "手", reading: "て・しゅ (te/shu)", meaning: "hand", category: "People" },
  { front: "足", reading: "あし・そく (ashi/soku)", meaning: "foot / leg", category: "People" },

  // Size & Direction
  { front: "大", reading: "おお・だい (oo/dai)", meaning: "big / large", category: "Direction" },
  { front: "小", reading: "ちい・しょう (chii/shou)", meaning: "small", category: "Direction" },
  { front: "上", reading: "うえ・じょう (ue/jou)", meaning: "above / up", category: "Direction" },
  { front: "下", reading: "した・か (shita/ka)", meaning: "below / down", category: "Direction" },
  { front: "中", reading: "なか・ちゅう (naka/chuu)", meaning: "middle / inside", category: "Direction" },
  { front: "左", reading: "ひだり・さ (hidari/sa)", meaning: "left", category: "Direction" },
  { front: "右", reading: "みぎ・う (migi/u)", meaning: "right", category: "Direction" },

  // Education
  { front: "本", reading: "ほん・もと (hon/moto)", meaning: "book / origin", category: "Education" },
  { front: "語", reading: "ご (go)", meaning: "language / word", category: "Education" },
  { front: "学", reading: "がく・まな (gaku/mana)", meaning: "study / learning", category: "Education" },
  { front: "校", reading: "こう (kou)", meaning: "school", category: "Education" },
  { front: "先", reading: "さき・せん (saki/sen)", meaning: "ahead / previous", category: "Education" },
  { front: "生", reading: "せい・い (sei/i)", meaning: "life / student", category: "Education" },

  // Actions
  { front: "食", reading: "た・しょく (ta/shoku)", meaning: "eat / food", category: "Actions" },
  { front: "飲", reading: "の・いん (no/in)", meaning: "drink", category: "Actions" },
  { front: "見", reading: "み・けん (mi/ken)", meaning: "see / look", category: "Actions" },
  { front: "聞", reading: "き・もん (ki/mon)", meaning: "hear / listen / ask", category: "Actions" },
  { front: "話", reading: "はな・わ (hana/wa)", meaning: "speak / talk", category: "Actions" },
  { front: "読", reading: "よ・どく (yo/doku)", meaning: "read", category: "Actions" },
  { front: "書", reading: "か・しょ (ka/sho)", meaning: "write", category: "Actions" },
  { front: "来", reading: "く・らい (ku/rai)", meaning: "come", category: "Actions" },
  { front: "行", reading: "い・こう (i/kou)", meaning: "go", category: "Actions" },
  { front: "出", reading: "で・しゅつ (de/shutsu)", meaning: "exit / come out", category: "Actions" },
  { front: "入", reading: "はい・にゅう (hai/nyuu)", meaning: "enter", category: "Actions" },
  { front: "帰", reading: "かえ・き (kae/ki)", meaning: "return home", category: "Actions" },

  // Things & Places
  { front: "電", reading: "でん (den)", meaning: "electricity", category: "Things" },
  { front: "車", reading: "くるま・しゃ (kuruma/sha)", meaning: "car / vehicle", category: "Things" },
  { front: "気", reading: "き・け (ki/ke)", meaning: "spirit / feeling", category: "Things" },
  { front: "国", reading: "くに・こく (kuni/koku)", meaning: "country", category: "Things" },
  { front: "何", reading: "なに・なん (nani/nan)", meaning: "what", category: "Things" },
];

export const kanjiCategories = [
  "Numbers", "Time", "Nature", "People", "Direction", "Education", "Actions", "Things",
];
