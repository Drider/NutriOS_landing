Да. Ниже — объединённая версия: **исходный product brief + UX/visual specification + конкретные технические ограничения React + Vite**, уже в формате, который можно отдавать AI coding agent как единый implementation prompt.

# NutriOS Landing Page — AI Coding Agent Implementation Brief

## 1. Task

Build a production-ready landing page for **NutriOS**, a Personal Nutrition OS.

The page must communicate NutriOS as a **personal nutrition system**, not as a generic AI chatbot, recipe database, medical product, or weight-loss application.

The implementation must use:

* React
* TypeScript
* Vite
* semantic HTML
* CSS / CSS Modules
* responsive design
* accessible interactions

The result must be a polished, premium consumer SaaS landing page suitable for a product launch / waitlist.

---

# 2. Product

## Product name

**NutriOS**

## Category

**Personal Nutrition OS**

## Product description

NutriOS is a wellness and nutrition education assistant for planning everyday meals.

It helps users make practical food decisions by considering:

* goals;
* food preferences;
* dietary restrictions;
* eating history;
* available ingredients;
* schedule;
* available cooking time;
* everyday household context.

The key concept is that NutriOS does not generate isolated meal plans.

It maintains a **personal nutrition context** and uses that context to make everyday food planning easier.

---

# 3. Product positioning

## Core positioning

> **Nutrition isn't a plan. It's a system.**

Supporting message:

> NutriOS turns your goals, preferences, habits and everyday context into practical food decisions.

## Core product insight

Eating well is not primarily an information problem.

There is already an enormous amount of information about nutrition.

The problem is **decision-making**:

> What should I eat today?
> What can I cook with what I already have?
> What fits my preferences?
> What fits my schedule?
> What should I change if my plans change?

NutriOS should position itself as the system that connects these decisions.

---

# 4. Target audience

Primary audience:

* adults approximately 25–45;
* digitally comfortable;
* interested in wellness and better eating;
* busy;
* willing to use digital tools;
* tired of manually planning meals;
* have personal food preferences or restrictions;
* want more consistency without turning nutrition into a complex project.

Psychographic profile:

**Busy but health-conscious.**

They know they should eat better but struggle with consistency, planning and everyday decision fatigue.

---

# 5. Primary goal

The primary goal of the landing page is:

> **Convert visitors into NutriOS waitlist signups.**

Primary CTA:

> **Join the waitlist**

Secondary goals:

1. Explain NutriOS within 5–10 seconds.
2. Establish the "Personal Nutrition OS" category.
3. Explain the value of personal context.
4. Show what the future product looks like.
5. Create trust.
6. Clearly establish that NutriOS is a wellness product, not a medical service.

---

# 6. Main user journey

The page should communicate this narrative:

```text
Problem
   ↓
Nutrition is difficult because everyday decisions are fragmented
   ↓
NutriOS
   ↓
Personal context
   ↓
Personalized planning
   ↓
Practical everyday decisions
   ↓
Less decision fatigue
   ↓
Join the waitlist
```

---

# 7. Page structure

Implement the page in this order:

1. Header
2. Hero
3. Problem
4. Product concept
5. How it works
6. Product / App Shell preview
7. Personalization
8. AI Assistant
9. Connected nutrition loop
10. Trust & Safety
11. Final CTA
12. Footer

---

# 8. Header

## Content

Logo:

> NutriOS

Navigation:

* How it works
* Personalization
* Assistant
* About

Primary CTA:

> Join the waitlist

## Desktop

```text
[ NutriOS ]       How it works   Personalization   Assistant   [ Join the waitlist ]
```

## Mobile

```text
[ NutriOS ]                                      [ Menu ]
```

## Behavior

* Header is sticky.
* Navigation links use anchor navigation.
* CTA scrolls to the waitlist form.
* Mobile menu must be keyboard accessible.
* Escape closes mobile menu.
* Focus should be returned to the menu trigger after closing.
* Body scrolling should be prevented while mobile menu is open.

---

# 9. Hero

## Headline

> **Nutrition isn't a plan. It's a system.**

## Supporting copy

> NutriOS helps you plan what to eat around your goals, preferences, habits and real life.

## Primary CTA

> Join the waitlist

## Secondary CTA

> See how it works

Secondary CTA scrolls to the `How it works` section.

## Hero visual

The hero must show a large **NutriOS app-shell preview**.

Do not use a generic stock photo as the primary hero visual.

The visual should communicate:

* today's meals;
* personal context;
* meal planning;
* assistant;
* practical recommendations.

Example:

```text
┌─────────────────────────────────────────────┐
│ Good morning                                │
│                                             │
│ Today's plan                                │
│                                             │
│ Breakfast      Lunch        Dinner          │
│ 08:00          13:00        19:00           │
│                                             │
│ Personal context                            │
│ • 30 min cooking time                       │
│ • 2 ingredients to use                      │
│ • 3 meals planned                           │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Ask NutriOS                             │ │
│ │ What should I change for tonight?       │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

The preview should preferably be implemented as real React/HTML/CSS UI, not as a single screenshot.

---

# 10. Problem section

## Headline

> **Eating well shouldn't require a second job.**

## Copy

> There is no shortage of nutrition advice. The hard part is turning it into everyday decisions that actually fit your life.

## Visual

Show fragmented workflow:

```text
Goals
 ↓
Search recipes
 ↓
Check ingredients
 ↓
Plan meals
 ↓
Go shopping
 ↓
Track
 ↓
Repeat
```

Then contrast with:

```text
NutriOS

Your context
     ↓
Practical decisions
```

Optional subtle scroll reveal animation.

Animations must not be required to understand the content.

---

# 11. Product concept

## Headline

> **Built around your context.**

## Copy

> NutriOS brings your goals, preferences, history and everyday constraints into one personal nutrition system.

## Context elements

Show:

* Goals
* Preferences
* Restrictions
* History
* Daily context

Each should have:

* icon;
* title;
* short description.

Example:

**Daily context**

> Available time, ingredients and plans can change what makes sense today.

The elements should visually converge toward a central:

> **NutriOS Context**

Then:

> **Practical food decisions**

---

# 12. How it works

## Headline

> **From context to action.**

Three steps.

### 01 — Tell NutriOS about you

> Set your goals, preferences and food constraints.

### 02 — Build your nutrition context

> NutriOS combines your profile, history and everyday context.

### 03 — Make better everyday decisions

> Get meal ideas, plans and alternatives that fit your current situation.

Desktop:

* horizontal sequence.

Mobile:

* vertical timeline.

Each step should include a small product UI fragment.

---

# 13. Product / App Shell Preview

This is one of the most important sections.

## Headline

> **A nutrition system that remembers the context.**

The user must be able to visually understand what the future product actually looks like.

## App shell

Desktop:

```text
┌───────────────────────────────────────────────────────────────┐
│ NutriOS                                  Search      Profile  │
├──────────────┬────────────────────────────────────────────────┤
│ Today        │ Good morning                                  │
│ Plan         │                                                │
│ Meals        │ Today's plan                                  │
│ Grocery      │ [ Breakfast ] [ Lunch ] [ Dinner ]            │
│ History      │                                                │
│              │ Personal context                              │
│              │ ┌──────────────────────────────────────────┐ │
│              │ │ 30 min cooking · 2 ingredients to use   │ │
│              │ └──────────────────────────────────────────┘ │
│              │                                                │
│              │ NutriOS Assistant                              │
│              │ "What should I change for tonight?"            │
└──────────────┴────────────────────────────────────────────────┘
```

## Implementation requirement

`ProductShellPreview` must be implemented as React components.

Do not make the entire UI a flattened image.

Suggested components:

```text
ProductShell
├── ProductSidebar
├── ProductHeader
├── MealPlan
├── MealCard
├── PersonalContext
└── AssistantPreview
```

The shell is a **marketing prototype**, not a functional application.

Interactive behavior should be limited to visual/demo interactions.

---

# 14. Personalization

## Headline

> **The more context it has, the more useful it becomes.**

## Copy

> NutriOS doesn't start from a blank page every day. Your preferences and history become part of the system.

Visual progression:

```text
Profile
 ↓
Preferences
 ↓
History
 ↓
Context
 ↓
Personalized recommendations
```

Example UI:

```text
Profile
Vegetarian

Preferences
High-protein meals

History
12 saved meals

Daily context
20 min available

Recommendation
Quick dinner based on your preferences
```

Avoid medical attributes in these examples.

---

# 15. AI Assistant

## Headline

> **Ask your nutrition system.**

## Copy

> Get practical answers based on your personal context — not a generic conversation.

## Example conversation

```text
You:
I only have 20 minutes tonight.

NutriOS:
Let's adjust your dinner plan.

Here are 3 options that fit your available time.
```

Additional examples:

> What can I make with what's in my fridge?

> Give me an alternative for tonight.

> Adjust tomorrow's plan.

> Help me use the ingredients I already have.

## Important positioning

The AI assistant is a **feature inside NutriOS**, not the entire product.

Do not make the landing page look like a generic ChatGPT clone.

---

# 16. Connected nutrition loop

## Headline

> **One system. From planning to groceries.**

Visual:

```text
Plan
 ↓
Meals
 ↓
Ingredients
 ↓
Grocery list
 ↓
Meals
 ↓
History
 ↓
Better future recommendations
```

Feature cards:

* Meal planning
* Grocery planning
* Meal history
* Personalized recommendations

---

# 17. Trust & Safety

## Headline

> **Built for everyday wellness.**

## Required copy

> NutriOS is a wellness and nutrition education product. It is not a medical service and does not provide diagnosis, treatment or medical advice.

Extended version:

> NutriOS provides tools and educational guidance for everyday food planning and wellness. It does not diagnose, treat or prevent medical conditions, prescribe medical diets, or replace advice from qualified healthcare professionals.

---

# 18. Final CTA

## Headline

> **Build a nutrition system that fits your life.**

## Copy

> Get early access to NutriOS.

## Form

```text
[ Email address                         ] [ Join the waitlist ]
```

Required states:

```text
idle
 ↓
loading
 ↓
success
```

Error:

> Please enter a valid email address.

Success:

> You're on the list. We'll let you know when NutriOS is ready.

The form should require only email.

Do not implement authentication or account creation.

---

# 19. Footer

Include:

* NutriOS logo
* Privacy
* Terms
* Safety / Disclaimer
* Contact

Footer disclaimer:

> NutriOS is a wellness and nutrition education product. It is not medical advice and does not diagnose or treat health conditions.

---

# 20. UX requirements

## Navigation

* Sticky header.
* Anchor navigation.
* Smooth scroll.
* Mobile navigation.
* Keyboard accessible menu.
* No broken anchors.

## CTA

All `Join the waitlist` buttons must target the same waitlist form.

Do not create separate signup flows.

## Scroll animations

Animations may be used for:

* section reveal;
* cards;
* product UI;
* diagrams;
* subtle transitions.

Animations must never communicate information that is unavailable without animation.

Support:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 21. Responsive behavior

## Desktop

`>= 1024px`

Use:

* multi-column layouts;
* large hero;
* full app shell;
* horizontal process sections.

## Tablet

`768px–1023px`

Adjust:

* typography;
* spacing;
* grid columns;
* app-shell proportions.

## Mobile

`<768px`

All complex layouts become vertical.

Do not simply scale down desktop UI until it becomes unreadable.

The app shell should have a dedicated mobile representation.

No horizontal page overflow.

---

# 22. Visual direction

## General

Visual language:

**Premium consumer SaaS + calm wellness + modern productivity software.**

Characteristics:

* clean;
* calm;
* intelligent;
* trustworthy;
* premium;
* generous whitespace.

## Avoid

* generic fitness aesthetics;
* medical UI;
* neon AI gradients;
* excessive glassmorphism;
* excessive 3D;
* stock-photo-heavy design;
* weight-loss imagery;
* before/after imagery;
* body measurement imagery.

## Color

Suggested direction:

* warm off-white background;
* dark neutral typography;
* muted natural green accent;
* warm neutral surfaces;
* subtle borders.

Avoid aggressive saturated fitness colors.

## Typography

Use a modern readable sans-serif.

Prioritize:

* strong heading hierarchy;
* generous line-height;
* readable body text;
* restrained font weights.

## UI

App UI:

* rounded cards;
* subtle borders;
* subtle shadows;
* generous spacing;
* calm density;
* clear information hierarchy.

---

# 23. Technical stack

Mandatory:

* React 19+ if compatible with the existing project.
* TypeScript.
* Vite 7+ if compatible with the existing project.
* CSS Modules or existing project CSS architecture.
* ESLint.
* Prettier if already configured.

The implementation is a **client-side Vite application**.

Do not introduce:

* Next.js;
* Remix;
* Astro;
* SSR framework;
* unnecessary routing;
* Redux;
* Zustand;
* global state management;
* heavy UI libraries;
* animation libraries;

unless they already exist in the project or are explicitly required.

Do not migrate the project to another framework.

If the repository already contains an established architecture, preserve it unless it directly conflicts with this specification.

---

# 24. Vite requirements

The application must work correctly with:

```bash
npm run dev
npm run build
npm run preview
```

Production build must complete without errors.

Use Vite-compatible asset handling.

For environment variables use:

```ts
import.meta.env
```

Never expose secrets in frontend code.

Do not use Node.js-only APIs inside browser components.

If the application is deployed under a non-root path, respect the configured Vite `base`.

---

# 25. React architecture

Suggested structure:

```text
src/
├── main.tsx
├── App.tsx
│
├── assets/
│   ├── images/
│   └── fonts/
│
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Container/
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   ├── Problem/
│   │   ├── Context/
│   │   ├── HowItWorks/
│   │   ├── ProductPreview/
│   │   ├── Personalization/
│   │   ├── Assistant/
│   │   ├── NutritionLoop/
│   │   ├── Safety/
│   │   └── FinalCTA/
│   │
│   ├── product/
│   │   ├── AppShell/
│   │   ├── Sidebar/
│   │   ├── MealCard/
│   │   ├── ContextCard/
│   │   ├── AssistantPreview/
│   │   └── GroceryPreview/
│   │
│   └── ui/
│       ├── Button/
│       ├── Card/
│       ├── Input/
│       └── SectionHeading/
│
├── data/
│   └── landing.ts
│
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   └── animations.css
│
└── types/
    └── landing.ts
```

This is a guideline, not a reason to restructure an existing project unnecessarily.

---

# 26. Component principles

Components should have one clear responsibility.

Avoid creating a single giant:

```text
LandingPage.tsx
```

containing the entire page.

Prefer:

```tsx
<App>
  <Header />
  <main>
    <Hero />
    <ProblemSection />
    <ContextSection />
    <HowItWorksSection />
    <ProductPreview />
    <PersonalizationSection />
    <AssistantSection />
    <NutritionLoopSection />
    <SafetySection />
    <FinalCTA />
  </main>
  <Footer />
</App>
```

Reusable UI should be extracted when it is genuinely reused.

Do not over-engineer one-off components.

---

# 27. CSS architecture

Preferred approach:

**CSS Modules + global design tokens.**

Example:

```text
components/
└── Hero/
    ├── Hero.tsx
    └── Hero.module.css
```

Global tokens:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-accent: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;

  --container-max-width: ...;

  --space-1: ...;
  --space-2: ...;
  --space-3: ...;
}
```

Avoid arbitrary values being independently invented in every component.

Use consistent:

* spacing;
* radii;
* typography;
* container widths;
* breakpoints.

---

# 28. Animation implementation

Prefer native CSS:

* `opacity`;
* `transform`;
* CSS transitions;
* CSS keyframes;
* IntersectionObserver where needed.

Do not add Framer Motion solely for basic reveal animations.

Avoid layout-triggering animations such as:

* width;
* height;
* top;
* left.

Prefer:

```text
transform
opacity
```

All animations must support `prefers-reduced-motion`.

---

# 29. Waitlist architecture

The landing page should not assume a specific backend provider.

Create a small integration boundary:

```ts
export async function submitWaitlist(email: string) {
  // API integration will be connected later.
}
```

The UI must be independent from the implementation of the backend.

Do not implement:

* authentication;
* user accounts;
* password management;
* database logic;
* complex form state management.

The current form requires only:

```text
email
```

Validation:

* required;
* valid email format;
* trim whitespace.

The UI must support:

```text
idle
loading
success
error
```

---

# 30. Accessibility

Target:

**WCAG 2.2 AA**

## Semantic HTML

Use:

```html
<header>
<nav>
<main>
<section>
<footer>
```

Use proper heading hierarchy.

Exactly one `h1`.

## Keyboard

All interactive elements must work with keyboard.

Test:

* Tab;
* Shift+Tab;
* Enter;
* Space;
* Escape.

## Focus

All interactive controls need visible focus states.

Do not remove the browser focus outline without replacing it with an accessible alternative.

## Contrast

Meet WCAG AA contrast requirements.

Pay particular attention to:

* muted text;
* placeholder text;
* CTA;
* text on accent surfaces;
* footer text.

## Forms

Inputs require accessible labels.

Validation errors should be announced using appropriate ARIA semantics.

Example:

```text
aria-describedby
role="alert"
```

Success state should also be accessible to assistive technologies.

## Images

Meaningful images require meaningful `alt`.

Decorative images should use empty alt.

Product UI should preferably be HTML/CSS rather than a flattened image.

---

# 31. Performance

Target:

**Lighthouse Performance >= 90**

Ideal:

**95+**

Core Web Vitals targets:

* LCP < 2.5s
* INP < 200ms
* CLS < 0.1

## JavaScript

Keep initial JavaScript small.

Do not add dependencies without clear value.

No global state library is required.

## Images

If images are used:

* prefer AVIF/WebP;
* responsive sizes;
* explicit dimensions;
* lazy-load below-the-fold images.

Hero visual must not cause layout shift.

## Fonts

Limit font weights.

Use:

```css
font-display: swap;
```

where applicable.

Do not load unnecessary font variants.

## Code splitting

Do not over-engineer code splitting for a small landing page.

Only lazy-load below-the-fold code if it provides a measurable benefit.

---

# 32. SEO

Because this is a public marketing landing page, implement basic SEO.

Required:

* meaningful `<title>`;
* meta description;
* canonical URL if deployment URL is known;
* viewport metadata;
* Open Graph metadata;
* Twitter/X card metadata where appropriate;
* semantic headings.

Suggested title:

> NutriOS — Your Personal Nutrition OS

Suggested description:

> NutriOS helps you plan everyday nutrition around your goals, preferences, habits and real life.

Do not make medical or guaranteed health claims in metadata.

---

# 33. Safety restrictions

NutriOS must not be presented as a medical product.

Never use claims such as:

* treats disease;
* prevents disease;
* diagnoses conditions;
* prescribes medical diets;
* replaces a doctor;
* replaces a dietitian;
* guarantees weight loss;
* guarantees health outcomes;
* reverses disease;
* clinically proven without supporting evidence;
* AI doctor.

Avoid medical UI metaphors such as:

* hospital;
* doctor;
* medical cross;
* diagnosis dashboard.

Prefer:

* wellness;
* nutrition education;
* planning;
* personalization;
* everyday food decisions;
* habits;
* preferences;
* context.

---

# 34. Required safety copy

Short:

> **NutriOS is a wellness and nutrition education product. It is not a medical service and does not provide diagnosis, treatment or medical advice.**

Extended:

> NutriOS provides tools and educational guidance for everyday food planning and wellness. It does not diagnose, treat or prevent medical conditions, prescribe medical diets, or replace advice from qualified healthcare professionals.

Use the short version in the main page.

The extended version can be used in the footer or Safety section.

---

# 35. Content architecture

Where practical, static marketing content should be separated from component structure.

Example:

```ts
export const landingContent = {
  hero: {
    eyebrow: "...",
    title: "Nutrition isn't a plan. It's a system.",
    description: "...",
    primaryCta: "Join the waitlist",
    secondaryCta: "See how it works",
  },
};
```

This makes future content iteration easier without modifying layout components.

Do not create an unnecessarily complex CMS abstraction.

---

# 36. Do not overbuild

This is a marketing landing page.

Do not implement a fake full nutrition application.

The app-shell is a **visual product prototype**.

Do not implement:

* real meal tracking;
* real nutrition calculations;
* user authentication;
* database;
* real AI;
* recipe search;
* grocery APIs;
* payment;
* user profiles;
* medical recommendations.

The objective is to communicate the product concept and convert visitors to the waitlist.

---

# 37. Definition of Done

## Product

* [ ] NutriOS is immediately understandable.
* [ ] Personal Nutrition OS positioning is clear.
* [ ] Personal context is clearly differentiated from generic meal planning.
* [ ] Product UI is visible above the fold.
* [ ] Primary CTA is `Join the waitlist`.
* [ ] CTA appears in header, hero and final CTA.
* [ ] Waitlist form works with mocked/abstracted submission.
* [ ] Form has idle/loading/success/error states.

## UX

* [ ] Header is sticky.
* [ ] Anchor navigation works.
* [ ] Mobile menu works.
* [ ] Mobile menu is keyboard accessible.
* [ ] CTA anchors to the waitlist.
* [ ] Smooth scrolling works.
* [ ] Responsive layout works at desktop/tablet/mobile.
* [ ] No horizontal overflow.
* [ ] Animations are non-essential.
* [ ] Reduced-motion mode works.

## Visual

* [ ] Premium consumer SaaS aesthetic.
* [ ] Calm wellness positioning.
* [ ] Product UI is the primary visual language.
* [ ] No generic fitness imagery.
* [ ] No medical visual language.
* [ ] App shell looks like a credible future product.
* [ ] Typography hierarchy is clear.
* [ ] Spacing is consistent.
* [ ] Visual system uses consistent design tokens.

## Accessibility

* [ ] WCAG 2.2 AA target.
* [ ] One `h1`.
* [ ] Correct semantic landmarks.
* [ ] Keyboard navigation works.
* [ ] Visible focus states.
* [ ] Sufficient color contrast.
* [ ] Accessible form labels.
* [ ] Accessible validation errors.
* [ ] Accessible success state.
* [ ] Correct image alt attributes.
* [ ] Reduced-motion support.

## Performance

* [ ] Lighthouse Performance >= 90.
* [ ] LCP < 2.5s.
* [ ] INP < 200ms.
* [ ] CLS < 0.1.
* [ ] No unnecessary heavy dependencies.
* [ ] Images optimized.
* [ ] Fonts optimized.
* [ ] No layout shift.
* [ ] Initial JS is kept reasonably small.

## SEO

* [ ] Correct page title.
* [ ] Meta description.
* [ ] Open Graph metadata.
* [ ] Responsive viewport metadata.
* [ ] Semantic headings.
* [ ] No prohibited medical claims in metadata.

## React / Vite

* [ ] React implementation.
* [ ] TypeScript.
* [ ] Vite build.
* [ ] No unnecessary framework migration.
* [ ] `npm run dev` works.
* [ ] `npm run build` works.
* [ ] `npm run preview` works.
* [ ] No runtime console errors.
* [ ] No React key warnings.
* [ ] No accessibility warnings introduced by implementation.
* [ ] Assets work in production build.
* [ ] Environment variables use `import.meta.env`.
* [ ] No client-side secrets.

## Code quality

* [ ] Page is split into logical React components.
* [ ] No giant monolithic component.
* [ ] Reusable UI patterns are extracted where appropriate.
* [ ] One-off components are not over-abstracted.
* [ ] Content can be edited without restructuring the UI.
* [ ] CSS architecture is consistent.
* [ ] No unnecessary dependencies.
* [ ] Existing project conventions are preserved.

---

# 38. Final implementation principle

The final result should feel like:

> **A real product that happens to be launching soon.**

It should not feel like:

> A marketing page describing an idea.

The visitor should be able to look at the landing page and understand the future product through its interface:

**Context → Planning → Meals → Groceries → History → Better recommendations**

The strongest visual proof of the product should therefore be the **NutriOS app shell**, while the strongest verbal positioning should remain:

> **Nutrition isn't a plan. It's a system.**
