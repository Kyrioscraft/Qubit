export interface BookmarkFrontmatter {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags: string[];
  category: string;
  isPublic: boolean;
  createdAt: string;
  favicon?: string;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags: string[];
  category: string;
  isPublic: boolean;
  createdAt: Date;
  favicon?: string;
}