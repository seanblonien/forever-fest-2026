# AGENTS.md - Forever Fest 2026

## Project Overview

Next.js 16 (App Router) + TypeScript (strict) + Tailwind CSS + pnpm (>=10) + Node >=24 + Vercel

## Commands

```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Production build
pnpm lint         # Run ESLint (auto-fixes formatting issues)
pnpm typecheck    # TypeScript type checking
pnpm validate     # Both lint and typecheck
```

**Important**: Use `pnpm lint` CLI for all formatting - it handles quotes, semicolons, indentation, line length, etc. Don't manually format.

## Conventions

### Naming
- Files: `PascalCase.tsx` (components), `camelCase.ts` (utils/hooks), `lowercase` (Next.js files, configs)
- Vars/functions: `camelCase`, Constants: `SCREAMING_SNAKE_CASE`, Components: `PascalCase`, Types: `PascalCase` + suffix (`Props`, `Options`)

### Import Order (blank lines between groups)
1. External (React, Next.js, libraries)
2. Internal (`@/components`, `@/lib`)
3. Type-only (`import type`)
4. Styles (CSS last)

### Component Structure
```
'use client';  // if needed

import { ... } from '...';

type Props = { ... };

const CONSTANT = 123;

const SubComponent = ({ prop }: { prop: string }) => ( ... );

export const Component: React.FC<Props> = ({ prop }) => {
  const [state, setState] = useState(null);
  
  const handleClick = () => { ... };
  
  return ( ... );
};
```

### Export Style
- Named exports for reusable components: `export const Button = () => { ... }`
- Default exports for pages/layouts: `export default Page;`

### Server vs Client Components
- Default: Server Components (no directive)
- Use `'use client'` for: interactivity, browser APIs, client-side libraries

### TypeScript
- Use `React.FC<Props>` for components
- Prefer `type` over `interface` for object shapes/props
- Explicit types for function parameters and returns

### Tailwind
- Custom colors: `penn-blue`, `syracuse-orange`, `steel-pink`
- Custom fonts: `var(--font-league-gothic)`, `var(--font-alex-brush)`
- Use `cn()` utility for conditional classes

### Next.js
- Export `metadata` object from pages (type: `Metadata`)
- Use `next/image` with `priority` for above-fold images
- Load fonts via `next/font/google` with CSS variables

### Performance
- React Compiler enabled (avoid manual memoization)
- Lazy load with `React.lazy()` + `Suspense` or `useInViewLazyLoad` hook

## File Organization

```
app/              # App Router pages and layouts
components/
  ├── home/       # Home page components
  ├── pages/      # Page-level components
  ├── shared/     # Reusable components
  ├── svgs/       # SVG components
  └── ui/         # shadcn/ui components
hooks/            # Custom React hooks
lib/              # Utilities, types, constants
public/           # Static assets
styles/           # Global CSS
```

## Notes

- Path alias: `@/*` → root
- No test suite (add Vitest/Jest if needed)
