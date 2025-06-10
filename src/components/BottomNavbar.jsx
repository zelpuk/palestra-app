import { Home, Dumbbell, User, LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../pages/BottomNavbar.css';

export default function BottomNavbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-navbar">
      <nav>
        <div className="nav-container">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            <Home className="icon" size={24} />
          </Link>
          
          <Link 
            to="/schede" 
            className={`nav-item ${isActive('/schede') ? 'active' : ''}`}
          >
            <Dumbbell className="icon" size={24} />
          </Link>
          
          <Link 
            to="/progressi" 
            className={`nav-item ${isActive('/progressi') ? 'active' : ''}`}
          >
            <LineChart className="icon" size={24} />
          </Link>
          
          <Link 
            to="/profilo" 
            className={`nav-item ${isActive('/profilo') ? 'active' : ''}`}
          >
            <User className="icon" size={24} />
          </Link>
        </div>
      </nav>
    </div>
  );
}