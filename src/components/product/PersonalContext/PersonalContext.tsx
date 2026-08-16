import styles from './PersonalContext.module.css'

interface PersonalContextProps {
  label: string
  items: string[]
}

export function PersonalContext({ label, items }: PersonalContextProps) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>{label}</h3>
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
