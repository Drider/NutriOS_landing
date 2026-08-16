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
