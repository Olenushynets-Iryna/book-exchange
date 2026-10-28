import { Navigate, Outlet } from 'react-router';

function ProtectedRoute({ isAuth }) {
  if (!isAuth) {
    return <Navigate to="/Login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
