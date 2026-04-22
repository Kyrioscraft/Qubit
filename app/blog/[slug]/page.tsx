import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCompiledArticle, getAllArticles, getRelatedArticles } from '@/lib/content/articles';
import { formatDate } from '@/lib/utils/date';
import { generateArticleMetadata, generateArticleJsonLD, JsonLDScript } from '@/components/seo';
import { TableOfContents, ShareButtons, TagList } from '@/components/ui';
import { RelatedArticles } from '@/components/content/RelatedArticles';
import { GiscusComments } from '@/components/content/GiscusComments';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const articles = getAllArticles();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return {
      title: '文章未找到',
    };
  }

  return generateArticleMetadata(
    article.title,
    article.description,
    article.slug,
    article.publishedAt.toISOString(),
    article.author,
    article.coverImage
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = await getCompiledArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 3);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLDScript data={generateArticleJsonLD(article)} />

      <div className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12">
        {/* Article Header */}
        <header className="mb-8">
          {/* Tags */}
          <TagList tags={article.tags} className="mb-4" />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-[var(--color-text-muted)] mb-4">
            {article.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <time dateTime={article.publishedAt.toISOString()}>
              {formatDate(article.publishedAt, 'long')}
            </time>
            {article.updatedAt.getTime() !== article.publishedAt.getTime() && (
              <span>
                更新于 {formatDate(article.updatedAt, 'long')}
              </span>
            )}
            <span>{article.readingTime} 分钟阅读</span>
            {article.category && (
              <a
                href={`/blog/category/${article.category}`}
                className="text-[var(--color-accent)]"
              >
                {article.category}
              </a>
            )}
          </div>
        </header>

        {/* Table of Contents */}
        {article.toc && article.toc.length > 0 && (
          <TableOfContents items={article.toc} className="mb-8" />
        )}

        {/* Article Content - prose 类由 @tailwindcss/typography 提供 */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {article.compiledContent}
        </article>

        {/* Share Buttons */}
        <ShareButtons
          url={`https://qubit.pages.dev/blog/${article.slug}`}
          title={article.title}
          description={article.description}
          className="mb-8"
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}

        {/* Comments */}
        <GiscusComments />
      </div>
    </>
  );
}