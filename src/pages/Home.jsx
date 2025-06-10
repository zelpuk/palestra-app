import { Flame, Clock, Zap, PieChart } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Home.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  // Dati per il grafico a torta
  const pieData = {
    labels: ['Cardio', 'Forza', 'HIIT', 'Yoga'],
    datasets: [
      {
        data: [35, 40, 15, 10],
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // amber
          '#8B5CF6'  // violet
        ],
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="relative p-6 pb-12 header-pattern">
      <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>              <p className="text-gray-700 text-sm mb-1 font-medium">Il tuo riepilogo</p>
              <h1 className="text-4xl font-bold mb-2 text-gray-800">Statistiche 💪</h1>
              <p className="text-gray-600 text-lg">Visualizza i tuoi progressi</p>
            </div>
            <div className="avatar p-2 rounded-full">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">MR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20">
        <div className="space-y-6">
          {/* Grafico a torta */}
          <div className="chart-container neo-card">
            <h2 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
              <PieChart className="text-secondary" size={20} />
              Distribuzione Allenamenti
            </h2>
            <div className="relative h-64">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="mt-4 text-center text-sm text-white/70">
              Totale: 120 sessioni questo mese
            </div>
          </div>

          {/* Statistiche principali */}
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full glass-effect">
                  <Flame className="text-secondary" size={18} />
                </div>
                <span className="text-sm font-medium text-white/80">Calorie totali</span>
              </div>              <div className="text-2xl font-bold text-gray-900">24,560</div>
              <div className="text-xs text-success mt-1">+12% vs mese scorso</div>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full glass-effect">
                  <Clock className="text-secondary" size={18} />
                </div>
                <span className="text-sm font-medium text-gray-600">Tempo totale</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">42h 30m</div>
              <div className="text-xs text-success mt-1">+8% vs mese scorso</div>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full glass-effect">
                  <Zap className="text-secondary" size={18} />
                </div>
                <span className="text-sm font-medium text-white/80">Sessioni</span>
              </div>
              <div className="text-2xl font-bold text-white">28</div>
              <div className="text-xs text-success mt-1">+5% vs mese scorso</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}