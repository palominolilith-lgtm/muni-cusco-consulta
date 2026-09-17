 "use client";
import { useState } from "react";

export default function Consulta() {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function search(e) {
    e.preventDefault();
    if (!term.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/consulta?q=${encodeURIComponent(term.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, message: "No fue posible realizar la consulta." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand"><div className="seal">MC</div><div><strong>Municipalidad de Cusco</strong><span>Portal de Consultas</span></div></div>
        <nav><a href="/">Inicio</a><a href="/consulta">Consulta</a><a href="/admin">Administración</a></nav>
      </header>
      <section className="page">
        <p className="eyebrow">CONSULTA</p>
        <h1>Consulta de registros</h1>
        <p className="muted">Ingresa un código de prueba. Este proyecto incluye datos demostrativos y no representa una base oficial.</p>

        <form className="searchbox" onSubmit={search}>
          <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Ej. MC-0001" aria-label="Código de consulta" />
          <button className="btn primary" disabled={loading}>{loading ? "Consultando..." : "Consultar"}</button>
        </form>

        {result && (
          <div className={`result ${result.ok ? "ok" : "error"}`}>
            {result.ok ? (
              <>
                <div className="result-head"><span>Registro encontrado</span><strong>{result.registro.codigo}</strong></div>
                <div className="grid">
                  <div><small>Nombre</small><b>{result.registro.nombre}</b></div>
                  <div><small>Tipo</small><b>{result.registro.tipo}</b></div>
                  <div><small>Estado</small><b>{result.registro.estado}</b></div>
                  <div><small>Fecha</small><b>{result.registro.fecha}</b></div>
                </div>
              </>
            ) : <p>{result.message}</p>}
          </div>
        )}

        <div className="notice">
          <b>Importante:</b> La información mostrada en esta versión es ficticia y sirve únicamente para desarrollo y pruebas.
        </div>
      </section>
      <footer>Portal demostrativo — Municipalidad de Cusco</footer>
    </main>
  );
}