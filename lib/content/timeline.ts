/**
 * 时间线事件处理
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { TimelineEvent, TimelineEventType } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllTimelineEvents(): TimelineEvent[] {
  const timelineDir = path.join(CONTENT_DIR, 'timeline');
  if (!fs.existsSync(timelineDir)) return [];

  const eventsFile = path.join(timelineDir, 'events.json');

  if (fs.existsSync(eventsFile)) {
    const content = fs.readFileSync(eventsFile, 'utf-8');
    const events = JSON.parse(content);
    return events.map((e: any) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      date: new Date(e.date),
      type: e.type || 'life',
      links: e.links,
      images: e.images,
    }));
  }

  return [];
}

export function getTimelineEventsByType(type: TimelineEventType): TimelineEvent[] {
  return getAllTimelineEvents().filter((e) => e.type === type);
}

export function getTimelineEventsByYear(year: number): TimelineEvent[] {
  return getAllTimelineEvents().filter((e) => e.date.getFullYear() === year);
}

export function getYearlyTimelineSummary(): Record<number, { count: number; types: Record<string, number> }> {
  const events = getAllTimelineEvents();
  const summary: Record<number, { count: number; types: Record<string, number> }> = {};

  for (const event of events) {
    const year = event.date.getFullYear();
    if (!summary[year]) {
      summary[year] = { count: 0, types: {} };
    }
    summary[year].count++;
    if (!summary[year].types[event.type]) {
      summary[year].types[event.type] = 0;
    }
    summary[year].types[event.type]++;
  }

  return summary;
}

export const EventTypeLabels: Record<TimelineEventType, { label: string; color: string }> = {
  work: { label: '工作', color: '#3b82f6' },
  study: { label: '学习', color: '#8b5cf6' },
  life: { label: '生活', color: '#10b981' },
  achievement: { label: '成就', color: '#f59e0b' },
};