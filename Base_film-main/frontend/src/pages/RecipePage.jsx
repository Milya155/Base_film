import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeById, fetchRecipes } from '../api/mockApi';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([fetchRecipeById(id), fetchRecipes()]).then(([item, all]) => {
      setFilm(item || null);
      setSimilar(item ? item.similar.map((sid) => all.find((f) => f.id === sid)).filter(Boolean) : []);
      setLoading(false);
    });
  }, [id]);
  if (loading) return <Loader />;
  if (!film) return <p className="recipe-not-found">Фильм не найден. <Link to="/films">Вернуться в каталог</Link></p>;
  return (
    <div className="recipe-page">
      <Link to="/films" className="recipe-back">← Назад к каталогу</Link>
      <div className="film-detail-kicker">КАРТОЧКА ФИЛЬМА</div>
      <h1 className="recipe-name">{film.name}</h1>
      <div className="recipe-meta">{film.year} • {film.duration} мин. • ★ {film.rating}/10</div>
      <div className="recipe-block"><h2>Описание</h2><p>{film.description}</p></div>
      <div className="recipe-block"><h2>Жанры</h2><div className="recipe-card-ingredients">{film.genres.map((g) => <span className="recipe-card-tag" key={g}>{g}</span>)}</div></div>
      <div className="recipe-block"><h2>Актёры</h2><p>{film.actors.join(', ')}</p></div>
      {similar.length > 0 && <section className="similar-films"><h2>Похожие фильмы</h2><div className="recipes-grid">{similar.map((f) => <RecipeCard key={f.id} recipe={f} />)}</div></section>}
    </div>
  );
};
export default RecipePage;
