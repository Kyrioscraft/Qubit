import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerNavigation } from '@/config/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border-subtle)]">
      <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold text-[var(--color-text)]"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-muted)] max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">
              内容
            </h3>
            <ul className="space-y-2">
              {footerNavigation.content.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">
              关于
            </h3>
            <ul className="space-y-2">
              {footerNavigation.about.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">
              社交
            </h3>
            <ul className="space-y-2">
              {footerNavigation.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-2"
                  >
                    {item.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-[var(--color-border-subtle)]">
          <p className="text-xs text-center text-[var(--color-text-subtle)]">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}