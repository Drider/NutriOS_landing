// src/components/sections/NutritionLoop/NutritionLoop.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Icon, type IconName } from '../../ui/Icon/Icon'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './NutritionLoop.module.css'

const FEATURE_ICONS: Record<string, IconName> = {
  'Планирование питания': 'calendar',
  'Планирование покупок': 'cart',
  'История питания': 'history',
  'Персональные рекомендации': 'sparkle',
}

export function NutritionLoop() {
  const { nutritionLoop } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="nutrition-loop" className={styles.section} aria-labelledby="nutrition-loop-heading">
      <Container>
        <SectionHeading
          as="h2"
          id="nutrition-loop-heading"
          title={nutritionLoop.title}
          align="center"
        />

        <div
          ref={ref}
          className={`${styles.loop} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          {nutritionLoop.loopSteps.map((step, index) => (
            <div key={`${step}-${index}`} className={styles.loopItem}>
              {index > 0 ? <Icon name="arrowRight" size={14} className={styles.loopArrow} /> : null}
              <span
                className={`${styles.loopLabel} ${
                  index === nutritionLoop.loopSteps.length - 1 ? styles.loopLabelFinal : ''
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <ul className={styles.features}>
          {nutritionLoop.features.map((feature) => (
            <li key={feature.title} className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <Icon name={FEATURE_ICONS[feature.title] ?? 'sparkle'} />
              </span>
              <div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
