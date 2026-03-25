## 2026-03-26

### Enhancement
- **`app/sitemap.ts`** - Added all 20 `/pokemon/[id]` card detail pages to the sitemap (priority 0.7, weekly changeFrequency). Previously only the `/pokemon` collection page was indexed. Build verified OK.

## 2026-03-25

### Enhancement
- **`app/opengraph-image.tsx`** - New. Open Graph image generation for homepage (`/`). 1200×630px social sharing image with company logo badge, 華啓未来 / HUAQI FUTURE INC., and tagline. Dark gradient background matching site aesthetic, gold accent colors. Generates `/opengraph-image.png` via Next.js OG Image API. Build verified OK.
- **`app/packs/opengraph-image.tsx`** - New. Dedicated OG image for `/packs` route. Same style as homepage OG image but with "ジェムパック シリーズ / GEM PACK SERIES" title. Build verified OK.
- **`app/sitemap.ts`** - New. Dynamic sitemap covering all 12 site routes (home, business, packs×5 volumes, company, contact, market, privacy, law) with correct priority/changeFrequency. Serves at `/sitemap.xml`. Build verified OK.

## 2026-03-23

### Bug Fix
- **`app/legal/page.tsx`** - Deleted. This page was a duplicate of /law + /privacy (contained identical 特定商取引法 and プライバシーポリシー content) and was not linked from Navbar or Footer (only /law and /privacy are linked). Removed dead page to eliminate content redundancy and prevent SEO dilution. Build verified OK.
- **`tailwind.config.ts`** - Fixed missing `surface-50` / `surface-100` color scale definitions. The `surface` token was defined as a single-color string but codebase used `bg-surface-50` (via `@apply` in globals.css and JSX className). Added `surface.50` and `surface.100` to the color scale. Build verified OK.

## 2026-03-20

### Bug Fix
- **`app/services/page.tsx`** - Fixed TypeScript compilation error: removed duplicate `import type { Metadata }` block and orphaned `BusinessPage` dead code that resulted from a copy-paste merge with `business/page.tsx`. File now has single clean `ServicesPage` export. Build verified OK.

## 2026-03-24

### Bug Fix
- **`components/Footer.tsx`** - Fixed copyright year from `© 2024` to `© 2024-2026` to reflect current year. Build verified OK.
