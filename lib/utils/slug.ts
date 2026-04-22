/**
 * Slug 生成工具
 */

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并
    .trim();
}

export function slugify(text: string): string {
  return generateSlug(text);
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function isSlugValid(slug: string): boolean {
  const slugPattern = /^[a-z0-9-]+$/;
  return slugPattern.test(slug) && slug.length > 0 && slug.length < 200;
}

export function createPath(...segments: string[]): string {
  return segments
    .map((segment) => segment.replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/');
}

export function getSlugFromPath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
}