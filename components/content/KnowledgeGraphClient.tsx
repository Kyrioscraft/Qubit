'use client';

import { useEffect, useRef, useState } from 'react';
import type { GardenGraphData, GardenGraphNode } from '@/types';

interface KnowledgeGraphClientProps {
  initialData: GardenGraphData;
}

// 简化的知识图谱客户端渲染
export function KnowledgeGraphClient({ initialData }: KnowledgeGraphClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<GardenGraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // 成熟度颜色映射
  const maturityColors: Record<string, string> = {
    seed: '#94a3b8',
    seedling: '#fbbf24',
    budding: '#34d399',
    evergreen: '#22c55e',
  };

  // 简化版：使用 CSS 绘制节点和连接
  const nodes = initialData.nodes;
  const links = initialData.links;

  // 计算节点位置（简单的圆形布局）
  const getNodePosition = (index: number, total: number) => {
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* SVG Graph */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* 连接线 */}
        <g className="links">
          {links.map((link, i) => {
            const sourceIndex = nodes.findIndex((n) => n.id === link.source);
            const targetIndex = nodes.findIndex((n) => n.id === link.target);
            if (sourceIndex === -1 || targetIndex === -1) return null;

            const sourcePos = getNodePosition(sourceIndex, nodes.length);
            const targetPos = getNodePosition(targetIndex, nodes.length);

            return (
              <line
                key={`link-${i}`}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={hoveredNode === link.source || hoveredNode === link.target ? '#5566ff' : '#e5e7eb'}
                strokeWidth={hoveredNode === link.source || hoveredNode === link.target ? 0.3 : 0.15}
                className="transition-all duration-200"
              />
            );
          })}
        </g>

        {/* 节点 */}
        <g className="nodes">
          {nodes.map((node, i) => {
            const pos = getNodePosition(i, nodes.length);
            const color = maturityColors[node.maturity] || '#94a3b8';
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected || isHovered ? 2.5 : 2}
                  fill={color}
                  className="transition-all duration-200"
                  style={{
                    filter: isSelected || isHovered ? 'brightness(1.2)' : 'none',
                  }}
                />
                {/* 标签 */}
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize={isSelected || isHovered ? 2 : 1.5}
                  fill={isSelected || isHovered ? '#1a1a1a' : '#666'}
                  className="transition-all duration-200"
                >
                  {node.title.substring(0, 10)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Selected Node Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-[var(--color-text)]">
              {selectedNode.title}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">
            成熟度: {selectedNode.maturity}
          </p>
          <a
            href={`/garden/${selectedNode.slug}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] text-sm hover:bg-[var(--color-button-bg-hover)] border border-[var(--color-button-border)] hover:border-[var(--color-button-border-hover)] transition-colors"
          >
            查看详情
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
        <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2">成熟度</div>
        <div className="space-y-1">
          {Object.entries(maturityColors).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-[var(--color-text)]">
                {key === 'seed' ? '种子' : key === 'seedling' ? '发芽' : key === 'budding' ? '开花' : '常青'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}