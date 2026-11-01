"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  ["📄", "Mesa de Partes Virtual", "Presenta documentos y solicitudes de manera virtual."],
  ["🔎", "Consultas en Línea", "Consulta información disponible en la plataforma municipal."],
  ["🚗", "Récord de Infracciones", "Consulta información relacionada con infracciones."],
  ["💳", "Estado de Cuenta", "Consulta información tributaria y obligaciones."],
  ["🌐", "Servicios Municipales", "Accede a los principales servicios digitales."],
  ["📢", "Atención al Ciudadano", "Encuentra información y canales de atención."]
];

const procedures = [
  "Acceso a la Información",
  "Tributaciones",
  "Centro Médico Municipal",
  "Biblioteca Municipal",
  "Planes Urbanos",
  "Licencias y autorizaciones",
  "Registro de Estado Civil",
  "Servicios Municipales"
];

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showNotice, setShowNotice] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);

      setTimeout(() => {
        setShowNotice(true);
      }, 500);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="site">

      {/* =========================
          PANTALLA DE BIENVENIDA
      ========================== */}
      {showWelcome && (
        <div className="welcome-screen">
          <div className="welcome-glow" />

          <div className="welcome-content">
            <img
              src="/escudo-cusco.png"
              alt="Escudo de Cusco"
              className="welcome-logo"
            />

            <p className="welcome-small">
              Municipalidad Provincial del
            </p>

            <h1>CUSCO</h1>

            <div className="welcome-line" />

            <p className="welcome-subtitle">
              PORTAL INSTITUCIONAL
            </p>
          </div>
        </div>
      )}

      {/* =========================
          AVISO AUTOMÁTICO
      ========================== */}
      {showNotice && (
        <div className="notice-overlay">
          <div className="notice-modal">

            <button
              className="notice-close"
              onClick={() => setShowNotice(false)}
              aria-label="Cerrar aviso"
            >
              ×
            </button>

            <div className="notice-header">
              <img
                src="/escudo-cusco.png"
                alt="Escudo de Cusco"
              />

              <div>
                <strong>MUNICIPALIDAD PROVINCIAL</strong>
                <span>DEL CUSCO</span>
              </div>
            </div>

            <div className="notice-divider" />

            <div className="notice-icon">
              📢
            </div>

            <p className="notice-label">
              AVISO INSTITUCIONAL
            </p>

            <h2>
              INFORMACIÓN PARA LA CIUDADANÍA
            </h2>

            <p className="notice-text">
              La Municipalidad Provincial del Cusco pone a disposición
              de la ciudadanía información y servicios digitales para
              facilitar el acceso a consultas y trámites municipales.
            </p>

            <div className="notice-location">
              <span>📍</span>
              <div>
                <strong>MUNICIPALIDAD PROVINCIAL DEL CUSCO</strong>
                <small>
                  Información y atención a la ciudadanía
                </small>
              </div>
            </div>

            <button
              className="notice-button"
              onClick={() => setShowNotice(false)}
            >
              INGRESAR AL PORTAL
            </button>

          </div>
        </div>
      )}

      {/* =========================
          FRANJA INSTITUCIONAL
      ========================== */}
      <div className="institutional-strip">
        <div className="institutional-strip-inner">
          <span>📍 PLAZA REGOCIJO, CUSCO, PERÚ</span>
          <span className="strip-right">MUNICIPALIDAD PROVINCIAL DEL CUSCO</span>
        </div>
      </div>

      {/* =========================
          CABECERA
      ========================== */}
      <header className="topbar">

        <div className="brand">

          <img
            src="/escudo-cusco.png"
            alt="Escudo de Cusco"
            className="brand-logo"
          />

          <div className="brand-name">
            <strong>
              MUNICIPALIDAD PROVINCIAL
            </strong>

            <span>
              DEL CUSCO
            </span>
          </div>

        </div>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navigation ${menuOpen ? "open" : ""}`}>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            INICIO
          </Link>

          <Link
            href="/consulta"
            onClick={() => setMenuOpen(false)}
          >
            CONSULTA
          </Link>

          <a
            href="#institucion"
            onClick={() => setMenuOpen(false)}
          >
            INSTITUCIÓN
          </a>

          <a
            href="#servicios"
            onClick={() => setMenuOpen(false)}
          >
            SERVICIOS
          </a>

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
          >
            CONTACTO
          </a>

        </nav>

      </header>

      {/* =========================
          HERO
      ========================== */}
      <section className="hero">

        <div className="hero-pattern" />

        <div className="hero-content">

          <div className="hero-ornament" aria-hidden="true">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="hero-kicker">
            MUNICIPALIDAD PROVINCIAL DEL CUSCO
          </p>

          <h1>
            Bienvenidos al
            <br />
            <strong>Portal Institucional</strong>
          </h1>

          <p className="hero-description">
            Información, consultas y servicios digitales de la
            Municipalidad Provincial del Cusco.
          </p>

          <div className="hero-actions">

            <Link
              href="/consulta"
              className="gold-button"
            >
              REALIZAR CONSULTA
            </Link>

            <a
              href="#institucion"
              className="outline-button"
            >
              CONOCER MÁS
            </a>

          </div>

        </div>

        <div className="hero-scroll">
          <span>DESCUBRE</span>
          <b>↓</b>
        </div>
        <small className="hero-image-credit">
          Fotografía: Diego Delso · Wikimedia Commons · CC BY-SA
        </small>

      </section>

      {/* =========================
          INSTITUCIÓN
      ========================== */}
      <section
        id="institucion"
        className="institution-section"
      >

        <div className="section-heading">

          <span className="gold-line" />

          <p>
            MUNICIPALIDAD PROVINCIAL DEL CUSCO
          </p>

          <h2>
            SERVICIO PÚBLICO
            <br />
            PARA LA CIUDADANÍA
          </h2>

        </div>

        <div className="institution-grid">

          <div className="institution-text">

            <p>
              Bienvenido al portal institucional de la Municipalidad
              Provincial del Cusco.
            </p>

            <p>
              Desde esta plataforma podrás acceder a información,
              consultas y servicios digitales disponibles para la
              ciudadanía.
            </p>

            <p>
              Nuestro objetivo es facilitar el acceso digital a los
              servicios municipales desde cualquier dispositivo.
            </p>

            <Link
              href="/consulta"
              className="dark-button"
            >
              ACCEDER A CONSULTAS
            </Link>

          </div>

          <div className="institution-card">

            <img
              src="/escudo-cusco.png"
              alt="Escudo de Cusco"
            />

            <strong>
              MUNICIPALIDAD
              <br />
              PROVINCIAL DEL CUSCO
            </strong>

            <span>
              Portal institucional
            </span>

          </div>

        </div>

      </section>

      {/* =========================
          ATENCIÓN CIUDADANA
      ========================== */}
      <section
        id="servicios"
        className="services-section"
      >

        <div className="section-heading centered">

          <span className="gold-line" />

          <p>
            SERVICIOS DIGITALES
          </p>

          <h2>
            ATENCIÓN PARA EL CIUDADANO
          </h2>

        </div>

        <div className="services-grid">

          {services.map(([icon, title, text]) => (

            <button
              key={title}
              type="button"
              className="service-card service-card-button"
              onClick={() => setSelectedService({ icon, title, text })}
            >

              <div className="service-icon">
                {icon}
              </div>

              <h3>
                {title}
              </h3>

              <p>
                {text}
              </p>

              <span className="service-arrow">
                →
              </span>

            </button>

          ))}

        </div>

      </section>

      {/* =========================
          CONSULTA DESTACADA
      ========================== */}
      <section className="consult-section">

        <div className="consult-inner">

          <div>

            <span className="mini-label">
              SERVICIO EN LÍNEA
            </span>

            <h2>
              Consulta información
              <br />
              de manera rápida.
            </h2>

            <p>
              Accede al portal de consultas para verificar
              la información disponible en el sistema.
            </p>

            <Link
              href="/consulta"
              className="gold-button"
            >
              INGRESAR A CONSULTA
            </Link>

          </div>

          <div className="consult-emblem">

            <img
              src="/escudo-cusco.png"
              alt="Escudo de Cusco"
            />

            <strong>
              PORTAL DE
              <br />
              CONSULTAS
            </strong>

          </div>

        </div>

      </section>

      {/* =========================
          TRÁMITES
      ========================== */}
      <section className="procedures-section">

        <div className="section-heading centered light">

          <span className="gold-line" />

          <p>
            SERVICIOS MUNICIPALES
          </p>

          <h2>
            TRÁMITES Y SERVICIOS
          </h2>

        </div>

        <div className="procedures-grid">

          {procedures.map((item, index) => (

            <button
              key={item}
              type="button"
              className="procedure-item procedure-button"
              onClick={() => setSelectedProcedure(item)}
            >

              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>
                {item}
              </strong>

              <b>
                →
              </b>

            </button>

          ))}

        </div>

      </section>

      {/* =========================
          MODAL DE SERVICIO
      ========================== */}

      {selectedService && (
        <div
          className="interactive-overlay"
          onClick={() => setSelectedService(null)}
        >

          <div
            className="interactive-modal"
            onClick={(e) => e.stopPropagation()}
          >
                          <button
              type="button"
              className="interactive-close"
              onClick={() => setSelectedService(null)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="interactive-icon">
              {selectedService.icon}
            </div>

            <span className="interactive-label">
              SERVICIO DIGITAL
            </span>

            <h2>
              {selectedService.title}
            </h2>

            <p>
              {selectedService.text}
            </p>

            {selectedService.title === "Consultas en Línea" ? (

              <Link
                href="/consulta"
                className="interactive-button"
                onClick={() => setSelectedService(null)}
              >
                INGRESAR A CONSULTA
              </Link>

            ) : (

              <button
                type="button"
                className="interactive-button"
                onClick={() => setSelectedService(null)}
              >
                CONTINUAR
              </button>

            )}

          </div>

        </div>
      )}


      {/* =========================
          MODAL DE TRÁMITE
      ========================== */}

      {selectedProcedure && (
        <div
          className="interactive-overlay"
          onClick={() => setSelectedProcedure(null)}
        >

          <div
            className="interactive-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="interactive-close"
              onClick={() => setSelectedProcedure(null)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="interactive-number">
              {String(
                procedures.indexOf(selectedProcedure) + 1
              ).padStart(2, "0")}
            </div>

            <span className="interactive-label">
              SERVICIOS MUNICIPALES
            </span>

            <h2>
              {selectedProcedure}
            </h2>

            <p>
              Información y orientación relacionada con este
              servicio municipal. Selecciona esta opción para
              consultar la información disponible en el portal.
            </p>

            <button
              type="button"
              className="interactive-button"
              onClick={() => setSelectedProcedure(null)}
            >
              ENTENDIDO
            </button>

          </div>

        </div>
      )}


      {/* =========================
          LLAMADO FINAL
      ========================== */}
      <section className="final-section">

        <img
          src="/escudo-cusco.png"
          alt="Escudo de Cusco"
        />

        <p>
          MUNICIPALIDAD PROVINCIAL DEL CUSCO
        </p>

        <h2>
          Estamos para servirte
        </h2>

        <Link
          href="/consulta"
          className="gold-button"
        >
          REALIZAR CONSULTA
        </Link>

      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer
        id="contacto"
        className="footer"
      >

        <div className="footer-main">

          <div className="footer-brand">

            <img
              src="/escudo-cusco.png"
              alt="Escudo de Cusco"
            />

            <div>
              <strong>
                MUNICIPALIDAD PROVINCIAL
              </strong>

              <span>
                DEL CUSCO
              </span>
            </div>

          </div>

          <div>
            <h3>
              PORTAL
            </h3>

            <Link href="/">
              Inicio
            </Link>

            <Link href="/consulta">
              Consulta
            </Link>
          </div>

          <div>
            <h3>
              SERVICIOS
            </h3>

            <span>
              Atención ciudadana
            </span>

            <span>
              Servicios digitales
            </span>
          </div>

          <div>
            <h3>
              INFORMACIÓN
            </h3>

            <span>
              Portal institucional
            </span>

            <span>
              Municipalidad Provincial del Cusco
            </span>
          </div>

        </div>

        <div className="footer-bottom">
          © 2025 Municipalidad Provincial del Cusco — Portal institucional
        </div>

      </footer>
      {/* =========================
          ESTILOS
      ========================== */}
      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .site {
          min-height: 100vh;
          background: #f8f6f2;
          color: #35191b;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        /* WELCOME */

        .welcome-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background:
            radial-gradient(
              circle at center,
              #a00e2d 0%,
              #8d0927 48%,
              #65051b 100%
            );
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: welcomeOut .7s ease 2.15s forwards;
        }

        .welcome-glow {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: rgba(255,255,255,.06);
          filter: blur(5px);
        }

        .welcome-content {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: welcomeIn 1.2s ease;
        }

        .welcome-logo {
          width: 245px;
          height: 245px;
          object-fit: contain;
          margin-bottom: 20px;
          filter:
            drop-shadow(0 15px 30px rgba(0,0,0,.25));
        }

        .welcome-small {
          margin: 0;
          font-size: 21px;
          font-weight: 700;
          letter-spacing: .5px;
        }

        .welcome-content h1 {
          margin: 8px 0 5px;
          font-size: clamp(55px, 8vw, 92px);
          letter-spacing: 18px;
          padding-left: 18px;
          font-weight: 800;
        }

        .welcome-line {
          width: 130px;
          height: 2px;
          margin: 20px auto;
          background: #d6ad58;
        }

        .welcome-subtitle {
          margin: 0;
          letter-spacing: 5px;
          font-size: 13px;
          font-weight: 700;
          color: #e7c879;
        }

        @keyframes welcomeIn {
          from {
            opacity: 0;
            transform: scale(.92) translateY(20px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes welcomeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* NOTICE */

        .notice-overlay {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(25, 8, 12, .72);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px;
          animation: noticeIn .35s ease;
        }

        .notice-modal {
          position: relative;
          width: min(760px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 18px;
          box-shadow: 0 30px 100px rgba(0,0,0,.35);
          padding: 35px;
          border-top: 7px solid #a50c2d;
        }

        .notice-close {
          position: absolute;
          top: 16px;
          right: 17px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 0;
          background: #8f0928;
          color: white;
          font-size: 27px;
          cursor: pointer;
        }

        .notice-header {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-right: 45px;
        }

        .notice-header img {
          width: 82px;
          height: 82px;
          object-fit: contain;
        }

        .notice-header strong,
        .notice-header span {
          display: block;
        }

        .notice-header strong {
          font-size: 20px;
          color: #57151b;
        }

        .notice-header span {
          font-size: 20px;
          font-weight: 800;
          color: #8f0928;
        }

        .notice-divider {
          height: 1px;
          background: #e5d9d0;
          margin: 24px 0;
        }

        .notice-icon {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 29px;
          background: #f5ead0;
          border: 4px solid #d5a948;
        }

        .notice-label {
          text-align: center;
          color: #a50c2d;
          font-size: 13px;
          letter-spacing: 3px;
          font-weight: 800;
          margin: 20px 0 7px;
        }

        .notice-modal h2 {
          text-align: center;
          color: #541217;
                    margin: 0 0 25px;
          font-size: clamp(27px, 4vw, 42px);
        }

        .notice-text {
          color: #3c3633;
          font-size: 16px;
          line-height: 1.75;
          text-align: justify;
        }

        .notice-location {
          margin: 25px 0;
          padding: 18px;
          border-radius: 10px;
          background: #faf5ef;
          display: flex;
          gap: 13px;
          align-items: center;
          border-left: 4px solid #a50c2d;
        }

        .notice-location span {
          font-size: 28px;
        }

        .notice-location strong,
        .notice-location small {
          display: block;
        }

        .notice-location strong {
          color: #64141b;
        }

        .notice-location small {
          margin-top: 4px;
          color: #777;
        }

        .notice-button {
          display: block;
          margin: 25px auto 0;
          border: 0;
          background: #8f0928;
          color: white;
          padding: 15px 30px;
          border-radius: 5px;
          font-weight: 800;
          letter-spacing: 1px;
          cursor: pointer;
        }

        @keyframes noticeIn {
          from {
            opacity: 0;
            transform: scale(.95);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* HEADER */

        .topbar {
          min-height: 82px;
          background: white;
          border-bottom: 1px solid #eadfd6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-logo {
          width: 57px;
          height: 57px;
          object-fit: contain;
        }

        .brand-name strong,
        .brand-name span {
          display: block;
        }

        .brand-name strong {
          color: #64141b;
          font-size: 14px;
          letter-spacing: .5px;
        }

        .brand-name span {
          color: #a50c2d;
          font-weight: 800;
          font-size: 17px;
          letter-spacing: 2px;
        }

        .navigation {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .navigation a {
          color: #5d5550;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.3px;
        }

        .navigation a:hover {
          color: #a50c2d;
        }

        /* HERO */

        .hero {
          position: relative;
          min-height: 680px;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #790820,
              #a80e30 48%,
              #5b0719
            );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 90px 24px;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(255,255,255,.14),
              transparent 30%
            );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
        }

        .hero-logo-box {
          width: 145px;
          height: 145px;
          margin: 0 auto 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,.08);
          border: 2px solid rgba(216,174,87,.85);
          box-shadow: 0 15px 50px rgba(0,0,0,.2);
        }

        .hero-logo-box img {
          width: 110px;
          height: 110px;
          object-fit: contain;
        }

        .hero-kicker {
          margin: 0;
          color: #e4bf6b;
          font-weight: 800;
          letter-spacing: 4px;
          font-size: 13px;
        }

        .hero h1 {
          font-size: clamp(45px, 7vw, 84px);
          line-height: 1;
          margin: 20px 0;
          letter-spacing: -2px;
        }

        .hero h1 strong {
          color: #e7c36c;
        }

        .hero-description {
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.8;
          font-size: 18px;
          opacity: .93;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 32px;
        }

        .gold-button,
        .outline-button,
        .dark-button {
          display: inline-block;
          text-decoration: none;
          padding: 15px 27px;
          border-radius: 4px;
          font-weight: 800;
          letter-spacing: 1px;
          font-size: 12px;
        }

        .gold-button {
          background: #d3a847;
          color: #35191b;
        }

        .gold-button:hover {
          background: #e6c36d;
        }

        .outline-button {
          border: 1px solid rgba(255,255,255,.65);
          color: white;
        }

        .hero-scroll {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 9px;
          letter-spacing: 3px;
          opacity: .75;
        }

        /* SECTIONS */

        .institution-section,
        .services-section,
        .final-section {
          padding: 100px 6%;
          background: white;
        }

        .section-heading {
          max-width: 1150px;
          margin: 0 auto 55px;
        }

        .section-heading.centered {
          text-align: center;
        }

        .section-heading p {
          margin: 13px 0 10px;
          color: #a50c2d;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .section-heading h2 {
          margin: 0;
          color: #4d171d;
                    font-size: clamp(35px, 5vw, 58px);
          line-height: 1.05;
        }

        .gold-line {
          display: block;
          width: 55px;
          height: 3px;
          background: #d3a847;
        }

        .institution-grid {
          max-width: 1150px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.25fr .75fr;
          gap: 70px;
          align-items: center;
        }

        .institution-text p {
          color: #655b56;
          line-height: 1.9;
          font-size: 17px;
        }

        .dark-button {
          margin-top: 15px;
          background: #8f0928;
          color: white;
        }

        .institution-card {
          min-height: 390px;
          border-radius: 15px;
          background:
            linear-gradient(
              145deg,
              #8f0928,
              #5d061b
            );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 35px;
          box-shadow: 0 25px 70px rgba(90,10,25,.2);
        }

        .institution-card img {
          width: 180px;
          height: 180px;
          object-fit: contain;
          margin-bottom: 20px;
        }

        .institution-card strong {
          font-size: 22px;
          line-height: 1.25;
        }

        .institution-card span {
          margin-top: 10px;
          color: #e2c06b;
        }

        /* SERVICES */

        .services-section {
          background: #f7f3ee;
        }

        .services-grid {
          max-width: 1150px;
          margin: auto;
          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: white;
          border: 1px solid #eadfd7;
          padding: 30px;
          min-height: 245px;
          position: relative;
          transition: .25s ease;
        }

        .service-card-button {
          width: 100%;
          display: block;
          text-align: left;
          font-family: inherit;
          cursor: pointer;
          color: inherit;
        }

        .service-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 45px rgba(70,30,25,.1);
          border-color: #d7ae55;
        }

        .service-card-button:focus-visible {
          outline: 3px solid #d3a847;
          outline-offset: 3px;
        }

        .service-icon {
          font-size: 35px;
          margin-bottom: 20px;
        }

        .service-card h3 {
          color: #56161c;
          margin: 0 0 10px;
        }

        .service-card p {
          color: #756b66;
          line-height: 1.65;
          font-size: 14px;
        }

        .service-arrow {
          position: absolute;
          right: 25px;
          bottom: 20px;
          color: #a50c2d;
          font-size: 22px;
        }
                /* CONSULT */

        .consult-section {
          padding: 100px 6%;
          background: #fff;
        }

        .consult-inner {
          max-width: 1150px;
          margin: auto;
          padding: 65px;
          background:
            linear-gradient(
              135deg,
              #7c0821,
              #a80d30
            );
          color: white;
          display: grid;
          grid-template-columns: 1.3fr .7fr;
          gap: 50px;
          align-items: center;
          border-radius: 15px;
          overflow: hidden;
        }

        .mini-label {
          color: #e2bd66;
          letter-spacing: 3px;
          font-size: 11px;
          font-weight: 800;
        }

        .consult-inner h2 {
          color: white;
          font-size: clamp(35px, 5vw, 58px);
          line-height: 1.05;
          margin: 15px 0;
        }

        .consult-inner p {
          line-height: 1.8;
          max-width: 600px;
          opacity: .9;
        }

        .consult-emblem {
          text-align: center;
        }

        .consult-emblem img {
          width: 190px;
          height: 190px;
          object-fit: contain;
        }

        .consult-emblem strong {
                  display: block;
          margin-top: 10px;
          color: #e5c273;
          letter-spacing: 2px;
          font-size: 19px;
        }

        /* PROCEDURES */

        .procedures-section {
          padding: 100px 6%;
          background: #5e071b;
          color: white;
        }

        .section-heading.light p,
        .section-heading.light h2 {
          color: white;
        }

        .procedures-grid {
          max-width: 1150px;
          margin: auto;
          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(270px, 1fr));
          gap: 0 35px;
        }

        .procedure-item {
          min-height: 75px;
          border-bottom: 1px solid rgba(255,255,255,.15);
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .procedure-item span {
          color: #d5ad59;
          font-weight: 800;
          font-size: 12px;
        }

        .procedure-item strong {
          flex: 1;
          font-size: 14px;
        }

        .procedure-item b {
          color: #d5ad59;
        }

        /* INTERACTIVOS */

        .interactive-overlay {
          position: fixed;
          inset: 0;
          z-index: 9997;
          background: rgba(25, 8, 12, .72);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px;
        }

        .interactive-modal {
          position: relative;
          width: min(620px, 100%);
          background: white;
          border-radius: 18px;
          padding: 45px 40px;
          text-align: center;
          box-shadow: 0 30px 100px rgba(0,0,0,.35);
          border-top: 6px solid #a50c2d;
          animation: interactiveIn .25s ease;
        }

        .interactive-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          background: #8f0928;
          color: white;
          font-size: 26px;
          line-height: 1;
          cursor: pointer;
        }

        .interactive-close:hover {
          background: #a50c2d;
        }

        .interactive-icon {
          font-size: 55px;
          margin-bottom: 15px;
        }

        .interactive-number {
          width: 70px;
          height: 70px;
          margin: 0 auto 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5ead0;
          border: 2px solid #d3a847;
          color: #8f0928;
          font-size: 22px;
          font-weight: 800;
        }

        .interactive-label {
          display: block;
          color: #a50c2d;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }

        .interactive-modal h2 {
          margin: 0 0 18px;
          color: #541217;
          font-size: clamp(28px, 5vw, 42px);
          line-height: 1.1;
        }

        .interactive-modal p {
          margin: 0 auto;
          max-width: 500px;
          color: #655b56;
          font-size: 16px;
          line-height: 1.75;
        }

        .interactive-button {
          display: inline-block;
          margin-top: 28px;
          padding: 14px 28px;
          border: 0;
          border-radius: 4px;
          background: #8f0928;
          color: white;
          text-decoration: none;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .interactive-button:hover {
          background: #a50c2d;
        }

        @keyframes interactiveIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .procedure-button {
          width: 100%;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,.15);
          background: transparent;
          color: white;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
        }

        .procedure-button:hover {
          background: rgba(255,255,255,.05);
        }

        .procedure-button:focus-visible {
          outline: 2px solid #d5ad59;
          outline-offset: -2px;
        }

        /* FINAL */

        .final-section {
          text-align: center;
        }

        .final-section img {
          width: 120px;
          height: 120px;
          object-fit: contain;
        }

        .final-section p {
          color: #a50c2d;
          font-weight: 800;
          letter-spacing: 3px;
          font-size: 12px;
          margin: 20px 0 10px;
        }

        .final-section h2 {
          color: #4d171d;
          font-size: clamp(35px, 5vw, 58px);
          margin: 0 0 25px;
        }

        /* FOOTER */

        .footer {
          background: #160d10;
          color: white;
          padding: 65px 6% 25px;
        }

        .footer-main {
          max-width: 1150px;
          margin: auto;
          display: grid;
          grid-template-columns:
            2fr 1fr 1fr 1fr;
          gap: 45px;
        }

        .footer-brand {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .footer-brand img {
          width: 65px;
          height: 65px;
          object-fit: contain;
        }

        .footer-brand strong,
        .footer-brand span {
          display: block;
        }

        .footer-brand strong {
          font-size: 13px;
        }

        .footer-brand span {
          color: #d5ad59;
          margin-top: 5px;
          font-weight: 800;
        }

        .footer h3 {
          color: #d5ad59;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .footer a,
        .footer span {
          display: block;
          color: #c4b9b6;
          text-decoration: none;
          font-size: 13px;
          margin-top: 12px;
          line-height: 1.5;
        }

        .footer-bottom {
          max-width: 1150px;
          margin: 45px auto 0;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.12);
          color: #8d8180;
          text-align: center;
          font-size: 12px;
        }

        /* BOTÓN HAMBURGUESA */

        .mobile-menu-button {
          display: none;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          border: 1px solid #eadfd6;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          padding: 0;
        }

        .mobile-menu-button span {
          display: block;
          width: 21px;
          height: 2px;
          border-radius: 2px;
          background: #8f0928;
        }

        /* MOBILE */

        @media (max-width: 800px) {

          .topbar {
            padding: 12px 20px;
            min-height: 76px;
            flex-direction: row;
            gap: 15px;
            position: sticky;
          }

          .brand {
            min-width: 0;
            flex: 1;
          }

          .brand-logo {
            width: 50px;
            height: 50px;
          }

          .brand-name strong {
            font-size: 11px;
          }

          .brand-name span {
            font-size: 14px;
          }

          .mobile-menu-button {
            display: flex;
          }

          .navigation {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 200;
            padding: 8px 20px 14px;
            background: white;
            border-top: 1px solid #eadfd6;
            border-bottom: 1px solid #eadfd6;
            box-shadow: 0 14px 30px rgba(0,0,0,.12);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }

          .navigation.open {
            display: flex;
          }

          .navigation a {
            display: block;
            width: 100%;
            padding: 13px 5px;
            font-size: 11px;
            text-align: left;
            border-bottom: 1px solid #f0e9e3;
          }

          .navigation a:last-child {
            border-bottom: 0;
          }

          .hero {
            min-height: 620px;
          }

          .hero h1 {
            font-size: 45px;
          }

          .institution-grid,
          .consult-inner {
            grid-template-columns: 1fr;
          }

          .consult-inner {
            padding: 35px 25px;
          }

          .footer-main {
            grid-template-columns: 1fr 1fr;
          }

          .welcome-logo {
            width: 190px;
            height: 190px;
          }

          .welcome-content h1 {
            font-size: 58px;
            letter-spacing: 10px;
            padding-left: 10px;
          }

          .notice-modal {
            padding: 25px 20px;
          }

          .notice-header img {
            width: 65px;
            height: 65px;
          }

          .notice-header strong,
          .notice-header span {
            font-size: 15px;
          }
        }

        @media (max-width: 520px) {

          .topbar {
            padding-left: 15px;
            padding-right: 15px;
          }

          .brand {
            gap: 10px;
          }

          .brand-logo {
            width: 46px;
            height: 46px;
          }

          .brand-name strong {
            font-size: 10px;
          }

          .brand-name span {
                      font-size: 13px;
            letter-spacing: 1.5px;
          }

          .footer-main {
            grid-template-columns: 1fr;
          }

          .hero-actions {
            flex-direction: column;
          }

          .gold-button,
          .outline-button {
            width: 100%;
          }

          .welcome-logo {
            width: 160px;
            height: 160px;
          }

          .welcome-content h1 {
            font-size: 48px;
          }

        }

        /* =====================================================
           REDISEÑO VISUAL INSTITUCIONAL — PORTADA CINEMATOGRÁFICA
           Conserva los componentes y las funciones originales.
        ====================================================== */

        .institutional-strip {
          background: #f3e9e5;
          color: #7c2638;
          border-bottom: 1px solid rgba(124, 38, 56, .12);
          font-size: 11px;
          letter-spacing: 1.1px;
          font-weight: 700;
        }

        .institutional-strip-inner {
          width: min(1380px, 92%);
          min-height: 38px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .strip-right {
          color: #9b7a4b;
        }

        .topbar {
          min-height: 96px;
          padding: 0 max(4%, calc((100% - 1380px) / 2));
          background: rgba(255,255,255,.97);
          border-bottom: 1px solid rgba(142, 113, 73, .2);
          box-shadow: 0 5px 25px rgba(32, 18, 15, .045);
          backdrop-filter: blur(12px);
        }

        .brand {
          gap: 16px;
        }

        .brand-logo {
          width: 70px;
          height: 70px;
          filter: saturate(.9);
        }

        .brand-name strong {
          color: #6d2433;
          font-size: 13px;
          letter-spacing: 1.1px;
        }

        .brand-name span {
          color: #a50c2d;
          font-size: 19px;
          letter-spacing: 3px;
        }

        .navigation {
          gap: clamp(15px, 2.2vw, 34px);
        }

        .navigation a {
          position: relative;
          padding: 12px 0;
          color: #3f3430;
          font-size: 11px;
          letter-spacing: 1.5px;
          transition: color .25s ease;
        }

        .navigation a::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 3px;
          height: 2px;
          background: #b18b52;
          transition: right .25s ease;
        }

        .navigation a:hover {
          color: #9a1735;
        }

        .navigation a:hover::after {
          right: 0;
        }

        .hero {
          isolation: isolate;
          min-height: min(790px, calc(100vh - 134px));
          padding: 100px 24px 115px;
          background: #280b15;
          text-align: center;
        }

        .hero::before {
          content: "";
          position: absolute;
          z-index: -2;
          inset: -2%;
          background-image: url("https://upload.wikimedia.org/wikipedia/commons/0/09/Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_53-56_PAN.jpg");
          background-size: cover;
          background-position: center 48%;
          transform: scale(1.04);
          animation: cuscoHeroDrift 24s ease-in-out infinite alternate;
        }

        .hero::after {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(48, 5, 19, .76), rgba(94, 5, 28, .48) 52%, rgba(35, 7, 18, .72)),
            linear-gradient(0deg, rgba(23, 7, 13, .55), transparent 55%, rgba(23, 7, 13, .22));
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          opacity: .28;
          background:
            radial-gradient(circle at 18% 22%, rgba(226, 190, 120, .24), transparent 24%),
            radial-gradient(circle at 84% 75%, rgba(226, 190, 120, .16), transparent 26%);
          pointer-events: none;
        }

        .hero-content {
          max-width: 1100px;
          animation: heroContentIn 1.1s cubic-bezier(.2,.75,.25,1) both;
        }

        .hero-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          margin: 0 auto 28px;
          color: #dfbd7d;
        }

        .hero-ornament span {
          display: block;
          width: clamp(45px, 8vw, 105px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #dfbd7d);
        }

        .hero-ornament span:last-child {
          transform: rotate(180deg);
        }

        .hero-ornament b {
          font-size: 18px;
          font-weight: 400;
        }

        .hero-kicker {
          margin: 0 0 23px;
          color: #e6c98e;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: clamp(3px, .65vw, 7px);
          text-shadow: 0 2px 12px rgba(0,0,0,.35);
        }

        .hero h1 {
          margin: 0 auto 26px;
          max-width: 1050px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(43px, 7.1vw, 92px);
          font-weight: 400;
          line-height: 1.06;
          letter-spacing: .015em;
          text-shadow: 0 5px 28px rgba(0,0,0,.35);
        }

        .hero h1 strong {
          display: inline-block;
          margin-top: 9px;
          color: #e5c17b;
          font-weight: 700;
          letter-spacing: -.025em;
        }

        .hero-description {
          max-width: 720px;
          margin: 0 auto;
          color: rgba(255,255,255,.92);
          font-size: clamp(15px, 1.5vw, 19px);
          line-height: 1.8;
          letter-spacing: .035em;
          text-shadow: 0 2px 12px rgba(0,0,0,.4);
        }

        .hero-actions {
          margin-top: 39px;
          gap: 15px;
        }

        .gold-button,
        .outline-button,
        .dark-button {
          padding: 16px 30px;
          border-radius: 2px;
          font-size: 11px;
          letter-spacing: 1.8px;
          transition: transform .25s ease, background .25s ease, border-color .25s ease;
        }

        .gold-button {
          background: #d1ad6b;
          color: #2b1720;
          box-shadow: 0 8px 28px rgba(0,0,0,.2);
        }

        .gold-button:hover {
          background: #ecd19a;
          transform: translateY(-3px);
        }

        .outline-button {
          border: 1px solid rgba(255,255,255,.78);
          background: rgba(255,255,255,.06);
          color: white;
          backdrop-filter: blur(6px);
        }

        .outline-button:hover {
          border-color: #e5c17b;
          background: rgba(255,255,255,.15);
          transform: translateY(-3px);
        }

        .hero-scroll {
          bottom: 24px;
          color: #f1dfbd;
          font-size: 9px;
          letter-spacing: 4px;
        }

        .hero-scroll b {
          font-size: 19px;
          animation: scrollNudge 1.8s ease-in-out infinite;
        }

        .hero-image-credit {
          position: absolute;
          right: 18px;
          bottom: 13px;
          color: rgba(255,255,255,.62);
          font-size: 8px;
          letter-spacing: .3px;
        }

        .institution-section,
        .services-section,
        .final-section {
          padding: clamp(75px, 9vw, 125px) 6%;
        }

        .section-heading {
          margin-bottom: 60px;
        }

        .section-heading p {
          color: #a17c4b;
          font-size: 11px;
          letter-spacing: 4px;
        }

        .section-heading h2 {
          color: #30252a;
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          letter-spacing: .015em;
        }

        .gold-line {
          width: 70px;
          height: 2px;
          background: #b38c54;
        }

        .institution-card {
          position: relative;
          min-height: 410px;
          border-radius: 2px;
          background:
            linear-gradient(rgba(64, 7, 25, .82), rgba(38, 10, 19, .92)),
            url("https://upload.wikimedia.org/wikipedia/commons/0/09/Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_53-56_PAN.jpg") center/cover;
          border: 1px solid rgba(190, 155, 96, .55);
          box-shadow: 0 25px 65px rgba(52, 25, 28, .16);
        }

        .institution-card img {
          width: 150px;
          height: 150px;
          filter: drop-shadow(0 5px 18px rgba(0,0,0,.2));
        }

        .institution-card strong {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .services-section {
          background: #211b1c;
          color: white;
        }

        .services-section .section-heading h2 {
          color: white;
        }

        .services-section .section-heading p {
          color: #d2b078;
        }

        .service-card {
          min-height: 255px;
          border: 1px solid rgba(207, 174, 119, .24);
          border-radius: 0;
          background: linear-gradient(145deg, #2c2424, #181415);
          color: white;
        }

        .service-card h3 {
          color: #e8d6b7;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-weight: 500;
        }

        .service-card p {
          color: rgba(255,255,255,.67);
        }

        .service-icon,
        .service-arrow {
          color: #d1ad6b;
        }

        .service-card:hover {
          border-color: #c4a16b;
          background: linear-gradient(145deg, #44302d, #211719);
          box-shadow: 0 20px 45px rgba(0,0,0,.28);
        }

        .consult-section {
          background: #f7f3ee;
        }

        .consult-inner {
          position: relative;
          border-radius: 0;
          border: 1px solid rgba(190, 155, 96, .45);
          background:
            linear-gradient(105deg, rgba(43, 10, 23, .96), rgba(103, 12, 37, .9)),
            url("https://upload.wikimedia.org/wikipedia/commons/0/09/Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_53-56_PAN.jpg") center/cover;
          box-shadow: 0 24px 65px rgba(58, 21, 31, .18);
        }

        .procedures-section {
          background:
            linear-gradient(rgba(29, 17, 20, .94), rgba(29, 17, 20, .96)),
            url("https://upload.wikimedia.org/wikipedia/commons/0/09/Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_53-56_PAN.jpg") center/cover fixed;
        }

        .procedure-item {
          min-height: 88px;
          border-bottom-color: rgba(218, 190, 145, .22);
          transition: background .25s ease, padding .25s ease;
        }

        .procedure-item:hover {
          padding-left: 12px;
          background: rgba(255,255,255,.045);
        }

        .final-section {
          background:
            linear-gradient(rgba(248,246,242,.94), rgba(248,246,242,.96)),
            url("https://upload.wikimedia.org/wikipedia/commons/0/09/Plaza_de_Armas%2C_Cusco%2C_Per%C3%BA%2C_2015-07-31%2C_DD_53-56_PAN.jpg") center/cover;
        }

        .footer {
          border-top: 3px solid #b38c54;
          background: #171214;
        }

        .notice-modal,
        .interactive-modal {
          border-radius: 2px;
          border: 1px solid #c8a66d;
          box-shadow: 0 35px 100px rgba(0,0,0,.45);
        }

        .notice-modal {
          border-top: 7px solid #9d1835;
        }

        .mobile-menu-button {
          border-radius: 2px;
        }

        @keyframes cuscoHeroDrift {
          from { transform: scale(1.04) translate3d(0, 0, 0); }
          to { transform: scale(1.13) translate3d(-1.2%, -1%, 0); }
        }

        @keyframes heroContentIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollNudge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (max-width: 800px) {
          .institutional-strip-inner {
            min-height: 34px;
            font-size: 9px;
          }

          .strip-right {
            display: none;
          }

          .topbar {
            min-height: 78px;
            padding: 10px 18px;
          }

          .brand-logo {
            width: 54px;
            height: 54px;
          }

          .navigation {
            background: #fff;
          }

          .hero {
            min-height: 680px;
            padding: 85px 22px 110px;
          }

          .hero::before {
            background-position: 52% center;
          }

          .hero h1 {
            font-size: clamp(42px, 9vw, 62px);
          }

          .hero-description {
            max-width: 560px;
            font-size: 15px;
          }

          .hero-image-credit {
            right: 10px;
            bottom: 8px;
            font-size: 7px;
          }
        }

        @media (max-width: 520px) {
          .institutional-strip-inner {
            justify-content: center;
          }

          .hero {
            min-height: 650px;
          }

          .hero-kicker {
            font-size: 9px;
            line-height: 1.8;
            letter-spacing: 2.5px;
          }

          .hero h1 {
            font-size: 42px;
            line-height: 1.12;
          }

          .hero-description {
            font-size: 14px;
            line-height: 1.7;
          }

          .hero-actions {
            width: min(100%, 330px);
            margin-left: auto;
            margin-right: auto;
          }

          .hero-image-credit {
            max-width: 180px;
            text-align: right;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero::before,
          .hero-content,
          .hero-scroll b {
            animation: none !important;
          }
        }

      `}</style>

    </main>
  );
}
