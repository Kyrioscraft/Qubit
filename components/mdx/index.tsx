import type { MDXComponents } from 'mdx/types';
import React from 'react';

/**
 * MDX 组件映射
 * 仅提供必要的自定义组件，所有样式使用 Tailwind utility classes
 * 排版由 @tailwindcss/typography 的 prose 类处理
 */

// Callout 提示框组件 - 使用 Tailwind utility classes
export const Callout = ({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}) => {
  const colors = {
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
    warning: 'border-orange-500 bg-orange-50 dark:bg-orange-950/30',
    error: 'border-red-500 bg-red-50 dark:bg-red-950/30',
    success: 'border-green-500 bg-green-50 dark:bg-green-950/30',
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    error: '❌',
    success: '✅',
  };

  return (
    <div className={`my-6 p-4 rounded border-l-4 ${colors[type]}`}>
      {title && (
        <div className="flex items-center gap-2 font-semibold mb-2">
          <span>{icons[type]}</span>
          <span>{title}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

// 导出组件映射 - 仅自定义组件，不覆盖默认 HTML 元素
// prose 类会自动处理 h1-h6, p, ul, ol, blockquote, code, pre 等的样式
export const mdxComponents: MDXComponents = {
  Callout,
};

export default mdxComponents;