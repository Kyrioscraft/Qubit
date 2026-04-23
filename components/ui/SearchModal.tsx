'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface SearchResult {
  type: 'article' | 'garden';
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  contentSnippet?: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // 开始关闭动画并导航
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  // 关闭并导航到结果
  const handleSelect = useCallback((url: string) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      window.location.href = url;
    }, 200);
  }, [onClose]);

  // 加载搜索索引
  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => {
        setSearchIndex(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load search index:', err);
        setIsLoading(false);
      });
  }, []);

  // 搜索逻辑
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim() || searchIndex.length === 0) {
      setResults([]);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    const matched = searchIndex
      .filter((item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        item.contentSnippet?.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 10);

    setResults(matched);
    setSelectedIndex(0);
  }, [searchIndex]);

  // 处理输入
  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || isClosing) return;

      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          if (results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex].url);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handleSelect, results, selectedIndex, isClosing]);

  // 重置状态
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[var(--color-background)]/90 backdrop-blur-sm transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div className="max-w-2xl mx-auto px-4 py-8" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          aria-label="关闭搜索"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 搜索输入 */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章、知识节点..."
            autoFocus
            className="search-input w-full h-12 pl-12 pr-4 text-lg rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus-visible:outline-none"
          />
          {isLoading && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-muted)]">
              加载中...
            </span>
          )}
        </div>

        {/* 搜索结果 */}
        {results.length > 0 && (
          <ul className="mt-4 space-y-2">
            {results.map((result, index) => (
              <li
                key={`${result.type}-${result.slug}`}
                className={`block p-4 rounded-lg border transition-colors ${
                  index === selectedIndex
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]'
                }`}
              >
                <Link 
                  href={result.url} 
                  className="block"
                  onClick={() => handleSelect(result.url)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]">
                      {result.type === 'article' ? '文章' : '知识节点'}
                    </span>
                    <span className="font-medium text-[var(--color-text)]">
                      {result.title}
                    </span>
                  </div>
                  {result.description && (
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                      {result.description}
                    </p>
                  )}
                  {result.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {result.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded bg-[var(--color-accent-subtle)] text-[var(--color-accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* 无结果提示 */}
        {query.trim() && results.length === 0 && !isLoading && (
          <p className="mt-4 text-center text-[var(--color-text-muted)]">
            未找到相关内容
          </p>
        )}

        {/* 提示 */}
        <div className="mt-6 flex justify-center gap-4 text-sm text-[var(--color-text-subtle)]">
          <span>↑↓ 导航</span>
          <span>Enter 选择</span>
          <span>Esc 关闭</span>
        </div>
      </div>
    </div>
  );
}