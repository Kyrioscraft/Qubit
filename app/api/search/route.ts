import { NextResponse } from 'next/server';
import { search } from '@/lib/content/search';
import { getAllArticles } from '@/lib/content/articles';

// 简化版搜索API - 实际部署时需要构建索引
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  // 从文章中搜索（简化版）
  const articles = getAllArticles();
  const normalizedQuery = query.toLowerCase();

  const results = articles
    .filter((article) =>
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.description.toLowerCase().includes(normalizedQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    )
    .slice(0, 10)
    .map((article) => ({
      type: 'article',
      slug: article.slug,
      title: article.title,
      description: article.description,
      tags: article.tags,
      url: `/blog/${article.slug}`,
    }));

  return NextResponse.json({ results });
}