import { Trophy, TrendingUp } from 'lucide-react';
import '../pages/Home.css';

export default function Progressi() {
  return (
    <div className="app-container">
      {/* Header */}      <div className="relative p-6 pb-12 header-pattern">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>              <h1 className="text-4xl font-bold mb-2 text-gray-800">Progressi 📈</h1>
              <p className="text-gray-700 text-lg">I tuoi record personali</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-6 pb-20">
        {/* Record Cards */}
        <div className="neo-card p-6">
          <h2 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Trophy className="text-warning" size={20} />
            I Tuoi Record
          </h2>

          <div className="space-y-6">
            {/*
              { exercise: 'Panca Piana', weight: '85kg', progress: 85, date: '15/05/2023', trend: '+5kg' },
              { exercise: 'Stacchi da Terra', weight: '125kg', progress: 92, date: '22/05/2023', trend: '+10kg' },
              { exercise: 'Squat', weight: '100kg', progress: 78, date: '10/05/2023', trend: '+8kg' },
              { exercise: 'Military Press', weight: '55kg', progress: 65, date: '28/04/2023', trend: '+3kg' }
            */}
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="glass-card p-4 rounded-xl group hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white text-lg mb-1">Esercizio {index + 1}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-white/50">Data {index + 1}</p>
                      <span className="text-xs text-success flex items-center gap-1">
                        <TrendingUp size={12} />
                        {`+${index + 1}kg`}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-secondary group-hover:scale-110 transition-transform duration-300">
                    Peso {index + 1}
                  </span>
                </div>
                <div className="bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="progress-bar h-full"
                    style={{ width: `${(index + 1) * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="neo-button w-full mt-8 group">
            <div className="flex items-center justify-center gap-2">
              <Trophy size={20} className="transform transition-transform group-hover:scale-110" />
              <span>Aggiungi Nuovo Record</span>
            </div>
          </button>
        </div>

        {/* Riepilogo Mensile */}
        <div className="neo-card p-6">
          <h2 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-secondary" size={20} />
            Riepilogo Mensile
          </h2>

          <div className="glass-card p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3">
                <p className="text-white/60 text-sm mb-1">Record Battuti</p>
                <p className="text-2xl font-bold text-secondary">12</p>
              </div>
              <div className="text-center p-3">
                <p className="text-white/60 text-sm mb-1">Incremento Medio</p>
                <p className="text-2xl font-bold text-warning">+6.5kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
