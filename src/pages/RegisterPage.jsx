import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
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
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Unisciti alla nostra palestra
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
        <RegisterForm />
        <p
          style={{
            textAlign: "center",
            color: "#bbb",
            marginTop: "1rem",
          }}
        >
          Hai già un account?{" "}
          <a
            href="/login"
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            Accedi qui
          </a>
        </p>
      </div>
    </div>
  );
}
