import { getPublicBookmarks } from '@/lib/content/bookmarks';
import { BookmarkCard } from '@/components/content/BookmarkCard';

export default function BookmarksPage() {
  const bookmarks = getPublicBookmarks();

  // 按分类分组
  const groupedBookmarks: Record<string, typeof bookmarks> = {};
  for (const bookmark of bookmarks) {
    if (!groupedBookmarks[bookmark.category]) {
      groupedBookmarks[bookmark.category] = [];
    }
    groupedBookmarks[bookmark.category].push(bookmark);
  }

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">书签收藏</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          收藏的链接和资源 - 分类整理便于查找
        </p>
      </header>

      {/* Grouped Bookmarks */}
      {Object.entries(groupedBookmarks).map(([category, categoryBookmarks]) => (
        <section key={category} className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            {category} ({categoryBookmarks.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </section>
      ))}

      {bookmarks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">暂无书签</p>
        </div>
      )}
    </div>
  );
}