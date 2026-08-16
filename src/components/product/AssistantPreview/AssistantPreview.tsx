import styles from './AssistantPreview.module.css'

interface AssistantPreviewProps {
  label: string
  prompt: string
}

export function AssistantPreview({ label, prompt }: AssistantPreviewProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <p className={styles.prompt}>{prompt}</p>
    </div>
  )
}
