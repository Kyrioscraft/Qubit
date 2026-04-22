/**
 * 书签收藏内容处理
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Bookmark } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllBookmarks(): Bookmark[] {
  const bookmarksDir = path.join(CONTENT_DIR, 'bookmarks');
  if (!fs.existsSync(bookmarksDir)) return [];

  // 书签可以存储在 JSON 文件中
  const bookmarksFile = path.join(bookmarksDir, 'bookmarks.json');

  if (fs.existsSync(bookmarksFile)) {
    const content = fs.readFileSync(bookmarksFile, 'utf-8');
    const bookmarks = JSON.parse(content);
    return bookmarks.map((b: any) => ({
      id: b.id,
      url: b.url,
      title: b.title,
      description: b.description,
      tags: b.tags || [],
      category: b.category || 'general',
      isPublic: b.isPublic ?? true,
      createdAt: new Date(b.createdAt || new Date().toISOString()),
      favicon: b.favicon,
    }));
  }

  return [];
}

export function getPublicBookmarks(): Bookmark[] {
  return getAllBookmarks().filter((b) => b.isPublic);
}

export function getBookmarksByCategory(category: string): Bookmark[] {
  return getAllBookmarks().filter((b) => b.category === category);
}

export function getBookmarksByTag(tag: string): Bookmark[] {
  return getAllBookmarks().filter((b) => b.tags.includes(tag));
}