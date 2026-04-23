export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: '博客',
    href: '/blog',
    description: '文章、教程和思考',
  },
  {
    title: '数字花园',
    href: '/garden',
    description: '互联的知识节点',
  },
  {
    title: '项目',
    href: '/projects',
    description: '我的作品和项目',
  },
  {
    title: '书签',
    href: '/bookmarks',
    description: '收藏的链接和资源',
  },
  {
    title: '评价',
    href: '/reviews',
    description: '书评和影评',
  },
  {
    title: '时间线',
    href: '/timeline',
    description: '个人里程碑',
  },
  {
    title: '下载',
    href: '/downloads',
    description: '资源下载',
  },
  {
    title: '演讲',
    href: '/talks',
    description: '演讲与分享',
  },
  {
    title: '关于',
    href: '/about',
    description: '关于我',
  },
];

export const footerNavigation = {
  content: [
    { title: '博客', href: '/blog' },
    { title: '数字花园', href: '/garden' },
    { title: '项目', href: '/projects' },
    { title: '书签', href: '/bookmarks' },
    { title: '时间线', href: '/timeline' },
  ],
  about: [
    { title: '关于我', href: '/about' },
    { title: '订阅', href: '/subscribe' },
    { title: 'RSS', href: '/rss.xml' },
    { title: '分析', href: '/dashboard' },
  ],
  social: [
    { title: 'GitHub', href: 'https://github.com/yourusername' },
    { title: 'Twitter', href: 'https://twitter.com/yourusername' },
  ],
};

export const sidebarNavigation: NavItem[] = [
  {
    title: '探索',
    children: [
      { title: '全部文章', href: '/blog' },
      { title: '系列文章', href: '/blog?filter=series' },
      { title: '标签', href: '/blog/tags' },
    ],
  },
  {
    title: '花园',
    children: [
      { title: '知识图谱', href: '/garden/graph' },
      { title: '种子', href: '/garden?maturity=seed' },
      { title: '常青', href: '/garden?maturity=evergreen' },
    ],
  },
];