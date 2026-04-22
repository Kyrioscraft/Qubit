export type ProjectStatus = 'active' | 'completed' | 'paused';

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  github?: string;
  demo?: string;
  documentation?: string;
  screenshots?: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  techStack: string[];
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  screenshots: string[];
}