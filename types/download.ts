export interface Download {
  id: string;
  title: string;
  description: string;
  category: string;
  version: string;
  size: string;
  downloadUrl: string;
  tags: string[];
  downloads: number;
  createdAt: string;
}

export interface DownloadFrontmatter {
  title: string;
  description: string;
  category: string;
  version: string;
  tags: string[];
  status?: 'draft' | 'published';
}