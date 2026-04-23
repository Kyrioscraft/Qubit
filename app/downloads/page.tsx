import { getAllDownloads, getCategories } from '@/lib/content/downloads';
import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';

export default function DownloadsPage() {
  const downloads = getAllDownloads();
  const categories = getCategories();

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">资源下载</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          白皮书、模板、指南等资源下载
        </p>
      </header>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={`#${category}`}
              className="px-3 py-1 text-sm rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-12">
        {categories.map((category) => {
          const categoryDownloads = downloads.filter((d) => d.category === category);
          if (categoryDownloads.length === 0) return null;

          return (
            <section key={category} id={category}>
              <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDownloads.map((download) => (
                  <article
                    key={download.id}
                    className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                      {download.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                      {download.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {download.tags.map((tag) => (
                        <Tag key={tag} variant="muted">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
                      <span>v{download.version}</span>
                      <span>{download.size}</span>
                    </div>
                    <a
                      href={download.downloadUrl}
                      download
                      className="mt-4 block w-full py-2 text-center rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                    >
                      下载
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {downloads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">暂无下载资源</p>
        </div>
      )}
    </div>
  );
}