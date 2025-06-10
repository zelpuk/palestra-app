import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
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

    if (!form.email || !form.password) {
      setError("Compila tutti i campi.");
      return;
    }

    try {
      const res = await fetch("https://wpschool.it/primoanno/meta/backend/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenziali errate.");
      } else {
        setSuccess("Login effettuato con successo!");
        // Salva il token e i dati utente
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Breve delay per mostrare il messaggio di successo
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch {
      setError("Errore di rete, riprova.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "1.1rem"
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <button
        type="submit"
        style={{
          padding: "12px",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "1.1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Accedi
      </button>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
    </form>
  );
}
