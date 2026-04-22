import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出配置 - 用于 Cloudflare Pages
  output: 'export',
  distDir: 'dist',

  // 图片优化配置 - 静态导出不支持 Next.js 图片优化
  images: {
    unoptimized: true,
  },

  // 性能优化
  experimental: {
    viewTransition: true,
  },

  // 优化响应头
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;