# Qubit - 个人知识分享平台

> 一个基于 Next.js 16 的现代化个人网站，超越传统博客，打造集知识管理、内容创作、个人品牌于一体的数字空间。

## 项目愿景

Qubit 不只是一个博客，而是：
- **知识中枢** - 系统化整理和分享个人知识
- **作品展厅** - 展示项目和成果
- **思想花园** - 数字花园式的互联笔记
- **社交节点** - 与读者建立真实连接

---

## 核心功能模块

### 1. 博客系统 (Blog)

**基础功能**
- 文章发布与管理
- Markdown/MDX 支持（代码高亮、数学公式、图表）
- 分类与标签系统
- 文章系列（多篇文章组成的知识系列）
- 草稿与发布状态管理
- 发布日期与更新日期追踪
- 阅读时间估算
- 自动生成目录 (TOC)
- 相关文章推荐

**进阶功能**
- 全文搜索（标题、内容、标签）
- RSS/Atom 订阅源
- 文章版本历史（查看修改记录）
- 定时发布
- 文章置顶
- 评论系统（可选：Giscus/Talkyard）
- 点赞与收藏
- 阅读进度条
- 社交分享按钮
- 打印友好版本
- PDF 导出

**数据结构**
```
articles/
├── slug/
│   ├── index.mdx          # 文章内容
│   ├── meta.json          # 元数据（可选，可内嵌于 MDX）
│   └── assets/            # 文章专属资源
│       ├── diagram.png
│       └── code-demo/
```

---

### 2. 数字花园 (Digital Garden)

**概念**
数字花园是介于博客和笔记之间的内容形态：
- **种子** - 刚萌芽的想法，未成熟
- **发芽** - 初步整理，有基本结构
- **开花** - 成熟内容，值得分享
- **常青** - 持续更新，核心知识

**功能**
- 知识节点互联（双向链接）
- 可视化知识图谱（交互式节点图）
- 内容成熟度标记
- 快速笔记入口
- MOC (Map of Content) - 主题索引页
- 知识图谱搜索

**技术实现**
- 使用 Obsidian-style 双向链接语法 `[[]]`
- 构建链接关系图数据
- 使用 D3.js 或 React Flow 渲染图谱

---

### 3. 项目展厅 (Portfolio)

**功能**
- 项目卡片展示
- 项目详情页（背景、技术栈、成果）
- 技术标签筛选
- 时间线布局
- 外部链接（GitHub、Demo、文档）
- 截图/视频展示
- 项目状态（进行中/已完成/已暂停）

**数据结构**
```
projects/
├── project-slug/
│   ├── index.mdx
│   ├── screenshots/
│   └── demo-video.mp4
```

---

### 4. 书签收藏 (Bookmarks)

**功能**
- 收藏外部链接
- 自动抓取标题和描述
- 分类与标签
- 公开/私有状态
- RSS 输出（分享给朋友）
- 快速搜索
- 一键导入（从浏览器书签）

---

### 5. 书评影评 (Reviews)

**功能**
- 书籍/电影评分系统
- 简评与长评两种模式
- 年度总结（读了多少书/看了多少电影）
- 推荐算法（基于评分和标签）
- 外部数据源集成（豆瓣、IMDb API）
- 阅读进度追踪

---

### 6. 时间线 (Timeline)

**功能**
- 个人里程碑记录
- 年度回顾页面
- 可筛选时间范围
- 事件类型分类（工作、学习、生活）
- 嵌入图片和链接

---

### 7. 演讲与分享 (Talks)

**功能**
- 演讲/分享记录
- PPT/幻灯片嵌入（PDF 或在线链接）
- 演讲视频链接
- 演讲稿全文
- 演讲地点与日期
- 相关资源下载

---

### 8. 资源下载 (Downloads)

**功能**
- 白皮书、报告、模板
- 版本管理
- 下载统计
- 分类整理

---

### 9. 订阅与通知 (Newsletter)

**功能**
- 邮件订阅（集成 Resend/Mailgun）
- 订阅确认流程
- 新文章自动通知
- 手动发送专题邮件
- 订阅者管理
- 退订机制

---

### 10. 分析仪表盘 (Analytics)

**功能**
- 页面访问统计（集成 Cloudflare Analytics / Umami）
- 文章阅读量排行
- 搜索词分析
- 访客来源追踪
- 简洁的仪表盘界面

---

## 技术架构

### 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 内容 | MDX (Content Collections) |
| 搜索 | FlexSearch / Fuse.js (客户端) 或 Algolia |
| 图表 | D3.js / React Flow |
| 评论 | Giscus (GitHub Discussions) |
| 分析 | Cloudflare Web Analytics / Umami |
| 部署 | Cloudflare Pages |

### 内容管理策略

**方案 A：本地文件系统 (推荐)**
- 内容以 MDX 文件存储在 `content/` 目录
- 使用 Contentlayer 或自定义构建脚本
- Git 作为版本控制
- 适合个人网站，零成本


### 目录结构

```
qubit/
├── app/                      # Next.js App Router
│   ├── (public)/             # 公开页面组
│   │   ├── layout.tsx
│   │   ├── page.tsx          # 首页
│   │   ├── blog/
│   │   │   ├── page.tsx      # 文章列表
│   │   │   └── [slug]/       # 文章详情
│   │   ├── garden/
│   │   │   ├── page.tsx      # 花园入口
│   │   │   ├── graph.tsx     # 知识图谱
│   │   │   └── [slug]/       # 节点详情
│   │   ├── projects/
│   │   │   ├── page.tsx      # 项目列表
│   │   │   └── [slug]/       # 项目详情
│   │   ├── bookmarks/
│   │   │   └── page.tsx      # 书签列表
│   │   ├── reviews/
│   │   │   ├── page.tsx      # 评价列表
│   │   │   ├── books/
│   │   │   └── movies/
│   │   ├── timeline/
│   │   │   └── page.tsx      # 时间线
│   │   ├── talks/
│   │   │   ├── page.tsx      # 演讲列表
│   │   │   └── [slug]/       # 演讲详情
│   │   ├── downloads/
│   │   │   └── page.tsx      # 资源列表
│   │   ├── about/
│   │   │   └── page.tsx      # 关于我
│   │   ├── search/
│   │   │   └── page.tsx      # 全站搜索
│   │   └── subscribe/
│   │       └── page.tsx      # 订阅页面
│   ├── (admin)/              # 管理页面组 (可选)
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       └── page.tsx      # 分析仪表盘
│   ├── api/                  # API 路由
│   │   ├── subscribe/
│   │   │   └── route.ts      # 订阅 API
│   │   ├── search/
│   │   │   └── route.ts      # 搜索 API
│   │   └── og/
│   │       └── route.ts      # OG 图片生成
│   ├── rss.xml/
│   │   └── route.ts          # RSS 生成
│   ├── sitemap.xml/
│   │   └── route.ts          # Sitemap
│   ├── layout.tsx            # 根布局
│   └── globals.css           # 全局样式
├── content/                  # 内容目录
│   ├── articles/             # 博客文章
│   ├── garden/               # 数字花园
│   ├── projects/             # 项目内容
│   ├── reviews/              # 书评影评
│   ├── talks/                # 演讲内容
│   ├── timeline/             # 时间线事件
│   └── bookmarks/            # 书签数据
├── components/               # React 组件
│   ├── ui/                   # 基础 UI 组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Tag.tsx
│   │   ├── SearchInput.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ReadingProgress.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── CommentSection.tsx
│   │   └── ThemeToggle.tsx
│   ├── layout/               # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── content/              # 内容展示组件
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── BookmarkCard.tsx
│   │   ├── TimelineEvent.tsx
│   │   ├── KnowledgeGraph.tsx
│   │   └── MdxRenderer.tsx
│   └── seo/                  # SEO 组件
│   │   ├── OpenGraph.tsx
│   │   └── JsonLD.tsx
├── lib/                      # 工具函数
│   ├── content/              # 内容处理
│   │   ├── mdx.ts            # MDX 解析
│   │   ├── articles.ts       # 文章数据
│   │   ├── garden.ts         # 花园数据
│   │   ├── projects.ts       # 项目数据
│   │   └── search.ts         # 搜索索引
│   ├── utils/                # 通用工具
│   │   ├── date.ts           # 日期处理
│   │   ├── slug.ts           # URL 生成
│   │   ├── reading-time.ts   # 阅读时间
│   │   └── toc.ts            # 目录生成
│   ├── hooks/                # React Hooks
│   │   ├── useSearch.ts
│   │   ├── useTheme.ts
│   │   └── useReadingProgress.ts
├── styles/                   # 样式文件
│   ├── tokens.css            # 设计变量
│   ├── typography.css        # 字体样式
│   ├── prose.css             # 文章样式
│   └── components.css        # 组件样式
├── public/                   # 静态资源
│   ├── fonts/
│   ├── images/
│   ├── og/                   # OG 图片缓存
│   └── favicon.ico
├── types/                    # TypeScript 类型
│   ├── article.ts
│   ├── project.ts
│   ├── review.ts
│   ├── bookmark.ts
│   ├── garden-node.ts
│   └── timeline-event.ts
└── config/                   # 配置文件
    ├── site.ts               # 站点配置
    ├── navigation.ts         # 导航配置
    └── seo.ts                # SEO 配置
```

---

## 设计系统

### 视觉风格

**风格定位：编辑型/知识型网站**
- 清晰的阅读层次
- 克制的装饰元素
- 重视排版细节
- 知识图谱作为视觉亮点

**颜色方案**

```css
:root {
  /* Light Theme */
  --color-background: oklch(98% 0 0);
  --color-surface: oklch(96% 0 0);
  --color-text: oklch(20% 0 0);
  --color-text-muted: oklch(40% 0 0);
  --color-accent: oklch(55% 0.15 250);  /* 柔和的蓝紫色 */
  --color-accent-hover: oklch(50% 0.18 250);
  --color-success: oklch(60% 0.15 145);
  --color-warning: oklch(70% 0.15 75);
  --color-border: oklch(85% 0 0);

  /* Dark Theme */
  --color-background-dark: oklch(12% 0 0);
  --color-surface-dark: oklch(16% 0 0);
  --color-text-dark: oklch(90% 0 0);
  --color-text-muted-dark: oklch(70% 0 0);
  --color-accent-dark: oklch(60% 0.15 250);
  --color-border-dark: oklch(25% 0 0);
}
```

**字体**

```css
:root {
  --font-display: "Geist", system-ui, sans-serif;  /* 标题 */
  --font-body: "Geist Sans", system-ui, sans-serif; /* 正文 */
  --font-mono: "Geist Mono", "Fira Code", monospace; /* 代码 */
  --font-serif: "Lora", Georgia, serif;             /* 引用 */

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-hero: clamp(2.5rem, 1rem + 4vw, 5rem);
}
```

**间距**

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-section: clamp(3rem, 2rem + 5vw, 8rem);
}
```

### 组件设计原则

1. **阅读优先** - 文章页面最大化阅读体验
2. **知识互联** - 通过链接和图谱鼓励探索
3. **渐进披露** - 复杂功能逐步展开
4. **移动友好** - 所有功能适配移动端
5. **性能敏感** - 控制脚本大小，优先静态内容

---

## 实现阶段

### Phase 1: 基础架构 (Week 1-2)

**目标：建立项目骨架和核心基础设施**

- [ ] 设置设计系统（颜色、字体、间距变量）
- [ ] 创建基础 UI 组件库
- [ ] 实现主题切换（Light/Dark）
- [ ] 建布局组件（Header、Footer、Sidebar）
- [ ] 配置 MDX 支持（语法高亮、数学公式）
- [ ] 创建内容解析基础库
- [ ] 设置站点配置和导航
- [ ] 实现 OG 图片生成 API
- [ ] 配置 SEO（sitemap、robots.txt、JSON-LD）

### Phase 2: 博客系统 (Week 2-3)

**目标：完整实现博客功能**

- [ ] 文章内容结构设计
- [ ] 文章列表页（分页、筛选）
- [ ] 文章详情页（MDX 渲染）
- [ ] 自动生成目录
- [ ] 阅读时间计算
- [ ] 相关文章推荐算法
- [ ] RSS 订阅源生成
- [ ] 全文搜索功能
- [ ] 评论系统集成（Giscus）
- [ ] 社交分享按钮
- [ ] 阅读进度条

### Phase 3: 数字花园 (Week 3-4)

**目标：实现知识互联系统**

- [ ] 花园节点内容结构
- [ ] 双向链接解析 `[[]]` 语法
- [ ] 链接关系数据构建
- [ ] 知识图谱可视化（D3.js/React Flow）
- [ ] 内容成熟度标记系统
- [ ] MOC (Map of Content) 索引页
- [ ] 花园搜索与筛选

### Phase 4: 其他模块 (Week 4-5)

**目标：实现辅助功能模块**

- [ ] 项目展厅
- [ ] 书签收藏
- [ ] 书评影评
- [ ] 时间线
- [ ] 演讲分享
- [ ] 资源下载
- [ ] 关于我页面

### Phase 5: 订阅与分析 (Week 5-6)

**目标：用户互动和数据洞察**

- [ ] 邮件订阅 API（Resend）
- [ ] 订阅确认流程
- [ ] 订阅管理页面
- [ ] Cloudflare Analytics 集成
- [ ] 分析仪表盘（可选）

### Phase 6: 优化与部署 (Week 6-7)

**目标：性能优化和上线准备**

- [ ] 图片优化策略
- [ ] 字体加载优化
- [ ] 代码分割和懒加载
- [ ] PWA 支持（可选）
- [ ] Cloudflare Pages 部署配置
- [ ] 自定义域名绑定
- [ ] 性能测试（Lighthouse）
- [ ] 内容填充（示例文章）

---

## 数据模型

### Article (文章)

```typescript
interface Article {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX content
  category: string;
  tags: string[];
  series?: string; // 所属系列
  seriesOrder?: number;
  status: 'draft' | 'published';
  publishedAt: Date;
  updatedAt: Date;
  readingTime: number; // minutes
  featured: boolean;
  relatedArticles: string[]; // slugs
}
```

### GardenNode (知识节点)

```typescript
interface GardenNode {
  slug: string;
  title: string;
  content: string;
  maturity: 'seed' | 'seedling' | 'evergreen';
  linksTo: string[]; // 出链
  linkedFrom: string[]; // 入链
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Project (项目)

```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  techStack: string[];
  status: 'active' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date;
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  screenshots: string[];
}
```

### Review (评价)

```typescript
interface Review {
  slug: string;
  type: 'book' | 'movie' | 'other';
  title: string;
  subject: string; // 书名/电影名
  rating: number; // 1-5
  content: string;
  tags: string[];
  externalId?: string; //豆瓣/IMDb ID
  date: Date;
  coverImage?: string;
}
```

### Bookmark (书签)

```typescript
interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags: string[];
  category: string;
  isPublic: boolean;
  createdAt: Date;
  favicon?: string;
}
```

### TimelineEvent (时间线事件)

```typescript
interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'work' | 'study' | 'life' | 'achievement';
  links?: string[];
  images?: string[];
}
```

---

## API 设计

### 公开 API

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/search` | GET | 全站搜索 |
| `/api/rss.xml` | GET | RSS 订阅源 |
| `/api/sitemap.xml` | GET | Sitemap |
| `/api/og` | GET | OG 图片生成 |

### 订阅 API

| 路径 | 方法 | 说明 |
|------|------|------|
| `/api/subscribe` | POST | 订阅邮箱 |
| `/api/subscribe/confirm` | POST | 确认订阅 |
| `/api/subscribe/unsubscribe` | POST | 取消订阅 |

---

## SEO 策略

### 元数据

每页包含：
- `<title>` - 页面标题
- `<meta description>` - 描述
- Open Graph 标签
- Twitter Card 标签
- JSON-LD 结构化数据

### 结构化数据类型

- WebSite
- BlogPosting
- Person
- Project
- Review

### URL 结构

- `/blog/[slug]` - 文章
- `/garden/[slug]` - 知识节点
- `/projects/[slug]` - 项目
- `/reviews/[type]/[slug]` - 评价
- `/timeline` - 时间线

---

## 性能目标

| 指标 | 目标值 |
|------|--------|
| LCP | < 1.5s |
| INP | < 100ms |
| CLS | < 0.05 |
| FCP | < 1s |
| TBT | < 100ms |
| JS Bundle (gzipped) | < 150kb (首页) |
| CSS Bundle | < 30kb |

---

## 安全考虑

- Content Security Policy (CSP)
- XSS 防护（MDX 内容净化）
- CORS 配置
- API Rate Limiting
- 邮件订阅验证机制

---

## 扩展可能性

### 未来可添加的功能

1. **AI 助手** - 文章摘要生成、相关内容推荐
2. **协作编辑** - 邀请他人共同创作
3. **付费订阅** - 会员专属内容
4. **多语言** - i18n 支持
5. **语音版** - 文章朗读
6. **笔记导入** - 从 Obsidian/Notion 导入
7. **API 开放** - 提供公开 API 供第三方使用
8. **移动 App** - PWA 或原生 App
9. **实时协作** - WebSocket 支持
10. **数据分析** - 更深度的内容分析

---

## 总结

Qubit 是一个野心勃勃的项目，旨在构建一个功能丰富、设计精良的个人知识分享平台。通过模块化设计，可以按需实现各个功能，不必一次性完成所有模块。

**建议优先级：**
1. 博客系统（核心功能）
2. 设计系统与布局（基础体验）
3. 数字花园（特色功能）
4. 其他模块（增值功能）

**成功关键：**
- 内容质量 > 功能数量
- 阅读体验 > 视觉炫酷
- 持续迭代 > 一次性完美