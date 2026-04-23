<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Next.js 16.2.4 — APIs/conventions differ from stable. Read `node_modules/next/dist/docs/` before writing code.
<!-- END:nextjs-agent-rules -->

## Dev commands

```bash
pnpm dev      # Dev server (http://localhost:3000)
pnpm build    # Runs prebuild then next build
pnpm lint    # ESLint
```

**Build order matters:** `npm run build` runs `prebuild` first (generates search-index.json, rss.xml, sitemap.xml to public/)

## Architecture

- **Static export** to `dist/` (Cloudflare Pages)
- **Content:** `content/articles/*.mdx`, `content/garden/*.mdx`
- **Routes:** App Router (`app/`), dynamic routes via `[slug]`
- **MDX:** `next-mdx-remote` + shiki syntax highlighting
- **Styling:** Tailwind v4 + @tailwindcss/typography

## Key paths

- `scripts/prebuild.js` — generates static assets from MDX frontmatter
- `config/site.ts` — site metadata, navigation config
- `public/` — static assets (includes generated files after prebuild)

## Gotchas

- ESLint uses flat config (`eslint.config.mjs`, not `.eslintrc`)
- TypeScript: `"moduleResolution": "bundler"`
- Draft content (`status: draft` in frontmatter) excluded from builds
- `dist/` is output dir (not `.next/` for final build)