import { Container } from '../../layout/Container/Container'
import { Button } from '../../ui/Button/Button'
import { Icon } from '../../ui/Icon/Icon'
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
            <span className={styles.eyebrow}>
              <Icon name="sprout" size={15} />
              {hero.eyebrow}
            </span>
            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.description}>{hero.description}</p>
            <div className={styles.actions}>
              <Button as="a" href="#waitlist" variant="primary">
                {hero.primaryCta}
                <Icon name="arrowRight" size={15} />
              </Button>
              <Button as="a" href="#how-it-works" variant="secondary">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className={styles.previewWrapper}>
            <div className={styles.previewGlow} aria-hidden="true" />
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <p className={styles.greeting}>{hero.preview.greeting}</p>
                <span className={styles.previewBadge}>
                  <Icon name="clock" size={18} />
                </span>
              </div>
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
