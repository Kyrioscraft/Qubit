export interface Talk {
  id: string;
  title: string;
  subject: string;
  description: string;
  date: string;
  location: string;
  type: 'talk' | 'workshop' | 'webinar';
  slidesUrl?: string;
  videoUrl?: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface TalkFrontmatter {
  title: string;
  subject: string;
  description: string;
  date: string;
  location: string;
  type: 'talk' | 'workshop' | 'webinar';
  tags: string[];
  status?: 'draft' | 'published';
}