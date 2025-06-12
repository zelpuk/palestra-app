import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login page if there is no token
    return <Navigate to="/login" replace />;
  }

  return children;
}
