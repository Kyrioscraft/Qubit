import type { Article, Project, Review } from '@/types';

interface PersonJsonLD {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  url: string;
  image?: string;
  sameAs?: string[];
}

interface WebsiteJsonLD {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  author?: PersonJsonLD;
}

interface BlogPostingJsonLD {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: PersonJsonLD;
  url: string;
  image?: string;
  keywords?: string[];
}

interface ProjectJsonLD {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

interface ReviewJsonLD {
  '@context': 'https://schema.org';
  '@type': 'Review';
  itemReviewed: {
    '@type': 'Book' | 'Movie';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: 5;
    worstRating: 1;
  };
  author: PersonJsonLD;
  datePublished: string;
  reviewBody: string;
}

export function generatePersonJsonLD(): PersonJsonLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    url: 'https://qubit.pages.dev',
    sameAs: [
      'https://github.com/yourusername',
      'https://twitter.com/yourusername',
    ],
  };
}

export function generateWebsiteJsonLD(): WebsiteJsonLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Qubit',
    url: 'https://qubit.pages.dev',
    description: '个人知识分享平台',
    author: generatePersonJsonLD(),
  };
}

export function generateArticleJsonLD(article: Article): BlogPostingJsonLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: generatePersonJsonLD(),
    url: `https://qubit.pages.dev/blog/${article.slug}`,
    image: article.coverImage || 'https://qubit.pages.dev/og/default.png',
    keywords: article.tags,
  };
}

export function generateProjectJsonLD(project: Project): ProjectJsonLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: project.links.demo || `https://qubit.pages.dev/projects/${project.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
  };
}

export function generateReviewJsonLD(review: Review): ReviewJsonLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': review.type === 'book' ? 'Book' : 'Movie',
      name: review.subject,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: generatePersonJsonLD(),
    datePublished: review.date.toISOString(),
    reviewBody: review.content.substring(0, 200),
  };
}

export function JsonLDScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}