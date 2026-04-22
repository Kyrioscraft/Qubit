/**
 * 阅读时间计算
 */

const WORDS_PER_MINUTE_ENGLISH = 200;
const CHARS_PER_MINUTE_CHINESE = 400; // 中文阅读速度较慢

interface ReadingTimeResult {
  minutes: number;
  text: string;
  words: number;
}

export function calculateReadingTime(content: string): ReadingTimeResult {
  // 移除代码块
  const contentWithoutCode = content.replace(/```[\s\S]*?```/g, '');

  // 移除图片链接
  const contentWithoutImages = contentWithoutCode.replace(/!\[.*?\]\(.*?\)/g, '');

  // 移除链接标记但保留文本
  const contentWithoutLinks = contentWithoutImages.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // 移除 HTML 标签
  const contentWithoutHtml = contentWithoutLinks.replace(/<[^>]+>/g, '');

  // 移除 markdown 标记
  const cleanContent = contentWithoutHtml
    .replace(/[#*_>`~-]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  // 计算中文字符
  const chineseChars = (cleanContent.match(/[一-龥]/g) || []).length;

  // 计算英文单词
  const englishWords = cleanContent
    .replace(/[一-龥]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .length;

  // 计算总阅读时间（分钟）
  const readingTimeMinutes =
    (chineseChars / CHARS_PER_MINUTE_CHINESE) +
    (englishWords / WORDS_PER_MINUTE_ENGLISH);

  const totalWords = chineseChars + englishWords;
  const minutes = Math.max(1, Math.round(readingTimeMinutes));

  return {
    minutes,
    text: minutes < 1 ? '不到1分钟' : `${minutes}分钟`,
    words: totalWords,
  };
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '不到1分钟';
  if (minutes === 1) return '1分钟';
  return `${minutes}分钟`;
}