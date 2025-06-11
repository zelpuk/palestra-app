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
    }    try {
      const res = await fetch("https://wpschool.it/primoanno/meta/backend/auth/login.php", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form),
      });

      // Log della risposta HTTP per debug
      console.log('Status:', res.status);
      console.log('Status Text:', res.statusText);
      
      let data;
      const textResponse = await res.text(); // Prima ottieni il testo della risposta
      console.log('Response Text:', textResponse);
        try {
        // Cerca di estrarre solo la parte JSON dalla risposta
        const jsonMatch = textResponse.match(/\{.*\}/s);
        if (jsonMatch) {
          data = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Nessun JSON valido trovato nella risposta');
        }
      } catch (jsonError) {
        console.error('Errore nel parsing JSON:', jsonError);
        console.error('Risposta raw:', textResponse);
        setError("Errore nella risposta del server. Riprova più tardi.");
        return;
      }

      if (!res.ok) {
        setError(data?.error || "Email o password non validi.");
        return;
      }

      if (!data.success || !data.user || !data.token) {
        setError("Risposta del server non valida. Riprova più tardi.");
        return;
      }

      setSuccess("Login effettuato con successo!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event('storage'));
      
      // Breve delay per mostrare il messaggio di successo
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError("Errore di connessione. Verifica la tua connessione e riprova.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="form-input"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="form-input"
      />

      <button type="submit" className="login-button">
        Accedi
      </button>
    </form>
  );
}
