"use client";

import { useState } from "react";

const QUERY_TYPES = {
  codigo: {
    title: "Código de registro",
    label: "Código de consulta",
    placeholder: "Ejemplo: 101010",
    help: "Ingresa el código de registro proporcionado.",
    aria: "Código de registro",
  },
  dni: {
    title: "DNI",
    label: "Número de DNI",
    placeholder: "Ejemplo: 12345678",
    help: "Ingresa el número de documento de identidad.",
    aria: "Número de DNI",
  },
  ce: {
    title: "CE / Carné de extranjería",
    label: "Número de carné de extranjería",
    placeholder: "Ejemplo: CE123456",
    help: "Ingresa el número de tu carné de extranjería.",
    aria: "Carné de extranjería",
  },
  licencia: {
    title: "Licencia",
    label: "Código de licencia",
    placeholder: "Ejemplo: LIC-001234",
    help: "Ingresa el código de licencia registrado.",
    aria: "Código de licencia",
  },
};

export default function Consulta() {
  const [tipo, setTipo] = useState("codigo");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const current = QUERY_TYPES[tipo];

  function changeType(newType) {
    setTipo(newType);
    setTerm("");
    setResult(null);
  }

  async function search(e) {
    e.preventDefault();

    const value = term.trim();

    if (!value) {
      setResult({
        ok: false,
        message: `Ingresa ${current.label.toLowerCase()} para realizar la consulta.`,
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `/api/consulta?tipo=${encodeURIComponent(
          tipo
        )}&q=${encodeURIComponent(value)}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        ok: false,
        message: "No fue posible realizar la consulta.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="consulta-page">
      <header className="consulta-topbar">
        <div className="consulta-brand">
          <div className="consulta-seal">
            <div className="seal-inner">MC</div>
          </div>

          <div className="brand-text">
            <strong>MUNICIPALIDAD PROVINCIAL DEL CUSCO</strong>
            <span>Portal de Consultas</span>
          </div>
        </div>

        <nav className="consulta-nav">
          <a href="/">Inicio</a>
          <a href="/consulta" className="active">
            Consulta
          </a>
        </nav>
      </header>

      <section className="consulta-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="institution-mark">
            <div className="large-seal">
              <span>MC</span>
            </div>
          </div>

          <p className="hero-kicker">
            MUNICIPALIDAD PROVINCIAL DEL CUSCO
          </p>

          <h1>Portal de Consultas</h1>

          <p className="hero-description">
            Plataforma de consulta de información y registros municipales.
            Selecciona el tipo de consulta e ingresa el dato solicitado.
          </p>
        </div>
      </section>

      <section className="consulta-container">
        <div className="consulta-card">
          <div className="card-header">
            <div className="header-icon">⌕</div>

            <div>
              <p className="section-label">SERVICIO EN LÍNEA</p>
              <h2>Consulta de registros</h2>
            </div>
          </div>

          <p className="card-description">
            Selecciona una modalidad de búsqueda para consultar la
            información disponible en el sistema.
          </p>

          <div className="query-types">
            <button
              type="button"
              className={`query-type ${
                tipo === "codigo" ? "active" : ""
              }`}
              onClick={() => changeType("codigo")}
            >
              <div className="query-icon">▣</div>

              <div>
                <strong>Código de registro</strong>
                <span>Consulta disponible</span>
              </div>
            </button>

            <button
              type="button"
              className={`query-type ${
                tipo === "dni" ? "active" : ""
              }`}
              onClick={() => changeType("dni")}
            >
              <div className="query-icon">▤</div>

              <div>
                <strong>DNI</strong>
                <span>Consulta disponible</span>
              </div>
            </button>

            <button
              type="button"
              className={`query-type ${
                tipo === "ce" ? "active" : ""
              }`}
              onClick={() => changeType("ce")}
            >
              <div className="query-icon">▤</div>

              <div>
                <strong>CE / Carné de extranjería</strong>
                <span>Consulta disponible</span>
              </div>
            </button>

            <button
              type="button"
              className={`query-type ${
                tipo === "licencia" ? "active" : ""
              }`}
              onClick={() => changeType("licencia")}
            >
              <div className="query-icon">▥</div>

              <div>
                <strong>Licencia</strong>
                <span>Consulta disponible</span>
              </div>
            </button>
          </div>

          <form className="consulta-form" onSubmit={search}>
            <label htmlFor="consulta">
              {current.label}
            </label>

            <div className="input-row">
              <div className="input-wrapper">
                <span className="input-icon">⌕</span>

                <input
                  id="consulta"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={current.placeholder}
                  autoComplete="off"
                  aria-label={current.aria}
                />
              </div>

              <button
                type="submit"
                className="consulta-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Consultando...
                  </>
                ) : (
                  <>
                    Consultar
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            <p className="input-help">
              {current.help}
            </p>
          </form>

          {result && (
            <div
              className={`consulta-result ${
                result.ok
                  ? "result-success"
                  : "result-error"
              }`}
            >
              {result.ok ? (
                <>
                  <div className="result-top">
                    <div className="result-status">
                      <span className="status-check">✓</span>

                      <div>
                        <span className="result-label">
                          REGISTRO ENCONTRADO
                        </span>

                        <strong>
                          Consulta satisfactoria
                        </strong>
                      </div>
                    </div>

                    <div className="result-code">
                      <span>CÓDIGO DE REGISTRO</span>
                      <strong>
                        {result.registro.codigo || "—"}
                      </strong>
                    </div>
                  </div>

                  <div className="result-divider" />

                  <div className="result-grid">
                    <div className="result-item">
                      <span>Nombre completo</span>
                      <strong>
                        {result.registro.nombre || "—"}
                      </strong>
                    </div>

                    <div className="result-item">
                      <span>Tipo de registro</span>
                      <strong>
                        {result.registro.tipo || "—"}
                      </strong>
                    </div>

                    <div className="result-item">
                      <span>DNI</span>
                      <strong>
                        {result.registro.dni || "—"}
                      </strong>
                    </div>

                    <div className="result-item">
                      <span>Carné de extranjería</span>
                      <strong>
                        {result.registro.ce || "—"}
                      </strong>
                    </div>

                    <div className="result-item">
                      <span>Código de licencia</span>
                      <strong>
                        {result.registro.codigo_licencia || "—"}
                      </strong>
                    </div>

                    <div className="result-item">
                      <span>Estado</span>

                      <strong className="state">
                        <i />
                        {result.registro.estado || "—"}
                      </strong>
                    </div>

                    <div className="result-item">
                      <span>Fecha de registro</span>
                      <strong>
                        {result.registro.fecha
                          ? String(result.registro.fecha).slice(
                              0,
                              10
                            )
                          : "—"}
                      </strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="error-content">
                  <div className="error-icon">!</div>

                  <div>
                    <strong>
                      No se encontró el registro
                    </strong>

                    <p>{result.message}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="information-box">
            <div className="information-icon">i</div>

            <div>
              <strong>Información al ciudadano</strong>

              <p>
                Verifica los datos ingresados antes de realizar
                la consulta. La información mostrada corresponde
                a los registros disponibles en el sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="consulta-services">
        <div className="services-container">
          <div className="services-heading">
            <p>SERVICIOS DIGITALES</p>

            <h2>
              Realiza tus consultas de manera sencilla
            </h2>

            <span>
              Accede a los servicios disponibles desde cualquier
              dispositivo.
            </span>
          </div>

          <div className="service-cards">
            <div className="service-card">
              <div className="service-card-icon">⌕</div>

              <h3>Consulta en línea</h3>

              <p>
                Realiza consultas de manera rápida desde cualquier
                dispositivo.
              </p>
            </div>

            <div className="service-card">
              <div className="service-card-icon">✓</div>

              <h3>Información disponible</h3>

              <p>
                Consulta los registros disponibles en la plataforma.
              </p>
            </div>

            <div className="service-card">
              <div className="service-card-icon">◷</div>

              <h3>Atención digital</h3>

              <p>
                Servicio disponible desde computadoras, tablets
                y celulares.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="consulta-footer">
        <div className="footer-inner">
          <div>
            <strong>
              MUNICIPALIDAD PROVINCIAL DEL CUSCO
            </strong>

            <span>Portal de Consultas</span>
          </div>

          <p>
            © {new Date().getFullYear()} Portal de Consultas
          </p>
        </div>
      </footer>

      <style jsx>{`
        .consulta-page {
          min-height: 100vh;
          background: #f5f2ee;
          color: #33231f;
          font-family: Arial, Helvetica, sans-serif;
        }

        .consulta-topbar {
          height: 82px;
          background: #fff;
          border-bottom: 1px solid #e8dfda;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 7%;
          position: relative;
          z-index: 10;
        }

        .consulta-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .consulta-seal {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(145deg, #8b171d, #5d0d12);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 16px rgba(93, 13, 18, 0.2);
        }

        .seal-inner {
          width: 38px;
          height: 38px;
          border: 2px solid #d7ae55;
          border-radius: 50%;
          color: #f4d68a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .brand-text strong {
          color: #5e1116;
          font-size: 14px;
          letter-spacing: 0.4px;
        }

        .brand-text span {
          color: #92766e;
          font-size: 12px;
        }

        .consulta-nav {
          display: flex;
          gap: 34px;
        }

        .consulta-nav a {
          text-decoration: none;
          color: #654a43;
          font-size: 14px;
          font-weight: 700;
          position: relative;
          padding: 30px 0;
        }

        .consulta-nav a.active,
        .consulta-nav a:hover {
          color: #7c1219;
        }

        .consulta-nav a.active::after {
          content: "";
          position: absolute;
          height: 3px;
          left: 0;
          right: 0;
          bottom: 18px;
          border-radius: 3px;
          background: #c79c43;
        }

        .consulta-hero {
          min-height: 330px;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 80% 30%,
              rgba(211, 170, 83, 0.22),
              transparent 28%
            ),
            linear-gradient(
              120deg,
              #4d0a10,
              #78151b 48%,
              #5a0d12
            );
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.035),
            transparent
          );
          animation: shine 5s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          padding: 55px 24px;
          animation: heroIn 0.9s ease both;
        }

        .institution-mark {
          margin-bottom: 18px;
        }

        .large-seal {
          width: 82px;
          height: 82px;
          margin: auto;
          border-radius: 50%;
          border: 2px solid rgba(226, 188, 102, 0.8);
          box-shadow:
            0 0 0 7px rgba(255, 255, 255, 0.04),
            0 0 35px rgba(220, 177, 81, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .large-seal span {
          color: #f0ce79;
          font-weight: 900;
          font-size: 23px;
          letter-spacing: 2px;
        }

        .hero-kicker {
          color: #e3c273;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          margin: 0 0 12px;
        }

        .hero-content h1 {
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 600;
        }

        .hero-description {
          max-width: 650px;
          margin: 18px auto 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 16px;
          line-height: 1.7;
        }

        .consulta-container {
          max-width: 1050px;
          margin: -58px auto 0;
          padding: 0 20px 70px;
          position: relative;
          z-index: 5;
        }

        .consulta-card {
          background: #fff;
          border-radius: 18px;
          padding: 38px;
          box-shadow: 0 22px 60px rgba(56, 31, 25, 0.13);
          border: 1px solid #eee4df;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: #f7eee9;
          color: #76151b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 29px;
          font-weight: bold;
        }

        .section-label {
          color: #b08a39;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.7px;
          margin: 0 0 5px;
        }

        .card-header h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
          color: #4f1815;
        }

        .card-description {
          margin: 22px 0 26px;
          color: #786963;
          line-height: 1.7;
          font-size: 15px;
        }

        .query-types {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 30px;
        }

        .query-type {
          min-height: 92px;
          padding: 14px 12px;
          border: 1px solid #e9dfda;
          border-radius: 12px;
          background: #fbfaf9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 7px;
          transition: 0.25s ease;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }

        .query-type:hover {
          border-color: #b56a6a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(90, 30, 25, 0.07);
        }

        .query-type.active {
          border-color: #9c3030;
          background: #fff8f5;
          box-shadow: inset 0 0 0 1px rgba(156, 48, 48, 0.08);
        }

        .query-icon {
          color: #7d171d;
          font-size: 20px;
          font-weight: bold;
        }

        .query-type strong {
          display: block;
          color: #4f3530;
          font-size: 12px;
          line-height: 1.25;
        }

        .query-type span {
          display: block;
          color: #a3938c;
          font-size: 10px;
          margin-top: 3px;
        }

        .consulta-form {
          background: #f8f5f2;
          border-radius: 14px;
          padding: 22px;
          border: 1px solid #eee5df;
        }

        .consulta-form label {
          display: block;
          color: #49302b;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 9px;
        }

        .input-row {
          display: flex;
          gap: 12px;
        }

        .input-wrapper {
          flex: 1;
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 17px;
          top: 50%;
          transform: translateY(-50%);
          color: #8a7169;
          font-size: 22px;
        }

        .input-wrapper input {
          width: 100%;
          box-sizing: border-box;
          height: 56px;
          border: 1px solid #dcd0ca;
          border-radius: 10px;
          background: #fff;
          padding: 0 18px 0 48px;
          color: #382622;
          font-size: 15px;
          outline: none;
          transition: 0.2s ease;
        }

        .input-wrapper input:focus {
          border-color: #8a2027;
          box-shadow: 0 0 0 4px rgba(138, 32, 39, 0.08);
        }

        .consulta-button {
          height: 56px;
          min-width: 175px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #80171e, #5e0d13);
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 8px 20px rgba(94, 13, 19, 0.2);
          transition: 0.25s ease;
        }

        .consulta-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .consulta-button:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .input-help {
          margin: 9px 0 0;
          color: #9a8982;
          font-size: 11px;
        }

        .consulta-result {
          margin-top: 25px;
          border-radius: 14px;
          overflow: hidden;
        }

        .result-success {
          background: #fbfdfb;
          border: 1px solid #dce9df;
        }

        .result-error {
          background: #fff8f7;
          border: 1px solid #efd8d4;
        }

        .result-top {
          padding: 23px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .result-status {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .status-check {
          width: 39px;
          height: 39px;
          border-radius: 50%;
          background: #e7f3e9;
          color: #2c7a3d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        .result-label {
          display: block;
          color: #5e9069;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .result-status strong {
          display: block;
          margin-top: 4px;
          color: #304f37;
          font-size: 15px;
        }

        .result-code {
          text-align: right;
        }

        .result-code span {
          display: block;
          color: #9b928d;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .result-code strong {
          color: #54221d;
          font-size: 18px;
        }

        .result-divider {
          height: 1px;
          background: #e3ebe4;
        }

        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .result-item {
          padding: 20px 25px;
          border-bottom: 1px solid #edf0ed;
        }

        .result-item:nth-child(odd) {
          border-right: 1px solid #edf0ed;
        }

        .result-item span {
          display: block;
          color: #958983;
          font-size: 11px;
          margin-bottom: 7px;
        }

        .result-item strong {
          color: #422c27;
          font-size: 14px;
        }

        .state {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .state i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b8a4b;
        }

        .error-content {
          padding: 24px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .error-icon {
          width: 35px;
          height: 35px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #f8deda;
          color: #9a2821;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        .error-content strong {
          color: #7a2821;
          font-size: 14px;
        }

        .error-content p {
          margin: 5px 0 0;
          color: #8b6d68;
          font-size: 13px;
        }

        .information-box {
          margin-top: 25px;
          padding: 18px 20px;
          border-radius: 12px;
          background: #f7f3ed;
          display: flex;
          gap: 13px;
          border: 1px solid #ece1d5;
        }

        .information-icon {
          width: 25px;
          height: 25px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #c9a45c;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 13px;
        }

        .information-box strong {
          color: #65483f;
          font-size: 12px;
        }

        .information-box p {
          margin: 4px 0 0;
          color: #8d7c74;
          font-size: 11px;
          line-height: 1.5;
        }

        .consulta-services {
          background: #f0ebe6;
          padding: 70px 20px;
        }

        .services-container {
          max-width: 1050px;
          margin: auto;
        }

        .services-heading {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 35px;
        }

        .services-heading p {
          color: #b08a39;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          margin: 0 0 8px;
        }

        .services-heading h2 {
          margin: 0;
          color: #54201b;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 31px;
        }

        .services-heading span {
          display: block;
          margin-top: 10px;
          color: #887872;
          font-size: 14px;
        }

        .service-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .service-card {
          background: #fff;
          padding: 28px;
          border-radius: 14px;
          border: 1px solid #e6ddd7;
          transition: 0.25s ease;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(72, 40, 31, 0.08);
        }

        .service-card-icon {
          width: 43px;
          height: 43px;
          border-radius: 11px;
          background: #f7eee9;
          color: #79171d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          font-weight: 900;
          margin-bottom: 18px;
        }

        .service-card h3 {
          color: #4f302a;
          font-size: 16px;
          margin: 0 0 8px;
        }

        .service-card p {
          color: #887a75;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .consulta-footer {
          background: #4d0b10;
          color: #fff;
          padding: 30px 7%;
        }

        .footer-inner {
          max-width: 1050px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footer-inner strong {
          display: block;
          color: #e4c67e;
          font-size: 12px;
          letter-spacing: 0.7px;
        }

        .footer-inner span {
          display: block;
          color: rgba(255, 255, 255, 0.65);
          font-size: 11px;
          margin-top: 4px;
        }

        .footer-inner p {
          margin: 0;
          color: rgba(255, 255, 255, 0.55);
          font-size: 11px;
        }

        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0%,
          100% {
            transform: translateX(-25%);
            opacity: 0.3;
          }

          50% {
            transform: translateX(25%);
            opacity: 0.8;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 850px) {
          .consulta-topbar {
            padding: 0 20px;
          }

          .query-types {
            grid-template-columns: repeat(2, 1fr);
          }

          .service-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .consulta-topbar {
            height: auto;
            padding: 15px 18px;
            gap: 15px;
          }

          .brand-text strong {
            font-size: 11px;
          }

          .brand-text span {
            font-size: 10px;
          }

          .consulta-seal {
            width: 42px;
            height: 42px;
          }

          .consulta-nav {
            gap: 14px;
          }

          .consulta-nav a {
            font-size: 12px;
            padding: 15px 0;
          }

          .consulta-nav a.active::after {
            bottom: 7px;
          }

          .consulta-hero {
            min-height: 300px;
          }

          .consulta-container {
            margin-top: -35px;
            padding-left: 12px;
            padding-right: 12px;
          }

          .consulta-card {
            padding: 22px 17px;
            border-radius: 15px;
          }

          .card-header h2 {
            font-size: 24px;
          }

          .query-types {
            grid-template-columns: 1fr 1fr;
          }

          .input-row {
            flex-direction: column;
          }

          .consulta-button {
            width: 100%;
          }

          .result-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .result-code {
            text-align: left;
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

          .result-item:nth-child(odd) {
            border-right: 0;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
