"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#990b2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          overflow: "hidden"
        }}
      >
        <section
          style={{
            textAlign: "center",
            animation: "fadeIn 1.2s ease-out"
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              margin: "0 auto 28px",
              borderRadius: "50%",
              border: "4px solid #f1d29a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f1d29a",
              fontSize: 42,
              fontWeight: 900,
              letterSpacing: "-2px"
            }}
          >
            MC
          </div>

          <div
            style={{
              color: "#f1d29a",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 8
            }}
          >
            Municipalidad Provincial del
          </div>

          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "#fff"
            }}
          >
            CUSCO
          </div>

          <div
            style={{
              width: 70,
              height: 3,
              background: "#f1d29a",
              margin: "28px auto 0",
              animation: "grow 1.5s ease-out"
            }}
          />
        </section>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.94);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes grow {
            from {
              width: 0;
              opacity: 0;
            }

            to {
              width: 70px;
              opacity: 1;
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="seal">MC</div>

          <div>
            <strong>Municipalidad de Cusco</strong>
            <span>Portal de Consultas</span>
          </div>
        </div>

        <nav>
          <Link href="/">Inicio</Link>
          <Link href="/consulta">Consulta</Link>
          <Link href="/admin">Administración</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">PORTAL MUNICIPAL</p>

          <h1>
            Consulta información municipal de manera rápida y ordenada.
          </h1>

          <p className="lead">
            Plataforma demostrativa preparada para Vercel, con módulo público
            de consultas y panel administrativo para gestionar registros.
          </p>

          <div className="actions">
            <Link className="btn primary" href="/consulta">
              Ir a consulta
            </Link>

            <Link className="btn secondary" href="/admin">
              Panel de registros
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-icon">✓</div>

          <h3>Consulta segura</h3>

          <p>
            Diseñada con separación entre el portal público y la administración.
          </p>

          <div className="status">
            <i /> Sistema operativo
          </div>
        </div>
      </section>

      <section className="features">
        <article>
          <b>01</b>
          <h3>Consulta pública</h3>
          <p>
            Busca un registro por código, documento o placa según la
            configuración del proyecto.
          </p>
        </article>

        <article>
          <b>02</b>
          <h3>Registros</h3>
          <p>
            Panel para revisar, crear, editar y eliminar información de prueba.
          </p>
        </article>

        <article>
          <b>03</b>
          <h3>API preparada</h3>
          <p>
            Endpoint REST listo para conectar una base de datos o servicio
            autorizado.
          </p>
        </article>
      </section>

      <footer>
        © 2026 Portal demostrativo — Municipalidad de Cusco
      </footer>
    </main>
  );
}
