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
