import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RecipesPage from './pages/RecipesPage';
import CreateRecipePage from './pages/CreateRecipePage';
import PublicGuard from './components/PublicGuard';
import PrivateGuard from './components/PrivateGuard';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicGuard />}>
          <Route path="/login" element={<AuthPage isLogin={true} />} />
          <Route path="/register" element={<AuthPage isLogin={false} />} />
        </Route>

        <Route element={<PrivateGuard />}>
          <Route element={<Layout />}>
            <Route path="/recipes" element={<RecipesPage userRecipes={false} />} />
            <Route path="/your-recipes" element={<RecipesPage userRecipes={true} />} />
            <Route path="/create-recipe" element={<CreateRecipePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
