'use client';

import type { GardenMaturity } from '@/types';
import { MaturityLabels, getGardenNodesByMaturity } from '@/lib/content/garden';

interface MaturityFilterProps {
  onFilterChange?: (maturity: GardenMaturity | null) => void;
  activeFilter?: GardenMaturity | null;
}

export function MaturityFilter({ onFilterChange, activeFilter }: MaturityFilterProps) {
  const handleFilter = (maturity: GardenMaturity | null) => {
    onFilterChange?.(maturity);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter(null)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === null
            ? 'bg-[var(--color-accent)] text-white'
            : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
        }`}
      >
        全部
      </button>
      {Object.entries(MaturityLabels).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleFilter(key as GardenMaturity)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeFilter === key
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: value.color }}
            />
            {value.label}
          </span>
        </button>
      ))}
    </div>
  );
}