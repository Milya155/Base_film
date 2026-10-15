import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <div className="home">
    <h1 className="home-title">Интеллектуальная база знаний «Кулинарная книга»</h1>
    <p className="home-subtitle">
      Найдите рецепт по ингредиентам или задайте вопрос ИИ.
    </p>

    <div className="home-cards">
      <Link to="/chat" className="home-card">
        <div className="home-card-icon">💬</div>
        <div className="home-card-title">Чат с ИИ</div>
        <div className="home-card-text">Спросите, что приготовить</div>
      </Link>
      <Link to="/recipes" className="home-card">
        <div className="home-card-icon">📖</div>
        <div className="home-card-title">Рецепты</div>
        <div className="home-card-text">Каталог блюд</div>
      </Link>
    </div>
  </div>
);

export default HomePage;
