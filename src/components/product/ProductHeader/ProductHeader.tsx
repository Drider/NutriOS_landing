import { Icon } from '../../ui/Icon/Icon'
import styles from './ProductHeader.module.css'

export function ProductHeader({ searchLabel, profileLabel }: { searchLabel: string; profileLabel: string }) {
  return (
    <div className={styles.header}>
      <span className={styles.search}>
        <Icon name="search" size={15} />
        {searchLabel}
      </span>
      <span className={styles.avatar} title={profileLabel}>
        <Icon name="user" size={17} />
      </span>
    </div>
  )
}
