import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => (
  <Link to={`/recipes/${recipe.id}`} className="recipe-card">
    <h3 className="recipe-card-title">{recipe.name}</h3>
    <div className="recipe-card-meta">
      {recipe.cuisine} • {recipe.timeMinutes} мин • {recipe.difficulty}
    </div>
    <div className="recipe-card-ingredients">
      {recipe.ingredients.slice(0, 3).map((ing) => (
        <span key={ing} className="recipe-card-tag">{ing}</span>
      ))}
      {recipe.ingredients.length > 3 && (
        <span className="recipe-card-more">+{recipe.ingredients.length - 3}</span>
      )}
    </div>
    {recipe.diet.length > 0 && (
      <div className="recipe-card-diet">🌱 {recipe.diet.join(', ')}</div>
    )}
  </Link>
);

export default RecipeCard;
