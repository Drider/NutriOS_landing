import { Container } from '../../layout/Container/Container'
import { SectionHeading } from '../../ui/SectionHeading/SectionHeading'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import { useWaitlistForm } from '../../../hooks/useWaitlistForm'
import { landingContent } from '../../../data/landing'
import styles from './FinalCTA.module.css'

export function FinalCTA() {
  const { finalCta } = landingContent
  const { email, setEmail, status, errorMessage, handleSubmit } = useWaitlistForm()

  return (
    <section id="waitlist" className={styles.section} aria-labelledby="final-cta-heading">
      <Container>
        <div className={styles.wrapper}>
          <SectionHeading as="h2" title={finalCta.title} description={finalCta.description} align="center" />

          {status === 'success' ? (
            <p className={styles.success} role="status">
              {finalCta.successMessage}
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                label={finalCta.emailLabel}
                type="email"
                name="email"
                placeholder={finalCta.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={status === 'error' ? errorMessage : undefined}
                disabled={status === 'loading'}
                autoComplete="email"
              />
              <Button type="submit" variant="primary" disabled={status === 'loading'}>
                {status === 'loading' ? finalCta.loadingLabel : finalCta.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
