import { Home, ClipboardList, User, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import '../pages/BottomNavbar.css';

export default function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <nav>
        <div className="nav-container">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
            <Home className="icon" />
            <span>Home</span>
          </NavLink>
          
          <NavLink to="/schede" className={({ isActive }) => isActive ? 'active' : ''}>
            <ClipboardList className="icon" />
            <span>Schede</span>
          </NavLink>
          
          <NavLink to="/progressi" className={({ isActive }) => isActive ? 'active' : ''}>
            <Activity className="icon" />
            <span>Progressi</span>
          </NavLink>
          
          <NavLink to="/profilo" className={({ isActive }) => isActive ? 'active' : ''}>
            <User className="icon" />
            <span>Profilo</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}