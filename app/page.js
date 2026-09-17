import Link from "next/link";

export default function Home() {
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
          <h1>Consulta información municipal de manera rápida y ordenada.</h1>
          <p className="lead">
            Plataforma demostrativa preparada para Vercel, con módulo público
            de consultas y panel administrativo para gestionar registros.
          </p>
          <div className="actions">
            <Link className="btn primary" href="/consulta">Ir a consulta</Link>
            <Link className="btn secondary" href="/admin">Panel de registros</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="card-icon">✓</div>
          <h3>Consulta segura</h3>
          <p>Diseñada con separación entre el portal público y la administración.</p>
          <div className="status"><i /> Sistema operativo</div>
        </div>
      </section>

      <section className="features">
        <article><b>01</b><h3>Consulta pública</h3><p>Busca un registro por código, documento o placa según la configuración del proyecto.</p></article>
        <article><b>02</b><h3>Registros</h3><p>Panel para revisar, crear, editar y eliminar información de prueba.</p></article>
        <article><b>03</b><h3>API preparada</h3><p>Endpoint REST listo para conectar una base de datos o servicio autorizado.</p></article>
      </section>

      <footer>© 2026 Portal demostrativo — Municipalidad de Cusco</footer>
    </main>
  );
}