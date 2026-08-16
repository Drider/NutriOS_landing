# NutriOS Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, premium consumer-SaaS landing page for NutriOS ("Personal Nutrition OS") in React + TypeScript + Vite, entirely in Russian copy, converting visitors to a waitlist signup.

**Architecture:** Client-side Vite SPA (no routing, no global state library). Static marketing content lives in a typed `data/landing.ts` module consumed by presentational section components. A small `product/` component family (Sidebar, Header, MealPlan, ContextCard, AssistantPreview) is composed twice — a compact variant in the Hero and a full desktop/mobile app-shell in the dedicated Product Preview section — to make the product concrete without being a flattened image. CSS Modules + a single global design-token sheet keep visuals consistent; a tiny `useScrollReveal` hook + global CSS handle optional reveal animations and `prefers-reduced-motion`. Waitlist submission goes through one abstracted `submitWaitlist()` function so the UI has zero backend coupling.

**Tech Stack:** React 19, TypeScript, Vite (react-ts template, ESLint not oxlint), CSS Modules, `@fontsource-variable/manrope` (self-hosted variable font), no UI kit, no animation library, no state library, no test framework (none required by the spec; verification is via `tsc`, ESLint, `vite build`, and manual browser/Lighthouse checks).

**Spec:** `SPEC.md` (repo root) — the full "NutriOS Landing Page — AI Coding Agent Implementation Brief". This plan implements it section by section; task descriptions reference spec section numbers (e.g. "§9 Hero").

## Global Constraints

Copied verbatim/paraphrased from SPEC.md — every task inherits these:

- **Language:** All visible UI copy is Russian. Component/prop/file names stay in English (code convention).
- **Framework limits (SPEC §23):** React + TypeScript + Vite only. No Next.js/Remix/Astro, no routing library, no Redux/Zustand, no heavy UI kit, no animation library (Framer Motion etc.) unless already present — it is not.
- **Vite (SPEC §24):** `npm run dev`, `npm run build`, `npm run preview` must all work with zero errors. Use `import.meta.env` for any env access (none is needed for this build — `submitWaitlist` is a stub). No Node-only APIs in browser code.
- **One `<h1>` total** (SPEC §30) — it lives in the Hero headline. Every other headline is `h2`/`h3` in correct nesting order.
- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<section>` (one per content section, each with an `id` used for anchor nav), `<footer>`.
- **All "Join the waitlist" CTAs** point to the same `#waitlist` anchor / same form (SPEC §20). No separate signup flows.
- **Animations are decorative only** — never required to understand content; must respect `@media (prefers-reduced-motion: reduce)` (SPEC §20, §28). Only animate `opacity`/`transform`.
- **No medical framing** (SPEC §33/§34): never imply diagnosis, treatment, cure, medical advice, guaranteed outcomes. Required short safety line must appear in the Trust & Safety section; extended version in the footer.
- **Do not overbuild** (SPEC §36): the app shell is a static visual prototype — no real meal tracking, no real AI call, no auth, no DB.
- **Design tokens** (defined fully in Task 1, reused everywhere — do not invent ad-hoc colors/spacing in component CSS):
  - Colors: `--color-bg:#FAF7F2` `--color-surface:#FFFFFF` `--color-surface-muted:#F1ECE3` `--color-text:#23241F` `--color-text-muted:#676A61` `--color-accent:#3F6B4A` `--color-accent-hover:#345A3E` `--color-accent-soft:#E6EDE7` `--color-border:#E7E1D6` `--color-danger:#B3423A` `--color-danger-soft:#F7E9E7` `--color-text-on-accent:#FFFFFF`
  - Font: `--font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  - Radii: `--radius-sm:8px` `--radius-md:14px` `--radius-lg:24px` `--radius-pill:999px`
  - Shadows: `--shadow-sm/--shadow-md/--shadow-lg` (see Task 1 for exact values)
  - Spacing scale: `--space-1:4px` through `--space-9:96px` (see Task 1)
  - Container: `--container-max-width:1200px`, `--container-padding: clamp(1.25rem, 4vw, 2.5rem)`
  - Breakpoints (documented, used as literal `@media` values, no CSS custom-media needed): mobile-first default `<768px`, tablet `@media (min-width: 768px)`, desktop `@media (min-width: 1024px)`.
- **Primary CTA text (used everywhere, verbatim):** `Записаться в лист ожидания`
- **Header nav labels (verbatim):** `Как это работает`, `Персонализация`, `Ассистент`, `О проекте`
- **Trust & Safety short copy (verbatim, required on-page):** `NutriOS — продукт в области веллнеса и просвещения о питании. Он не является медицинским сервисом и не предоставляет диагностику, лечение или медицинские консультации.`
- **Footer/extended disclaimer (verbatim):** `NutriOS предоставляет инструменты и образовательные материалы для повседневного планирования питания и заботы о благополучии. Продукт не диагностирует, не лечит и не предотвращает заболевания, не назначает лечебные диеты и не заменяет консультацию квалифицированных специалистов здравоохранения.`

---

### Task 1: Project scaffold, tooling, and design tokens

**Files:**
- Create: entire Vite scaffold at repo root (`package.json`, `tsconfig*.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `.eslintrc`/`eslint.config.js`, `.gitignore`)
- Create: `src/styles/tokens.css`
- Create: `src/styles/globals.css`
- Create: `src/styles/animations.module.css`
- Modify: `index.html` (SEO meta, font preconnect not needed since self-hosted, lang="ru")

**Interfaces:**
- Produces: the design tokens listed in Global Constraints above, available globally via `:root` — every later task's CSS module assumes these custom properties exist.
- Produces: `html[lang="ru"]`, a working dev/build/preview pipeline, ESLint config.

- [ ] **Step 1: Scaffold the Vite project**

```bash
cd /Users/igorfrantsev/Developer/learn/ai-course/01-landing
npm create vite@latest . -- --template react-ts --eslint
```

If prompted about the directory not being empty (it contains `SPEC.md` and `docs/`), confirm/allow overwrite of only the scaffold files — do not delete `SPEC.md` or `docs/`.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @fontsource-variable/manrope
```

- [ ] **Step 3: Verify the scaffold builds and runs**

```bash
npm run build
```
Expected: build completes with no errors (default counter-demo app).

- [ ] **Step 4: Initialize git and make the first commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

- [ ] **Step 5: Remove the default Vite demo content**

Delete `src/App.css`, replace `src/assets/react.svg` usage — delete the counter demo. `src/App.tsx` will be rewritten in Task 13 to assemble real sections; for now leave it as an empty functional component returning `null` so the build stays green:

```tsx
// src/App.tsx
function App() {
  return null
}

export default App
```

- [ ] **Step 6: Create `src/styles/tokens.css`**

```css
:root {
  --color-bg: #FAF7F2;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F1ECE3;
  --color-text: #23241F;
  --color-text-muted: #676A61;
  --color-text-on-accent: #FFFFFF;
  --color-accent: #3F6B4A;
  --color-accent-hover: #345A3E;
  --color-accent-soft: #E6EDE7;
  --color-border: #E7E1D6;
  --color-danger: #B3423A;
  --color-danger-soft: #F7E9E7;

  --font-sans: 'Manrope Variable', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  --shadow-sm: 0 1px 2px rgba(35, 36, 31, 0.06);
  --shadow-md: 0 8px 24px rgba(35, 36, 31, 0.08);
  --shadow-lg: 0 24px 48px rgba(35, 36, 31, 0.10);

  --container-max-width: 1200px;
  --container-padding: clamp(1.25rem, 4vw, 2.5rem);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.375rem;
  --font-size-2xl: 1.75rem;
  --font-size-3xl: 2.25rem;
  --font-size-4xl: 3rem;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;

  --header-height: 72px;
}
```

- [ ] **Step 7: Create `src/styles/globals.css`**

```css
@import '@fontsource-variable/manrope';
@import './tokens.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4 {
  margin: 0;
  font-weight: 700;
  line-height: var(--line-height-tight);
  letter-spacing: -0.01em;
}

p {
  margin: 0;
}

img, svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

button, input {
  font: inherit;
  color: inherit;
}

ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

section[id] {
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 8: Create `src/styles/animations.module.css`**

This is a CSS Module (not a plain global stylesheet) from the start — every section in Tasks 9–12 imports it as `animations` and reads `animations.reveal` / `animations.isVisible`, so the class names must go through the module system rather than being global strings.

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  will-change: opacity, transform;
}

.isVisible {
  opacity: 1;
  transform: translateY(0);
}

.revealDelay1 { transition-delay: 0.08s; }
.revealDelay2 { transition-delay: 0.16s; }
.revealDelay3 { transition-delay: 0.24s; }
```

- [ ] **Step 9: Import global styles in `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 10: Write SEO/meta into `index.html`**

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NutriOS — ваша персональная система питания</title>
    <meta name="description" content="NutriOS помогает планировать повседневное питание с учётом ваших целей, предпочтений, привычек и реальной жизни." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NutriOS" />
    <meta property="og:title" content="NutriOS — ваша персональная система питания" />
    <meta property="og:description" content="NutriOS помогает планировать повседневное питание с учётом ваших целей, предпочтений, привычек и реальной жизни." />
    <meta property="og:locale" content="ru_RU" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="NutriOS — ваша персональная система питания" />
    <meta name="twitter:description" content="NutriOS помогает планировать повседневное питание с учётом ваших целей, предпочтений, привычек и реальной жизни." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

(No `og:image` and no `canonical` link — no deployment URL/asset exists yet; do not invent one.)

- [ ] **Step 11: Verify build and lint**

```bash
npm run build
npx eslint .
```
Expected: both succeed with no errors.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: design tokens, global styles, and SEO meta shell"
```

---

### Task 2: Types and content data layer (Russian copy)

**Files:**
- Create: `src/types/landing.ts`
- Create: `src/data/landing.ts`

**Interfaces:**
- Consumes: nothing (pure data layer).
- Produces: `LandingContent` type and `landingContent: LandingContent` object — every section component in later tasks imports its slice from `landingContent`.

- [ ] **Step 1: Write `src/types/landing.ts`**

```ts
export interface NavLink {
  label: string
  href: string
}

export interface HeroContent {
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  preview: {
    greeting: string
    planLabel: string
    meals: { key: string; label: string; time: string }[]
    contextLabel: string
    contextItems: string[]
    assistantLabel: string
    assistantPrompt: string
  }
}

export interface ProblemContent {
  title: string
  description: string
  fragmentedSteps: string[]
  contrastLabel: string
  contrastSteps: string[]
}

export interface ContextElement {
  key: string
  title: string
  description: string
}

export interface ContextContent {
  title: string
  description: string
  elements: ContextElement[]
  convergeLabel: string
  outcomeLabel: string
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
}

export interface HowItWorksContent {
  title: string
  steps: HowItWorksStep[]
}

export interface ProductPreviewContent {
  title: string
  sidebarLinks: string[]
  headerLabels: { search: string; profile: string }
  greeting: string
  planLabel: string
  meals: { key: string; label: string; time: string }[]
  contextLabel: string
  contextItems: string[]
  assistantLabel: string
  assistantPrompt: string
}

export interface PersonalizationExampleRow {
  key: string
  label: string
  value: string
}

export interface PersonalizationContent {
  title: string
  description: string
  progression: string[]
  example: PersonalizationExampleRow[]
  recommendationLabel: string
  recommendationValue: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

export interface AssistantContent {
  title: string
  description: string
  conversation: ChatMessage[]
  examplePrompts: string[]
}

export interface NutritionLoopFeature {
  title: string
  description: string
}

export interface NutritionLoopContent {
  title: string
  loopSteps: string[]
  features: NutritionLoopFeature[]
}

export interface SafetyContent {
  title: string
  shortDisclaimer: string
  extendedDisclaimer: string
}

export interface FinalCtaContent {
  title: string
  description: string
  emailLabel: string
  emailPlaceholder: string
  submitLabel: string
  loadingLabel: string
  errorMessage: string
  successMessage: string
}

export interface FooterContent {
  links: { label: string; href: string }[]
  disclaimer: string
}

export interface LandingContent {
  logo: string
  nav: NavLink[]
  headerCta: string
  hero: HeroContent
  problem: ProblemContent
  context: ContextContent
  howItWorks: HowItWorksContent
  productPreview: ProductPreviewContent
  personalization: PersonalizationContent
  assistant: AssistantContent
  nutritionLoop: NutritionLoopContent
  safety: SafetyContent
  finalCta: FinalCtaContent
  footer: FooterContent
}
```

- [ ] **Step 2: Write `src/data/landing.ts`**

```ts
import type { LandingContent } from '../types/landing'

export const landingContent: LandingContent = {
  logo: 'NutriOS',
  nav: [
    { label: 'Как это работает', href: '#how-it-works' },
    { label: 'Персонализация', href: '#personalization' },
    { label: 'Ассистент', href: '#assistant' },
    { label: 'О проекте', href: '#safety' },
  ],
  headerCta: 'Записаться в лист ожидания',
  hero: {
    title: 'Питание — это не план. Это система.',
    description:
      'NutriOS помогает планировать питание с учётом ваших целей, предпочтений, привычек и реальной жизни.',
    primaryCta: 'Записаться в лист ожидания',
    secondaryCta: 'Как это работает',
    preview: {
      greeting: 'Доброе утро',
      planLabel: 'План на сегодня',
      meals: [
        { key: 'breakfast', label: 'Завтрак', time: '08:00' },
        { key: 'lunch', label: 'Обед', time: '13:00' },
        { key: 'dinner', label: 'Ужин', time: '19:00' },
      ],
      contextLabel: 'Личный контекст',
      contextItems: [
        '30 минут на готовку',
        '2 ингредиента нужно использовать',
        '3 приёма пищи запланировано',
      ],
      assistantLabel: 'Спросить NutriOS',
      assistantPrompt: 'Что изменить на сегодняшний вечер?',
    },
  },
  problem: {
    title: 'Питаться правильно не должно быть второй работой.',
    description:
      'Информации о питании более чем достаточно. Сложность — превратить её в повседневные решения, которые действительно вписываются в вашу жизнь.',
    fragmentedSteps: [
      'Цели',
      'Поиск рецептов',
      'Проверка продуктов',
      'Планирование блюд',
      'Поход за покупками',
      'Учёт',
      'Повтор',
    ],
    contrastLabel: 'NutriOS',
    contrastSteps: ['Ваш контекст', 'Практичные решения'],
  },
  context: {
    title: 'Построен вокруг вашего контекста.',
    description:
      'NutriOS объединяет ваши цели, предпочтения, историю и повседневные ограничения в единую персональную систему питания.',
    elements: [
      {
        key: 'goals',
        title: 'Цели',
        description: 'Что вы хотите получить от питания — от энергии до стабильных привычек.',
      },
      {
        key: 'preferences',
        title: 'Предпочтения',
        description: 'Кухни, продукты и форматы блюд, которые вам действительно нравятся.',
      },
      {
        key: 'restrictions',
        title: 'Ограничения',
        description: 'Продукты и форматы, которые вам не подходят — по любой причине.',
      },
      {
        key: 'history',
        title: 'История',
        description: 'Что вы уже готовили и что из этого сработало.',
      },
      {
        key: 'daily',
        title: 'Ежедневный контекст',
        description: 'Доступное время, продукты и планы могут менять то, что имеет смысл сегодня.',
      },
    ],
    convergeLabel: 'Контекст NutriOS',
    outcomeLabel: 'Практичные решения о питании',
  },
  howItWorks: {
    title: 'От контекста к действию.',
    steps: [
      {
        number: '01',
        title: 'Расскажите NutriOS о себе',
        description: 'Задайте свои цели, предпочтения и ограничения в питании.',
      },
      {
        number: '02',
        title: 'NutriOS строит ваш контекст',
        description: 'NutriOS объединяет ваш профиль, историю и повседневные обстоятельства.',
      },
      {
        number: '03',
        title: 'Принимайте более взвешенные решения',
        description: 'Получайте идеи блюд, планы и альтернативы, которые подходят именно сейчас.',
      },
    ],
  },
  productPreview: {
    title: 'Система питания, которая помнит контекст.',
    sidebarLinks: ['Сегодня', 'План', 'Блюда', 'Покупки', 'История'],
    headerLabels: { search: 'Поиск', profile: 'Профиль' },
    greeting: 'Доброе утро',
    planLabel: 'План на сегодня',
    meals: [
      { key: 'breakfast', label: 'Завтрак', time: '08:00' },
      { key: 'lunch', label: 'Обед', time: '13:00' },
      { key: 'dinner', label: 'Ужин', time: '19:00' },
    ],
    contextLabel: 'Личный контекст',
    contextItems: ['30 минут на готовку', '2 ингредиента нужно использовать'],
    assistantLabel: 'Ассистент NutriOS',
    assistantPrompt: 'Что изменить на сегодняшний вечер?',
  },
  personalization: {
    title: 'Чем больше контекста — тем полезнее система.',
    description:
      'NutriOS не начинает каждый день с чистого листа. Ваши предпочтения и история становятся частью системы.',
    progression: ['Профиль', 'Предпочтения', 'История', 'Контекст', 'Персональные рекомендации'],
    example: [
      { key: 'profile', label: 'Профиль', value: 'Вегетарианец' },
      { key: 'preferences', label: 'Предпочтения', value: 'Блюда с высоким содержанием белка' },
      { key: 'history', label: 'История', value: '12 сохранённых блюд' },
      { key: 'daily', label: 'Дневной контекст', value: '20 минут в запасе' },
    ],
    recommendationLabel: 'Рекомендация',
    recommendationValue: 'Быстрый ужин с учётом ваших предпочтений',
  },
  assistant: {
    title: 'Спросите свою систему питания.',
    description:
      'Получайте практичные ответы на основе вашего личного контекста — а не обобщённый диалог.',
    conversation: [
      { role: 'user', text: 'Сегодня у меня есть только 20 минут.' },
      {
        role: 'assistant',
        text: 'Скорректируем ужин. Вот 3 варианта, которые подойдут по времени.',
      },
    ],
    examplePrompts: [
      'Что можно приготовить из того, что есть в холодильнике?',
      'Предложи альтернативу на сегодняшний вечер.',
      'Скорректируй план на завтра.',
      'Помоги использовать продукты, которые уже есть.',
    ],
  },
  nutritionLoop: {
    title: 'Единая система. От планирования до покупок.',
    loopSteps: [
      'План',
      'Блюда',
      'Продукты',
      'Список покупок',
      'Блюда',
      'История',
      'Более точные рекомендации',
    ],
    features: [
      { title: 'Планирование питания', description: 'Дневной и недельный план, который учитывает контекст.' },
      { title: 'Планирование покупок', description: 'Список покупок собирается из выбранных блюд.' },
      { title: 'История питания', description: 'Что вы готовили раньше — как часть будущих решений.' },
      { title: 'Персональные рекомендации', description: 'Предложения, которые со временем становятся точнее.' },
    ],
  },
  safety: {
    title: 'Создано для повседневного благополучия.',
    shortDisclaimer:
      'NutriOS — продукт в области веллнеса и просвещения о питании. Он не является медицинским сервисом и не предоставляет диагностику, лечение или медицинские консультации.',
    extendedDisclaimer:
      'NutriOS предоставляет инструменты и образовательные материалы для повседневного планирования питания и заботы о благополучии. Продукт не диагностирует, не лечит и не предотвращает заболевания, не назначает лечебные диеты и не заменяет консультацию квалифицированных специалистов здравоохранения.',
  },
  finalCta: {
    title: 'Постройте систему питания, которая подходит именно вам.',
    description: 'Получите ранний доступ к NutriOS.',
    emailLabel: 'Электронная почта',
    emailPlaceholder: 'you@example.com',
    submitLabel: 'Записаться в лист ожидания',
    loadingLabel: 'Отправляем...',
    errorMessage: 'Пожалуйста, введите корректный email-адрес.',
    successMessage: 'Вы в списке. Мы сообщим, когда NutriOS будет готов.',
  },
  footer: {
    links: [
      { label: 'Конфиденциальность', href: '#' },
      { label: 'Условия использования', href: '#' },
      { label: 'Безопасность', href: '#safety' },
      { label: 'Контакты', href: '#' },
    ],
    disclaimer:
      'NutriOS предоставляет инструменты и образовательные материалы для повседневного планирования питания и заботы о благополучии. Продукт не диагностирует, не лечит и не предотвращает заболевания, не назначает лечебные диеты и не заменяет консультацию квалифицированных специалистов здравоохранения.',
  },
}
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: typed Russian content layer for landing sections"
```

---

### Task 3: UI primitives (Button, Card, Input, SectionHeading)

**Files:**
- Create: `src/components/ui/Button/Button.tsx`, `Button.module.css`
- Create: `src/components/ui/Card/Card.tsx`, `Card.module.css`
- Create: `src/components/ui/Input/Input.tsx`, `Input.module.css`
- Create: `src/components/ui/SectionHeading/SectionHeading.tsx`, `SectionHeading.module.css`
- Create: `src/components/layout/Container/Container.tsx`, `Container.module.css`

**Interfaces:**
- Consumes: design tokens from Task 1.
- Produces: `<Button variant="primary" | "secondary" as="a" | "button" href? onClick? type?>`, `<Card>`, `<Input>` (forwardRef, accepts standard input props + `label`, `error`, `id`), `<SectionHeading eyebrow? title as="h2"|"h3" description?>`, `<Container>` — every later section task uses these instead of raw `<div>`/`<button>`.

- [ ] **Step 1: `Container`**

```tsx
// src/components/layout/Container/Container.tsx
import type { ReactNode } from 'react'
import styles from './Container.module.css'

export function Container({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>
}
```

```css
/* Container.module.css */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}
```

- [ ] **Step 2: `Button`**

```tsx
// src/components/ui/Button/Button.tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type CommonProps = {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const className = `${styles.button} ${variant === 'secondary' ? styles.secondary : styles.primary}`

  if (props.as === 'a') {
    const { as: _as, ...anchorProps } = props
    return (
      <a className={className} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { as: _as, ...buttonProps } = props as ButtonAsButton
  return (
    <button className={className} type={buttonProps.type ?? 'button'} {...buttonProps}>
      {children}
    </button>
  )
}
```

```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
}

.button:active {
  transform: scale(0.98);
}

.primary {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
}

.primary:hover {
  background: var(--color-accent-hover);
}

.secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.secondary:hover {
  background: var(--color-surface-muted);
}
```

- [ ] **Step 3: `Card`**

```tsx
// src/components/ui/Card/Card.tsx
import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.card} ${className}`} {...props} />
}
```

```css
/* Card.module.css */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 4: `Input`**

```tsx
// src/components/ui/Input/Input.tsx
import { useId, type InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
```

```css
/* Input.module.css */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: left;
  flex: 1;
}

.label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.input {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: var(--font-size-base);
}

.input::placeholder {
  color: var(--color-text-muted);
}

.inputError {
  border-color: var(--color-danger);
}

.error {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-danger);
}
```

- [ ] **Step 5: `SectionHeading`**

```tsx
// src/components/ui/SectionHeading/SectionHeading.tsx
import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  title: string
  description?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
}

export function SectionHeading({ title, description, as = 'h2', align = 'left' }: SectionHeadingProps) {
  const Heading = as
  return (
    <div className={`${styles.wrapper} ${align === 'center' ? styles.center : ''}`}>
      <Heading className={styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
```

```css
/* SectionHeading.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 640px;
}

.center {
  align-items: center;
  text-align: center;
  max-width: 720px;
  margin-inline: auto;
}

.title {
  font-size: var(--font-size-3xl);
}

@media (min-width: 1024px) {
  .title {
    font-size: var(--font-size-4xl);
  }
}

.description {
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
}
```

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: shared UI primitives (Button, Card, Input, SectionHeading, Container)"
```

---

### Task 4: `useScrollReveal` hook

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

**Interfaces:**
- Consumes: nothing directly — pairs with the `.reveal`/`.isVisible` classes in `src/styles/animations.module.css` (Task 1), which consumer components (Tasks 9–12) import and apply themselves.
- Produces: `useScrollReveal<T extends HTMLElement>(): { ref: RefObject<T | null>; isVisible: boolean }` — used by section components in Tasks 8–12 to fade/slide content in on scroll.

- [ ] **Step 1: Write the hook**

```ts
// src/hooks/useScrollReveal.ts
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```
Expected: no errors (the hook has no consumers yet — that's fine, it's only type-checked).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: useScrollReveal hook for reduced-motion-aware scroll reveals"
```

---

### Task 5: Waitlist integration boundary + form hook

**Files:**
- Create: `src/lib/waitlist.ts`
- Create: `src/hooks/useWaitlistForm.ts`

**Interfaces:**
- Produces: `submitWaitlist(email: string): Promise<{ ok: true } | { ok: false; error: string }>` and `useWaitlistForm()` returning `{ email, setEmail, status: 'idle'|'loading'|'success'|'error', errorMessage, handleSubmit }` — Task 12's `FinalCTA` form is the sole consumer (SPEC §20: only one signup flow).

- [ ] **Step 1: Write `src/lib/waitlist.ts`**

```ts
export interface WaitlistResult {
  ok: boolean
  error?: string
}

export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  // API integration will be connected later.
  await new Promise((resolve) => setTimeout(resolve, 800))
  void email
  return { ok: true }
}
```

- [ ] **Step 2: Write `src/hooks/useWaitlistForm.ts`**

```ts
import { useState, type FormEvent } from 'react'
import { submitWaitlist } from '../lib/waitlist'
import { landingContent } from '../data/landing'

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useWaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<WaitlistStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedEmail = email.trim()

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus('error')
      setErrorMessage(landingContent.finalCta.errorMessage)
      return
    }

    setStatus('loading')
    const result = await submitWaitlist(trimmedEmail)

    if (result.ok) {
      setStatus('success')
      setErrorMessage('')
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? landingContent.finalCta.errorMessage)
    }
  }

  return { email, setEmail, status, errorMessage, handleSubmit }
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: waitlist submission boundary and form state hook"
```

---

### Task 6: Header (sticky nav + accessible mobile menu) and Footer

**Files:**
- Create: `src/components/layout/Header/Header.tsx`, `Header.module.css`
- Create: `src/components/layout/Footer/Footer.tsx`, `Footer.module.css`

**Interfaces:**
- Consumes: `landingContent.nav`, `landingContent.headerCta`, `landingContent.logo`, `landingContent.footer` (Task 2); `Container`, `Button` (Task 3).
- Produces: `<Header />`, `<Footer />` — both consumed by `App.tsx` in Task 13.

- [ ] **Step 1: Write `Header.tsx`**

```tsx
// src/components/layout/Header/Header.tsx
import { useEffect, useRef, useState } from 'react'
import { Container } from '../Container/Container'
import { Button } from '../../ui/Button/Button'
import { landingContent } from '../../../data/landing'
import styles from './Header.module.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    document.body.style.overflow = 'hidden'

    const menuNode = menuRef.current
    const focusableEls = menuNode
      ? Array.from(menuNode.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : []
    focusableEls[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key === 'Tab' && focusableEls.length > 0) {
        const first = focusableEls[0]
        const last = focusableEls[focusableEls.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <a href="#top" className={styles.logo}>
            {landingContent.logo}
          </a>

          <nav className={styles.desktopNav} aria-label="Основная навигация">
            {landingContent.nav.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.desktopCta}>
            <Button as="a" href="#waitlist" variant="primary">
              {landingContent.headerCta}
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className={styles.menuTrigger}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            Меню
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <div className={styles.overlay}>
          <div id="mobile-menu" ref={menuRef} className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Мобильное меню">
            <div className={styles.mobileMenuHeader}>
              <span className={styles.logo}>{landingContent.logo}</span>
              <button type="button" className={styles.menuClose} onClick={closeMenu} aria-label="Закрыть меню">
                Закрыть
              </button>
            </div>

            <nav className={styles.mobileNav} aria-label="Мобильная навигация">
              {landingContent.nav.map((link) => (
                <a key={link.href} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
            </nav>

            <Button as="a" href="#waitlist" variant="primary" onClick={closeMenu}>
              {landingContent.headerCta}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
```

- [ ] **Step 2: Write `Header.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.bar {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.logo {
  font-size: var(--font-size-lg);
  font-weight: 800;
  text-decoration: none;
  color: var(--color-text);
}

.desktopNav {
  display: none;
}

.navLink {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: color var(--transition-fast);
}

.navLink:hover {
  color: var(--color-text);
}

.desktopCta {
  display: none;
}

.menuTrigger {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
}

@media (min-width: 1024px) {
  .desktopNav {
    display: flex;
    gap: var(--space-6);
  }

  .desktopCta {
    display: block;
  }

  .menuTrigger {
    display: none;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
}

.mobileMenu {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-5) var(--container-padding);
  height: 100%;
}

.mobileMenuHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menuClose {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
}

.mobileNav {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.mobileNavLink {
  text-decoration: none;
  color: var(--color-text);
  font-size: var(--font-size-xl);
  font-weight: 700;
}
```

- [ ] **Step 3: Write `Footer.tsx`**

```tsx
// src/components/layout/Footer/Footer.tsx
import { Container } from '../Container/Container'
import { landingContent } from '../../../data/landing'
import styles from './Footer.module.css'

export function Footer() {
  const { footer, logo } = landingContent

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <span className={styles.logo}>{logo}</span>
          <nav className={styles.links} aria-label="Дополнительные ссылки">
            {footer.links.map((link) => (
              <a key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className={styles.disclaimer}>{footer.disclaimer}</p>
      </Container>
    </footer>
  )
}
```

- [ ] **Step 4: Write `Footer.module.css`**

```css
.footer {
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-8);
}

.top {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-bottom: var(--space-6);
}

.logo {
  font-size: var(--font-size-lg);
  font-weight: 800;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}

.link {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.link:hover {
  color: var(--color-text);
}

.disclaimer {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  max-width: 720px;
}

@media (min-width: 768px) {
  .top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors. (Header/Footer aren't mounted yet — type-check only; visual/keyboard verification happens in Task 13's QA pass once `App.tsx` renders them.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: sticky Header with accessible mobile menu, and Footer"
```

---

### Task 7: Product shell components (Sidebar, ProductHeader, MealPlan, ContextCard, AssistantPreview, ProductShell)

This is the component family SPEC §13 calls out as "one of the most important sections" — it must be real React/CSS, not a screenshot, and gets reused in compact form by the Hero (Task 8) and in full form by the Product Preview section (Task 10).

**Files:**
- Create: `src/components/product/ProductSidebar/ProductSidebar.tsx`, `.module.css`
- Create: `src/components/product/ProductHeader/ProductHeader.tsx`, `.module.css`
- Create: `src/components/product/MealPlan/MealPlan.tsx`, `.module.css` (contains `MealCard` internally — it's a one-off list item, not worth a separate file per SPEC §26)
- Create: `src/components/product/PersonalContext/PersonalContext.tsx`, `.module.css`
- Create: `src/components/product/AssistantPreview/AssistantPreview.tsx`, `.module.css`
- Create: `src/components/product/AppShell/AppShell.tsx`, `.module.css`

**Interfaces:**
- Consumes: `Card` (Task 3).
- Produces:
  - `MealPlan(props: { planLabel: string; meals: { key: string; label: string; time: string }[] })`
  - `PersonalContext(props: { label: string; items: string[] })`
  - `AssistantPreview(props: { label: string; prompt: string })`
  - `ProductSidebar(props: { links: string[] })`
  - `ProductHeader(props: { searchLabel: string; profileLabel: string })`
  - `AppShell(props: { title: string; greeting: string; sidebarLinks: string[]; headerLabels: { search: string; profile: string }; planLabel: string; meals: {...}[]; contextLabel: string; contextItems: string[]; assistantLabel: string; assistantPrompt: string })` — the full desktop-sidebar + mobile-stacked shell, consumed by Task 10's Product Preview section.
  - Task 8 (Hero) composes `MealPlan` + `PersonalContext` + `AssistantPreview` directly inside its own compact frame (no sidebar) rather than reusing `AppShell`.

- [ ] **Step 1: `MealPlan`**

```tsx
// src/components/product/MealPlan/MealPlan.tsx
import styles from './MealPlan.module.css'

interface Meal {
  key: string
  label: string
  time: string
}

interface MealPlanProps {
  planLabel: string
  meals: Meal[]
}

export function MealPlan({ planLabel, meals }: MealPlanProps) {
  return (
    <div>
      <h3 className={styles.heading}>{planLabel}</h3>
      <ul className={styles.list}>
        {meals.map((meal) => (
          <li key={meal.key} className={styles.mealCard}>
            <span className={styles.mealLabel}>{meal.label}</span>
            <span className={styles.mealTime}>{meal.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

```css
/* MealPlan.module.css */
.heading {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-3);
}

.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.mealCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  background: var(--color-surface-muted);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  text-align: center;
}

.mealLabel {
  font-weight: 700;
  font-size: var(--font-size-sm);
}

.mealTime {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
```

- [ ] **Step 2: `PersonalContext`**

```tsx
// src/components/product/PersonalContext/PersonalContext.tsx
import styles from './PersonalContext.module.css'

interface PersonalContextProps {
  label: string
  items: string[]
}

export function PersonalContext({ label, items }: PersonalContextProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>{label}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

```css
/* PersonalContext.module.css */
.wrapper {
  background: var(--color-accent-soft);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.heading {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-3);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.item {
  font-size: var(--font-size-sm);
  padding-left: var(--space-4);
  position: relative;
}

.item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
}
```

- [ ] **Step 3: `AssistantPreview`**

```tsx
// src/components/product/AssistantPreview/AssistantPreview.tsx
import styles from './AssistantPreview.module.css'

interface AssistantPreviewProps {
  label: string
  prompt: string
}

export function AssistantPreview({ label, prompt }: AssistantPreviewProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <p className={styles.prompt}>{prompt}</p>
    </div>
  )
}
```

```css
/* AssistantPreview.module.css */
.wrapper {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  background: var(--color-surface);
}

.label {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-muted);
}

.prompt {
  font-size: var(--font-size-base);
}
```

- [ ] **Step 4: `ProductSidebar`**

```tsx
// src/components/product/ProductSidebar/ProductSidebar.tsx
import styles from './ProductSidebar.module.css'

export function ProductSidebar({ links }: { links: string[] }) {
  return (
    <nav className={styles.sidebar} aria-label="Разделы продукта (демонстрация)">
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={link} className={`${styles.item} ${index === 0 ? styles.itemActive : ''}`}>
            {link}
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

```css
/* ProductSidebar.module.css */
.sidebar {
  display: none;
}

@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 160px;
    border-right: 1px solid var(--color-border);
    padding: var(--space-4);
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.item {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}

.itemActive {
  background: var(--color-accent-soft);
  color: var(--color-text);
  font-weight: 700;
}
```

- [ ] **Step 5: `ProductHeader`**

```tsx
// src/components/product/ProductHeader/ProductHeader.tsx
import styles from './ProductHeader.module.css'

export function ProductHeader({ searchLabel, profileLabel }: { searchLabel: string; profileLabel: string }) {
  return (
    <div className={styles.header}>
      <span className={styles.brand}>NutriOS</span>
      <div className={styles.actions}>
        <span className={styles.action}>{searchLabel}</span>
        <span className={styles.avatar} aria-label={profileLabel} title={profileLabel} />
      </div>
    </div>
  )
}
```

```css
/* ProductHeader.module.css */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.brand {
  font-weight: 800;
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.action {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent);
  display: inline-block;
}
```

- [ ] **Step 6: `AppShell`** (composes the above into the full desktop/mobile preview from SPEC §13)

```tsx
// src/components/product/AppShell/AppShell.tsx
import { ProductSidebar } from '../ProductSidebar/ProductSidebar'
import { ProductHeader } from '../ProductHeader/ProductHeader'
import { MealPlan } from '../MealPlan/MealPlan'
import { PersonalContext } from '../PersonalContext/PersonalContext'
import { AssistantPreview } from '../AssistantPreview/AssistantPreview'
import styles from './AppShell.module.css'

interface Meal {
  key: string
  label: string
  time: string
}

interface AppShellProps {
  greeting: string
  sidebarLinks: string[]
  headerLabels: { search: string; profile: string }
  planLabel: string
  meals: Meal[]
  contextLabel: string
  contextItems: string[]
  assistantLabel: string
  assistantPrompt: string
}

export function AppShell({
  greeting,
  sidebarLinks,
  headerLabels,
  planLabel,
  meals,
  contextLabel,
  contextItems,
  assistantLabel,
  assistantPrompt,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <ProductHeader searchLabel={headerLabels.search} profileLabel={headerLabels.profile} />
      <div className={styles.body}>
        <ProductSidebar links={sidebarLinks} />
        <div className={styles.main}>
          <p className={styles.greeting}>{greeting}</p>
          <MealPlan planLabel={planLabel} meals={meals} />
          <PersonalContext label={contextLabel} items={contextItems} />
          <AssistantPreview label={assistantLabel} prompt={assistantPrompt} />
        </div>
      </div>
    </div>
  )
}
```

```css
/* AppShell.module.css */
.shell {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.body {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .body {
    flex-direction: row;
  }
}

.main {
  flex: 1;
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.greeting {
  font-size: var(--font-size-xl);
  font-weight: 700;
}
```

- [ ] **Step 7: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: product shell components (sidebar, header, meal plan, context, assistant)"
```

---

### Task 8: Hero section

**Files:**
- Create: `src/components/sections/Hero/Hero.tsx`, `Hero.module.css`

**Interfaces:**
- Consumes: `landingContent.hero` (Task 2), `Button`, `Container` (Task 3), `MealPlan`/`PersonalContext`/`AssistantPreview` (Task 7).
- Produces: `<Hero />`, mounted first inside `<main>` by `App.tsx` (Task 13). Contains the page's only `<h1>`.

- [ ] **Step 1: Write `Hero.tsx`**

```tsx
// src/components/sections/Hero/Hero.tsx
import { Container } from '../../layout/Container/Container'
import { Button } from '../../ui/Button/Button'
import { MealPlan } from '../../product/MealPlan/MealPlan'
import { PersonalContext } from '../../product/PersonalContext/PersonalContext'
import { AssistantPreview } from '../../product/AssistantPreview/AssistantPreview'
import { landingContent } from '../../../data/landing'
import styles from './Hero.module.css'

export function Hero() {
  const { hero } = landingContent

  return (
    <section id="top" className={styles.hero} aria-label="Введение">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.description}>{hero.description}</p>
            <div className={styles.actions}>
              <Button as="a" href="#waitlist" variant="primary">
                {hero.primaryCta}
              </Button>
              <Button as="a" href="#how-it-works" variant="secondary">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className={styles.previewWrapper}>
            <div className={styles.previewCard}>
              <p className={styles.greeting}>{hero.preview.greeting}</p>
              <MealPlan planLabel={hero.preview.planLabel} meals={hero.preview.meals} />
              <PersonalContext label={hero.preview.contextLabel} items={hero.preview.contextItems} />
              <AssistantPreview label={hero.preview.assistantLabel} prompt={hero.preview.assistantPrompt} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Write `Hero.module.css`**

```css
.hero {
  padding-block: var(--space-8) var(--space-9);
}

.grid {
  display: grid;
  gap: var(--space-8);
}

.copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.title {
  font-size: var(--font-size-4xl);
  line-height: var(--line-height-tight);
}

.description {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  line-height: var(--line-height-relaxed);
  max-width: 46ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.previewCard {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.greeting {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

@media (min-width: 1024px) {
  .hero {
    padding-block: var(--space-9) 120px;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: var(--space-9);
  }

  .title {
    font-size: 3.25rem;
  }
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Hero section with live app-shell preview"
```

---

### Task 9: Problem section + Product Concept (Context) section

**Files:**
- Create: `src/components/sections/Problem/Problem.tsx`, `Problem.module.css`
- Create: `src/components/sections/Context/Context.tsx`, `Context.module.css`

**Interfaces:**
- Consumes: `landingContent.problem`, `landingContent.context` (Task 2); `Container`, `SectionHeading`, `Card` (Task 3); `useScrollReveal` (Task 4).
- Produces: `<Problem />`, `<Context />` mounted after `<Hero />` in `App.tsx` (Task 13).

- [ ] **Step 1: Write `Problem.tsx`** (SPEC §10 — fragmented workflow vs. NutriOS contrast)

```tsx
// src/components/sections/Problem/Problem.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Problem.module.css'

export function Problem() {
  const { problem } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="problem" className={styles.section} aria-labelledby="problem-heading">
      <Container>
        <SectionHeading as="h2" title={problem.title} description={problem.description} />

        <div
          ref={ref}
          className={`${styles.diagrams} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          <div className={styles.fragmented}>
            {problem.fragmentedSteps.map((step, index) => (
              <div key={step} className={styles.fragmentedStep}>
                <span className={styles.stepLabel}>{step}</span>
                {index < problem.fragmentedSteps.length - 1 ? (
                  <span className={styles.arrow} aria-hidden="true">↓</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.contrast}>
            <span className={styles.contrastLabel}>{problem.contrastLabel}</span>
            {problem.contrastSteps.map((step, index) => (
              <div key={step} className={styles.contrastStep}>
                {index > 0 ? <span className={styles.arrow} aria-hidden="true">↓</span> : null}
                <span className={styles.contrastStepLabel}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
```

This is the pattern every later section that uses `useScrollReveal` follows (Tasks 9–12): import `animations` from `styles/animations.module.css` alongside the component's own `styles` module, and read `animations.reveal` / `animations.isVisible`.

- [ ] **Step 2: Write `Problem.module.css`**

```css
.section {
  padding-block: var(--space-9);
}

.diagrams {
  margin-top: var(--space-8);
  display: grid;
  gap: var(--space-6);
}

.fragmented, .contrast {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.contrast {
  background: var(--color-accent-soft);
  border-color: transparent;
  justify-content: center;
}

.fragmentedStep, .contrastStep {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.stepLabel {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  background: var(--color-surface-muted);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
}

.arrow {
  color: var(--color-text-muted);
}

.contrastLabel {
  font-weight: 800;
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-2);
}

.contrastStepLabel {
  font-weight: 700;
  padding: var(--space-2) var(--space-5);
  background: var(--color-surface);
  border-radius: var(--radius-pill);
}

@media (min-width: 1024px) {
  .diagrams {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }

  .fragmented {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .fragmentedStep {
    flex-direction: row;
  }

  .fragmentedStep .arrow {
    transform: rotate(-90deg);
  }
}
```

- [ ] **Step 3: Write `Context.tsx`** (SPEC §11 — context elements converging to a single outcome)

```tsx
// src/components/sections/Context/Context.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Context.module.css'

export function Context() {
  const { context } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="context" className={styles.section} aria-labelledby="context-heading">
      <Container>
        <SectionHeading as="h2" title={context.title} description={context.description} />

        <div
          ref={ref}
          className={`${styles.convergence} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          <div className={styles.elements}>
            {context.elements.map((element) => (
              <Card key={element.key} className={styles.elementCard}>
                <h3 className={styles.elementTitle}>{element.title}</h3>
                <p className={styles.elementDescription}>{element.description}</p>
              </Card>
            ))}
          </div>

          <div className={styles.outcomeChain} aria-hidden="true">
            <span className={styles.chainArrow}>↓</span>
          </div>

          <div className={styles.outcome}>
            <span className={styles.convergeLabel}>{context.convergeLabel}</span>
            <span className={styles.chainArrow} aria-hidden="true">↓</span>
            <span className={styles.outcomeLabel}>{context.outcomeLabel}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Write `Context.module.css`**

```css
.section {
  padding-block: var(--space-9);
  background: var(--color-surface-muted);
}

.convergence {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
}

.elements {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  width: 100%;
}

.elementCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.elementTitle {
  font-size: var(--font-size-lg);
}

.elementDescription {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.chainArrow {
  color: var(--color-text-muted);
  font-size: var(--font-size-xl);
}

.outcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
}

.convergeLabel {
  font-weight: 800;
  font-size: var(--font-size-xl);
  padding: var(--space-3) var(--space-6);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  border-radius: var(--radius-pill);
}

.outcomeLabel {
  font-weight: 700;
  font-size: var(--font-size-lg);
}

@media (min-width: 768px) {
  .elements {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .elements {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Problem and Context sections with fragmented-vs-system diagrams"
```

---

### Task 10: How It Works section + full Product Preview section

**Files:**
- Create: `src/components/sections/HowItWorks/HowItWorks.tsx`, `HowItWorks.module.css`
- Create: `src/components/sections/ProductPreview/ProductPreview.tsx`, `ProductPreview.module.css`

**Interfaces:**
- Consumes: `landingContent.howItWorks`, `landingContent.productPreview` (Task 2); `Container`, `SectionHeading`, `Card` (Task 3); `AppShell` (Task 7); `useScrollReveal` (Task 4).
- Produces: `<HowItWorks />`, `<ProductPreview />`.

- [ ] **Step 1: Write `HowItWorks.tsx`** (SPEC §12 — horizontal on desktop, vertical timeline on mobile)

```tsx
// src/components/sections/HowItWorks/HowItWorks.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './HowItWorks.module.css'

export function HowItWorks() {
  const { howItWorks } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="how-it-works" className={styles.section} aria-labelledby="how-it-works-heading">
      <Container>
        <SectionHeading as="h2" title={howItWorks.title} align="center" />

        <div
          ref={ref}
          className={`${styles.steps} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          {howItWorks.steps.map((step) => (
            <Card key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Write `HowItWorks.module.css`**

```css
.section {
  padding-block: var(--space-9);
}

.steps {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.number {
  font-size: var(--font-size-sm);
  font-weight: 800;
  color: var(--color-accent);
}

.stepTitle {
  font-size: var(--font-size-xl);
}

.stepDescription {
  color: var(--color-text-muted);
  line-height: var(--line-height-relaxed);
}

@media (min-width: 1024px) {
  .steps {
    flex-direction: row;
  }

  .step {
    flex: 1;
  }
}
```

- [ ] **Step 3: Write `ProductPreview.tsx`** (SPEC §13 full shell)

```tsx
// src/components/sections/ProductPreview/ProductPreview.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { AppShell } from '../../product/AppShell/AppShell'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './ProductPreview.module.css'

export function ProductPreview() {
  const { productPreview } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="product-preview" className={styles.section} aria-labelledby="product-preview-heading">
      <Container>
        <SectionHeading as="h2" title={productPreview.title} align="center" />

        <div
          ref={ref}
          className={`${styles.shellWrapper} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          <AppShell
            greeting={productPreview.greeting}
            sidebarLinks={productPreview.sidebarLinks}
            headerLabels={productPreview.headerLabels}
            planLabel={productPreview.planLabel}
            meals={productPreview.meals}
            contextLabel={productPreview.contextLabel}
            contextItems={productPreview.contextItems}
            assistantLabel={productPreview.assistantLabel}
            assistantPrompt={productPreview.assistantPrompt}
          />
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Write `ProductPreview.module.css`**

```css
.section {
  padding-block: var(--space-9);
  background: var(--color-surface-muted);
}

.shellWrapper {
  margin-top: var(--space-8);
  max-width: 960px;
  margin-inline: auto;
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: How It Works steps and full Product Preview app-shell section"
```

---

### Task 11: Personalization section + AI Assistant section

**Files:**
- Create: `src/components/sections/Personalization/Personalization.tsx`, `Personalization.module.css`
- Create: `src/components/sections/Assistant/Assistant.tsx`, `Assistant.module.css`

**Interfaces:**
- Consumes: `landingContent.personalization`, `landingContent.assistant` (Task 2); `Container`, `SectionHeading`, `Card` (Task 3); `useScrollReveal` (Task 4).
- Produces: `<Personalization />`, `<Assistant />`.

- [ ] **Step 1: Write `Personalization.tsx`** (SPEC §14 — progression + example rows)

```tsx
// src/components/sections/Personalization/Personalization.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Personalization.module.css'

export function Personalization() {
  const { personalization } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="personalization" className={styles.section} aria-labelledby="personalization-heading">
      <Container>
        <div className={styles.layout}>
          <div>
            <SectionHeading as="h2" title={personalization.title} description={personalization.description} />

            <ol className={styles.progression}>
              {personalization.progression.map((step, index) => (
                <li key={step} className={styles.progressionStep}>
                  <span className={styles.progressionIndex}>{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <Card ref={ref as never} className={`${styles.exampleCard} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}>
            {personalization.example.map((row) => (
              <div key={row.key} className={styles.exampleRow}>
                <span className={styles.exampleLabel}>{row.label}</span>
                <span className={styles.exampleValue}>{row.value}</span>
              </div>
            ))}
            <div className={styles.recommendation}>
              <span className={styles.recommendationLabel}>{personalization.recommendationLabel}</span>
              <span className={styles.recommendationValue}>{personalization.recommendationValue}</span>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}
```

`Card` from Task 3 is a plain function component without `forwardRef`. Since this task needs a ref target for `useScrollReveal`, update Task 3's `Card` now to forward its ref (small, backwards-compatible change):

```tsx
// src/components/ui/Card/Card.tsx (revised)
import { forwardRef, type HTMLAttributes } from 'react'
import styles from './Card.module.css'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Card({ className = '', ...props }, ref) {
    return <div ref={ref} className={`${styles.card} ${className}`} {...props} />
  },
)
```

With that change, drop the `as never` cast in `Personalization.tsx` and pass `ref={ref}` directly.

- [ ] **Step 2: Write `Personalization.module.css`**

```css
.section {
  padding-block: var(--space-9);
}

.layout {
  display: grid;
  gap: var(--space-8);
}

.progression {
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.progressionStep {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 600;
}

.progressionIndex {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-weight: 800;
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.exampleCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.exampleRow {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-2);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
}

.exampleLabel {
  color: var(--color-text-muted);
}

.exampleValue {
  font-weight: 700;
  text-align: right;
}

.recommendation {
  margin-top: var(--space-3);
  background: var(--color-accent-soft);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.recommendationLabel {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.recommendationValue {
  font-weight: 700;
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}
```

- [ ] **Step 3: Write `Assistant.tsx`** (SPEC §15 — chat example; explicitly framed as a feature inside NutriOS, not a chatbot clone)

```tsx
// src/components/sections/Assistant/Assistant.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Assistant.module.css'

export function Assistant() {
  const { assistant } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="assistant" className={styles.section} aria-labelledby="assistant-heading">
      <Container>
        <div className={styles.layout}>
          <SectionHeading as="h2" title={assistant.title} description={assistant.description} />

          <Card ref={ref} className={`${styles.conversation} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}>
            {assistant.conversation.map((message, index) => (
              <p
                key={index}
                className={`${styles.bubble} ${message.role === 'user' ? styles.userBubble : styles.assistantBubble}`}
              >
                {message.text}
              </p>
            ))}
          </Card>

          <ul className={styles.examples}>
            {assistant.examplePrompts.map((prompt) => (
              <li key={prompt} className={styles.example}>
                {prompt}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Write `Assistant.module.css`**

```css
.section {
  padding-block: var(--space-9);
  background: var(--color-surface-muted);
}

.layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
  text-align: center;
}

.conversation {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  text-align: left;
}

.bubble {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  max-width: 85%;
  line-height: var(--line-height-relaxed);
}

.userBubble {
  align-self: flex-end;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
}

.assistantBubble {
  align-self: flex-start;
  background: var(--color-surface-muted);
}

.examples {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  max-width: 720px;
}

.example {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  padding: var(--space-2) var(--space-4);
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Personalization and AI Assistant sections"
```

---

### Task 12: Nutrition Loop section + Trust & Safety section

**Files:**
- Create: `src/components/sections/NutritionLoop/NutritionLoop.tsx`, `NutritionLoop.module.css`
- Create: `src/components/sections/Safety/Safety.tsx`, `Safety.module.css`

**Interfaces:**
- Consumes: `landingContent.nutritionLoop`, `landingContent.safety` (Task 2); `Container`, `SectionHeading`, `Card` (Task 3); `useScrollReveal` (Task 4).
- Produces: `<NutritionLoop />`, `<Safety />`.

- [ ] **Step 1: Write `NutritionLoop.tsx`** (SPEC §16)

```tsx
// src/components/sections/NutritionLoop/NutritionLoop.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './NutritionLoop.module.css'

export function NutritionLoop() {
  const { nutritionLoop } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="nutrition-loop" className={styles.section} aria-labelledby="nutrition-loop-heading">
      <Container>
        <SectionHeading as="h2" title={nutritionLoop.title} align="center" />

        <div
          ref={ref}
          className={`${styles.loop} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          {nutritionLoop.loopSteps.map((step, index) => (
            <div key={`${step}-${index}`} className={styles.loopStep}>
              <span className={styles.loopLabel}>{step}</span>
              {index < nutritionLoop.loopSteps.length - 1 ? (
                <span className={styles.loopArrow} aria-hidden="true">↓</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.features}>
          {nutritionLoop.features.map((feature) => (
            <Card key={feature.title} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Write `NutritionLoop.module.css`**

```css
.section {
  padding-block: var(--space-9);
}

.loop {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.loopStep {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.loopLabel {
  background: var(--color-surface-muted);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.loopArrow {
  color: var(--color-text-muted);
}

.features {
  margin-top: var(--space-8);
  display: grid;
  gap: var(--space-4);
}

.featureCard {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.featureTitle {
  font-size: var(--font-size-lg);
}

.featureDescription {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

@media (min-width: 768px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

- [ ] **Step 3: Write `Safety.tsx`** (SPEC §17/§34 — required non-medical framing)

```tsx
// src/components/sections/Safety/Safety.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { landingContent } from '../../../data/landing'
import styles from './Safety.module.css'

export function Safety() {
  const { safety } = landingContent

  return (
    <section id="safety" className={styles.section} aria-labelledby="safety-heading">
      <Container>
        <div className={styles.wrapper}>
          <SectionHeading as="h2" title={safety.title} align="center" />
          <p className={styles.disclaimer}>{safety.shortDisclaimer}</p>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Write `Safety.module.css`**

```css
.section {
  padding-block: var(--space-9);
  background: var(--color-surface-muted);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  text-align: center;
}

.disclaimer {
  max-width: 640px;
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Nutrition Loop and Trust & Safety sections"
```

---

### Task 13: Final CTA (waitlist form) + App assembly

**Files:**
- Create: `src/components/sections/FinalCTA/FinalCTA.tsx`, `FinalCTA.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `landingContent.finalCta` (Task 2); `useWaitlistForm` (Task 5); `Container`, `SectionHeading`, `Input`, `Button` (Task 3); every section component from Tasks 6–12.
- Produces: the fully assembled page — this is the last task before QA.

- [ ] **Step 1: Write `FinalCTA.tsx`** (SPEC §18 — idle/loading/success/error states, accessible)

```tsx
// src/components/sections/FinalCTA/FinalCTA.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import { useWaitlistForm } from '../../../hooks/useWaitlistForm'
import { landingContent } from '../../../data/landing'
import styles from './FinalCTA.module.css'

export function FinalCTA() {
  const { finalCta } = landingContent
  const { email, setEmail, status, errorMessage, handleSubmit } = useWaitlistForm()

  return (
    <section id="waitlist" className={styles.section} aria-labelledby="final-cta-heading">
      <Container>
        <div className={styles.wrapper}>
          <SectionHeading as="h2" title={finalCta.title} description={finalCta.description} align="center" />

          {status === 'success' ? (
            <p className={styles.success} role="status">
              {finalCta.successMessage}
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                label={finalCta.emailLabel}
                type="email"
                name="email"
                placeholder={finalCta.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={status === 'error' ? errorMessage : undefined}
                disabled={status === 'loading'}
                autoComplete="email"
              />
              <Button type="submit" variant="primary" disabled={status === 'loading'}>
                {status === 'loading' ? finalCta.loadingLabel : finalCta.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Write `FinalCTA.module.css`**

```css
.section {
  padding-block: var(--space-9);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  text-align: center;
}

.form {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: stretch;
}

.success {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-accent);
  max-width: 480px;
}

@media (min-width: 768px) {
  .form {
    flex-direction: row;
    align-items: flex-start;
  }
}
```

- [ ] **Step 3: Assemble `App.tsx`**

```tsx
// src/App.tsx
import { Header } from './components/layout/Header/Header'
import { Footer } from './components/layout/Footer/Footer'
import { Hero } from './components/sections/Hero/Hero'
import { Problem } from './components/sections/Problem/Problem'
import { Context } from './components/sections/Context/Context'
import { HowItWorks } from './components/sections/HowItWorks/HowItWorks'
import { ProductPreview } from './components/sections/ProductPreview/ProductPreview'
import { Personalization } from './components/sections/Personalization/Personalization'
import { Assistant } from './components/sections/Assistant/Assistant'
import { NutritionLoop } from './components/sections/NutritionLoop/NutritionLoop'
import { Safety } from './components/sections/Safety/Safety'
import { FinalCTA } from './components/sections/FinalCTA/FinalCTA'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Context />
        <HowItWorks />
        <ProductPreview />
        <Personalization />
        <Assistant />
        <NutritionLoop />
        <Safety />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npx eslint .
npm run build
```
Expected: all pass with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Final CTA waitlist form and full page assembly"
```

---

### Task 14: Full QA pass (responsive, accessibility, performance, build)

**Files:** none created — this task verifies Tasks 1–13 against SPEC §21/§30/§31/§37 and fixes anything it finds in the files already listed above.

- [ ] **Step 1: Run the dev server and visually check all three breakpoints**

```bash
npm run dev
```
In a browser: check at ~375px (mobile), ~800px (tablet), ~1280px (desktop). Confirm: no horizontal scrollbar/overflow at any width; the app shell in Hero and Product Preview each have a legible, non-cramped mobile layout (sidebar hides below 768px per `ProductSidebar.module.css`); mobile menu opens, traps focus (Tab/Shift+Tab stay inside), closes on Escape and returns focus to the trigger button, and locks body scroll while open.

- [ ] **Step 2: Keyboard-only pass**

Using only Tab / Shift+Tab / Enter / Space / Escape: reach every header nav link, the header CTA, the mobile menu trigger and its contents, every anchor CTA, the email input, and the submit button. Confirm a visible focus ring appears on each (from the global `:focus-visible` rule in `globals.css`).

- [ ] **Step 3: Reduced motion check**

In browser dev tools, emulate `prefers-reduced-motion: reduce` (Chrome DevTools → Rendering tab → Emulate CSS media feature). Reload and confirm all sections render fully visible immediately (no faded-out content stuck at `opacity: 0` — this is what the `matchMedia` check inside `useScrollReveal`, Task 4, guarantees).

- [ ] **Step 4: Form states**

Submit the waitlist form with an invalid value (e.g. `notanemail`) — confirm the error message appears, is associated via `aria-describedby`, and is announced (`role="alert"`). Submit a valid email — confirm it shows the loading label briefly, then swaps to the success message with `role="status"`.

- [ ] **Step 5: Heading/landmark audit**

```bash
grep -rn "<h1" src/
```
Expected: exactly one match, in `Hero.tsx`. Manually confirm every section (`Problem`, `Context`, `HowItWorks`, `ProductPreview`, `Personalization`, `Assistant`, `NutritionLoop`, `Safety`, `FinalCTA`) uses `<section id="...">` with a matching header nav anchor where applicable, and there is exactly one `<header>`, one `<main>`, one `<footer>`.

- [ ] **Step 6: Production build + preview**

```bash
npm run build
npm run preview
```
Open the preview URL; spot-check the same breakpoints as Step 1 against the production build. Confirm no console errors or React warnings (open browser devtools console).

- [ ] **Step 7: Lint and type-check one final time**

```bash
npx tsc --noEmit
npx eslint .
```
Expected: zero errors, zero warnings.

- [ ] **Step 8: Fix anything Steps 1–7 surfaced, then commit**

```bash
git add -A
git commit -m "fix: QA pass — responsive, accessibility, and reduced-motion fixes"
```
(Skip this commit if Steps 1–7 found nothing to fix.)

---

## Self-Review Notes

- **Spec coverage:** Header §8, Hero §9, Problem §10, Product concept §11, How it works §12, Product/App Shell Preview §13, Personalization §14, AI Assistant §15, Connected nutrition loop §16, Trust & Safety §17, Final CTA §18, Footer §19 — each maps to exactly one task above (Tasks 6, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 6). UX/responsive/accessibility/performance/SEO requirements (§20–§32) are addressed cross-cutting in Tasks 1 (tokens/SEO), 4 (reduced motion), 6 (keyboard menu), and 14 (QA pass). Safety copy (§33/§34) is verbatim in Task 2's data and rendered in Task 12. Waitlist architecture (§29) is Task 5.
- **Type consistency verified:** `Meal` shape (`key/label/time`) is identical across `HeroContent.preview.meals`, `ProductPreviewContent.meals`, and the `MealPlan`/`AppShell` component props. `PersonalContext`/`AssistantPreview` prop names (`label`, `items`/`prompt`) match between Task 7's definitions and every consumer in Tasks 8 and 10.
- **`Card` forwardRef change:** flagged inline in Task 11 rather than left as a mismatch — Task 3 originally defines a non-ref `Card`; Task 11 revises it before use, and Task 3's own step doesn't need a ref so nothing there breaks.
