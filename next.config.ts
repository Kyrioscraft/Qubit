import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 图片优化配置
  images: {
    // 远程图片域名白名单
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 图片格式优化
    formats: ['image/avif', 'image/webp'],
  },

  // 性能优化
  experimental: {
    // 启用部分预渲染（可选）
    // ppr: true,
  },

  // 字体优化（默认已启用）
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

  // 重定向规则
  async redirects() {
    return [
      // 示例重定向
    ];
  },
};

export default nextConfig;