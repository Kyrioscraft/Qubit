'use client';

import type { Bookmark } from '@/types';
import { Card, TagList } from '@/components/ui';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  // 获取 favicon 或使用默认图标
  const favicon = bookmark.favicon || `https://www.google.com/s2/favicons?domain=${encodeURIComponent(bookmark.url)}&sz=32`;

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card variant="hover" padding="md">
        {/* Header: Favicon & Title */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={favicon}
            alt=""
            className="w-5 h-5 mt-0.5 shrink-0"
            onError={(e) => {
              e.currentTarget.src = '/favicon.ico';
            }}
          />
          <h3 className="font-medium text-[var(--color-text)] line-clamp-1">
            {bookmark.title}
          </h3>
        </div>

        {/* Description */}
        {bookmark.description && (
          <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
            {bookmark.description}
          </p>
        )}

        {/* Footer: Tags + URL */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
          <TagList tags={bookmark.tags.slice(0, 3)} size="sm" variant="muted" />
          <span className="text-xs text-[var(--color-text-subtle)] truncate shrink-0 max-w-[120px]">
            {bookmark.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
          </span>
        </div>
      </Card>
    </a>
  );
}