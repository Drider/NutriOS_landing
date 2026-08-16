// src/components/sections/ProductPreview/ProductPreview.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { AppShell } from '../../product/AppShell/AppShell'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './ProductPreview.module.css'

export function ProductPreview() {
  const { productPreview } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="product-preview" className={styles.section} aria-labelledby="product-preview-heading">
      <Container>
        <SectionHeading as="h2" id="product-preview-heading" title={productPreview.title} align="center" />

        <div
          ref={ref}
          className={`${styles.shellWrapper} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
        >
          <AppShell
            greeting={productPreview.greeting}
            sidebarLinks={productPreview.sidebarLinks}
            headerLabels={productPreview.headerLabels}
            planLabel={productPreview.planLabel}
            meals={productPreview.meals}
            contextLabel={productPreview.contextLabel}
            contextItems={productPreview.contextItems}
            assistantLabel={productPreview.assistantLabel}
            assistantPrompt={productPreview.assistantPrompt}
          />
        </div>
      </Container>
    </section>
  )
}
