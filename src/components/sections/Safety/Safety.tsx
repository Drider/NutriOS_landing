// src/components/sections/Safety/Safety.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { landingContent } from '../../../data/landing'
import styles from './Safety.module.css'

export function Safety() {
  const { safety } = landingContent

  return (
    <section id="safety" className={styles.section} aria-labelledby="safety-heading">
      <Container>
        <div className={styles.wrapper}>
          <SectionHeading as="h2" title={safety.title} align="center" />
          <p className={styles.disclaimer}>{safety.shortDisclaimer}</p>
        </div>
      </Container>
    </section>
  )
}
