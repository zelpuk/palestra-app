import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
    if (!token) {
    // Redirect to splash page if there is no token
    return <Navigate to="/" replace />;
  }

  return children;
}
