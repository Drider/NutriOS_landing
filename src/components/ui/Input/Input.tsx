import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hideLabel?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hideLabel = false, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={hideLabel ? styles.srOnly : styles.label}>
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
})
