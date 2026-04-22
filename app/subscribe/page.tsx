import { SubscribeForm } from '@/components/content/SubscribeForm';

export default function SubscribePage() {
  return (
    <div className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">订阅</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          订阅邮件通知，获取最新文章和更新
        </p>
      </header>

      {/* Subscribe Form */}
      <div className="p-6 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
        <SubscribeForm />
      </div>

      {/* Alternative Options */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">其他订阅方式</h2>
        <div className="flex gap-4">
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.18 20 6 20s-2.18-1-2.18-2.18a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            RSS 订阅
          </a>
        </div>
      </div>
    </div>
  );
}