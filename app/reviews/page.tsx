import { getAllReviews, getBookReviews, getMovieReviews, getYearlyReviewStats } from '@/lib/content/reviews';
import { ReviewCard } from '@/components/content/ReviewCard';
import { RatingStars } from '@/components/content/RatingStars';

export default function ReviewsPage() {
  const allReviews = getAllReviews();
  const bookReviews = getBookReviews();
  const movieReviews = getMovieReviews();
  const currentYear = new Date().getFullYear();
  const yearlyStats = getYearlyReviewStats(currentYear);

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">书评影评</h1>
        <p className="text-lg text-[var(--color-text-muted)] mb-6">
          书籍和电影的评价记录 - 记录阅读和观影感悟
        </p>

        {/* Yearly Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-[var(--color-surface)]">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-accent)]">{yearlyStats.books}</div>
            <div className="text-sm text-[var(--color-text-muted)]">书籍</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-accent)]">{yearlyStats.movies}</div>
            <div className="text-sm text-[var(--color-text-muted)]">电影</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--color-accent)]">{yearlyStats.averageRating}</div>
            <div className="text-sm text-[var(--color-text-muted)]">平均评分</div>
          </div>
        </div>
      </header>

      {/* Book Reviews */}
      {bookReviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            书评 ({bookReviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookReviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* Movie Reviews */}
      {movieReviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            影评 ({movieReviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movieReviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </section>
      )}

      {allReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">暂无评价</p>
        </div>
      )}
    </div>
  );
}