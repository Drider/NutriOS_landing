# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NutriOS landing page — a Russian-language (`lang="ru"`) marketing/waitlist page for a fictional "Personal Nutrition OS" product. Client-side only React 19 + TypeScript + Vite SPA, no router, no backend. The full product brief, copy requirements, visual direction, and Definition of Done live in `SPEC.md` — read it before making product, content, or design decisions; it is the governing spec for this project, not just historical context.

## Commands

```bash
npm run dev       # start Vite dev server (5173, falls back to 5174 if occupied)
npm run build     # tsc -b (project references) then vite build — must pass with zero errors before considering work done
npm run lint      # eslint .
npm run preview   # serve the production build locally
```

There is no test runner configured (no Vitest/Jest, no test files). Verification for this project is: `tsc -b`, `eslint .`, and `npm run build` all passing clean, plus manual/visual checks in the browser.

## Architecture

### Content/component separation

All page copy lives in `src/data/landing.ts` as a single `landingContent` object typed by `src/types/landing.ts` (`LandingContent` interface). Components read strings from `landingContent`, they don't hardcode copy inline. When adding or changing copy, edit the data/types layer, not the JSX. Copy is Russian; keep new content in Russian and consistent with the tone in `SPEC.md`.

### Component layers (`src/components/`)

- `ui/` — generic primitives with no product knowledge: `Button`, `Card`, `Input`, `SectionHeading`. `Card` forwards its ref (needed for scroll-reveal targets).
- `layout/` — `Header`, `Footer`, `Container` (page chrome, appears once).
- `sections/` — one component per landing-page section (`Hero`, `Problem`, `Context`, `HowItWorks`, `ProductPreview`, `Personalization`, `Assistant`, `NutritionLoop`, `Safety`, `FinalCTA`). `App.tsx` composes these in a fixed order that matches the narrative in `SPEC.md` §7 — don't reorder without checking the spec.
- `product/` — `AppShell`, `ProductSidebar`, `ProductHeader`, `MealPlan`, `PersonalContext`, `AssistantPreview`: a **static visual mockup** of the future NutriOS app, rendered inside the `ProductPreview` section. This is marketing prototype UI, not a functional app — don't wire up real state, routing, or data fetching here; keep it presentational per SPEC.md §13/§36 ("do not overbuild").

Each component is colocated as `ComponentName/ComponentName.tsx` + `ComponentName.module.css`.

### Design tokens

`src/styles/tokens.css` defines all CSS custom properties (colors, spacing scale, radii, shadows, font sizes, `--header-height`). Component CSS Modules should consume these tokens rather than inventing new spacing/color values.

### Scroll-reveal animation

`src/hooks/useScrollReveal.ts` (IntersectionObserver-based) pairs with shared classes in `src/styles/animations.module.css` (`.reveal`, `.isVisible`, `.revealDelayN`). The hook short-circuits to already-visible when `prefers-reduced-motion: reduce` is set — animations must stay non-essential to understanding content (SPEC.md §20/§28).

### Waitlist form

`src/hooks/useWaitlistForm.ts` owns the idle/loading/success/error state machine and email validation; `src/lib/waitlist.ts` (`submitWaitlist`) is an intentionally-stubbed backend boundary ("API integration will be connected later"). Keep that boundary thin — don't add real auth, persistence, or backend logic there; all `Join the waitlist` CTAs across the page must point at the same `#waitlist` form, not separate flows.

### `backdrop-filter` + `position: fixed` gotcha

`Header` has `backdrop-filter: blur(...)`, which (like `filter`/`transform`/`will-change: transform`) creates a new containing block for `position: fixed` descendants. The mobile menu overlay is therefore rendered via `createPortal(..., document.body)` in `Header.tsx` rather than as a normal DOM child of `<header>` — otherwise `inset: 0` resolves against the header's own box instead of the viewport. Keep this in mind if adding other fixed-position overlays under an ancestor with backdrop-filter/transform/will-change.

### TypeScript config notes

`verbatimModuleSyntax` is enabled (`tsconfig.app.json`) — use `import type { ... }` for type-only imports. `noUnusedLocals`/`noUnusedParameters` are enforced; ESLint additionally allows unused vars/args prefixed with `_`.

### Safety/positioning constraints

Per SPEC.md §33–34, NutriOS must never be presented as a medical product (no diagnosis/treatment/cure claims, no "AI doctor" framing). The required short disclaimer appears on the page and the extended version in the footer/Safety section (`src/data/landing.ts`) — preserve this copy's meaning if editing it, and don't introduce medical claims elsewhere in new copy.
