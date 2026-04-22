export type ReviewType = 'book' | 'movie' | 'other';

export interface ReviewFrontmatter {
  slug: string;
  type: ReviewType;
  subject: string; // book/movie title
  title: string; // review title
  rating: number; // 1-5
  tags: string[];
  date: string;
  externalId?: string; // douban/imdb id
  coverImage?: string;
}

export interface Review {
  slug: string;
  type: ReviewType;
  subject: string;
  title: string;
  content: string;
  rating: number;
  tags: string[];
  date: Date;
  externalId?: string;
  coverImage?: string;
}