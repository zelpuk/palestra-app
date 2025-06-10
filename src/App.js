import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SplashPage from "./pages/SplashPage";
import Home from "./pages/Home";
import Schede from "./pages/Schede";
import Profilo from "./pages/Profilo";
import Progressi from "./pages/Progressi";
import BottomNavbar from "./components/BottomNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./pages/BottomNavbar.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <div className="page-container">
        <div className="content-wrapper">
          <Routes>
            {/* Rotte protette */}            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schede"
              element={
                <ProtectedRoute>
                  <Schede />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profilo"
              element={
                <ProtectedRoute>
                  <Profilo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progressi"
              element={
                <ProtectedRoute>
                  <Progressi />
                </ProtectedRoute>
              }
            />            {/* Rotte pubbliche */}
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <SplashPage />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />}
            />

            {/* Fallback per rotte non esistenti */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {/* Navbar solo se autenticato */}
        {isAuthenticated && <BottomNavbar />}
      </div>
    </Router>
  );
}

export default App;
