import type { Project } from '@/types';
import { formatDate } from '@/lib/utils/date';
import { StatusLabels } from '@/lib/content/projects';
import { Card, TagList } from '@/components/ui';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusInfo = StatusLabels[project.status];

  return (
    <Card variant="interactive" padding="md">
      <Link href={`/projects/${project.slug}`}>
        {/* Status Badge */}
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mb-3 uppercase tracking-wide"
          style={{
            backgroundColor: `${statusInfo.color}20`,
            color: statusInfo.color,
          }}
        >
          {statusInfo.label}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-[var(--color-text)] mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Footer: Tech Stack + Dates */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
          <TagList tags={project.techStack.slice(0, 3)} size="sm" variant="muted" />
          <time className="text-xs text-[var(--color-text-subtle)] shrink-0">
            {formatDate(project.startDate)}
            {project.endDate && ` - ${formatDate(project.endDate)}`}
          </time>
        </div>
      </Link>
    </Card>
  );
}