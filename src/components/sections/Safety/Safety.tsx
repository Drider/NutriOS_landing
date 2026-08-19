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
        <div className={styles.layout}>
          <SectionHeading
            as="h2"
            id="safety-heading"
            eyebrow={safety.eyebrow}
            icon="shield"
            title={safety.title}
            description={safety.shortDisclaimer}
          />
          <div className={styles.panel}>
            <p className={styles.extended}>{safety.extendedDisclaimer}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
