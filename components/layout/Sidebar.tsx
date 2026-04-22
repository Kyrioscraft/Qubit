'use client';

import Link from 'next/link';
import { sidebarNavigation } from '@/config/navigation';

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-[var(--sidebar-width)] fixed left-0 top-16 bottom-0 overflow-y-auto border-r border-[var(--color-border-subtle)] bg-[var(--color-background)]">
      <div className="px-4 py-6">
        {sidebarNavigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="text-xs font-semibold text-[var(--color-text-subtle)] uppercase tracking-wider mb-3">
              {section.title}
            </h4>
            {section.children && (
              <ul className="space-y-1">
                {section.children.filter((item) => item.href).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href!}
                      className="block py-1.5 px-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}