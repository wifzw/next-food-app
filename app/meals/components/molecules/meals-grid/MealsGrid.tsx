import { IMealResponse } from '@/app/meals/types';
import MealItem from '../meal-item/MealItem';
import classes from './meals-grid.module.css'

export default function MealsGrid({ meals }: { meals: IMealResponse[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
