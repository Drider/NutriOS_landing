// src/components/sections/Assistant/Assistant.tsx
import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Card } from '../../ui/Card/Card'
import { Icon } from '../../ui/Icon/Icon'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { landingContent } from '../../../data/landing'
import animations from '../../../styles/animations.module.css'
import styles from './Assistant.module.css'

export function Assistant() {
  const { assistant, logo } = landingContent
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="assistant" className={styles.section} aria-labelledby="assistant-heading">
      <Container>
        <div className={styles.layout}>
          <div>
            <SectionHeading
              as="h2"
              id="assistant-heading"
              eyebrow={assistant.eyebrow}
              title={assistant.title}
              description={assistant.description}
            />

            <ul className={styles.examples}>
              {assistant.examplePrompts.map((prompt) => (
                <li key={prompt} className={styles.example}>
                  <Icon name="arrowRight" size={15} className={styles.exampleArrow} />
                  {prompt}
                </li>
              ))}
            </ul>
          </div>

          <Card
            ref={ref}
            className={`${styles.conversation} ${animations.reveal} ${isVisible ? animations.isVisible : ''}`}
          >
            {assistant.conversation.map((message, index) =>
              message.role === 'user' ? (
                <p key={index} className={styles.userBubble}>
                  {message.text}
                </p>
              ) : (
                <div key={index} className={styles.assistantBubble}>
                  <span className={styles.assistantLabel}>
                    <Icon name="sparkle" size={14} />
                    {logo}
                  </span>
                  <p className={styles.assistantText}>{message.text}</p>
                </div>
              ),
            )}
          </Card>
        </div>
      </Container>
    </section>
  )
}
