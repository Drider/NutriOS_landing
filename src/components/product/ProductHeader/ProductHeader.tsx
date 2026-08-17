import styles from './ProductHeader.module.css'

export function ProductHeader({ searchLabel, profileLabel }: { searchLabel: string; profileLabel: string }) {
  return (
    <div className={styles.header}>
      <span className={styles.brand}>NutriOS</span>
      <div className={styles.actions}>
        <span className={styles.action}>{searchLabel}</span>
        <span className={styles.avatar} title={profileLabel} />
      </div>
    </div>
  )
}
