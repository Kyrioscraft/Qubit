import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 图片优化配置 - Cloudflare Workers 不支持内置图片优化
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