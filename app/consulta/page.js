"use client";

import { useState } from "react";

const tipos = [
  {
    id: "codigo",
    titulo: "Código de registro",
    descripcion: "Consulta por ficha",
    icono: "▣",
  },
  {
    id: "dni",
    titulo: "DNI",
    descripcion: "Consulta disponible",
    icono: "▤",
  },
  {
    id: "ce",
    titulo: "CE / Carné de extranjería",
    descripcion: "Consulta disponible",
    icono: "▤",
  },
  {
    id: "licencia",
    titulo: "Licencia",
    descripcion: "Consulta disponible",
    icono: "▥",
  },
];

const textos = {
  codigo: {
    label: "Código de registro / ficha",
    placeholder: "Ejemplo: 101010",
    ayuda: "Ingresa el código de registro proporcionado.",
  },
  dni: {
    label: "Número de DNI",
    placeholder: "Ejemplo: 40507828",
    ayuda: "Ingresa el número de DNI.",
  },
  ce: {
    label: "Número de carné de extranjería",
    placeholder: "Ejemplo: 006310958",
    ayuda: "Ingresa el número de tu carné de extranjería.",
  },
  licencia: {
    label: "Número de licencia",
    placeholder: "Ejemplo: Q-006310958",
    ayuda: "Ingresa el número de licencia.",
  },
};

function formatDate(value) {
  if (!value) return "—";

  const date = String(value).slice(0, 10);
  const parts = date.split("-");

  if (parts.length !== 3) return date;

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getLicenseStatus(registro) {
  const estado = String(registro?.estado ?? "")
    .trim()
    .toLowerCase();

  const licencia = String(registro?.codigo_licencia ?? "").trim();

  const fechaVencimiento = String(
    registro?.fecha_vencimiento ?? ""
  ).slice(0, 10);

  let vencida = false;

  if (fechaVencimiento) {
    const fecha = new Date(`${fechaVencimiento}T23:59:59`);

    vencida =
      !Number.isNaN(fecha.getTime()) &&
      fecha.getTime() < Date.now();
  }

  const estadoActivo = [
    "activo",
    "activa",
    "vigente",
    "valid",
    "válido",
    "valido",
  ].includes(estado);

  const vigente =
    Boolean(licencia) &&
    estadoActivo &&
    !vencida;

  if (vigente) {
    return {
      vigente: true,
      etiqueta: "Activo",
      titulo: "Licencia vigente",
      mensaje: "La licencia se encuentra activa y vigente.",
    };
  }

  return {
    vigente: false,
    etiqueta: "No vigente",
    titulo: "Licencia no vigente",
    mensaje: vencida
      ? "La licencia se encuentra vencida o no vigente."
      : "No cuenta con una licencia vigente registrada.",
  };
}

export default function ConsultaPage() {
  const [tipo, setTipo] = useState("codigo");
  const [valor, setValor] = useState("");
  const [registro, setRegistro] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [servicioActivo, setServicioActivo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function cambiarTipo(nuevoTipo) {
    setTipo(nuevoTipo);
    setValor("");
    setRegistro(null);
    setError("");
  }

  async function consultar(e) {
    e.preventDefault();

    const dato = valor.trim();

    if (!dato) {
      setError("Ingresa el dato que deseas consultar.");
      setRegistro(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRegistro(null);

      const params = new URLSearchParams({
        tipo,
        q: dato,
      });

      const response = await fetch(
        `/api/consulta?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.message || "No se encontró información."
        );
      }

      setRegistro(data.registro);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "No se pudo realizar la consulta."
      );
    } finally {
      setLoading(false);
    }
  }

  const numeroDocumento =
    registro?.numero_documento ||
    registro?.dni ||
    registro?.ce ||
    "—";

  const tipoDocumento =
    registro?.tipo_documento ||
    (registro?.dni
      ? "DNI"
      : registro?.ce
      ? "CARNÉ DE EXTRANJERÍA"
      : "—");

  const apellidos = registro?.apellidos || "—";

  const nombres =
    registro?.nombres ||
    registro?.nombre ||
    "—";

  const estadoLicencia = getLicenseStatus(registro);

  return (
    <main className="consulta-page">

      {/* BARRA INSTITUCIONAL */}
      <div className="top-strip">
        <div className="top-strip-inner">
          <span>
            <i className="location-dot">●</i>
            PLAZA REGOCIJO, CUSCO, PERÚ
          </span>

          <span className="top-strip-right">
            MUNICIPALIDAD PROVINCIAL DEL CUSCO
          </span>
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <header className="site-header">
        <div className="header-inner">

          <a href="/" className="brand">
            <div className="brand-seal">
              <img
                src="/escudo-cusco.png"
                alt="Escudo de Cusco"
              />
            </div>

            <div className="brand-text">
              <span>MUNICIPALIDAD PROVINCIAL</span>
              <strong>DEL CUSCO</strong>
            </div>
          </a>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={`navigation ${menuOpen ? "open" : ""}`}>
            <a href="/">INICIO</a>
            <a href="#consulta" onClick={() => setMenuOpen(false)}>
              CONSULTA
            </a>
            <a href="/#institucion" onClick={() => setMenuOpen(false)}>
              INSTITUCIÓN
            </a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>
              SERVICIOS
            </a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>
              CONTACTO
            </a>
          </nav>

        </div>
      </header>

      {/* PORTADA DE CONSULTAS */}
      <section className="hero">

        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        <div className="hero-inner">

          <div className="hero-top">
            <div className="hero-seal">
              <img
                src="/escudo-cusco.png"
                alt="Escudo de Cusco"
              />
            </div>

            <div className="hero-institution">
              <span>PORTAL DE SERVICIOS DIGITALES</span>
              <strong>
                MUNICIPALIDAD
                <br />
                PROVINCIAL DEL CUSCO
              </strong>
            </div>
          </div>

          <div className="hero-content">

            <div className="hero-title">
              <span className="eyebrow">
                <i />
                PLATAFORMA INSTITUCIONAL
              </span>

              <h1>
                Portal de
                <br />
                <span>Consultas</span>
              </h1>

              <p>
                Accede a la plataforma de consulta de
                información y registros municipales.
                Selecciona el tipo de búsqueda e ingresa
                el dato solicitado.
              </p>

              <a href="#consulta" className="hero-button">
                REALIZAR CONSULTA
                <span>↓</span>
              </a>
            </div>

            <div className="hero-side">
              <div className="hero-side-line" />
              <span>ATENCIÓN DIGITAL</span>
              <h2>
                Información
                <br />
                al ciudadano
              </h2>
              <p>
                Un espacio digital para facilitar el
                acceso a los servicios y consultas
                disponibles en la plataforma.
              </p>

              <div className="hero-side-seal">
                <img
                  src="/escudo-cusco.png"
                  alt=""
                />
              </div>
            </div>

          </div>

          <div className="hero-bottom">
            <span>IDENTIDAD · SERVICIO · CIUDADANÍA</span>
            <span>PORTAL INSTITUCIONAL</span>
          </div>

        </div>
      </section>

      {/* FORMULARIO DE CONSULTA */}
      <section className="main-card" id="consulta">

        <div className="section-heading">

          <div className="heading-icon">
            ⌕
          </div>

          <div>
            <span className="section-kicker">
              SERVICIO EN LÍNEA
            </span>

            <h2>Consulta de registros</h2>
          </div>

          <div className="heading-decoration">
            <span />
            <span />
            <span />
          </div>

        </div>

        <p className="intro">
          Selecciona una modalidad de búsqueda para
          consultar la información disponible en el sistema.
        </p>

        <div className="type-grid">

          {tipos.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`type-card ${
                tipo === item.id ? "active" : ""
              }`}
              onClick={() => cambiarTipo(item.id)}
            >
              <div className="type-icon">
                {item.icono}
              </div>

              <strong>{item.titulo}</strong>

              <small>{item.descripcion}</small>

              {tipo === item.id && (
                <span className="type-selected">✓</span>
              )}
            </button>
          ))}

        </div>

        <form className="search-box" onSubmit={consultar}>

          <div className="search-box-heading">
            <div>
              <span className="form-kicker">
                BÚSQUEDA DE INFORMACIÓN
              </span>

              <label htmlFor="dato-consulta">
                {textos[tipo].label}
              </label>
            </div>

            <span className="form-number">01 / 01</span>
          </div>

          <div className="search-row">

            <div className="input-wrap">
              <span>⌕</span>

              <input
                id="dato-consulta"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder={textos[tipo].placeholder}
                autoComplete="off"
              />
            </div>

            <button
              className="search-button"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-dot" />
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

          <small className="input-help">
            <span>ⓘ</span>
            {textos[tipo].ayuda}
          </small>

        </form>

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="error-box" role="alert">

            <div className="error-icon">!</div>

            <div>
              <strong>No se encontró información</strong>
              <p>{error}</p>
            </div>

          </div>
        )}

        {/* RESULTADO DE CONSULTA */}
        {registro && (
          <section className="license-result">

            <div className="result-header">

              <div className="result-brand">

                <div className="mini-seal">
                  <img
                    src="/escudo-cusco.png"
                    alt="Escudo de Cusco"
                  />
                </div>

                <div>
                  <span>CONSULTA DE LICENCIA</span>
                  <h3>Resultado de consulta</h3>
                </div>

              </div>

              <div
                className={`status ${
                  estadoLicencia.vigente
                    ? "status-valid"
                    : "status-invalid"
                }`}
              >
                <i>
                  {estadoLicencia.vigente ? "✓" : "✕"}
                </i>

                {estadoLicencia.etiqueta}
              </div>

            </div>

            <div className="holder">
              <span>INFORMACIÓN DEL TITULAR</span>

              <h4>
                {apellidos !== "—" ? apellidos : nombres}
              </h4>

              {apellidos !== "—" && registro.nombres && (
                <p>{registro.nombres}</p>
              )}
            </div>

            <div className="data-grid">

              <div className="data-item">
                <span>TIPO DE DOCUMENTO</span>
                <strong>{tipoDocumento}</strong>
              </div>

              <div className="data-item">
                <span>NÚMERO DE DOCUMENTO</span>
                <strong>{numeroDocumento}</strong>
              </div>

              <div className="data-item">
                <span>TIPO DE REGISTRO</span>
                <strong>{registro.tipo || "LICENCIA"}</strong>
              </div>

              <div className="data-item">
                <span>NÚMERO DE LICENCIA</span>
                <strong>{registro.codigo_licencia || "—"}</strong>
              </div>

              <div className="data-item">
                <span>CLASE / CATEGORÍA</span>
                <strong>{registro.clase_categoria || "—"}</strong>
              </div>

              <div className="data-item">
                <span>FICHA / CÓDIGO DE REGISTRO</span>
                <strong>{registro.codigo || "—"}</strong>
              </div>

              <div className="data-item">
                <span>FECHA DE EXPEDICIÓN</span>
                <strong>
                  {formatDate(registro.fecha_expedicion)}
                </strong>
              </div>

              <div className="data-item">
                <span>FECHA DE VENCIMIENTO</span>
                <strong>
                  {formatDate(registro.fecha_vencimiento)}
                </strong>
              </div>

              <div className="data-item">
                <span>FECHA DE REVALIDACIÓN</span>
                <strong>
                  {formatDate(registro.fecha_revalidacion)}
                </strong>
              </div>

            </div>

            <div className="result-footer">

              <div>
                <span>ESTADO DE LA LICENCIA</span>

                <strong
                  className={
                    estadoLicencia.vigente
                      ? "footer-valid"
                      : "footer-invalid"
                  }
                >
                  <i>
                    {estadoLicencia.vigente ? "✓" : "✕"}
                  </i>

                  {estadoLicencia.etiqueta}
                </strong>
              </div>

              <div className="consulted">
                ✓ Registro consultado
              </div>

            </div>

          </section>
        )}

        {/* INFORMACIÓN AL CIUDADANO */}
        <div
          className={`info-box ${
            registro
              ? estadoLicencia.vigente
                ? "info-valid"
                : "info-invalid"
              : ""
          }`}
        >

          <div className="info-icon">
            {registro
              ? estadoLicencia.vigente
                ? "✓"
                : "✕"
              : "i"}
          </div>

          <div>
            <strong>
              {registro
                ? estadoLicencia.titulo
                : "Información al ciudadano"}
            </strong>

            <p>
              {registro
                ? estadoLicencia.mensaje
                : "Verifica los datos ingresados antes de realizar la consulta. La información mostrada corresponde a los registros disponibles en el sistema."}
            </p>
          </div>

        </div>

      </section>

      {/* SERVICIOS DIGITALES */}
      <section className="bottom-section" id="servicios">

        <div className="bottom-inner">

          <div className="bottom-heading">
            <span className="section-kicker">
              SERVICIOS DIGITALES
            </span>

            <h2>
              Atención para
              <br />
              <span>el ciudadano</span>
            </h2>

            <p>
              Accede a la información disponible y utiliza
              los servicios digitales desde cualquier dispositivo.
            </p>
          </div>

          <div className="bottom-cards">

            <button
              type="button"
              className={`bottom-card ${
                servicioActivo === "consulta" ? "selected" : ""
              }`}
              onClick={() =>
                setServicioActivo(
                  servicioActivo === "consulta"
                    ? null
                    : "consulta"
                )
              }
            >
              <span className="bottom-card-number">01</span>
              <span className="bottom-card-icon">⌕</span>

              <strong>Consulta en línea</strong>

              <p>
                Realiza consultas de forma rápida y ordenada
                desde cualquier dispositivo.
              </p>

              <span className="bottom-card-action">
                {servicioActivo === "consulta"
                  ? "OCULTAR"
                  : "VER INFORMACIÓN"} →
              </span>
            </button>

            <button
              type="button"
              className={`bottom-card ${
                servicioActivo === "informacion" ? "selected" : ""
              }`}
              onClick={() =>
                setServicioActivo(
                  servicioActivo === "informacion"
                    ? null
                    : "informacion"
                )
              }
            >
              <span className="bottom-card-number">02</span>
              <span className="bottom-card-icon">✓</span>

              <strong>Información disponible</strong>

              <p>
                Conoce qué datos pueden aparecer en el
                resultado de una consulta.
              </p>

              <span className="bottom-card-action">
                {servicioActivo === "informacion"
                  ? "OCULTAR"
                  : "VER INFORMACIÓN"} →
              </span>
            </button>

            <button
              type="button"
              className={`bottom-card ${
                servicioActivo === "atencion" ? "selected" : ""
              }`}
              onClick={() =>
                setServicioActivo(
                  servicioActivo === "atencion"
                    ? null
                    : "atencion"
                )
              }
            >
              <span className="bottom-card-number">03</span>
              <span className="bottom-card-icon">◷</span>

              <strong>Atención digital</strong>

              <p>
                Consulta desde computadora, tablet o celular
                de manera sencilla.
              </p>

              <span className="bottom-card-action">
                {servicioActivo === "atencion"
                  ? "OCULTAR"
                  : "CÓMO FUNCIONA"} →
              </span>
            </button>

          </div>

          {servicioActivo && (
            <div className="service-detail" aria-live="polite">

              <div className="service-detail-icon">
                {servicioActivo === "consulta"
                  ? "⌕"
                  : servicioActivo === "informacion"
                  ? "✓"
                  : "◷"}
              </div>

              <div className="service-detail-content">

                {servicioActivo === "consulta" && (
                  <>
                    <span>01 · CONSULTA EN LÍNEA</span>
                    <h3>Consulta rápida y sencilla</h3>

                    <p>
                      Selecciona el tipo de búsqueda, ingresa
                      el dato solicitado y presiona Consultar.
                      El sistema procesa la solicitud y muestra
                      la información disponible para ese registro.
                    </p>

                    <div className="service-steps">
                      <span><b>1</b> Selecciona</span>
                      <span><b>2</b> Ingresa el dato</span>
                      <span><b>3</b> Consulta</span>
                      <span><b>4</b> Revisa el resultado</span>
                    </div>

                    <a href="#consulta" className="detail-button">
                      IR A CONSULTA ↑
                    </a>
                  </>
                )}

                {servicioActivo === "informacion" && (
                  <>
                    <span>02 · INFORMACIÓN DISPONIBLE</span>
                    <h3>Resultados claros y organizados</h3>

                    <p>
                      Dependiendo del registro consultado,
                      el sistema puede mostrar información
                      del titular, documento, tipo de registro,
                      licencia, clase o categoría, fechas y estado.
                    </p>

                    <div className="service-points">
                      <span>✓ Datos del titular</span>
                      <span>✓ Documento registrado</span>
                      <span>✓ Número de licencia</span>
                      <span>✓ Fechas y estado</span>
                    </div>
                  </>
                )}

                {servicioActivo === "atencion" && (
                  <>
                    <span>03 · ATENCIÓN DIGITAL</span>
                    <h3>
                      Un sistema pensado para cualquier dispositivo
                    </h3>

                    <p>
                      La plataforma está diseñada para facilitar
                      la consulta desde computadoras, tablets y
                      celulares, con una presentación clara y
                      adaptada a diferentes tamaños de pantalla.
                    </p>

                    <div className="service-points">
                      <span>✓ Computadora</span>
                      <span>✓ Tablet</span>
                      <span>✓ Celular</span>
                      <span>✓ Consulta en línea</span>
                    </div>
                  </>
                )}

              </div>
            </div>
          )}

        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="site-footer" id="contacto">

        <div className="footer-inner">

          <a href="/" className="footer-brand">
            <img
              src="/escudo-cusco.png"
              alt="Escudo de Cusco"
            />

            <span>
              MUNICIPALIDAD PROVINCIAL
              <strong>DEL CUSCO</strong>
            </span>
          </a>

          <div className="footer-description">
            Portal institucional de consultas y servicios digitales.
          </div>

          <div className="footer-bottom">
            <span>PORTAL INSTITUCIONAL</span>
            <span>PLATAFORMA DIGITAL</span>
          </div>

        </div>

      </footer>

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .consulta-page {
          min-height: 100vh;
          background: #f5f2ee;
          color: #351717;
          overflow: hidden;
        }

        /* BARRA SUPERIOR */

        .top-strip {
          background: #f2e9e4;
          border-bottom: 1px solid #e7dcd5;
        }

        .top-strip-inner {
          width: min(1440px, 92%);
          min-height: 39px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: #86131b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .location-dot {
          color: #c29b4a;
          font-size: 9px;
          margin-right: 9px;
        }

        .top-strip-right {
          color: #98713b;
        }

        /* ENCABEZADO */

        .site-header {
          position: relative;
          z-index: 20;
          background: #fff;
          border-bottom: 1px solid #eae4df;
        }

        .header-inner {
          width: min(1440px, 92%);
          min-height: 100px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 17px;
          color: inherit;
          text-decoration: none;
          flex-shrink: 0;
        }

        .brand-seal {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #fff;
          overflow: hidden;
        }

        .brand-seal img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .brand-text span {
          color: #5c2223;
          font-size: 13px;
          letter-spacing: 1px;
        }

        .brand-text strong {
          color: #941327;
          font-size: 21px;
          letter-spacing: 4px;
        }

        .navigation {
          display: flex;
          align-items: center;
          gap: clamp(17px, 3vw, 43px);
        }

        .navigation a {
          color: #392b29;
          text-decoration: none;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.6px;
          transition: color .2s ease;
        }

        .navigation a:hover {
          color: #a20d29;
        }

        .menu-toggle {
          display: none;
          border: 0;
          background: transparent;
          color: #81121c;
          font-size: 27px;
          cursor: pointer;
        }

        /* HERO */

        .hero {
          position: relative;
          color: white;
          background:
            radial-gradient(
              circle at 72% 18%,
              rgba(206, 163, 83, .17),
              transparent 29%
            ),
            linear-gradient(
              120deg,
              #76121c 0%,
              #570b13 53%,
              #35080e 100%
            );
          overflow: hidden;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: min(1240px, 90%);
          margin: auto;
          padding: 46px 0 22px;
        }

        .hero-decoration {
          position: absolute;
          border: 1px solid rgba(222, 184, 105, .15);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-decoration-one {
          width: 490px;
          height: 490px;
          right: -110px;
          top: -210px;
        }

        .hero-decoration-two {
          width: 350px;
          height: 350px;
          right: -40px;
          top: -140px;
        }

        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding-bottom: 35px;
          border-bottom: 1px solid rgba(222, 184, 105, .3);
        }

        .hero-seal {
          width: 86px;
          height: 86px;
          display: grid;
          place-items: center;
          background: white;
          border: 3px solid #d5ad5b;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 0 0 7px rgba(213, 173, 91, .1);
        }

        .hero-seal img {
          width: 88%;
          height: 88%;
          object-fit: contain;
        }

        .hero-institution {
          display: flex;
          flex-direction: column;
          text-align: right;
          gap: 9px;
        }

        .hero-institution span {
          color: #e7c77e;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .hero-institution strong {
          font-size: 17px;
          line-height: 1.55;
          letter-spacing: 3px;
        }

        .hero-content {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  align-items: center;
  gap: 55px;
  padding: 55px 0 58px;
}

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #e7c77e;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .eyebrow i {
          width: 30px;
          height: 1px;
          background: #d7b25e;
        }

        .hero-title h1 {
          margin: 23px 0 20px;
          font-family: Georgia, serif;
          font-size: clamp(48px, 6vw, 78px);
          font-weight: 500;
          line-height: .98;
          letter-spacing: -2px;
        }

        .hero-title h1 span {
          color: #e8c77c;
        }

        .hero-title > p {
          max-width: 590px;
          color: rgba(255,255,255,.84);
          font-size: 15px;
          line-height: 1.85;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 30px;
          margin-top: 20px;
          padding: 15px 20px;
          color: white;
          border: 1px solid rgba(231,199,126,.7);
          background: rgba(255,255,255,.06);
          text-decoration: none;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          transition: .2s ease;
        }

        .hero-button:hover {
          background: #d3ad60;
          color: #481017;
        }

        .hero-button span {
          font-size: 17px;
        }

        .hero-side {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 0;
  min-height: 270px;
  padding: 35px;
  box-sizing: border-box;
  border: 1px solid rgba(225,190,117,.32);
  background: rgba(31,4,9,.2);
  overflow: hidden;
}

        .hero-side-line {
          width: 45px;
          height: 2px;
          margin-bottom: 22px;
          background: #d9b365;
        }

        .hero-side > span {
          color: #e7c77e;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .hero-side h2 {
          position: relative;
          z-index: 1;
          margin: 14px 0;
          font-family: Georgia, serif;
          font-size: 32px;
          font-weight: 500;
          line-height: 1.15;
        }

        .hero-side p {
          position: relative;
          z-index: 1;
          max-width: 300px;
          margin: 0;
          color: rgba(255,255,255,.75);
          font-size: 12px;
          line-height: 1.8;
        }

        .hero-side-seal {
          position: absolute;
          right: -30px;
          bottom: -45px;
          width: 180px;
          height: 180px;
          opacity: .08;
        }

        .hero-side-seal img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .hero-bottom {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding-top: 18px;
          border-top: 1px solid rgba(222,184,105,.25);
          color: #d9bb7a;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        /* TARJETA PRINCIPAL */

        .main-card {
          position: relative;
          z-index: 5;
          width: min(970px, calc(100% - 36px));
          margin: -35px auto 0;
          padding: 36px;
          background: #fff;
          border: 1px solid #eee5df;
          border-radius: 4px;
          box-shadow: 0 25px 65px rgba(52, 22, 16, .13);
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .heading-icon {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          color: #8d1220;
          background: #f8efea;
          border: 1px solid #ead9ce;
          font-size: 30px;
        }

        .section-kicker {
          display: block;
          color: #ae7e31;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .section-heading h2 {
          margin: 5px 0 0;
          color: #381919;
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: 600;
        }

        .heading-decoration {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: auto;
        }

        .heading-decoration span {
          width: 5px;
          height: 5px;
          background: #d4b16b;
          transform: rotate(45deg);
        }

        .intro {
          margin: 24px 0;
          color: #766b65;
          font-size: 13px;
          line-height: 1.7;
        }

        /* TIPOS DE CONSULTA */

        .type-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .type-card {
          position: relative;
          min-height: 105px;
          padding: 16px;
          text-align: left;
          color: #3d211c;
          background: #fffdfb;
          border: 1px solid #e9ded7;
          border-radius: 3px;
          cursor: pointer;
          transition: .2s ease;
        }

        .type-card:hover {
          border-color: #b58b4b;
          transform: translateY(-2px);
        }

        .type-card.active {
          border: 1px solid #a10f25;
          background: #fff8f5;
          box-shadow: inset 0 0 0 1px #a10f25;
        }

        .type-icon {
          margin-bottom: 12px;
          color: #941326;
          font-size: 20px;
        }

        .type-card strong {
          display: block;
          font-size: 12px;
          line-height: 1.4;
        }

        .type-card small {
          display: block;
          margin-top: 5px;
          color: #9b8b82;
          font-size: 10px;
        }

        .type-selected {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          color: white;
          background: #941326;
          border-radius: 50%;
          font-size: 10px;
        }

        /* BUSCADOR */

        .search-box {
          margin-top: 22px;
          padding: 22px;
          background: #faf7f4;
          border: 1px solid #e8ddd6;
          border-radius: 4px;
        }

        .search-box-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 13px;
        }

        .form-kicker {
          display: block;
          margin-bottom: 6px;
          color: #b18a4a;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .search-box label {
          display: block;
          color: #39201b;
          font-size: 13px;
          font-weight: 900;
        }

        .form-number {
          color: #a99b91;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .search-row {
          display: grid;
          grid-template-columns: 1fr 155px;
          gap: 10px;
        }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          padding: 0 15px;
          background: white;
          border: 1px solid #ded2ca;
          border-radius: 3px;
        }

        .input-wrap span {
          color: #941326;
          font-size: 21px;
        }

        .input-wrap input {
          width: 100%;
          min-width: 0;
          padding: 15px 0;
          color: #38201b;
          background: transparent;
          border: 0;
          outline: 0;
          font-size: 13px;
        }

        .input-wrap:focus-within {
          border-color: #a10f25;
          box-shadow: 0 0 0 3px rgba(161,15,37,.08);
        }

        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          padding: 14px;
          color: white;
          background: #870f1b;
          border: 1px solid #870f1b;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          transition: .2s ease;
        }

        .search-button:hover:not(:disabled) {
          background: #5e0a13;
        }

        .search-button:disabled {
          opacity: .65;
          cursor: wait;
        }

        .search-button span {
          font-size: 17px;
        }

        .loading-dot {
          width: 13px;
          height: 13px;
          border: 2px solid rgba(255,255,255,.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .input-help {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 11px;
          color: #92847b;
          font-size: 10px;
        }

        .input-help span {
          color: #a47b38;
        }

        /* ERROR */

        .error-box {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-top: 20px;
          padding: 17px;
          color: #7e1717;
          background: #fff6f5;
          border: 1px solid #edcfca;
        }

        .error-icon {
          width: 27px;
          height: 27px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          color: white;
          background: #b42020;
          border-radius: 50%;
          font-weight: 900;
        }

        .error-box strong {
          font-size: 12px;
        }

        .error-box p {
          margin: 5px 0 0;
          font-size: 12px;
        }

        /* RESULTADO */

        .license-result {
          margin-top: 24px;
          overflow: hidden;
          background: white;
          border: 1px solid #e5d8d2;
          box-shadow: 0 15px 35px rgba(65,31,20,.08);
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 26px;
          color: white;
          background: linear-gradient(120deg,#870f17,#590a11);
        }

        .result-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mini-seal {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: white;
          border: 2px solid #d5ad5b;
          border-radius: 50%;
        }

        .mini-seal img {
          width: 85%;
          height: 85%;
          object-fit: contain;
        }

        .result-brand span {
          color: #e8c36c;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .result-brand h3 {
          margin: 5px 0 0;
          font-family: Georgia, serif;
          font-size: 24px;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 14px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .status-valid {
          color: #dfffe7;
          background: rgba(42,145,67,.2);
          border: 1px solid rgba(86,211,116,.45);
        }

        .status-invalid {
          color: #ffe4e1;
          background: rgba(190,45,38,.22);
          border: 1px solid rgba(255,126,116,.5);
        }

        .status i,
        .result-footer strong i {
          width: 18px;
          height: 18px;
          display: inline-grid;
          place-items: center;
          margin: 0;
          border-radius: 50%;
          font-size: 11px;
          font-style: normal;
          font-weight: 900;
        }

        .status-valid i,
        .footer-valid i {
          color: white;
          background: #2e9d4d;
        }

        .status-invalid i,
        .footer-invalid i {
          color: white;
          background: #c9372c;
        }

        .holder {
          padding: 23px 27px;
          border-bottom: 1px solid #eee5e0;
        }

        .holder > span {
          color: #a77b37;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .holder h4 {
          margin: 8px 0 0;
          font-size: 23px;
          letter-spacing: .5px;
        }

        .holder p {
          margin: 4px 0 0;
          color: #5f4b45;
          font-size: 15px;
          font-weight: 700;
        }

        .data-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
        }

        .data-item {
          padding: 19px 27px;
          border-bottom: 1px solid #eee5e0;
        }

        .data-item:nth-child(odd) {
          border-right: 1px solid #eee5e0;
        }

        .data-item span,
        .result-footer span {
          display: block;
          margin-bottom: 7px;
          color: #927f77;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .data-item strong {
          color: #38221d;
          font-size: 14px;
        }

        .result-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 17px 27px;
          background: #fbf9f7;
        }

        .result-footer strong {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
        }

        .footer-valid {
          color: #28783f;
        }

        .footer-invalid {
          color: #a52b23;
        }

        .consulted {
          color: #776b66;
          font-size: 11px;
        }

        /* INFORMACIÓN */

        .info-box {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-top: 22px;
          padding: 17px;
          background: #f7f4f1;
          border: 1px solid #e4dcd6;
        }

        .info-box.info-valid {
          background: #effaf2;
          border-color: #b9dfc2;
        }

        .info-box.info-invalid {
          background: #fff1f0;
          border-color: #efc1bc;
        }

        .info-icon {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          color: white;
          background: #8c7d74;
          border-radius: 50%;
          font-size: 13px;
          font-weight: 900;
        }

        .info-valid .info-icon {
          background: #2e9d4d;
        }

        .info-invalid .info-icon {
          background: #c9372c;
        }

        .info-box strong {
          font-size: 12px;
        }

        .info-box.info-valid strong {
          color: #246b36;
        }

        .info-box.info-invalid strong {
          color: #a52b23;
        }

        .info-box p {
          margin: 5px 0 0;
          color: #6f655f;
          font-size: 10px;
          line-height: 1.6;
        }

        /* SERVICIOS */

        .bottom-section {
          margin-top: 75px;
          padding: 75px 20px;
          color: white;
          background:
            radial-gradient(
              circle at 85% 10%,
              rgba(193,148,69,.13),
              transparent 30%
            ),
            #211a19;
        }

        .bottom-inner {
          width: min(1120px,100%);
          margin: auto;
        }

        .bottom-heading {
          max-width: 650px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .bottom-heading .section-kicker {
          color: #e0bd76;
        }

        .bottom-heading h2 {
          margin: 13px 0;
          color: white;
          font-family: Georgia, serif;
          font-size: clamp(34px,5vw,52px);
          font-weight: 500;
          line-height: 1.12;
        }

        .bottom-heading h2 span {
          color: #dfbd79;
        }

        .bottom-heading p {
          color: rgba(255,255,255,.65);
          font-size: 13px;
          line-height: 1.8;
        }

        .bottom-cards {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 17px;
        }

        .bottom-card {
          position: relative;
          min-height: 250px;
          padding: 25px;
          overflow: hidden;
          color: #351717;
          text-align: left;
          background: #fff;
          border: 1px solid #e5d8ce;
          border-radius: 3px;
          cursor: pointer;
          transition: .25s ease;
        }

        .bottom-card:hover,
        .bottom-card.selected {
          transform: translateY(-5px);
          border-color: #d1ad64;
          box-shadow: 0 15px 35px rgba(0,0,0,.18);
        }

        .bottom-card-number {
          position: absolute;
          top: 23px;
          right: 23px;
          color: #b9aaa2;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .bottom-card-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          margin-bottom: 20px;
          color: #8a1118;
          background: #f8eeea;
          font-size: 22px;
        }

        .bottom-card strong {
          display: block;
          margin-bottom: 9px;
          color: #351717;
          font-size: 16px;
        }

        .bottom-card p {
          min-height: 48px;
          margin: 0;
          color: #81756e;
          font-size: 12px;
          line-height: 1.7;
        }

        .bottom-card-action {
          display: block;
          margin-top: 17px;
          color: #8a1118;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        /* DETALLE DE SERVICIO */

        .service-detail {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-top: 20px;
          padding: 27px;
          color: #351717;
          text-align: left;
          background: white;
          border: 1px solid #ded2cb;
          animation: detailIn .25s ease;
        }

        @keyframes detailIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-detail-icon {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          display: grid;
          place-items: center;
          color: white;
          background: #8a1118;
          font-size: 22px;
        }

        .service-detail-content {
          flex: 1;
        }

        .service-detail-content > span {
          color: #b27b19;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .service-detail-content h3 {
          margin: 6px 0 9px;
          font-family: Georgia, serif;
          font-size: 23px;
        }

        .service-detail-content p {
          max-width: 760px;
          margin: 0;
          color: #6f655f;
          font-size: 13px;
          line-height: 1.7;
        }

        .service-steps,
        .service-points {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 17px;
        }

        .service-steps span,
        .service-points span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 11px;
          color: #594944;
          background: #faf7f4;
          border: 1px solid #e7ddd7;
          font-size: 10px;
          font-weight: 700;
        }

        .service-steps b {
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          color: white;
          background: #8a1118;
          border-radius: 50%;
          font-size: 9px;
        }

        .detail-button {
          display: inline-block;
          margin-top: 18px;
          padding: 11px 16px;
          color: white;
          background: #8a1118;
          text-decoration: none;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        /* PIE DE PÁGINA */

        .site-footer {
          color: white;
          background: #160f10;
        }

        .footer-inner {
          width: min(1120px,90%);
          margin: auto;
          padding: 35px 0 20px;
        }

        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          color: white;
          text-decoration: none;
          font-size: 10px;
          letter-spacing: 1px;
          line-height: 1.7;
        }

        .footer-brand img {
          width: 46px;
          height: 46px;
          object-fit: contain;
          padding: 3px;
          background: white;
          border-radius: 50%;
        }

        .footer-brand span {
          display: flex;
          flex-direction: column;
        }

        .footer-brand strong {
          color: #e2bd72;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .footer-description {
          margin-top: 18px;
          color: rgba(255,255,255,.55);
          font-size: 11px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-top: 25px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,.12);
          color: #c4a66c;
          font-size: 9px;
          letter-spacing: 2px;
        }

        /* TABLETS */

        @media (max-width: 900px) {

          .header-inner {
            min-height: 85px;
          }

          .brand-seal {
            width: 58px;
            height: 58px;
          }

          .navigation {
            gap: 17px;
          }

          .navigation a {
            font-size: 9px;
            letter-spacing: 1px;
          }

          .hero-content {
            gap: 30px;
          }

          .hero-side {
            padding: 25px;
          }

        }

        /* MÓVILES */

        @media (max-width: 700px) {

          .top-strip-inner {
            min-height: 34px;
            font-size: 8px;
            letter-spacing: 1px;
          }

          .top-strip-right {
            display: none;
          }

          .header-inner {
            min-height: 78px;
          }

          .brand {
            gap: 10px;
          }

          .brand-seal {
            width: 49px;
            height: 49px;
          }

          .brand-text span {
            font-size: 9px;
          }

          .brand-text strong {
            font-size: 16px;
            letter-spacing: 2px;
          }

          .menu-toggle {
            display: block;
          }

          .navigation {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 8px 5%;
            background: white;
            border-top: 1px solid #eee5df;
            box-shadow: 0 12px 20px rgba(0,0,0,.08);
          }

          .navigation.open {
            display: flex;
          }

          .navigation a {
            padding: 15px 5px;
            border-bottom: 1px solid #f0e9e4;
            font-size: 11px;
          }

          .hero-inner {
            width: 90%;
            padding-top: 30px;
          }

          .hero-top {
            padding-bottom: 25px;
          }

          .hero-seal {
            width: 65px;
            height: 65px;
          }

          .hero-institution span {
            font-size: 7px;
            letter-spacing: 2px;
          }

          .hero-institution strong {
            font-size: 11px;
            letter-spacing: 1.5px;
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 38px 0;
          }

          .hero-title h1 {
            font-size: clamp(46px,12vw,62px);
          }

          .hero-title > p {
            font-size: 13px;
          }

          .hero-side {
            min-height: 205px;
          }

          .hero-side h2 {
            font-size: 27px;
          }

          .hero-bottom {
            font-size: 7px;
            letter-spacing: 1px;
          }

          .main-card {
            width: calc(100% - 22px);
            margin-top: -18px;
            padding: 21px 16px;
          }

          .section-heading h2 {
            font-size: 24px;
          }

          .heading-icon {
            width: 46px;
            height: 46px;
          }

          .heading-decoration {
            display: none;
          }

          .intro {
            font-size: 12px;
          }

          .type-grid {
            grid-template-columns: repeat(2,minmax(0,1fr));
            gap: 9px;
          }

          .type-card {
            min-height: 100px;
            padding: 12px;
          }

          .type-card strong {
            font-size: 11px;
          }

          .search-box {
            padding: 15px;
          }

          .search-row {
            grid-template-columns: 1fr;
          }

          .search-button {
            min-height: 47px;
          }

          .result-header {
            align-items: flex-start;
            flex-direction: column;
            padding: 18px;
          }

          .result-brand h3 {
            font-size: 20px;
          }

          .holder {
            padding: 20px;
          }

          .data-grid {
            grid-template-columns: 1fr;
          }

          .data-item {
            padding: 15px 20px;
          }

          .data-item:nth-child(odd) {
            border-right: 0;
          }

          .result-footer {
            align-items: flex-start;
            flex-direction: column;
            padding: 17px 20px;
          }

          .bottom-section {
            margin-top: 45px;
            padding: 55px 17px;
          }

          .bottom-heading h2 {
            font-size: 37px;
          }

          .bottom-cards {
            grid-template-columns: 1fr;
          }

          .bottom-card {
            min-height: 220px;
          }

          .service-detail {
            flex-direction: column;
            padding: 20px;
          }

          .footer-bottom {
            font-size: 7px;
            letter-spacing: 1px;
          }

        }

        @media (max-width: 380px) {

          .brand-text span {
            font-size: 8px;
          }

          .brand-text strong {
            font-size: 14px;
          }

          .hero-institution strong {
            font-size: 9px;
          }

          .hero-title h1 {
            font-size: 43px;
          }

          .type-card {
            padding: 10px;
          }

        }

      `}</style>

    </main>
  );
}
