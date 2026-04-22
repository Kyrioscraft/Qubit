'use client';

import type { TableOfContentsItem } from '@/types/article';

export interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeId?: string;
  className?: string;
}

export function TableOfContents({ items, activeId, className = '' }: TableOfContentsProps) {
  if (items.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderItem = (item: TableOfContentsItem, isChild = false) => (
    <li key={item.id} className={`${isChild ? 'ml-4' : ''}`}>
      <button
        onClick={() => scrollToHeading(item.id)}
        className={`text-left text-sm py-1 px-2 rounded transition-colors w-full ${
          activeId === item.id
            ? 'text-[var(--color-accent)] bg-[var(--color-accent-subtle)]'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
        }`}
      >
        {item.text}
      </button>
      {item.children && item.children.length > 0 && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => renderItem(child, true))}
        </ul>
      )}
    </li>
  );

  return (
    <nav className={className}>
      <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 px-2">
        目录
      </h4>
      <ul className="space-y-1">
        {items.map((item) => renderItem(item))}
      </ul>
    </nav>
  );
}