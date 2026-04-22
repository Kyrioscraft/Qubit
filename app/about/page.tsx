export default function AboutPage() {
  return (
    <div className="max-w-[var(--content-width)] mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">关于我</h1>
      </header>

      {/* Content */}
      <div className="prose max-w-none">
        <p className="text-lg text-[var(--color-text-muted)] mb-6">
          欢迎来到 Qubit，这是一个我用来整理和分享知识的个人平台。
        </p>

        <h2>关于这个网站</h2>
        <p>
          Qubit 是一个现代化的个人知识分享平台，整合了博客、数字花园、项目展厅等多个模块。
          通过双向链接系统，不同知识点之间形成有机的连接，帮助读者更好地理解和探索相关内容。
        </p>

        <h2>技术栈</h2>
        <ul>
          <li><strong>框架</strong>: Next.js 16 (App Router)</li>
          <li><strong>语言</strong>: TypeScript 5</li>
          <li><strong>样式</strong>: Tailwind CSS 4</li>
          <li><strong>内容</strong>: MDX (Content Collections)</li>
          <li><strong>部署</strong>: Cloudflare Pages</li>
        </ul>

        <h2>功能模块</h2>
        <ul>
          <li><strong>博客</strong> (/blog) - 文章、教程和思考</li>
          <li><strong>数字花园</strong> (/garden) - 互联的知识节点</li>
          <li><strong>项目展厅</strong> (/projects) - 作品和项目展示</li>
          <li><strong>书签收藏</strong> (/bookmarks) - 收藏的链接和资源</li>
          <li><strong>书评影评</strong> (/reviews) - 书籍和电影的评价</li>
          <li><strong>时间线</strong> (/timeline) - 个人里程碑记录</li>
        </ul>

        <h2>联系方式</h2>
        <p>
          你可以通过以下方式联系我：
        </p>
        <ul>
          <li>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">yourusername</a></li>
          <li>Twitter: <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">@yourusername</a></li>
          <li>Email: your@email.com</li>
        </ul>

        <h2>订阅</h2>
        <p>
          如果你想获取最新内容，可以：
        </p>
        <ul>
          <li><a href="/subscribe">订阅邮件通知</a></li>
          <li><a href="/rss.xml">RSS 订阅</a></li>
        </ul>
      </div>
    </div>
  );
}