# MDX 渲染方案 - 正确配置

## 核心配置

### 1. Tailwind CSS 4 + Typography 插件

**关键**：Tailwind CSS 4 中 typography 插件使用 `@plugin` 指令：

```css
/* app/globals.css */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';
```

### 2. 安装依赖

```bash
npm install next-mdx-remote @shikijs/rehype shiki rehype-slug rehype-autolink-headings @tailwindcss/typography
```

### 3. MDX 编译配置

```typescript
// lib/content/articles.ts
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const { content } = await compileMDX({
  source: rawContent,
  components: mdxComponents,
  options: {
    parseFrontmatter: false,
    mdxOptions: {
      rehypePlugins: [
        [rehypeShiki, { theme: 'github-dark' }],
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
  },
});
```

### 4. 页面渲染

```tsx
// app/blog/[slug]/page.tsx
<article className="prose prose-lg dark:prose-invert max-w-none">
  {article.compiledContent}
</article>
```

### 5. MDX 组件

仅定义自定义组件，不覆盖默认 HTML 元素：

```typescript
// components/mdx/index.tsx
export const mdxComponents: MDXComponents = {
  Callout,  // 自定义组件，使用 Tailwind utility classes
};
```

## 生成的样式

prose 类自动生成以下样式：
- `:where(h1)` - 标题样式
- `:where(h2)` - 二级标题
- `:where(p)` - 段落
- `:where(ul)` - 无序列表
- `:where(ol)` - 有序列表
- `:where(pre)` - 代码块
- `:where(code)` - 内联代码
- `:where(blockquote)` - 引用块
- `:where(a)` - 链接
- 等等...

## 变体

| 类名 | 说明 |
|------|------|
| `prose` | 基础排版 |
| `prose-lg` | 大字体版本 |
| `dark:prose-invert` | 暗色模式适配 |
| `max-w-none` | 移除默认宽度限制 |

---

**更新日期**: 2024-04-25