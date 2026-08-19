// src/components/sections/Problem/Problem.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Icon } from '../../ui/Icon/Icon'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Problem.module.css'

export function Problem() {
  const { problem } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="problem" className={styles.section} aria-labelledby="problem-heading">
      <Container>
        <SectionHeading
          as="h2"
          id="problem-heading"
          eyebrow={problem.eyebrow}
          title={problem.title}
          description={problem.description}
        />

        <div
          ref={ref}
          className={`${styles.diagrams} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          <div className={styles.fragmented}>
            {problem.fragmentedSteps.map((step, index) => (
              <div key={step} className={styles.fragmentedStep}>
                <span className={styles.stepLabel}>{step}</span>
                {index < problem.fragmentedSteps.length - 1 ? (
                  <span className={styles.arrow} aria-hidden="true">
                    <Icon name="arrowRight" size={16} />
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.divider} aria-hidden="true">
            <Icon name="arrowRight" size={28} />
          </div>

          <div className={styles.contrast}>
            <span className={styles.contrastLabel}>{problem.contrastLabel}</span>
            {problem.contrastSteps.map((step, index) => (
              <div key={step} className={styles.contrastStep}>
                <span className={`${styles.contrastDot} ${index === 1 ? styles.contrastDotAlt : ''}`} aria-hidden="true" />
                <span className={styles.contrastStepLabel}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
