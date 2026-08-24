import { useRef, useState, type FormEvent } from 'react'
import { submitWaitlist } from '../lib/waitlist'
import { landingContent } from '../data/landing'

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useWaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<WaitlistStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return

    const trimmedEmail = email.trim()

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus('error')
      setErrorMessage(landingContent.finalCta.errorMessage)
      emailInputRef.current?.focus()
      return
    }

    setStatus('loading')
    const result = await submitWaitlist(trimmedEmail)

    if (result.ok) {
      setStatus('success')
      setErrorMessage('')
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? landingContent.finalCta.errorMessage)
      emailInputRef.current?.focus()
    }
  }

  return { email, setEmail, status, errorMessage, handleSubmit, emailInputRef }
}
