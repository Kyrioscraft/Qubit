import { getAllTalks } from '@/lib/content/talks';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';

export default function TalksPage() {
  const talks = getAllTalks();

  const typeLabels: Record<string, string> = {
    talk: '演讲',
    workshop: '工作坊',
    webinar: '网络研讨会',
  };

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">演讲与分享</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          我的演讲、分享和工作坊记录
        </p>
      </header>

      <div className="space-y-6">
        {talks.map((talk) => (
          <article
            key={talk.id}
            className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-[var(--color-accent)] text-white mb-2">
                  {typeLabels[talk.type]}
                </span>
                <h2 className="text-xl font-semibold text-[var(--color-text)]">
                  {talk.title}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {talk.subject}
                </p>
              </div>
              <time className="text-sm text-[var(--color-text-muted)]">
                {formatDate(talk.date)}
              </time>
            </div>

            <p className="text-[var(--color-text)] mb-4">{talk.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
              <span className="text-[var(--color-text-muted)]">
                📍 {talk.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {talk.tags.map((tag) => (
                <Tag key={tag} variant="muted">
                  {tag}
                </Tag>
              ))}
            </div>

            <div className="flex gap-4">
              {talk.slidesUrl && (
                <a
                  href={talk.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  📄 PPT
                </a>
              )}
              {talk.videoUrl && (
                <a
                  href={talk.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  🎥 视频
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {talks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">暂无演讲记录</p>
        </div>
      )}
    </div>
  );
}