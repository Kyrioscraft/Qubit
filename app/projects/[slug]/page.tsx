import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, getAllProjects, StatusLabels } from '@/lib/content/projects';
import { formatDate } from '@/lib/utils/date';
import { TagList } from '@/components/ui';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: '项目未找到' };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const statusInfo = StatusLabels[project.status];

  return (
    <article className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <header className="mb-8">
        {/* Status Badge */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-4"
          style={{
            backgroundColor: `${statusInfo.color}20`,
            color: statusInfo.color,
          }}
        >
          {statusInfo.label}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-[var(--color-text-muted)] mb-4">
          {project.description}
        </p>

        {/* Dates */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <span>开始: {formatDate(project.startDate, 'long')}</span>
          {project.endDate && (
            <span>完成: {formatDate(project.endDate, 'long')}</span>
          )}
        </div>

        {/* Tech Stack */}
        <TagList tags={project.techStack} className="mt-4" />
      </header>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mb-8">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            查看演示
          </a>
        )}
        {project.links.documentation && (
          <a
            href={project.links.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            文档
          </a>
        )}
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap">{project.content}</div>
      </div>
    </article>
  );
}