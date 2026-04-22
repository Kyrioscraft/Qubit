import type { Review } from '@/types';
import { formatDate } from '@/lib/utils/date';
import { Card, TagList } from '@/components/ui';
import { RatingStars } from './RatingStars';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const typeIcon = review.type === 'book' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  );

  return (
    <Card variant="interactive" padding="md">
      {/* Type Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1.5 rounded bg-[var(--color-surface)]">
          {typeIcon}
        </span>
        <span className="text-xs text-[var(--color-text-muted)]">
          {review.type === 'book' ? '书籍' : '电影'}
        </span>
      </div>

      {/* Subject */}
      <h3 className="font-semibold text-[var(--color-text)] mb-2">
        {review.subject}
      </h3>

      {/* Review Title */}
      {review.title !== review.subject && (
        <p className="text-sm text-[var(--color-text-muted)] mb-2">
          {review.title}
        </p>
      )}

      {/* Rating */}
      <RatingStars rating={review.rating} className="mb-3" />

      {/* Tags */}
      <TagList tags={review.tags.slice(0, 3)} size="sm" variant="muted" className="mb-3" />

      {/* Date */}
      <div className="text-xs text-[var(--color-text-subtle)]">
        {formatDate(review.date)}
      </div>
    </Card>
  );
}