import type { Article } from '@/types';
import { ArticleCard } from './ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        相关文章
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}