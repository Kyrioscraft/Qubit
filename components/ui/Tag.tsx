import type { HTMLAttributes } from 'react';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'muted' | 'accent';
  size?: 'sm' | 'md';
}

export function Tag({
  className = '',
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: TagProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    default: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]',
    muted: 'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
    accent: 'bg-[var(--color-accent)] text-white',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags: string[];
  variant?: 'default' | 'muted' | 'accent';
  size?: 'sm' | 'md';
  linkable?: boolean;
}

export function TagList({
  className = '',
  tags,
  variant = 'muted',
  size = 'sm',
  linkable = false,
  ...props
}: TagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
      {tags.map((tag) => (
        linkable ? (
          <a
            key={tag}
            href={`/blog/tags/${tag}`}
            className={`inline-flex items-center font-medium rounded-full ${variant === 'default' ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]' : variant === 'accent' ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'} ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'} hover:opacity-80 transition-opacity`}
          >
            {tag}
          </a>
        ) : (
          <Tag key={tag} variant={variant} size={size}>
            {tag}
          </Tag>
        )
      ))}
    </div>
  );
}