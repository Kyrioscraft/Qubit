/**
 * 日期格式化工具
 */

export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    return formatRelativeDate(d);
  }

  const options: Intl.DateTimeFormatOptions = format === 'long'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };

  return d.toLocaleDateString('zh-CN', options);
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) return '刚刚';
  if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
  if (diffInHours < 24) return `${diffInHours}小时前`;
  if (diffInDays < 7) return `${diffInDays}天前`;
  if (diffInWeeks < 4) return `${diffInWeeks}周前`;
  if (diffInMonths < 12) return `${diffInMonths}个月前`;
  return `${diffInYears}年前`;
}

export function formatISODate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function isDateValid(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(d.getTime());
}

export function getYear(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getFullYear();
}

export function getMonth(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getMonth() + 1;
}

export function getDay(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getDate();
}