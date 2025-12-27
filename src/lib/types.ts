import { Image } from "sanity";

export interface Blog {
  mainImage: string;
  title: string;
  description: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  categories: string[];
  slug: string;
  _id: string;
}

export interface Recommendation {
  has_next_page: boolean;
  data?: SearchResult[];
}

export interface SearchResult {
  id: number;
  title: string;
  image: string;
  type: string;
}

export interface ImageSet {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface TrailerImages {
  image_url?: string;
  small_image_url?: string;
  medium_image_url?: string;
  large_image_url?: string;
  maximum_image_url?: string;
}

export interface Trailer {
  youtube_id?: string;
  url?: string;
  embed_url?: string;
  images?: TrailerImages;
}

export interface Title {
  type: string;
  title: string;
}

export interface DateProp {
  day?: number;
  month?: number;
  year?: number;
}

export interface Aired {
  from?: string;
  to?: string;
  prop?: {
    from?: DateProp;
    to?: DateProp;
  };
  string?: string;
}

export interface Broadcast {
  day?: string;
  time?: string;
  timezone?: string;
  string?: string;
}

export interface Entity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Relation {
  relation: string;
  entry: Entity[];
}

export interface ThemeMusic {
  openings: string[];
  endings: string[];
}

export interface ExternalLink {
  name: string;
  url: string;
}

export interface StreamingPlatform {
  name: string;
  url: string;
}

export interface RecommendationInfo {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageSet;
    webp?: ImageSet;
  };
  trailer?: Trailer;
  approved?: boolean;
  titles: Title[];
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type?: string;
  source?: string;
  episodes?: number;
  status?: string;
  airing?: boolean;
  aired?: Aired;
  duration?: string;
  rating?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  season?: string;
  year?: number;
  broadcast?: Broadcast;
  producers?: Entity[];
  licensors?: Entity[];
  studios?: Entity[];
  genres?: Entity[];
  explicit_genres?: Entity[];
  themes?: Entity[];
  demographics?: Entity[];
  relations?: Relation[];
  theme?: ThemeMusic;
  external?: ExternalLink[];
  streaming?: StreamingPlatform[];
  characters?: CharacterData[];
}

// Character
interface CharacterImage {
  image_url: string;
  small_image_url?: string;
}

interface CharacterImages {
  jpg: CharacterImage;
  webp: CharacterImage;
}

interface PersonImage {
  jpg: {
    image_url: string;
  };
}

interface Person {
  mal_id: number;
  url: string;
  images: PersonImage;
  name: string;
}

interface VoiceActor {
  person: Person;
  language: string;
}

interface Character {
  mal_id: number;
  url: string;
  images: CharacterImages;
  name: string;
}

export interface CharacterData {
  character: Character;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

export interface ProjectInfo {
  title?: string;
  slug: string;
  description?: string;
  githubLink?: string;
  images?: Image[];
  liveUrl?: string;
  techStack: {
    techLanguage: string[];
  };
}

export interface CommitItem {
  sha: string;
  message: string;
  date: Date;
  type: string;
}

export type RoadmapSections = Record<string, CommitItem[]>;

export type FallPreset = {
  images: string[];
  count: number;
  size: [number, number];
  duration: [number, number];
  sway: number;
  rotate: boolean;
  opacity?: [number, number];
  spawnInterval?: number;
};
