import fs from 'fs';
import path from 'path';
import { matter } from 'gray-matter';
import type { Download } from '@/types/download';

const downloadsDirectory = path.join(process.cwd(), 'content', 'downloads');
const downloadsFile = path.join(downloadsDirectory, 'downloads.json');

interface DownloadData {
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

export type Download = DownloadData;

export function getAllDownloads(): Download[] {
  try {
    if (!fs.existsSync(downloadsFile)) {
      return [];
    }
    const fileContent = fs.readFileSync(downloadsFile, 'utf-8');
    return JSON.parse(fileContent) as Download[];
  } catch {
    return [];
  }
}

export function getDownloadsByCategory(category: string): Download[] {
  const downloads = getAllDownloads();
  return downloads.filter((d) => d.category === category);
}

export function getDownloadById(id: string): Download | undefined {
  const downloads = getAllDownloads();
  return downloads.find((d) => d.id === id);
}

export function getCategories(): string[] {
  const downloads = getAllDownloads();
  const categories = new Set(downloads.map((d) => d.category));
  return Array.from(categories);
}