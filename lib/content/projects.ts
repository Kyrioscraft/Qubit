/**
 * 项目展厅内容处理
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, ProjectStatus } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getProjectSlugs(): string[] {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  return fs
    .readdirSync(projectsDir)
    .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((name) => name.replace(/\.(mdx|md)$/, ''));
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(CONTENT_DIR, 'projects', `${slug}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, 'projects', `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : (fs.existsSync(fallbackPath) ? fallbackPath : null);

  if (!finalPath) return null;

  const fileContent = fs.readFileSync(finalPath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    content,
    techStack: data.techStack || [],
    status: data.status || 'completed',
    startDate: new Date(data.startDate || new Date().toISOString()),
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    links: {
      github: data.github,
      demo: data.demo,
      documentation: data.documentation,
    },
    screenshots: data.screenshots || [],
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  return slugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return getAllProjects().filter((project) => project.status === status);
}

export function getActiveProjects(): Project[] {
  return getProjectsByStatus('active');
}

export function getCompletedProjects(): Project[] {
  return getProjectsByStatus('completed');
}

export const StatusLabels: Record<ProjectStatus, { label: string; color: string }> = {
  active: { label: '进行中', color: '#fbbf24' },
  completed: { label: '已完成', color: '#22c55e' },
  paused: { label: '已暂停', color: '#94a3b8' },
};