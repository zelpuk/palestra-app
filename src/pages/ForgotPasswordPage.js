import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!email) {
      setError("Inserisci la tua email.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://wpschool.it/primoanno/meta/backend/auth/reset_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore durante la richiesta.");
      } else {
        setMessage("Se l'email è registrata, riceverai le istruzioni per il reset della password.");
        // Reindirizza alla pagina di login dopo 3 secondi
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setError("Errore di connessione. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Recupera Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          <div className="form-group">
            <input
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Caricamento..." : "Invia richiesta"}
          </button>
          <div className="form-footer">
            <span 
              onClick={() => navigate("/login")} 
              className="back-to-login"
            >
              Torna al login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
