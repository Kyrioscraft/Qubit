/**
 * 目录生成工具
 */

import type { TableOfContentsItem } from '@/types/article';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headings: Heading[] = [];

  // 匹配 markdown 标题
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateHeadingId(text);

    headings.push({ id, text, level });
  }

  // 构建层级结构
  return buildTocTree(headings);
}

function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s一-龥]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function buildTocTree(headings: Heading[]): TableOfContentsItem[] {
  const root: TableOfContentsItem[] = [];
  const stack: TableOfContentsItem[] = [];

  for (const heading of headings) {
    const item: TableOfContentsItem = {
      id: heading.id,
      text: heading.text,
      level: heading.level,
      children: [],
    };

    // 找到合适的父节点
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(item);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    }

    stack.push(item);
  }

  // 清理空的 children 数组
  cleanEmptyChildren(root);

  return root;
}

function cleanEmptyChildren(items: TableOfContentsItem[]): void {
  for (const item of items) {
    if (item.children && item.children.length === 0) {
      delete item.children;
    } else if (item.children) {
      cleanEmptyChildren(item.children);
    }
  }
}

export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const headingRegex = /<h([1-6])([^>]*)>(.+?)<\/h\1>/gi;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    const idMatch = match[2].match(/id="([^"]+)"/);
    const id = idMatch ? idMatch[1] : generateHeadingId(text);

    headings.push({ id, text, level });
  }

  return headings;
}