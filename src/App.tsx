import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RecipesPage from './pages/RecipesPage';
import PublicGuard from './components/PublicGuard';
import PrivateGuard from './components/PrivateGuard';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicGuard />}>
          <Route index path="/login" element={<AuthPage isLogin={true} />} />
          <Route path="/register" element={<AuthPage isLogin={false} />} />
        </Route>
        <Route path="/" element={
          <PrivateGuard>
            <Layout />
          </PrivateGuard>
        }>
          <Route index path="recipes" element={<RecipesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
