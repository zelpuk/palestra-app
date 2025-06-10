import { useState } from "react";

export default function RegisterForm() {
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

    // Controlli base (esempio)
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
        setForm({
          name: "",
          email: "",
          password: "",
          role: "user",
          admin_code: ""
        });
      }
    } catch {
      setError("Errore di rete, riprova.");
    }
  };

  const inputStyle = {
    width: "95%",
    padding: "12px",
    marginBottom: "1rem",
    fontSize: "1rem",
    backgroundColor: "#2a2a2a",
    border: "1px solid #404040",
    borderRadius: "8px",
    color: "#fff",
    outline: "none",
    transition: "all 0.3s ease",
    "&:focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 0 2px rgba(0,123,255,0.25)",
    }
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#0056b3",
    }
  };

  const messageStyle = {
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "1rem",
    textAlign: "center"
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {error && (
        <div style={{ ...messageStyle, backgroundColor: "#ff4444", color: "#fff" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ ...messageStyle, backgroundColor: "#00C851", color: "#fff" }}>
          {success}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Nome completo"
        value={form.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        style={{
          ...inputStyle,
          appearance: "none",
          backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\" fill=\"%23fff\"/></svg>')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center"
        }}
      >
        <option value="user">Utente</option>
        <option value="admin">Amministratore</option>
      </select>

      {form.role === "admin" && (
        <input
          type="password"
          name="admin_code"
          placeholder="Codice amministratore"
          value={form.admin_code}
          onChange={handleChange}
          style={inputStyle}
        />
      )}

      <button type="submit" style={buttonStyle}>
        Registrati
      </button>
    </form>
  );
}
