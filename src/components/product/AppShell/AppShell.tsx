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
