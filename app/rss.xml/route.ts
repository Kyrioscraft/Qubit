import { getAllArticles } from '@/lib/content/articles';

export async function GET() {
  const articles = getAllArticles();
  const baseUrl = 'https://qubit.pages.dev';

  const feedItems = articles.map((article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/blog/${article.slug}</link>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${article.publishedAt.toISOString()}</pubDate>
      <guid>${baseUrl}/blog/${article.slug}</guid>
      ${article.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n')}
    </item>
  `).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Qubit</title>
    <link>${baseUrl}</link>
    <description>个人知识分享平台</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}