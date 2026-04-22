import type { TimelineEvent } from '@/types';
import { formatDate } from '@/lib/utils/date';
import { EventTypeLabels } from '@/lib/content/timeline';

interface TimelineEventItemProps {
  event: TimelineEvent;
}

export function TimelineEventItem({ event }: TimelineEventItemProps) {
  const typeInfo = EventTypeLabels[event.type];

  return (
    <div className="relative pb-6">
      {/* Type Indicator */}
      <div
        className="absolute -left-8 top-1 w-3 h-3 rounded-full"
        style={{ backgroundColor: typeInfo.color }}
        title={typeInfo.label}
      />

      {/* Content */}
      <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-[var(--color-text)]">
              {event.title}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${typeInfo.color}20`,
                color: typeInfo.color,
              }}
            >
              {typeInfo.label}
            </span>
          </div>
          <time className="text-sm text-[var(--color-text-muted)]">
            {formatDate(event.date, 'short')}
          </time>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)]">
          {event.description}
        </p>

        {/* Links */}
        {event.links && event.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {event.links.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
              >
                链接 →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}