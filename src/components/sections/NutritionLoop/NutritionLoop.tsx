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
        <SectionHeading as="h2" id="nutrition-loop-heading" title={nutritionLoop.title} align="center" />

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
