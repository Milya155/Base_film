import { NavLink } from 'react-router-dom';
import './Sidebar.css';
const links = [{ to: '/', label: '⌂ Главная' }, { to: '/chat', label: '✦ Подбор с ИИ' }, { to: '/films', label: '▤ Каталог фильмов' }];
const Sidebar = () => <aside className="sidebar"><nav className="sidebar-nav">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => 'sidebar-link' + (isActive ? ' sidebar-link-active' : '')}>{link.label}</NavLink>)}</nav></aside>;
export default Sidebar;
