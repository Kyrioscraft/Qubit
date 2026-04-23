/**
 * 预构建脚本 - 生成静态文件
 * 运行: node scripts/prebuild.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// 确保输出目录存在
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

// ========== 搜索索引 ==========
console.log('Generating search index...');

function getArticleSlugs() {
  const articlesDir = path.join(ROOT_DIR, 'content', 'articles');
  if (!fs.existsSync(articlesDir)) return [];

  return fs
    .readdirSync(articlesDir)
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((name) => name.replace(/\.(mdx|md)$/, ''));
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };

  const frontmatterLines = match[1].split('\n');
  const data = {};

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      // 处理数组
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/'/g, '').replace(/"/g, '')).filter(Boolean);
      } else {
        data[key] = value.replace(/'/g, '').replace(/"/g, '');
      }
    }
  }

  return { data, content: match[2] };
}

function generateSearchIndex() {
  const slugs = getArticleSlugs();
  const articlesDir = path.join(ROOT_DIR, 'content', 'articles');
  const index = [];

  for (const slug of slugs) {
    const filePath = path.join(articlesDir, `${slug}.mdx`);
    const fallbackPath = path.join(articlesDir, `${slug}.md`);
    const finalPath = fs.existsSync(filePath) ? filePath : fallbackPath;

    if (!fs.existsSync(finalPath)) continue;

    const fileContent = fs.readFileSync(finalPath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);

    if (data.status === 'draft') continue;

    index.push({
      type: 'article',
      slug: slug,
      title: data.title || slug,
      description: data.description || '',
      tags: data.tags || [],
      category: data.category || 'general',
      url: `/blog/${slug}`,
      // 内容摘要用于搜索
      contentSnippet: content.slice(0, 500).replace(/\n/g, ' ').replace(/#{1,6}\s/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'),
    });
  }

  // 添加 garden 节点
  const gardenDir = path.join(ROOT_DIR, 'content', 'garden');
  if (fs.existsSync(gardenDir)) {
    const gardenSlugs = fs
      .readdirSync(gardenDir)
      .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
      .map((name) => name.replace(/\.(mdx|md)$/, ''));

    for (const slug of gardenSlugs) {
      const filePath = path.join(gardenDir, `${slug}.mdx`);
      const fallbackPath = path.join(gardenDir, `${slug}.md`);
      const finalPath = fs.existsSync(filePath) ? filePath : fallbackPath;

      if (!fs.existsSync(finalPath)) continue;

      const fileContent = fs.readFileSync(finalPath, 'utf-8');
      const { data, content } = parseFrontmatter(fileContent);

      index.push({
        type: 'garden',
        slug: slug,
        title: data.title || slug,
        description: (data.description || content.slice(0, 100)).replace(/\n/g, ' '),
        tags: data.tags || [],
        maturity: data.maturity || 'seedling',
        url: `/garden/${slug}`,
        contentSnippet: content.slice(0, 300).replace(/\n/g, ' ').replace(/\[\[([^\]]+)\]\]/g, '$1'),
      });
    }
  }

  return index;
}

const searchIndex = generateSearchIndex();
fs.writeFileSync(
  path.join(PUBLIC_DIR, 'search-index.json'),
  JSON.stringify(searchIndex, null, 2)
);
console.log(`Generated search-index.json (${searchIndex.length} items)`);

// ========== RSS Feed ==========
console.log('Generating RSS feed...');

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const baseUrl = 'https://qubit.pages.dev';
const articles = searchIndex.filter(item => item.type === 'article');

const rssItems = articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}${article.url}</link>
      <description>${escapeXml(article.description)}</description>
      ${article.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('\n');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Qubit</title>
    <link>${baseUrl}</link>
    <description>个人知识分享平台</description>
    <language>zh-CN</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssFeed);
console.log('Generated rss.xml');

// ========== Sitemap ==========
console.log('Generating sitemap...');

const pages = [
  '/',
  '/about',
  '/blog',
  '/garden',
  '/garden/graph',
  '/projects',
  '/reviews',
  '/bookmarks',
  '/timeline',
  '/subscribe',
];

const allUrls = [
  ...pages,
  ...articles.map(a => a.url),
  ...searchIndex.filter(i => i.type === 'garden').map(g => g.url),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : url.includes('/blog/') || url.includes('/garden/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log('Generated sitemap.xml');

console.log('\n✓ Prebuild complete!');