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
