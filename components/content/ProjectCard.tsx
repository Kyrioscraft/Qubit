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
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mb-3"
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
        <p className="text-sm text-[var(--color-text-muted)] mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <TagList tags={project.techStack.slice(0, 3)} size="sm" className="mb-3" />

        {/* Dates */}
        <div className="text-xs text-[var(--color-text-subtle)]">
          {formatDate(project.startDate)}
          {project.endDate && ` - ${formatDate(project.endDate)}`}
        </div>
      </Link>
    </Card>
  );
}