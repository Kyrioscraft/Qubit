import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLDScript, generateWebsiteJsonLD } from '@/components/seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-body',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Qubit',
    template: '%s | Qubit',
  },
  description: '个人知识分享平台 - 系统化整理和分享个人知识',
  metadataBase: new URL('https://qubit.pages.dev'),
  authors: [{ name: 'Your Name', url: 'https://qubit.pages.dev/about' }],
  creator: 'Your Name',
  publisher: 'Qubit',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://qubit.pages.dev',
    title: 'Qubit',
    description: '个人知识分享平台',
    siteName: 'Qubit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qubit',
    description: '个人知识分享平台',
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
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLDScript data={generateWebsiteJsonLD()} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-text)]">
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          跳转到主要内容
        </a>

        {/* Header */}
        <Header />

        {/* Main Content with View Transitions */}
        <ViewTransitions>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </ViewTransitions>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}