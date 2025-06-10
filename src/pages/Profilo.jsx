import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User, Settings, Edit, LogOut } from 'lucide-react';
import './Profilo.css';

export default function Profilo() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/', { replace: true });
  };

  if (!userData) {
    return <div className="profilo-container">Caricamento...</div>;
  }

  // Formatta la data di iscrizione
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="profilo-container">
      <div className="profilo-header">
        <div className="profile-avatar">
          <User size={50} color="white" />
        </div>
        <h1 className="profile-name">{userData.name}</h1>
        <p className="profile-bio">💪 Membro dal {formatDate(userData.created_at || '2025-06-10')}</p>
        
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="stat-number">{userData.workouts_count || '0'}</div>
            <div className="stat-text">Allenamenti</div>
          </div>
          <div className="profile-stat">
            <div className="stat-number">{userData.goals_achieved || '0'}</div>
            <div className="stat-text">Obiettivi</div>
          </div>
          <div className="profile-stat">
            <div className="stat-number">{userData.weight_loss || '0'}kg</div>
            <div className="stat-text">Persi</div>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <div className="section-header">
            <div className="section-icon">
              <User size={20} color="white" />
            </div>
            <h2 className="section-title">Informazioni Personali</h2>
          </div>
          
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{userData.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Data di iscrizione</span>
            <span className="info-value">{formatDate(userData.created_at || '2025-06-10')}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Ruolo</span>
            <span className="info-value">{userData.role === 'admin' ? 'Amministratore' : 'Utente'}</span>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <div className="section-icon">
              <Settings size={20} color="white" />
            </div>
            <h2 className="section-title">Preferenze Allenamento</h2>
          </div>
          
          <div className="info-item">
            <span className="info-label">Giorni preferiti</span>
            <span className="info-value">{userData.training_days || 'Non impostati'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Durata media</span>
            <span className="info-value">{userData.avg_duration || '60'} minuti</span>
          </div>
          <div className="info-item">
            <span className="info-label">Focus</span>
            <span className="info-value">{userData.training_focus || 'Non impostato'}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-button edit-button">
            <Edit size={20} style={{ marginRight: '8px' }} />
            Modifica Profilo
          </button>
          <button className="action-button logout-button" onClick={handleLogout}>
            <LogOut size={20} style={{ marginRight: '8px' }} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
