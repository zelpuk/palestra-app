import { Dumbbell, Calendar, Plus, Activity, Timer, Target } from 'lucide-react';
import './Schede.css';

export default function Schede() {
  const schede = [
    {
      id: 1,
      name: "Forza e Ipertrofia",
      date: "Iniziata il 1 Giugno 2025",
      exercises: 8,
      duration: "60 min",
      difficulty: "Intermedio"
    },
    {
      id: 2,
      name: "Definizione Estate",
      date: "Iniziata il 15 Maggio 2025",
      exercises: 10,
      duration: "45 min",
      difficulty: "Avanzato"
    },
    {      id: 3,
      name: "Bodyweight e Funzionale",
      date: "Iniziata il 5 Giugno 2025",
      exercises: 6,
      duration: "30 min",
      difficulty: "Principiante"
    }
  ];

  return (
    <div className="schede-container">
      <div className="schede-header">
        <h1 className="schede-title">Le tue Schede</h1>
        <p className="schede-subtitle">
          Gestisci i tuoi programmi di allenamento
        </p>
      </div>

      <div className="schede-grid">
        {schede.map((scheda) => (
          <div key={scheda.id} className="scheda-card">
            <div className="scheda-header">
              <div className="scheda-icon">
                <Dumbbell size={24} color="white" />
              </div>
              <div className="scheda-info">
                <h3 className="scheda-name">{scheda.name}</h3>
                <div className="scheda-date">
                  <Calendar size={14} style={{ marginRight: '4px', display: 'inline' }} />
                  {scheda.date}
                </div>
              </div>
            </div>
            
            <div className="scheda-stats">
              <div className="stat-item">
                <div className="stat-number">{scheda.exercises}</div>
                <div className="stat-text">Esercizi</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{scheda.duration}</div>
                <div className="stat-text">Durata</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{scheda.difficulty}</div>
                <div className="stat-text">Livello</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="add-scheda-button" aria-label="Aggiungi scheda">
        <Plus size={24} color="white" />
      </button>
    </div>
  );
}
