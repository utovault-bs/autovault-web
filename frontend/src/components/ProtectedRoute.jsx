import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ProtectedRoute = ({ children, adminOnly = false, dealerOnly = false }) => {
  const { user, loading, isAdmin, isDealer } = useAuth();
  if (loading) return <div className="spinner">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin()) return <Navigate to="/" replace />;
  if (dealerOnly && !isDealer() && !isAdmin()) return <Navigate to="/pricing" replace />;
  return children;
};
export default ProtectedRoute;
