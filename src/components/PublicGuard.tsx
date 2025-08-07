import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PublicGuard() {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/recipes" state={{ from: location }} replace />;
  }

  return (<Outlet />);
}

export default PublicGuard;