'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mainNavigation } from '@/config/navigation';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-4 rounded-full bg-[var(--color-accent)] text-white shadow-lg"
        aria-label="打开导航"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[var(--color-background)]">
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                aria-label="关闭导航"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-4 space-y-4">
              {mainNavigation.filter((item) => item.href).map((item) => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="block py-3 text-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-medium">{item.title}</span>
                  {item.description && (
                    <span className="block text-sm text-[var(--color-text-subtle)] mt-1">
                      {item.description}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}