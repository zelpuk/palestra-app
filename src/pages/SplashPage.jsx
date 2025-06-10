import { useNavigate } from 'react-router-dom';
import './SplashPage.css';

export default function SplashPage() {
  const navigate = useNavigate();
  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="splash-title">GymTrack</h1>
        <p className="splash-subtitle">
          Supera i tuoi limiti, raggiungi nuovi traguardi.
          Il tuo personal trainer digitale, ovunque tu sia.
        </p>
        
        <div className="splash-buttons">
          <button 
            className="splash-button button-primary"
            onClick={() => navigate('/login')}
          >
            Accedi
          </button>
          <button 
            className="splash-button button-secondary"
            onClick={() => navigate('/register')}
          >
            Registrati
          </button>
        </div>
      </div>
    </div>
  );
}
