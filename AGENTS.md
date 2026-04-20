## Project Overview

This project is a static wedding website titled "Forever Fest 2026" for Sean & Eva's wedding site.

Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4 + pnpm (>=10) + Node >=24 + Vercel

## Commands

```bash
pnpm build         # Production build
pnpm lint          # ESLint with auto-fix (formatting lives here)
pnpm typecheck     # TypeScript type checking
pnpm test:e2e      # Playwright smoke tests
pnpm validate      # lint + typecheck + e2e smoke tests (runs concurrently)
```

Test commands
- Playwright smoke tests live in `tests/e2e/`.
- `pnpm test:e2e` runs the smoke suite with Playwright.
- `pnpm validate` runs lint, typecheck, and the e2e smoke suite.

## Code Style Guidelines

### Imports
- Group imports with a blank line between groups.
- Order: external packages, internal aliases (`@/`), type-only imports, styles.
- Use `import type` for types.

### Formatting and Linting
- Rely on ESLint auto-fix for quotes, spacing, and line length.
- `no-console` is allowed in lint, but Next.js strips console calls in production builds.

### TypeScript
- `strict` mode is on; keep types explicit.
- Use `type` over `interface` for props and shapes.

### Naming
- Components: `PascalCase`.
- Hooks: `useSomething` in `camelCase`.
- Utilities/constants: `camelCase` and `SCREAMING_SNAKE_CASE`.
- Files:
  - Components: `kebab-case.tsx`
  - Hooks/utils: `camelCase.ts`
  - Next.js files/configs: lowercase

### Components
```tsx
'use client'; // only when needed

import { ... } from '...';

type Props = { ... };

const CONSTANT = 123;

const SubComponent = ({ prop }: { prop: string }) => ( ... );

export function Component({ prop }: Props) => {
  const [state, setState] = useState(null);

  const handleClick = () => { ... };

  return ( ... );
};
```

### Exports
- Named exports for reusable components.
- Default exports for Next.js pages/layouts.

### Server vs Client Components
- Server Components by default.
- Add `'use client'` for interactivity, browser APIs, or client-only libraries.

### Styling
- Tailwind CSS is the default styling system.
- Use `cn()` from `@/lib/utils` for conditional class names.
- Custom colors: `penn-blue`, `syracuse-orange`, `steel-pink`.
- Custom fonts: `var(--font-league-gothic)`, `var(--font-alex-brush)`.

### Next.js Conventions
- Export `metadata` (type `Metadata`) where appropriate.
- Prefer `next/image` static imports for key local images when practical.
- For above-the-fold images, prefer `fetchPriority='high'` or `preload` as appropriate.
- Load fonts via `next/font/google` with CSS variables.
- `typedRoutes` is enabled; keep route strings valid.

### Performance
- React Compiler is enabled; avoid manual memoization unless proven necessary.
- Use `React.lazy` + `Suspense` or `useInViewLazyLoad` for heavy UI.
- Keep components small and data flow simple.

### Error Handling
- Prefer explicit guards and early returns over deep nesting.
- Use typed errors in utilities; avoid throwing raw strings.
- When dealing with async side effects in hooks, clean up in `useEffect`.
- For missing or invalid data in pages, use Next.js error boundaries or `notFound()` when appropriate.

### Accessibility
- Use semantic HTML and aria attributes when needed (Radix components already help).
- Ensure interactive elements are keyboard accessible.

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

## Additional Notes

- Path alias: `@/*` -> repo root.
- `next.config.ts` enforces build-time TypeScript safety.
- Use `pnpm validate` before shipping UI changes.
