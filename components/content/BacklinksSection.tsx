import { getAllGardenNodes } from '@/lib/content/garden';
import { GardenNodeCard } from './GardenNodeCard';

interface BacklinksSectionProps {
  slug: string;
}

export function BacklinksSection({ slug }: BacklinksSectionProps) {
  const allNodes = getAllGardenNodes();
  const backlinks = allNodes.filter((node) => node.linksTo.includes(slug));

  if (backlinks.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 py-6 border-t border-[var(--color-border-subtle)]">
      <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
        反向链接 ({backlinks.length})
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        其他节点链接到这里：
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {backlinks.map((node) => (
          <GardenNodeCard key={node.slug} node={node} />
        ))}
      </div>
    </section>
  );
}