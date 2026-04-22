import type { GardenNode } from '@/types';
import { formatDate } from '@/lib/utils/date';
import { MaturityBadge } from './MaturityBadge';
import { Card, TagList } from '@/components/ui';
import Link from 'next/link';

interface GardenNodeCardProps {
  node: GardenNode;
}

export function GardenNodeCard({ node }: GardenNodeCardProps) {
  // 获取内容摘要（前150字符）
  const summary = node.content.replace(/\[\[[^\]]+\]\]/g, '').substring(0, 150).trim();

  return (
    <Card variant="interactive" padding="md">
      <Link href={`/garden/${node.slug}`}>
        {/* 成熟度标签 */}
        <MaturityBadge maturity={node.maturity} size="sm" className="mb-2" />

        {/* Title */}
        <h3 className="font-semibold text-[var(--color-text)] mb-2">
          {node.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-[var(--color-text-muted)] mb-3 line-clamp-2">
          {summary}...
        </p>

        {/* Tags */}
        <TagList tags={node.tags.slice(0, 3)} size="sm" className="mb-3" />

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
          <time>{formatDate(node.updatedAt)}</time>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.298a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {node.linksTo.length} 出链 / {node.linkedFrom.length} 入链
          </span>
        </div>
      </Link>
    </Card>
  );
}