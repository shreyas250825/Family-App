import { Navigate, useLocation } from 'react-router-dom';
import { useFamZee } from '../context/FamZeeContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, needsOnboarding } = useFamZee();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (needsOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  if (!needsOnboarding && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
