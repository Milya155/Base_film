import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <Link to="/" className="header-logo">🍳 Кулинарная ИБЗ</Link>
    <span className="header-badge">Демо-версия</span>
  </header>
);

export default Header;
