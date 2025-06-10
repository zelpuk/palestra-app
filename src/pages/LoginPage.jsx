import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#121212",
        padding: "2rem",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#fff", fontSize: "2rem", fontWeight: "bold" }}>
        Accedi alla tua palestra
      </h1>
      <div
        style={{
          background: "#1e1e1e",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <LoginForm />
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#bbb" }}>
          <a href="/forgot-password" style={{ color: "#007bff", textDecoration: "none" }}>
            Password dimenticata?
          </a>
        </p>
        <p style={{ textAlign: "center", color: "#bbb" }}>
          Non hai un account?{" "}
          <a href="/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Registrati qui
          </a>
        </p>
      </div>
    </div>
  );
}
