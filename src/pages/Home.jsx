import { Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import './Home.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    calories: 0,
    duration: 0,
    goals: 0,
    improvement: 0,    workout_distribution: {
      Cardio: 0,
      Forza: 0,
      Funzionale: 0,
      Bodyweight: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token non trovato');
        }

        const response = await fetch('https://wpschool.it/primoanno/meta/backend/api/get_user_stats.php', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Sessione scaduta');
          }
          throw new Error('Errore nel caricamento delle statistiche');
        }

        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        } else {
          throw new Error(data.error || 'Errore nel caricamento delle statistiche');
        }
      } catch (err) {
        setError(err.message);
        console.error('Errore nel caricamento delle statistiche:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getUserFirstName = () => {
    if (!userData) return 'Atleta';
    // Prende il primo nome se ci sono più parole
    return userData.name.split(' ')[0];
  };
  const pieData = {
    labels: Object.keys(stats.workout_distribution),
    datasets: [{
      data: Object.values(stats.workout_distribution),
      backgroundColor: [
        '#FF4B4B', // rosso acceso
        '#4CAF50', // verde primario
        '#FFB700', // giallo oro
        '#2196F3'  // blu brillante
      ],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '70%'
  };
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Caricamento statistiche...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="welcome-text">Ciao, {getUserFirstName()}!</h1>
        <p className="subtitle-text">
          Ecco il riepilogo dei tuoi progressi
        </p>
      </div><div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Flame size={24} color="white" />
          </div>
          <span className="stat-value">{stats.calories}</span>
          <span className="stat-label">Calorie bruciate</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} color="white" />
          </div>
          <span className="stat-value">{stats.duration} min</span>
          <span className="stat-label">Tempo di allenamento</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} color="white" />
          </div>
          <span className="stat-value">{stats.goals}</span>
          <span className="stat-label">Obiettivi raggiunti</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} color="white" />
          </div>
          <span className="stat-value">{stats.improvement > 0 ? '+' : ''}{stats.improvement}%</span>
          <span className="stat-label">Miglioramento</span>
        </div>
      </div>

      <div className="chart-section">
        <h2 className="chart-title">Distribuzione Allenamenti</h2>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}