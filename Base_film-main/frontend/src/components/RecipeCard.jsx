import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe: film }) => (
  <Link to={`/films/${film.id}`} className="recipe-card">
    <div className="film-card-top"><span>{film.year}</span><span className="film-rating">★ {film.rating}/10</span></div>
    <h3 className="recipe-card-title">{film.name}</h3>
    <div className="recipe-card-meta">{film.duration} мин. • {film.genres.join(' · ')}</div>
    <p className="film-description">{film.description}</p>
    <div className="recipe-card-ingredients">
      {film.actors.slice(0, 3).map((actor) => <span key={actor} className="recipe-card-tag">{actor}</span>)}
    </div>
  </Link>
);

export default RecipeCard;
