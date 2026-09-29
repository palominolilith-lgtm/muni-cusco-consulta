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

          <div className="hero-logo-box">
            <img
              src="/escudo-cusco.png"
              alt="Escudo de Cusco"
            />
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
            Plataforma digital de información, consultas y servicios
            para la ciudadanía.
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

            <article
              key={title}
              className="service-card"
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

            </article>

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

            <div
              key={item}
              className="procedure-item"
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

            </div>

          ))}

        </div>

      </section>

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

        .service-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 45px rgba(70,30,25,.1);
          border-color: #d7ae55;
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

      `}</style>

    </main>
  );
}
