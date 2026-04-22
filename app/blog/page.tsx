import { getAllArticles, getFeaturedArticles } from '@/lib/content/articles';
import { ArticleCard } from '@/components/content/ArticleCard';
import { TagList } from '@/components/ui';

export default function BlogPage() {
  const articles = getAllArticles();
  const featuredArticles = getFeaturedArticles();

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">博客</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          文章、教程和思考
        </p>
      </header>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
            精选文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
          全部文章
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}