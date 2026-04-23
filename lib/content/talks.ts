import fs from 'fs';
import path from 'path';
import type { Talk } from '@/types/talk';

const talksFile = path.join(process.cwd(), 'content', 'talks', 'talks.json');

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

export function getAllTalks(): Talk[] {
  try {
    if (!fs.existsSync(talksFile)) {
      return [];
    }
    const fileContent = fs.readFileSync(talksFile, 'utf-8');
    const talks = JSON.parse(fileContent) as Talk[];
    return talks.filter((t) => t.status === 'published');
  } catch {
    return [];
  }
}

export function getTalkById(id: string): Talk | undefined {
  const talks = getAllTalks();
  return talks.find((t) => t.id === id);
}