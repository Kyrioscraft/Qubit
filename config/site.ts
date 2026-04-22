import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Qubit',
  description: '个人知识分享平台 - 系统化整理和分享个人知识',
  url: 'https://qubit.pages.dev',
  ogImage: '/og/default.png',
  author: {
    name: 'Your Name',
    email: 'your@email.com',
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  social: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  navigation: [
    { title: '博客', href: '/blog' },
    { title: '花园', href: '/garden' },
    { title: '项目', href: '/projects' },
    { title: '关于', href: '/about' },
  ],
  footerNavigation: {
    content: [
      { title: '博客', href: '/blog' },
      { title: '数字花园', href: '/garden' },
      { title: '项目展厅', href: '/projects' },
      { title: '书签', href: '/bookmarks' },
      { title: '时间线', href: '/timeline' },
    ],
    about: [
      { title: '关于我', href: '/about' },
      { title: '订阅', href: '/subscribe' },
      { title: 'RSS', href: '/rss.xml' },
    ],
    legal: [
      { title: '隐私政策', href: '/privacy' },
    ],
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};