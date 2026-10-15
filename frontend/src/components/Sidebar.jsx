import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const links = [
  { to: '/', label: '🏠 Главная' },
  { to: '/chat', label: '💬 Чат с ИИ' },
  { to: '/recipes', label: '📖 Рецепты' },
];

const Sidebar = () => (
  <aside className="sidebar">
    <nav className="sidebar-nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            'sidebar-link' + (isActive ? ' sidebar-link-active' : '')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
