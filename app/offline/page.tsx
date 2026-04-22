'use client';

export default function OfflinePage() {
  return (
    <div className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12 text-center">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">离线</h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-8">
        当前处于离线状态，部分内容可能不可用。
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        重试
      </button>
    </div>
  );
}