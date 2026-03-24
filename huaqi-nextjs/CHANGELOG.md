
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
