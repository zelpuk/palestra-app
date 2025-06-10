import { Play, Dumbbell, Flame, Clock } from 'lucide-react';
import { useState } from 'react';
import '../pages/Home.css';

export default function Schede() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="app-container">      <div className="relative p-6 pb-12 header-pattern">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>              <h1 className="text-4xl font-bold mb-2 text-gray-800">Schede 📋</h1>
              <p className="text-gray-700 text-lg">I tuoi allenamenti</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-6 pb-20">
        <div className="neo-card p-6">
          <h2 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Dumbbell className="text-secondary" size={20} />
            Allenamento di Oggi
          </h2>
          
          <div className="glass-card rounded-xl p-6 mb-5 relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full -mr-20 -mt-20 blur-2xl" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-white/60 text-base mb-1">Giorno 12 • Programma Forza</p>
                <h3 className="font-bold text-2xl text-white mb-4">Upper Body Blast</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-sm text-white/80 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="text-secondary mr-2" size={16} />
                    45 min
                  </div>
                  <div className="flex items-center text-sm text-white/80 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Flame className="text-warning mr-2" size={16} />
                    480 kcal
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                <Dumbbell className="text-secondary" size={24} />
              </div>
            </div>
          </div>

          <button 
            className="neo-button w-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative flex items-center justify-center gap-2">
              <Play size={20} className="transform transition-transform group-hover:scale-110" />
              <span>Inizia Allenamento</span>
            </div>
          </button>
        </div>

        {/* Prossimi Allenamenti */}
        <div className="neo-card p-6">
          <h2 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Calendar className="text-purple-400" size={20} />
            Prossimi Allenamenti
          </h2>

          <div className="space-y-4">
            {/*
              { name: 'Lower Body Power', type: 'Forza', day: 'Domani', time: '9:00', kcal: 520, duration: '60 min', color: 'blue' },
              { name: 'HIIT Circuit', type: 'Cardio', day: 'Mercoledì', time: '7:30', kcal: 680, duration: '45 min', color: 'orange' },
              { name: 'Core & Mobility', type: 'Funzionale', day: 'Venerdì', time: '18:00', kcal: 320, duration: '30 min', color: 'green' }
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}
