import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/mockApi';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import './RecipesPage.css';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchRecipes().then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }, []);

  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="recipes">
      <h1 className="recipes-title">📖 Рецепты</h1>
      <input
        type="text"
        className="recipes-search"
        placeholder="Поиск по названию или кухне..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="recipes-empty">Ничего не найдено.</p>
      ) : (
        <div className="recipes-grid">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeById } from '../api/mockApi';
import Loader from '../components/Loader';
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipeById(id).then((r) => {
      setRecipe(r || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;
  if (!recipe) return <p className="recipe-not-found">Рецепт не найден.</p>;

  return (
    <div className="recipe-page">
      <Link to="/recipes" className="recipe-back">← Назад к рецептам</Link>
      <h1 className="recipe-name">{recipe.name}</h1>
      <div className="recipe-meta">
        {recipe.cuisine} • {recipe.timeMinutes} мин • {recipe.difficulty}
      </div>

      <div className="recipe-block">
        <h2>Ингредиенты</h2>
        <ul>
          {recipe.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-block">
        <h2>Приготовление</h2>
        <ol>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
