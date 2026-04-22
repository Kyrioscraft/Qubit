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
        {/* Favicon & Title */}
        <div className="flex items-start gap-3 mb-2">
          <img
            src={favicon}
            alt=""
            className="w-5 h-5 mt-0.5"
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
          <p className="text-sm text-[var(--color-text-muted)] mb-2 line-clamp-2">
            {bookmark.description}
          </p>
        )}

        {/* Tags */}
        <TagList tags={bookmark.tags.slice(0, 3)} size="sm" variant="muted" className="mb-2" />

        {/* URL */}
        <p className="text-xs text-[var(--color-text-subtle)] truncate">
          {bookmark.url}
        </p>
      </Card>
    </a>
  );
}