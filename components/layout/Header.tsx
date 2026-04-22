'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { mainNavigation } from '@/config/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SearchModal } from '@/components/ui/SearchModal';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
      <div className="max-w-[var(--content-width-full)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
          >
            <span className="text-xl tracking-tight">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {mainNavigation.slice(0, 4).filter((item) => item.href).map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
              aria-label="搜索"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
              aria-label="菜单"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-[var(--color-background)] border-b border-[var(--color-border)]">
          <nav className="px-4 py-4 space-y-2">
            {mainNavigation.filter((item) => item.href).map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                className="block py-2 text-base text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {/* 移动端搜索按钮 */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="block py-2 text-base text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors w-full text-left"
            >
              搜索...
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}