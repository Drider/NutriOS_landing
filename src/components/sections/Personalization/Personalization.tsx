// src/components/sections/Personalization/Personalization.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { Icon } from '../../ui/Icon/Icon'
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
            <SectionHeading
              as="h2"
              id="personalization-heading"
              eyebrow={personalization.eyebrow}
              title={personalization.title}
              description={personalization.description}
            />

            <ol className={styles.progression}>
              {personalization.progression.map((step, index) => (
                <li key={step} className={styles.progressionItem}>
                  {index > 0 ? <Icon name="arrowRight" size={14} className={styles.progressionArrow} /> : null}
                  <span
                    className={`${styles.progressionStep} ${
                      index === personalization.progression.length - 1 ? styles.progressionFinal : ''
                    }`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Card ref={ref} className={`${styles.exampleCard} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}>
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
