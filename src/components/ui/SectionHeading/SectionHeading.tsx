import type { ReactNode } from 'react'
import { Icon, type IconName } from '../Icon/Icon'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  icon?: IconName
  title: string
  description?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  compact?: boolean
  id?: string
}

export function SectionHeading({
  eyebrow,
  icon,
  title,
  description,
  as = 'h2',
  align = 'left',
  tone = 'light',
  compact = false,
  id,
}: SectionHeadingProps) {
  const Heading = as
  return (
    <div
      className={`${styles.wrapper} ${align === 'center' ? styles.center : ''} ${tone === 'dark' ? styles.dark : ''} ${compact ? styles.compact : ''}`}
    >
      {eyebrow ? (
        <span className={styles.eyebrow}>
          {icon ? <Icon name={icon} size={15} /> : null}
          {eyebrow}
        </span>
      ) : null}
      <Heading id={id} className={styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
