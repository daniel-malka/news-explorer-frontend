import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? <Navigate to="/" redirect /> : children;
};

export default ProtectedRoute;
