// src/components/sections/Assistant/Assistant.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Assistant.module.css'

export function Assistant() {
  const { assistant } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="assistant" className={styles.section} aria-labelledby="assistant-heading">
      <Container>
        <div className={styles.layout}>
          <SectionHeading as="h2" title={assistant.title} description={assistant.description} />

          <Card ref={ref} className={`${styles.conversation} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}>
            {assistant.conversation.map((message, index) => (
              <p
                key={index}
                className={`${styles.bubble} ${message.role === 'user' ? styles.userBubble : styles.assistantBubble}`}
              >
                {message.text}
              </p>
            ))}
          </Card>

          <ul className={styles.examples}>
            {assistant.examplePrompts.map((prompt) => (
              <li key={prompt} className={styles.example}>
                {prompt}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
