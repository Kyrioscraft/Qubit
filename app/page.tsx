import { Button, ButtonLink, Card, CardTitle, CardDescription } from '@/components/ui';
import { mainNavigation } from '@/config/navigation';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[var(--text-hero)] font-bold tracking-tight text-[var(--color-text)] mb-6 animate-fade-in">
              Qubit
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-8 animate-slide-up">
              个人知识分享平台 - 系统化整理和分享个人知识
            </p>
            <div className="flex justify-center gap-4 animate-slide-up">
              <ButtonLink href="/blog" variant="primary" size="lg">
                浏览博客
              </ButtonLink>
              <ButtonLink href="/garden" variant="secondary" size="lg">
                数字花园
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12">
        <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">探索内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainNavigation.slice(0, 4).map((item) => (
              <Card key={item.href} variant="interactive" padding="md">
                <a href={item.href}>
                  <CardTitle>{item.title}</CardTitle>
                  {item.description && (
                    <CardDescription className="mt-2">{item.description}</CardDescription>
                  )}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">关于 Qubit</h2>
            <div className="prose">
              <p>
                Qubit 是一个现代化的个人知识分享平台。它超越了传统博客的概念，
                整合了数字花园、项目展厅、书签收藏等多个模块，旨在打造一个完整的知识生态系统。
              </p>
              <p>
                这里的每一篇文章、每一个知识节点都是经过深思熟虑的产物。
                通过双向链接系统，不同知识点之间形成有机的连接，
                帮助读者更好地理解和探索相关内容。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}