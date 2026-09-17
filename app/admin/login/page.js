"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "No se pudo iniciar sesión.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="container">
        <div
          className="card"
          style={{
            maxWidth: 480,
            margin: "80px auto"
          }}
        >
          <p className="eyebrow">ADMINISTRACIÓN</p>

          <h1>Inicio de sesión</h1>

          <p className="muted">
            Ingresa tus credenciales para acceder al panel administrativo.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: 32 }}>
            <label>
              Usuario
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label style={{ display: "block", marginTop: 18 }}>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <p
                style={{
                  marginTop: 18,
                  color: "#b42318",
                  fontWeight: 600
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 24,
                width: "100%"
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
