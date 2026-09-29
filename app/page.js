import Link from "next/link";

const services = [
  {
    icon: "📄",
    title: "Mesa de Partes Virtual",
    text: "Presenta documentos y solicitudes de manera virtual."
  },
  {
    icon: "✉️",
    title: "Correo Institucional",
    text: "Accede a los canales de comunicación institucional."
  },
  {
    icon: "🚗",
    title: "Récord de Infracciones",
    text: "Consulta información relacionada con infracciones."
  },
  {
    icon: "💳",
    title: "Estado de Cuenta - Rentas",
    text: "Consulta información tributaria y obligaciones."
  },
  {
    icon: "🌐",
    title: "Servicios Municipales",
    text: "Accede a los principales servicios digitales."
  },
  {
    icon: "💰",
    title: "Pagos en Línea",
    text: "Consulta y realiza tus pagos mediante canales digitales."
  },
  {
    icon: "📕",
    title: "Libro de Reclamaciones",
    text: "Registra y consulta tus reclamaciones."
  },
  {
    icon: "📢",
    title: "Denuncias",
    text: "Canal de atención para comunicaciones ciudadanas."
  }
];

const institutions = [
  "Centro de Convenciones Cusco",
  "Teatro Municipal Cusco",
  "Biblioteca Municipal Cusco",
  "Centro Médico Municipal",
  "OMAPED",
  "Parques y Jardines"
];

const procedures = [
  "Acceso a la Información",
  "Tributaciones",
  "Centro Médico Municipal",
  "Biblioteca Municipal",
  "Planes Urbanos",
  "PMI 2026 - 2028",
  "Audiencia Pública",
  "Plan de Drenaje Pluvial",
  "Servicio de Migraciones",
  "Notificación por Edicto",
  "Registro de Estado Civil",
  "Licencias y autorizaciones"
];

const news = [
  {
    date: "24 SEP",
    title: "Información y servicios para la ciudadanía",
    text: "Conoce las principales novedades, servicios y actividades de la Municipalidad de Cusco."
  },
  {
    date: "23 SEP",
    title: "Atención y orientación ciudadana",
    text: "Consulta los canales digitales disponibles para realizar tus trámites y consultas."
  },
  {
    date: "22 SEP",
    title: "Cusco, ciudad histórica y moderna",
    text: "Información institucional y contenidos de interés para la ciudadanía."
  }
];

export default function Home() {
  return (
    <main>

      {/* =========================
          CABECERA
      ========================== */}
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
        </nav>
      </header>


      {/* =========================
          PRESENTACIÓN
      ========================== */}
      <section
        style={{
          minHeight: "78vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #8f0928 0%, #b20f35 50%, #5d061b 100%)",
          color: "#fff",
          padding: "80px 24px"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,.12), transparent 42%)"
          }}
        />

        <div style={{ position: "relative", maxWidth: 850 }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              margin: "0 auto 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,.8)",
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: 4
            }}
          >
            MC
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 20,
              letterSpacing: 4,
              fontWeight: 700,
              textTransform: "uppercase"
            }}
          >
            Municipalidad Provincial del
          </p>

          <h1
            style={{
              margin: "10px 0 12px",
              fontSize: "clamp(54px, 9vw, 105px)",
              lineHeight: 0.95,
              letterSpacing: 8,
              fontWeight: 800
            }}
          >
            CUSCO
          </h1>

          <p
            style={{
              fontSize: "clamp(24px, 4vw, 42px)",
              margin: 0,
              fontWeight: 600,
              letterSpacing: 3
            }}
          >
            Qosqo Hatun Llaqta
          </p>

          <p
            style={{
              maxWidth: 650,
              margin: "30px auto 0",
              fontSize: 18,
              lineHeight: 1.7,
              opacity: 0.92
            }}
          >
            Plataforma digital de consulta y acceso a información
            municipal para la ciudadanía.
          </p>

          <Link
            href="/consulta"
            className="btn primary"
            style={{
              display: "inline-block",
              marginTop: 30,
              padding: "15px 32px"
            }}
          >
            INGRESAR A CONSULTA
          </Link>
        </div>
      </section>


      {/* =========================
          HERO PRINCIPAL
      ========================== */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">PORTAL MUNICIPAL</p>

          <h1>
            Consulta información municipal
            de manera rápida y ordenada.
          </h1>

          <p className="lead">
            Accede a la plataforma de consultas y encuentra
            información de manera sencilla desde cualquier dispositivo.
          </p>

          <div className="actions">
            <Link className="btn primary" href="/consulta">
              Ir a consulta
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-icon">✓</div>

          <h3>Consulta segura</h3>

          <p>
            Plataforma preparada para facilitar el acceso
            a la información pública disponible.
          </p>

          <div className="status">
            <i />
            Sistema operativo
          </div>
        </div>
      </section>


      {/* =========================
          ATENCIÓN AL CIUDADANO
      ========================== */}
      <section
        style={{
          padding: "90px 24px",
          background: "#fff"
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <p className="eyebrow">PRIMERA PLATAFORMA</p>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              marginBottom: 55
            }}
          >
            ATENCIÓN PARA EL CIUDADANO
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: 22
            }}
          >
            {services.map((service) => (
              <article
                key={service.title}
                style={{
                  background: "#faf5f6",
                  padding: "30px 20px",
                  minHeight: 190,
                  border: "1px solid #f0e2e5",
                  borderRadius: 8
                }}
              >
                <div style={{ fontSize: 42 }}>
                  {service.icon}
                </div>

                <h3 style={{ marginTop: 18 }}>
                  {service.title}
                </h3>

                <p className="muted">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* =========================
          CONSULTA DESTACADA
      ========================== */}
      <section
        style={{
          padding: "90px 24px",
          background:
            "linear-gradient(135deg, #f8f1f3, #ffffff)"
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 50,
            alignItems: "center"
          }}
        >
          <div>
            <p className="eyebrow">CONSULTA DIGITAL</p>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 52px)"
              }}
            >
              Consulta cuando quieras
            </h2>

            <p
              className="lead"
              style={{ marginTop: 20 }}
            >
              Ingresa al portal de consultas para realizar
              una búsqueda utilizando el código correspondiente.
            </p>

            <Link
              href="/consulta"
              className="btn primary"
              style={{
                display: "inline-block",
                marginTop: 20
              }}
            >
              REALIZAR CONSULTA
            </Link>
          </div>

          <div
            style={{
              minHeight: 300,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #7e0925, #b20d36)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              padding: 40,
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,.12)"
            }}
          >
            <div>
              <div style={{ fontSize: 60 }}>🔎</div>

              <h3
                style={{
                  color: "#fff",
                  fontSize: 30
                }}
              >
                Portal de Consultas
              </h3>

              <p style={{ opacity: 0.9 }}>
                Información rápida y ordenada.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================
          LOCALES INSTITUCIONALES
      ========================== */}
      <section
        style={{
          padding: "90px 24px",
          background: "#fff"
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <p className="eyebrow">
            SEGUNDA PLATAFORMA
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              marginBottom: 55
            }}
          >
            NUESTROS LOCALES INSTITUCIONALES
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 22
            }}
          >
            {institutions.map((institution, index) => (
              <article
                key={institution}
                style={{
                  background: "#faf5f6",
                  padding: "35px 20px",
                  borderRadius: 8,
                  border: "1px solid #eee"
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    margin: "0 auto 20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#8f0928",
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: 800
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>{institution}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* =========================
          TRÁMITES Y SERVICIOS
      ========================== */}
      <section
        style={{
          padding: "90px 24px",
          background: "#8f0928",
          color: "#fff"
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto"
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 50
            }}
          >
            <p
              className="eyebrow"
              style={{ color: "#fff" }}
            >
              SERVICIOS MUNICIPALES
            </p>

            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(32px, 5vw, 52px)"
              }}
            >
              TRÁMITES Y SERVICIOS
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14
            }}
          >
            {procedures.map((procedure) => (
              <div
                key={procedure}
                style={{
                  padding: "16px 18px",
                  borderBottom:
                    "1px solid rgba(255,255,255,.2)",
                  fontSize: 15
                }}
              >
                → {procedure}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================
          NOTICIAS
      ========================== */}
      <section
        style={{
          padding: "90px 24px",
          background: "#fff"
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto"
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 55
            }}
          >
            <p className="eyebrow">
              ÚLTIMA PUBLICACIÓN DE LA PÁGINA
            </p>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 52px)"
              }}
            >
              Noticias & Artículos
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 25
            }}
          >
            {news.map((item) => (
              <article
                key={item.title}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow:
                    "0 8px 30px rgba(0,0,0,.05)"
                }}
              >
                <div
                  style={{
                    height: 170,
                    background:
                      "linear-gradient(135deg, #8f0928, #c31943)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 42
                  }}
                >
                  📰
                </div>

                <div style={{ padding: 25 }}>
                  <small
                    style={{
                      fontWeight: 800,
                      color: "#8f0928"
                    }}
                  >
                    {item.date}
                  </small>

                  <h3 style={{ marginTop: 14 }}>
                    {item.title}
                  </h3>

                  <p className="muted">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* =========================
          LLAMADO A CONSULTA
      ========================== */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "#f7f7f7"
        }}
      >
        <p className="eyebrow">
          PLATAFORMA DIGITAL
        </p>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 52px)"
          }}
        >
          ¿Necesitas realizar una consulta?
        </h2>

        <p
          className="lead"
          style={{
            maxWidth: 700,
            margin: "20px auto"
          }}
        >
          Ingresa al portal de consultas y encuentra
          la información disponible.
        </p>

        <Link
          href="/consulta"
          className="btn primary"
          style={{
            display: "inline-block",
            marginTop: 15
          }}
        >
          INGRESAR A CONSULTA
        </Link>
      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer
        style={{
          background: "#071522",
          color: "#fff",
          padding: "65px 24px 30px"
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 45
          }}
        >
          <div>
            <h3 style={{ color: "#fff" }}>
              Municipalidad de Cusco
            </h3>

            <p
              style={{
                color: "#b9c2ca",
                lineHeight: 1.7
              }}
            >
              Portal demostrativo de consultas y
              servicios municipales.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#fff" }}>
              Explora
            </h3>

            <p>
              <Link href="/">
                Inicio
              </Link>
            </p>

            <p>
              <Link href="/consulta">
                Consulta
              </Link>
            </p>
          </div>

          <div>
            <h3 style={{ color: "#fff" }}>
              Atención
            </h3>

            <p
              style={{
                color: "#b9c2ca",
                lineHeight: 1.8
              }}
            >
              Información y servicios digitales
              para la ciudadanía.
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "45px auto 0",
            paddingTop: 25,
            borderTop:
              "1px solid rgba(255,255,255,.12)",
            textAlign: "center",
            color: "#8996a0",
            fontSize: 14
          }}
        >
          © 2026 Portal demostrativo — Municipalidad de Cusco
        </div>
      </footer>

    </main>
  );
}
