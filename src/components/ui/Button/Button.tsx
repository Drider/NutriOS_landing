import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type CommonProps = {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const className = `${styles.button} ${variant === 'secondary' ? styles.secondary : styles.primary}`

  if (props.as === 'a') {
    const { as: _as, ...anchorProps } = props
    return (
      <a className={className} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { as: _as, ...buttonProps } = props as ButtonAsButton
  return (
    <button className={className} type={buttonProps.type ?? 'button'} {...buttonProps}>
      {children}
    </button>
  )
}
