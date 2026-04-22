export type TimelineEventType = 'work' | 'study' | 'life' | 'achievement';

export interface TimelineEventFrontmatter {
  id: string;
  title: string;
  description: string;
  date: string;
  type: TimelineEventType;
  links?: string[];
  images?: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: TimelineEventType;
  links?: string[];
  images?: string[];
}