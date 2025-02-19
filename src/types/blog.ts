export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    image: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
}
