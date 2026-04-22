/**
 * MDX 内容处理
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Article, ArticleFrontmatter } from '@/types';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { generateTableOfContents } from '@/lib/utils/toc';
import { mdxComponents } from '@/components/mdx';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Shiki 配置 - 性能优化：预加载常用语言
const shikiOptions = {
  theme: 'github-dark',
  // 仅加载常用语言，减少启动时间
  langs: ['javascript', 'typescript', 'jsx', 'tsx', 'python', 'bash', 'json', 'markdown', 'css', 'html'],
  // 禁用内联样式，减少输出体积
  defaultColor: false,
};

export function getArticleSlugs(): string[] {
  const articlesDir = path.join(CONTENT_DIR, 'articles');
  if (!fs.existsSync(articlesDir)) return [];

  return fs
    .readdirSync(articlesDir)
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((name) => name.replace(/\.(mdx|md)$/, ''));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, 'articles', `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, 'articles', `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : (fs.existsSync(fallbackPath) ? fallbackPath : null);

  if (!finalPath) return null;

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content } = matter(fileContent);

  const frontmatter: ArticleFrontmatter = {
    slug: data.slug || slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    category: data.category || 'general',
    tags: data.tags || [],
    series: data.series,
    seriesOrder: data.seriesOrder,
    status: data.status || 'published',
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString(),
    featured: data.featured || false,
    coverImage: data.coverImage,
    author: data.author,
  };

  const readingTime = calculateReadingTime(content);
  const toc = generateTableOfContents(content);

  const updatedAtValue = frontmatter.updatedAt || frontmatter.publishedAt;
  const featuredValue = frontmatter.featured ?? false;

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    content,
    category: frontmatter.category,
    tags: frontmatter.tags,
    series: frontmatter.series,
    seriesOrder: frontmatter.seriesOrder,
    status: frontmatter.status,
    publishedAt: new Date(frontmatter.publishedAt),
    updatedAt: new Date(updatedAtValue),
    readingTime: readingTime.minutes,
    featured: featuredValue,
    coverImage: frontmatter.coverImage,
    author: frontmatter.author,
    toc,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is Article => article !== null)
    .filter((article) => article.status === 'published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

export function getArticlesBySeries(seriesName: string): Article[] {
  return getAllArticles()
    .filter((article) => article.series === seriesName)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((article) => article.featured);
}

export function getRelatedArticles(article: Article, limit: number = 3): Article[] {
  const allArticles = getAllArticles().filter((a) => a.slug !== article.slug);

  const articlesWithScore = allArticles.map((a) => {
    const commonTags = a.tags.filter((tag) => article.tags.includes(tag));
    const score = commonTags.length;
    return { article: a, score };
  });

  return articlesWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}

/**
 * 获取并编译 MDX 文章内容
 * 使用 Shiki 进行代码高亮，rehype 插件处理标题锚点
 */
export async function getCompiledArticle(slug: string): Promise<Article & { compiledContent: React.ReactElement } | null> {
  const filePath = path.join(CONTENT_DIR, 'articles', `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, 'articles', `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : (fs.existsSync(fallbackPath) ? fallbackPath : null);

  if (!finalPath) return null;

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content: rawContent } = matter(fileContent);

  // 编译 MDX with Shiki 高亮 + 标题锚点
  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          [rehypeShiki, shikiOptions],
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: {
              className: ['anchor-link'],
            },
          }],
        ],
      },
    },
  });

  const frontmatter: ArticleFrontmatter = {
    slug: data.slug || slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    category: data.category || 'general',
    tags: data.tags || [],
    series: data.series,
    seriesOrder: data.seriesOrder,
    status: data.status || 'published',
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString(),
    featured: data.featured || false,
    coverImage: data.coverImage,
    author: data.author,
  };

  const readingTime = calculateReadingTime(rawContent);
  const toc = generateTableOfContents(rawContent);
  const updatedAtValue = frontmatter.updatedAt || frontmatter.publishedAt;
  const featuredValue = frontmatter.featured ?? false;

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    content: rawContent,
    compiledContent: content,
    category: frontmatter.category,
    tags: frontmatter.tags,
    series: frontmatter.series,
    seriesOrder: frontmatter.seriesOrder,
    status: frontmatter.status,
    publishedAt: new Date(frontmatter.publishedAt),
    updatedAt: new Date(updatedAtValue),
    readingTime: readingTime.minutes,
    featured: featuredValue,
    coverImage: frontmatter.coverImage,
    author: frontmatter.author,
    toc,
  };
}

export async function getAllCompiledArticles(): Promise<(Article & { compiledContent: React.ReactElement })[]> {
  const slugs = getArticleSlugs();
  const articles = await Promise.all(
    slugs.map((slug) => getCompiledArticle(slug))
  );

  return articles
    .filter((article): article is Article & { compiledContent: React.ReactElement } => article !== null)
    .filter((article) => article.status === 'published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}