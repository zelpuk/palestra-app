import { Trophy, TrendingUp, Target, Weight, Calendar } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Progressi.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Progressi() {
  const lineData = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
    datasets: [
      {
        label: 'Peso (kg)',
        data: [85, 83, 82, 80, 78, 77],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
        tension: 0.4
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e2e8f0'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e2e8f0'
        }
      }
    }
  };

  const achievements = [
    {
      title: "Obiettivo Peso",
      progress: 80,
      date: "8kg persi in 6 mesi",
      icon: <Weight size={24} color="white" />
    },
    {
      title: "Serie Consecutive",
      progress: 100,
      date: "30 giorni di allenamento",
      icon: <Calendar size={24} color="white" />
    },
    {
      title: "Record Personale",
      progress: 90,
      date: "Panca piana: 100kg",
      icon: <Trophy size={24} color="white" />
    }
  ];

  return (
    <div className="progressi-container">
      <div className="progressi-header">
        <h1 className="progressi-title">I tuoi Progressi</h1>
        <p className="progressi-subtitle">
          Traccia i tuoi miglioramenti nel tempo
        </p>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">Andamento Peso</h2>
          <select className="time-selector">
            <option value="6m">Ultimi 6 mesi</option>
            <option value="1y">Ultimo anno</option>
            <option value="all">Tutto</option>
          </select>
        </div>
        <Line data={lineData} options={lineOptions} />
      </div>

      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-card">
            <div className="achievement-icon">
              {achievement.icon}
            </div>
            <div className="achievement-info">
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-date">{achievement.date}</p>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
