import { getAllArticles } from '@/lib/content/articles';

interface SitemapUrl {
  url: string;
  priority: number;
  lastModified?: string;
}

export async function GET() {
  const articles = getAllArticles();
  const baseUrl = 'https://qubit.pages.dev';

  const staticPages: SitemapUrl[] = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/blog`, priority: 0.9 },
    { url: `${baseUrl}/garden`, priority: 0.8 },
    { url: `${baseUrl}/projects`, priority: 0.7 },
    { url: `${baseUrl}/bookmarks`, priority: 0.6 },
    { url: `${baseUrl}/reviews`, priority: 0.6 },
    { url: `${baseUrl}/timeline`, priority: 0.6 },
    { url: `${baseUrl}/about`, priority: 0.5 },
  ];

  const articleUrls: SitemapUrl[] = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    priority: 0.8,
    lastModified: article.updatedAt.toISOString(),
  }));

  const allUrls: SitemapUrl[] = [...staticPages, ...articleUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map((page) => `
    <url>
      <loc>${page.url}</loc>
      <priority>${page.priority}</priority>
      ${page.lastModified ? `<lastmod>${page.lastModified}</lastmod>` : ''}
    </url>
  `).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}