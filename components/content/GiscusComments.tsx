'use client';

interface GiscusCommentsProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export function GiscusComments({
  repo = 'yourusername/your-blog-comments',
  repoId = 'your-repo-id',
  category = 'Announcements',
  categoryId = 'your-category-id',
}: GiscusCommentsProps) {
  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        评论
      </h2>
      <div className="giscus-frame">
        <script
          src="https://giscus.app/client.js"
          data-repo={repo}
          data-repo-id={repoId}
          data-category={category}
          data-category-id={categoryId}
          data-mapping="pathname"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="top"
          data-theme="preferred_color_scheme"
          data-lang="zh-CN"
          data-loading="lazy"
          crossOrigin="anonymous"
          async
        />
      </div>
    </section>
  );
}