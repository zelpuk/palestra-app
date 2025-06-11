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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    if (form.role === "admin" && !form.admin_code) {
      setError("Inserisci il codice admin.");
      return;
    }

    try {
      const res = await fetch("https://wpschool.it/primoanno/meta/backend/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore durante la registrazione.");
      } else {
        setSuccess("Registrazione avvenuta con successo!");
        // Breve delay per mostrare il messaggio di successo
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      setError("Errore di rete, riprova.");
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

      <button type="submit" className="register-button">
        Registrati
      </button>
    </form>
  );
}
