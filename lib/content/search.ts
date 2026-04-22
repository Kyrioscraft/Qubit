/**
 * 搜索索引构建
 */

import type { Article, GardenNode, Project, SearchResult } from '@/types';

interface SearchIndexEntry {
  id: string;
  type: 'article' | 'garden' | 'project';
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  url: string;
}

let searchIndex: SearchIndexEntry[] = [];

export function buildSearchIndex(
  articles: Article[],
  gardenNodes: GardenNode[],
  projects: Project[]
): SearchIndexEntry[] {
  searchIndex = [
    ...articles.map((article) => ({
      id: `article-${article.slug}`,
      type: 'article' as const,
      slug: article.slug,
      title: article.title,
      description: article.description,
      content: article.content.toLowerCase(),
      tags: article.tags,
      url: `/blog/${article.slug}`,
    })),
    ...gardenNodes.map((node) => ({
      id: `garden-${node.slug}`,
      type: 'garden' as const,
      slug: node.slug,
      title: node.title,
      description: node.content.substring(0, 200),
      content: node.content.toLowerCase(),
      tags: node.tags,
      url: `/garden/${node.slug}`,
    })),
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      type: 'project' as const,
      slug: project.slug,
      title: project.title,
      description: project.description,
      content: project.content.toLowerCase(),
      tags: project.techStack,
      url: `/projects/${project.slug}`,
    })),
  ];

  return searchIndex;
}

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase();
  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);

  const results = searchIndex
    .map((entry) => {
      let score = 0;

      // 标题匹配（权重最高）
      if (entry.title.toLowerCase().includes(normalizedQuery)) {
        score += 10;
      }

      // 标签匹配
      const matchingTags = entry.tags.filter((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );
      score += matchingTags.length * 5;

      // 描述匹配
      if (entry.description.toLowerCase().includes(normalizedQuery)) {
        score += 3;
      }

      // 内容匹配（权重最低）
      const contentMatches = queryTerms.reduce((count, term) => {
        return count + (entry.content.includes(term) ? 1 : 0);
      }, 0);
      score += contentMatches;

      return { entry, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((result) => ({
      type: result.entry.type,
      slug: result.entry.slug,
      title: result.entry.title,
      description: result.entry.description,
      tags: result.entry.tags,
      url: result.entry.url,
    }));

  return results;
}

export function getSearchIndex(): SearchIndexEntry[] {
  return searchIndex;
}