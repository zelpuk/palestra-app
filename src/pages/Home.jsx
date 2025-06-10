import { Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import './Home.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const getUserFirstName = () => {
    if (!userData) return 'Atleta';
    // Prende il primo nome se ci sono più parole
    return userData.name.split(' ')[0];
  };

  const pieData = {
    labels: ['Cardio', 'Forza', 'HIIT', 'Yoga'],
    datasets: [{
      data: [35, 40, 15, 10],
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

  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="welcome-text">Ciao, {getUserFirstName()}!</h1>
        <p className="subtitle-text">
          Ecco il riepilogo dei tuoi progressi
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Flame size={24} color="white" />
          </div>
          <span className="stat-value">423</span>
          <span className="stat-label">Calorie bruciate</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} color="white" />
          </div>
          <span className="stat-value">47 min</span>
          <span className="stat-label">Tempo di allenamento</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} color="white" />
          </div>
          <span className="stat-value">8</span>
          <span className="stat-label">Obiettivi raggiunti</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} color="white" />
          </div>
          <span className="stat-value">+12%</span>
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