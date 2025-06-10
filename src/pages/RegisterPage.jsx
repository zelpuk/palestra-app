import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import "./RegisterPage.css";

export default function RegisterPage() {
  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-title">Unisciti a noi</h1>
        <p className="register-subtitle">
          Inizia il tuo viaggio verso una vita più sana e attiva
        </p>
        <RegisterForm />
        <div className="register-links">
          <p>
            Hai già un account?{" "}
            <Link to="/login" className="register-link">
              Accedi qui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
