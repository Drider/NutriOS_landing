import { forwardRef, type HTMLAttributes } from 'react'
import styles from './Card.module.css'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Card({ className = '', ...props }, ref) {
    return <div ref={ref} className={`${styles.card} ${className}`} {...props} />
  },
)
