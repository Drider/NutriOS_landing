import { Icon, type IconName } from '../../ui/Icon/Icon'
import styles from './ProductSidebar.module.css'

const ICONS: Record<string, IconName> = {
  Сегодня: 'home',
  План: 'calendar',
  Блюда: 'utensils',
  Покупки: 'cart',
  История: 'history',
}

export function ProductSidebar({ links }: { links: string[] }) {
  return (
    <nav className={styles.sidebar} aria-label="Разделы продукта (демонстрация)">
      <div className={styles.brand}>
        <span className={styles.brandMark}>
          <Icon name="leaf" size={14} />
        </span>
        NutriOS
      </div>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={link} className={`${styles.item} ${index === 0 ? styles.itemActive : ''}`}>
            {ICONS[link] ? <Icon name={ICONS[link]} size={16} /> : null}
            {link}
          </li>
        ))}
      </ul>
    </nav>
  )
}
