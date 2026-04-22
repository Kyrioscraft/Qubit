import type { GardenMaturity } from '@/types';
import { MaturityLabels } from '@/lib/content/garden';

interface MaturityBadgeProps {
  maturity: GardenMaturity;
  size?: 'sm' | 'md';
  className?: string;
}

export function MaturityBadge({ maturity, size = 'md', className = '' }: MaturityBadgeProps) {
  const info = MaturityLabels[maturity];
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses} ${className}`}
      style={{
        backgroundColor: `${info.color}20`,
        color: info.color,
      }}
      title={info.description}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: info.color }}
      />
      {info.label}
    </span>
  );
}