import type { Article } from '@/types';
import { formatDate } from '@/lib/utils/date';
import { Card, TagList } from '@/components/ui';
import Link from 'next/link';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Card variant="interactive" padding={featured ? 'lg' : 'md'}>
      <Link href={`/blog/${article.slug}`}>
        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-4 -mt-2 -mx-2 overflow-hidden rounded-t-lg">
            <div
              className="w-full h-48 bg-[var(--color-surface)]"
              style={{
                backgroundImage: `url(${article.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        )}

        {/* Category Badge */}
        {article.category && (
          <span className="text-xs text-[var(--color-accent)] font-medium mb-2 block uppercase tracking-wide">
            {article.category}
          </span>
        )}

        {/* Title */}
        <h3 className={`font-semibold text-[var(--color-text)] mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Footer: Tags + Meta */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
          <TagList tags={article.tags.slice(0, 3)} size="sm" variant="muted" />
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-subtle)] shrink-0">
            <time>{formatDate(article.publishedAt)}</time>
            <span className="opacity-60">·</span>
            <span>{article.readingTime} min</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}