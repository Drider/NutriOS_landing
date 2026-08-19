export interface NavLink {
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
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
  eyebrow: string
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
  eyebrow: string
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
  eyebrow: string
  title: string
  steps: HowItWorksStep[]
}

export interface ProductPreviewContent {
  eyebrow: string
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
  eyebrow: string
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
  eyebrow: string
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
  eyebrow: string
  title: string
  loopSteps: string[]
  features: NutritionLoopFeature[]
}

export interface SafetyContent {
  eyebrow: string
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
