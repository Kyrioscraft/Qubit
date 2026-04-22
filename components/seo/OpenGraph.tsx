import type { Metadata } from 'next';

interface OpenGraphProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
  image?: string;
  publishedAt?: string;
  author?: string;
}

export function generateOpenGraphMetadata(props: OpenGraphProps): Metadata {
  const { title, description, url, type = 'website', image, publishedAt, author } = props;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: 'Qubit',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };

  if (image) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    };
    metadata.twitter = {
      ...metadata.twitter,
      images: [image],
    };
  }

  if (type === 'article' && publishedAt) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedAt,
      authors: author ? [author] : undefined,
    };
  }

  return metadata;
}

export function generateArticleMetadata(
  title: string,
  description: string,
  slug: string,
  publishedAt: string,
  author?: string,
  image?: string
): Metadata {
  return generateOpenGraphMetadata({
    title,
    description,
    url: `https://qubit.pages.dev/blog/${slug}`,
    type: 'article',
    image: image || '/og/default.png',
    publishedAt,
    author,
  });
}