import type React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateGuardProps {
  children: React.ReactNode;
}

function PrivateGuard({ children }: PrivateGuardProps) {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateGuard;