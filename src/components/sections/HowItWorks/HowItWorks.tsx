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
        <SectionHeading
          as="h2"
          id="how-it-works-heading"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          align="center"
        />

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
