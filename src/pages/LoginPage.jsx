import { Link } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Accedi</h1>
        <LoginForm />
        <div className="login-links">
          <p>
            <Link to="/forgot-password" className="login-link">
              Password dimenticata?
            </Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Non hai un account?{' '}
            <Link to="/register" className="login-link">
              Registrati qui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
