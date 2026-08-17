import styles from './PersonalContext.module.css'

interface PersonalContextProps {
  label: string
  items: string[]
}

export function PersonalContext({ label, items }: PersonalContextProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>{label}</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
