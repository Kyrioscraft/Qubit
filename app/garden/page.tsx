import { getAllGardenNodes, getGardenNodesByMaturity, getMocNodes, MaturityLabels } from '@/lib/content/garden';
import { GardenNodeCard } from '@/components/content/GardenNodeCard';

export default function GardenPage() {
  const nodes = getAllGardenNodes();
  const mocNodes = getMocNodes();

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">数字花园</h1>
        <p className="text-lg text-[var(--color-text-muted)] mb-6">
          互联的知识节点 - 双向链接系统让知识形成有机网络
        </p>

        {/* 成熟度说明 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(MaturityLabels).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-surface)]"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: value.color }}
              />
              <div>
                <span className="text-sm font-medium">{value.label}</span>
                <span className="text-xs text-[var(--color-text-muted)] ml-1">
                  ({getGardenNodesByMaturity(key as any).length})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 知识图谱入口 */}
        <a
          href="/garden/graph"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-button-bg)] text-[var(--color-button-text)] border border-[var(--color-button-border)] hover:bg-[var(--color-button-bg-hover)] hover:border-[var(--color-button-border-hover)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          查看知识图谱
        </a>
      </header>

      {/* MOC 索引页 */}
      {mocNodes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
            主题索引 (MOC)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mocNodes.map((node) => (
              <GardenNodeCard key={node.slug} node={node} />
            ))}
          </div>
        </section>
      )}

      {/* 全部节点 */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
          全部节点
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <GardenNodeCard key={node.slug} node={node} />
          ))}
        </div>
      </section>
    </div>
  );
}