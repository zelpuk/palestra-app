import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    admin_code: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Reset degli errori quando l'utente inizia a digitare
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validazione
    if (!form.name || !form.email || !form.password) {
      setError("Compila tutti i campi obbligatori.");
      setIsLoading(false);
      return;
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Inserisci un indirizzo email valido.");
      setIsLoading(false);
      return;
    }

    // Validazione password
    if (form.password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri.");
      setIsLoading(false);
      return;
    }

    if (form.role === "admin" && !form.admin_code) {
      setError("Inserisci il codice admin.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("https://wpschool.it/primoanno/meta/backend/auth/register.php", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form)
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Risposta non valida dal server");
      }      if (!res.ok) {
        const errorMessage = data.error || "Errore durante la registrazione";
        console.error('Dettagli errore dal server:', data);
        throw new Error(errorMessage);
      }

      setSuccess("Registrazione avvenuta con successo!");
      // Breve delay per mostrare il messaggio di successo
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      setError(error.message || "Errore di rete, riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      {form.role === "admin" && (
        <div className="form-group">
          <input
            type="password"
            name="admin_code"
            placeholder="Codice amministratore"
            value={form.admin_code}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      )}

      <button type="submit" className="register-button" disabled={isLoading}>
        {isLoading ? "Registrazione in corso..." : "Registrati"}
      </button>
    </form>
  );
}
