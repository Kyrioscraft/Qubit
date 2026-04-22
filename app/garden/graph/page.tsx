import { getAllGardenNodes, buildGardenGraphData } from '@/lib/content/garden';
import { KnowledgeGraphClient } from '@/components/content/KnowledgeGraphClient';

export default function GardenGraphPage() {
  const graphData = buildGardenGraphData();
  const nodes = getAllGardenNodes();

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-6 border-b border-[var(--color-border-subtle)]">
        <div className="max-w-[var(--content-width-full)] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">知识图谱</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              {nodes.length} 个节点，{graphData.links.length} 条连接
            </p>
          </div>
          <a
            href="/garden"
            className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            返回花园
          </a>
        </div>
      </header>

      {/* Graph Container */}
      <div className="h-[calc(100vh-80px)]">
        <KnowledgeGraphClient initialData={graphData} />
      </div>
    </div>
  );
}