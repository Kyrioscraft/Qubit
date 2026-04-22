import type { Article, ArticleFrontmatter } from './article';
import type { GardenNode, GardenNodeFrontmatter } from './garden-node';
import type { Project, ProjectFrontmatter } from './project';
import type { Review, ReviewFrontmatter } from './review';
import type { Bookmark, BookmarkFrontmatter } from './bookmark';
import type { TimelineEvent, TimelineEventFrontmatter } from './timeline-event';

export type ContentType = 'article' | 'garden' | 'project' | 'review' | 'bookmark' | 'timeline';

export interface SearchResult {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  url: string;
}

export * from './article';
export * from './garden-node';
export * from './project';
export * from './review';
export * from './bookmark';
export * from './timeline-event';