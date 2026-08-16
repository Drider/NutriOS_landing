import styles from './ProductSidebar.module.css'

export function ProductSidebar({ links }: { links: string[] }) {
  return (
    <nav className={styles.sidebar} aria-label="Разделы продукта (демонстрация)">
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={link} className={`${styles.item} ${index === 0 ? styles.itemActive : ''}`}>
            {link}
          </li>
        ))}
      </ul>
    </nav>
  )
}
