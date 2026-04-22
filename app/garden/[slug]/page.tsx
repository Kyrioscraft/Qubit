import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCompiledGardenNode, getAllGardenNodes, MaturityLabels } from '@/lib/content/garden';
import { formatDate } from '@/lib/utils/date';
import { BacklinksSection } from '@/components/content/BacklinksSection';
import { MaturityBadge } from '@/components/content/MaturityBadge';
import { TagList } from '@/components/ui';

interface GardenNodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const nodes = getAllGardenNodes();
  return nodes.map((node) => ({
    slug: node.slug,
  }));
}

export async function generateMetadata({ params }: GardenNodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const nodes = getAllGardenNodes();
  const node = nodes.find(n => n.slug === slug);

  if (!node) {
    return { title: '节点未找到' };
  }

  return {
    title: node.title,
    description: node.content.substring(0, 200),
    openGraph: {
      title: node.title,
      description: node.content.substring(0, 200),
      type: 'article',
    },
  };
}

export default async function GardenNodePage({ params }: GardenNodePageProps) {
  const { slug } = await params;
  const node = await getCompiledGardenNode(slug);

  if (!node) {
    notFound();
  }

  return (
    <div className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <header className="mb-8">
        {/* 成熟度标签 */}
        <MaturityBadge maturity={node.maturity} className="mb-4" />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          {node.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <time>{formatDate(node.createdAt, 'long')}</time>
          {node.updatedAt.getTime() !== node.createdAt.getTime() && (
            <span>更新于 {formatDate(node.updatedAt, 'long')}</span>
          )}
        </div>

        {/* Tags */}
        <TagList tags={node.tags} className="mt-4" />
      </header>

      {/* Content - prose 类由 @tailwindcss/typography 提供 */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {node.compiledContent}
      </article>

      {/* 出链 */}
      {node.linksTo.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            链接到 ({node.linksTo.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {node.linksTo.map((link) => (
              <a
                key={link}
                href={`/garden/${link}`}
                className="px-3 py-1 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 入链（反向链接） */}
      <BacklinksSection slug={node.slug} />

      {/* 知识图谱导航 */}
      <section className="py-8">
        <a
          href="/garden/graph"
          className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          在知识图谱中查看此节点
        </a>
      </section>
    </div>
  );
}