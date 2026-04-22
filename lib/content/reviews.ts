/**
 * 书评影评内容处理
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Review, ReviewType } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getReviewSlugs(): string[] {
  const reviewsDir = path.join(CONTENT_DIR, 'reviews');
  if (!fs.existsSync(reviewsDir)) return [];

  return fs
    .readdirSync(reviewsDir)
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((name) => name.replace(/\.(mdx|md)$/, ''));
}

export function getReview(slug: string): Review | null {
  const filePath = path.join(CONTENT_DIR, 'reviews', `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, 'reviews', `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : (fs.existsSync(fallbackPath) ? fallbackPath : null);

  if (!finalPath) return null;

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    type: data.type || 'book',
    subject: data.subject || 'Unknown',
    title: data.title || data.subject,
    content,
    rating: data.rating || 3,
    tags: data.tags || [],
    date: new Date(data.date || new Date().toISOString()),
    externalId: data.externalId,
    coverImage: data.coverImage,
  };
}

export function getAllReviews(): Review[] {
  const slugs = getReviewSlugs();
  return slugs
    .map((slug) => getReview(slug))
    .filter((review): review is Review => review !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getReviewsByType(type: ReviewType): Review[] {
  return getAllReviews().filter((review) => review.type === type);
}

export function getBookReviews(): Review[] {
  return getReviewsByType('book');
}

export function getMovieReviews(): Review[] {
  return getReviewsByType('movie');
}

export function getHighRatedReviews(minRating: number = 4): Review[] {
  return getAllReviews().filter((review) => review.rating >= minRating);
}

export function getYearlyReviewStats(year: number): { books: number; movies: number; averageRating: number } {
  const reviews = getAllReviews().filter(
    (r) => r.date.getFullYear() === year
  );

  const books = reviews.filter((r) => r.type === 'book').length;
  const movies = reviews.filter((r) => r.type === 'movie').length;
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return { books, movies, averageRating: Math.round(avgRating * 10) / 10 };
}