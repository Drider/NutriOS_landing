// src/components/layout/Footer/Footer.tsx
import { Container } from '../Container/Container'
import { Icon } from '../../ui/Icon/Icon'
import { landingContent } from '../../../data/landing'
import styles from './Footer.module.css'

export function Footer() {
  const { footer, logo } = landingContent

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <span className={styles.logo}>
            <span className={styles.logoMark}>
              <Icon name="leaf" size={16} />
            </span>
            {logo}
          </span>
          <nav className={styles.links} aria-label="Дополнительные ссылки">
            {footer.links.map((link) => (
              <a key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className={styles.disclaimer}>{footer.disclaimer}</p>
      </Container>
    </footer>
  )
}
