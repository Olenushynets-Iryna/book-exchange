import { Navigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

function ProtectedRoute() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>{t('common.loading')}</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
