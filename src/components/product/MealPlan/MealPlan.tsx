import styles from './MealPlan.module.css'

interface Meal {
  key: string
  label: string
  time: string
}

interface MealPlanProps {
  planLabel: string
  meals: Meal[]
}

export function MealPlan({ planLabel, meals }: MealPlanProps) {
  return (
    <div>
      <p className={styles.heading}>{planLabel}</p>
      <ul className={styles.list}>
        {meals.map((meal) => (
          <li key={meal.key} className={styles.mealCard}>
            <span className={styles.mealLabel}>{meal.label}</span>
            <span className={styles.mealTime}>{meal.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
