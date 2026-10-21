import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../ui/Loader';

/**
 * Omota stranice koje zahtijevaju prijavu.

 */
export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, ready } = useAuth();
  const location = useLocation();

  if (!ready) return <Loader />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
