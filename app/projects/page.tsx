import { getAllProjects, StatusLabels } from '@/lib/content/projects';
import { ProjectCard } from '@/components/content/ProjectCard';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">项目展厅</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          我的作品和项目 - 展示技术栈、成果和经验
        </p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">暂无项目</p>
        </div>
      )}
    </div>
  );
}