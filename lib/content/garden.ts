/**
 * 数字花园内容处理
 * 支持双向链接 [[]] 语法解析
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { GardenNode, GardenMaturity, GardenGraphData, GardenGraphNode, GardenGraphLink } from '@/types';
import { mdxComponents } from '@/components/mdx';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Shiki 配置 - 性能优化：预加载常用语言
const shikiOptions = {
  theme: 'github-dark',
  langs: ['javascript', 'typescript', 'jsx', 'tsx', 'python', 'bash', 'json', 'markdown', 'css', 'html'],
  defaultColor: false,
};

// 双向链接正则：匹配 [[link]] 或 [[link|text]]
const WIKILINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function getGardenNodeSlugs(): string[] {
  const gardenDir = path.join(CONTENT_DIR, 'garden');
  if (!fs.existsSync(gardenDir)) return [];

  return fs
    .readdirSync(gardenDir)
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((name) => name.replace(/\.(mdx|md)$/, ''));
}

/**
 * 解析内容中的双向链接
 */
export function parseWikilinks(content: string): string[] {
  const links: string[] = [];
  let match;

  while ((match = WIKILINK_REGEX.exec(content)) !== null) {
    const slug = match[1].trim();
    links.push(slug);
  }

  return links;
}

/**
 * 将 wikilinks 转换为 Markdown 链接格式
 */
export function convertWikilinksToMarkdown(content: string, currentSlug: string): string {
  const existingSlugs = getGardenNodeSlugs();

  return content.replace(WIKILINK_REGEX, (match, slug, text) => {
    const displayText = text || slug;
    const exists = existingSlugs.includes(slug);

    if (slug === currentSlug) {
      return `**${displayText}**`; // 自链接显示为加粗
    }

    // 标准 Markdown 链接格式
    return `[${displayText}](/garden/${slug})`;
  });
}

/**
 * 获取单个花园节点（同步版本，用于列表等）
 */
export function getGardenNode(slug: string): GardenNode | null {
  const filePath = path.join(CONTENT_DIR, 'garden', `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, 'garden', `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : (fs.existsSync(fallbackPath) ? fallbackPath : null);

  if (!finalPath) return null;

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content } = matter(fileContent);

  const maturity: GardenMaturity = data.maturity || 'seedling';
  const linksTo = parseWikilinks(content);

  return {
    slug,
    title: data.title || slug,
    content,
    maturity,
    tags: data.tags || [],
    linksTo,
    linkedFrom: [],
    createdAt: new Date(data.createdAt || new Date().toISOString()),
    updatedAt: new Date(data.updatedAt || data.createdAt || new Date().toISOString()),
  };
}

/**
 * 获取所有花园节点
 */
export function getAllGardenNodes(): GardenNode[] {
  const slugs = getGardenNodeSlugs();
  const nodes = slugs
    .map((slug) => getGardenNode(slug))
    .filter((node): node is GardenNode => node !== null);

  // 构建入链索引
  const backlinksIndex: Record<string, string[]> = {};
  for (const node of nodes) {
    for (const link of node.linksTo) {
      if (!backlinksIndex[link]) {
        backlinksIndex[link] = [];
      }
      backlinksIndex[link].push(node.slug);
    }
  }

  // 填充入链
  for (const node of nodes) {
    node.linkedFrom = backlinksIndex[node.slug] || [];
  }

  return nodes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

/**
 * 按成熟度筛选节点
 */
export function getGardenNodesByMaturity(maturity: GardenMaturity): GardenNode[] {
  return getAllGardenNodes().filter((node) => node.maturity === maturity);
}

/**
 * 构建知识图谱数据
 */
export function buildGardenGraphData(): GardenGraphData {
  const nodes = getAllGardenNodes();
  const graphNodes: GardenGraphNode[] = [];
  const graphLinks: GardenGraphLink[] = [];
  const addedLinks = new Set<string>();

  for (const node of nodes) {
    const group = node.tags[0] || 'general';

    graphNodes.push({
      id: node.slug,
      slug: node.slug,
      title: node.title,
      maturity: node.maturity,
      group,
    });

    for (const targetSlug of node.linksTo) {
      if (nodes.some((n) => n.slug === targetSlug)) {
        const linkKey = `${node.slug}-${targetSlug}`;
        if (!addedLinks.has(linkKey)) {
          graphLinks.push({
            source: node.slug,
            target: targetSlug,
          });
          addedLinks.add(linkKey);
        }
      }
    }
  }

  return {
    nodes: graphNodes,
    links: graphLinks,
  };
}

/**
 * 成熟度标签显示
 */
export const MaturityLabels: Record<GardenMaturity, { label: string; color: string; description: string }> = {
  seed: {
    label: '种子',
    color: '#94a3b8',
    description: '刚萌芽的想法，未成熟',
  },
  seedling: {
    label: '发芽',
    color: '#fbbf24',
    description: '初步整理，有基本结构',
  },
  budding: {
    label: '开花',
    color: '#34d399',
    description: '成熟内容，值得分享',
  },
  evergreen: {
    label: '常青',
    color: '#22c55e',
    description: '持续更新，核心知识',
  },
};

/**
 * 获取 MOC（Map of Content）节点
 */
export function getMocNodes(): GardenNode[] {
  return getAllGardenNodes().filter((node) =>
    node.tags.includes('moc') || node.title.toLowerCase().includes('index')
  );
}

/**
 * 获取并编译花园节点
 * 使用 Shiki 进行代码高亮
 */
export async function getCompiledGardenNode(slug: string): Promise<GardenNode & { compiledContent: React.ReactElement } | null> {
  const filePath = path.join(CONTENT_DIR, 'garden', `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, 'garden', `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : (fs.existsSync(fallbackPath) ? fallbackPath : null);

  if (!finalPath) return null;

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content: rawContent } = matter(fileContent);

  // 处理 wikilinks
  const processedContent = convertWikilinksToMarkdown(rawContent, slug);

  // 编译 MDX with Shiki 高亮 + 标题锚点
  const { content } = await compileMDX({
    source: processedContent,
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

  const maturity: GardenMaturity = data.maturity || 'seedling';
  const linksTo = parseWikilinks(rawContent);

  return {
    slug,
    title: data.title || slug,
    content: rawContent,
    compiledContent: content,
    maturity,
    tags: data.tags || [],
    linksTo,
    linkedFrom: [],
    createdAt: new Date(data.createdAt || new Date().toISOString()),
    updatedAt: new Date(data.updatedAt || data.createdAt || new Date().toISOString()),
  };
}

export async function getAllCompiledGardenNodes(): Promise<(GardenNode & { compiledContent: React.ReactElement })[]> {
  const slugs = getGardenNodeSlugs();
  const nodes = await Promise.all(
    slugs.map((slug) => getCompiledGardenNode(slug))
  );

  const validNodes = nodes
    .filter((node): node is GardenNode & { compiledContent: React.ReactElement } => node !== null);

  // 构建入链索引
  const backlinksIndex: Record<string, string[]> = {};
  for (const node of validNodes) {
    for (const link of node.linksTo) {
      if (!backlinksIndex[link]) {
        backlinksIndex[link] = [];
      }
      backlinksIndex[link].push(node.slug);
    }
  }

  // 填充入链
  for (const node of validNodes) {
    node.linkedFrom = backlinksIndex[node.slug] || [];
  }

  return validNodes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}