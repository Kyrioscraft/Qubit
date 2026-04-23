export default function DashboardPage() {
  return (
    <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">分析仪表盘</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          网站访问统计和数据洞察
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
            总访问量
          </h3>
          <p className="text-3xl font-bold text-[var(--color-text)]">
            --
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            需配置分析服务
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
            本月访问量
          </h3>
          <p className="text-3xl font-bold text-[var(--color-text)]">
            --
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            需配置分析服务
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
            活跃访客
          </h3>
          <p className="text-3xl font-bold text-[var(--color-text)]">
            --
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            需配置分析服务
          </p>
        </div>
      </div>

      <section className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-8">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          集成分析服务
        </h2>
        <p className="text-[var(--color-text-muted)] mb-4">
          要启用分析功能，请在你的 Cloudflare Pages 或其他分析服务中配置以下选项：
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[var(--color-background)]">
            <h3 className="font-medium text-[var(--color-text)] mb-2">
              Cloudflare Web Analytics
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              如果部署在 Cloudflare Pages，可在 Cloudflare Dashboard 中查看 Analytics。
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--color-background)]">
            <h3 className="font-medium text-[var(--color-text)] mb-2">
              Umami Analytics
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Umami 是一个开源的分析解决方案，可以在 umami.is 免费托管或自托管。
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--color-background)]">
            <h3 className="font-medium text-[var(--color-text)] mb-2">
              Plausible Analytics
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Plausible 是一个轻量级的 GDPR 合规分析服务。
            </p>
          </div>
        </div>
      </section>

      <section className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          文章阅读排行
        </h2>
        <p className="text-[var(--color-text-muted)]">
          配置分析服务后显示最受欢迎的文章。
        </p>
      </section>
    </div>
  );
}