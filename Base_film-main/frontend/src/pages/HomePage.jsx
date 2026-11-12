import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <div className="home">
    <div className="home-eyebrow">ВАШ КИНОГИД</div>
    <h1 className="home-title">Найдите фильм <span>под настроение</span></h1>
    <p className="home-subtitle">Персональные рекомендации по жанру, актёрам, году выпуска и рейтингу. Просто расскажите, что хотите посмотреть.</p>
    <div className="home-cards">
      <Link to="/chat" className="home-card"><div className="home-card-icon">✦</div><div className="home-card-title">Подобрать с ИИ</div><div className="home-card-text">Опишите предпочтения обычными словами — получите подходящие варианты.</div></Link>
      <Link to="/films" className="home-card"><div className="home-card-icon">▤</div><div className="home-card-title">Каталог фильмов</div><div className="home-card-text">Изучите подборку, рейтинг, актёрский состав и описание.</div></Link>
    </div>
    <div className="home-examples"><strong>Примеры запросов</strong><span>Фантастика с рейтингом выше 8</span><span>Фильмы с Киану Ривзом</span><span>Хорошая комедия на вечер</span></div>
  </div>
);
export default HomePage;
