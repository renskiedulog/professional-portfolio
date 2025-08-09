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
