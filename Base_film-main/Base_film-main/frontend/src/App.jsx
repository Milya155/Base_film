import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import RecipesPage from './pages/RecipesPage';
import RecipePage from './pages/RecipePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="films" element={<RecipesPage />} />
        <Route path="films/:id" element={<RecipePage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
