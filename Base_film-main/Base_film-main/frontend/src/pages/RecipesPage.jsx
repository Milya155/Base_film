import { useEffect, useMemo, useState } from 'react';
import { fetchRecipes } from '../api/mockApi';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import './RecipesPage.css';

const RecipesPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все жанры');
  const [rating, setRating] = useState('0');

  useEffect(() => { fetchRecipes().then((data) => { setFilms(data); setLoading(false); }); }, []);
  const genres = useMemo(() => ['Все жанры', ...new Set(films.flatMap((f) => f.genres))], [films]);
  const filtered = films.filter((f) =>
    `${f.name} ${f.actors.join(' ')} ${f.genres.join(' ')}`.toLowerCase().includes(search.toLowerCase()) &&
    (genre === 'Все жанры' || f.genres.includes(genre)) && f.rating >= Number(rating)
  );
  if (loading) return <Loader />;
  return (
    <div className="recipes">
      <h1 className="recipes-title">Каталог фильмов</h1>
      <p className="catalog-subtitle">Выберите фильм по названию, актёру, жанру или рейтингу.</p>
      <div className="film-filters">
        <input type="text" className="recipes-search" placeholder="Название или актёр..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="recipes-search" value={genre} onChange={(e) => setGenre(e.target.value)}>{genres.map((g) => <option key={g}>{g}</option>)}</select>
        <select className="recipes-search" value={rating} onChange={(e) => setRating(e.target.value)}><option value="0">Любой рейтинг</option><option value="7">От 7</option><option value="8">От 8</option><option value="8.5">От 8.5</option></select>
      </div>
      <p className="catalog-count">Найдено фильмов: {filtered.length}</p>
      {!filtered.length ? <p className="recipes-empty">По вашему запросу ничего не найдено.</p> : <div className="recipes-grid">{filtered.map((film) => <RecipeCard key={film.id} recipe={film} />)}</div>}
    </div>
  );
};
export default RecipesPage;
