export type ArticleStatus = 'draft' | 'published';

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  status: ArticleStatus;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  coverImage?: string;
  author?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  status: ArticleStatus;
  publishedAt: Date;
  updatedAt: Date;
  readingTime: number;
  featured: boolean;
  coverImage?: string;
  author?: string;
  toc?: TableOfContentsItem[];
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface ArticleSeries {
  name: string;
  articles: Article[];
  description?: string;
}