import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  title: string
  description?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ title, description, as = 'h2', align = 'left', id }: SectionHeadingProps) {
  const Heading = as
  return (
    <div className={`${styles.wrapper} ${align === 'center' ? styles.center : ''}`}>
      <Heading id={id} className={styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
