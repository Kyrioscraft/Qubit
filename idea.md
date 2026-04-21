
📋 方案概览

核心框架：Next.js 14/15 (App Router)
代码托管：GitHub
部署平台：Cloudflare Pages (利用其全球 CDN 和自动构建)
适用场景：个人博客、企业官网、文档站、SaaS 落地页。
注意：Cloudflare Pages 对 Next.js 的支持主要针对静态生成 (SSG) 和部分服务端渲染 (SSR/Edge Runtime)。

🚀 第一阶段：准备工作 (GitHub & Next.js)

在开始之前，我们需要确保你的 Next.js 项目结构是“干净”且易于部署的。

初始化 Next.js 项目
如果你还没有项目，使用官方推荐方式创建：
npx create-next-app@latest my-blog
# 推荐选择：TypeScript, ESLint, Tailwind CSS, App Router


推送到 GitHub
在你的 GitHub 账号下创建一个新的仓库（Repository），并将代码推送上去。
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin
git push -u origin main

⚙️ 第二阶段：Cloudflare Pages 部署配置

这是最关键的一步。Cloudflare 在 2024-2026 年间更新了界面，入口有所变化，请按以下步骤操作：

找到正确入口
登录 Cloudflare 控制台，不要直接点“创建应用程序”（那是 Workers 的入口）。
路径：左侧菜单点击 "计算和AI" -> "Workers 和 Pages" -> 点击右侧的 "创建应用程序" -> 选择 "Pages"。

连接 GitHub
点击 "连接到 Git"。
授权 Cloudflare 访问你的 GitHub 账号。
在列表中选择你刚才创建的 Next.js 仓库。

配置构建设置 (关键参数)
Cloudflare 通常能自动检测 Next.js，但为了确保万无一失，请手动核对以下参数：
配置项   设置值   说明
框架预设   Next.js   自动适配配置

构建命令   npx @cloudflare/next-on-pages@1   注意：这是针对 Cloudflare 优化的构建命令，比默认的 next build 更稳定。如果报错，可尝试回退到 npm run build

构建输出目录   .vercel/output/static   或者是留空（让预设自动处理）

| 环境变量 | (可选) | 如果你的项目依赖 API Key，在这里添加 |

💡 避坑指南：
如果你的项目包含图片，确保 public 目录在根目录下。如果是 Next.js 14+，默认配置通常能直接跑通。

🛠️ 第三阶段：进阶优化 (解决 522 错误与自定义域名)

很多新手部署后会遇到 522 错误（连接超时），这通常是因为 DNS 配置或 SSL 设置不当。

绑定自定义域名 (强烈推荐)
Cloudflare 提供的 .pages.dev 域名虽然免费，但国内访问偶尔受限。绑定自己的域名并开启“小黄云”（CDN 代理）是最佳实践。

在 Pages 项目页面，点击 "自定义域" -> "设置自定义域"。
输入你的域名（例如 blog.yourdomain.com）。
DNS 配置：
系统会提示你添加一条 CNAME 记录。
关键点：确保 Cloudflare 的代理状态是 "已代理 (橙色云)"。这能隐藏你的源站 IP 并提供加速。

解决 522 错误的终极方案
如果你绑定了域名却看到 522 错误，请检查以下两点：
SSL/TLS 模式：在 Cloudflare 域名概览页面，将 SSL/TLS 加密模式设置为 "完全 (Full)" 或 "严格 (Strict)"，千万不要选“灵活 (Flexible)”。
激活域名：在 Pages 的自定义域设置里，确保域名状态显示为 "Active"。

🔄 第四阶段：自动化工作流

配置完成后，你的工作流将变得极其高效：

本地开发：
npm run dev
# 写完文章/改完代码后
git add .
git commit -m "Update blog post"
git push

自动部署：
一旦你执行 git push，GitHub 会触发 Webhook，Cloudflare Pages 会自动拉取最新代码，运行构建命令，并在约 30-90 秒内更新全球 CDN 节点。

📌 总结：为什么选择这套方案？

成本：0 元。Cloudflare 的免费额度对于个人博客绰绰有余（每月 500 次构建，无限流量）。
速度：Cloudflare 的边缘网络遍布全球，配合 Next.js 的静态生成，首屏加载极快。
现代：Next.js App Router 是目前 React 生态的主流，配合 Cloudflare 的 Edge Runtime，你可以编写运行在边缘的 Serverless 函数（API 路由），实现全栈功能。
