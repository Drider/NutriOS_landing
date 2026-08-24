// src/components/layout/Header/Header.tsx
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Container } from '../Container/Container'
import { Button } from '../../ui/Button/Button'
import { Icon } from '../../ui/Icon/Icon'
import { landingContent } from '../../../data/landing'
import styles from './Header.module.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    document.body.style.overflow = 'hidden'

    const menuNode = menuRef.current
    const focusableEls = menuNode
      ? Array.from(menuNode.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : []
    focusableEls[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

      if (event.key === 'Tab' && focusableEls.length > 0) {
        const first = focusableEls[0]
        const last = focusableEls[focusableEls.length - 1]

        if (menuNode && !menuNode.contains(document.activeElement)) {
          event.preventDefault()
          first.focus()
          return
        }

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMark}>
              <Icon name="leaf" size={18} />
            </span>
            {landingContent.logo}
          </a>

          <nav className={styles.desktopNav} aria-label="Основная навигация">
            {landingContent.nav.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.desktopCta}>
            <Button as="a" href="#waitlist" variant="primary">
              {landingContent.headerCta}
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className={styles.menuTrigger}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            Меню
          </button>
        </div>
      </Container>

      {isMenuOpen
        ? createPortal(
            <div className={styles.overlay}>
              <div id="mobile-menu" ref={menuRef} className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Мобильное меню">
                <div className={styles.mobileMenuHeader}>
                  <span className={styles.logo}>
                    <span className={styles.logoMark}>
                      <Icon name="leaf" size={16} />
                    </span>
                    {landingContent.logo}
                  </span>
                  <button type="button" className={styles.menuClose} onClick={closeMenu} aria-label="Закрыть меню">
                    Закрыть
                  </button>
                </div>

                <nav className={styles.mobileNav} aria-label="Мобильная навигация">
                  {landingContent.nav.map((link) => (
                    <a key={link.href} href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
                      {link.label}
                    </a>
                  ))}
                </nav>

                <Button as="a" href="#waitlist" variant="primary" onClick={closeMenu}>
                  {landingContent.headerCta}
                </Button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
