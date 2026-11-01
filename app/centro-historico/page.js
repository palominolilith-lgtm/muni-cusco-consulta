import Link from "next/link";

const requisitos = [
  {
    numero: "01",
    titulo: "Conformidad de obras y declaratoria de edificación",
    detalle:
      "Requisitos y procedimiento para la conformidad de obras y declaratoria de edificación sin variaciones, modalidad C.",
  },
  {
    numero: "02",
    titulo: "Procedimientos complementarios de edificación",
    detalle:
      "Consulta de anteproyecto en consulta para las modalidades C y D.",
  },
  {
    numero: "03",
    titulo: "Licencia de demolición",
    detalle:
      "Requisitos para obtener licencia de demolición parcial o total, modalidad C.",
  },
  {
    numero: "04",
    titulo: "Remodelación y ampliación",
    detalle:
      "Requisitos para solicitar licencias de remodelación y ampliación, modalidad C.",
  },
  {
    numero: "05",
    titulo: "Licencia de edificación nueva",
    detalle:
      "Requisitos para solicitar una licencia de edificación nueva, modalidad C.",
  },
];

const funciones = [
  "Emitir licencias de obras en el Centro Histórico de Cusco.",
  "Formular, conducir y evaluar el Plan Maestro del Centro Histórico.",
  "Evaluar proyectos mediante la comisión técnica correspondiente.",
  "Supervisar el cumplimiento de las normas para obras públicas y privadas.",
  "Promover la conservación de monumentos y edificios de valor cultural.",
  "Impulsar proyectos de recuperación y mejoramiento de espacios públicos.",
  "Proponer normas y medidas para proteger el patrimonio histórico.",
  "Promover acciones de revitalización, rehabilitación y renovación urbana.",
];

const proyectos = [
  {
    numero: "01",
    titulo: "Catalogación del Centro Histórico",
    detalle:
      "Registro y documentación de inmuebles y elementos de valor patrimonial para contribuir a su identificación, conocimiento y conservación.",
  },
  {
    numero: "02",
    titulo: "Gestión de riesgos",
    detalle:
      "Acciones orientadas a identificar y gestionar riesgos que puedan afectar el patrimonio y los espacios del Centro Histórico.",
  },
  {
    numero: "03",
    titulo: "Recuperación de la imagen urbana",
    detalle:
      "Acciones para mejorar la imagen de los espacios públicos y promover el ordenamiento de elementos visuales y señalización.",
  },
];

export default function CentroHistoricoPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#29251f]">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .ch-hero {
          background:
            radial-gradient(ellipse at 80% 20%, rgba(190,151,83,.28), transparent 35%),
            linear-gradient(120deg, #211b19 0%, #493027 48%, #211b19 100%);
        }
        .ch-gold { color: #c9a66b; }
        .ch-card {
          background: white;
          border: 1px solid #e9e1d4;
          border-radius: 18px;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .ch-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 35px rgba(44,32,22,.10);
        }
        .ch-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 13px 22px;
          font-weight: 700;
          transition: .2s ease;
        }
        .ch-button:hover { transform: translateY(-2px); }
        .ch-section { padding: 76px 22px; }
        .ch-container { width: min(1120px, 100%); margin: auto; }
        .ch-eyebrow {
          color: #a47c43;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .19em;
          text-transform: uppercase;
        }
        @media(max-width:640px) {
          .ch-section { padding: 55px 18px; }
        }
      `}</style>

      {/* BARRA SUPERIOR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#211b19]/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a66b] text-xl text-[#c9a66b]">
              ✦
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-wide">
                CENTRO HISTÓRICO
              </div>
              <div className="text-[10px] tracking-[.2em] text-[#c9a66b]">
                CUSCO · PATRIMONIO CULTURAL
              </div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
            <a href="#inicio" className="hover:text-[#d7b779]">INICIO</a>
            <a href="#gerencia" className="hover:text-[#d7b779]">GERENCIA</a>
            <a href="#proyectos" className="hover:text-[#d7b779]">PROYECTOS</a>
            <a href="#plan" className="hover:text-[#d7b779]">PLAN MAESTRO</a>
            <a href="#requisitos" className="hover:text-[#d7b779]">REQUISITOS</a>
            <a href="#contacto" className="hover:text-[#d7b779]">CONTACTO</a>
          </nav>
        </div>
      </header>

      {/* PRESENTACIÓN PRINCIPAL */}
      <section id="inicio" className="ch-hero relative overflow-hidden text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[430px] w-[430px] rounded-full border border-[#c9a66b]/20" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-[300px] w-[300px] rounded-full border border-[#c9a66b]/20" />
        <div className="pointer-events-none absolute bottom-[-170px] left-[35%] h-[350px] w-[350px] rounded-full border border-[#c9a66b]/15" />

        <div className="ch-container relative grid min-h-[570px] items-center gap-12 px-6 py-24 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[#c9a66b]/50 px-4 py-2 text-[11px] font-bold tracking-[.18em] text-[#e2c58f]">
              CUSCO · HISTORIA · CULTURA · PATRIMONIO
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[.25em] text-[#d9bd87]">
              Un legado que debemos conservar
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.12] md:text-6xl">
              CENTRO HISTÓRICO
              <span className="mt-2 block text-[#d5b477]">DEL CUSCO</span>
            </h1>

            <div className="my-7 h-[2px] w-24 bg-[#c9a66b]" />

            <p className="max-w-xl text-base leading-8 text-white/80 md:text-lg">
              Conoce la gestión, los proyectos, los procedimientos y las
              acciones orientadas a la protección, conservación y puesta en
              valor del patrimonio histórico y cultural de nuestra ciudad.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#gerencia"
                className="ch-button bg-[#c9a66b] text-[#211b19] hover:bg-[#e0c28c]"
              >
                CONOCER MÁS
              </a>
              <a
                href="#requisitos"
                className="ch-button border border-white/50 text-white hover:bg-white/10"
              >
                VER REQUISITOS
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="rounded-[28px] border border-[#c9a66b]/40 bg-white/[.06] p-5 shadow-2xl backdrop-blur-sm">
              <div className="rounded-[20px] border border-[#c9a66b]/30 px-6 py-12 text-center">
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#c9a66b] text-6xl text-[#d5b477]">
                  ✦
                </div>
                <p className="text-xs font-bold tracking-[.25em] text-[#d5b477]">
                  CIUDAD HISTÓRICA
                </p>
                <h2 className="mt-3 text-3xl font-black">CUSCO</h2>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Patrimonio, identidad y memoria de una ciudad milenaria.
                </p>
                <div className="mx-auto mt-7 h-px w-20 bg-[#c9a66b]" />
                <p className="mt-5 text-[10px] tracking-[.2em] text-[#d5b477]">
                  CONSERVAR PARA EL FUTURO
                </p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-white/45">
              Información institucional y cultural del Centro Histórico
            </p>
          </div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="ch-section">
        <div className="ch-container grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="ch-eyebrow">Nuestro patrimonio</p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              Una ciudad con historia que merece ser protegida
            </h2>
            <div className="my-6 h-1 w-16 bg-[#b48b50]" />
            <p className="leading-8 text-[#62594e]">
              El Centro Histórico del Cusco representa un espacio de enorme
              valor histórico, arquitectónico y cultural. Su conservación
              requiere planificación, regulación de las intervenciones,
              protección de los inmuebles patrimoniales y participación
              responsable de la ciudadanía.
            </p>
          </div>

          <div className="rounded-3xl bg-[#eee7db] p-8 md:p-10">
            <p className="ch-eyebrow">Compromiso</p>
            <h3 className="mt-4 text-2xl font-extrabold">
              Proteger nuestra identidad
            </h3>
            <p className="mt-4 leading-7 text-[#62594e]">
              La gestión del Centro Histórico busca promover un desarrollo
              urbano compatible con la conservación del patrimonio cultural,
              respetando sus características históricas y arquitectónicas.
            </p>
          </div>
        </div>
      </section>

      {/* GERENCIA */}
      <section id="gerencia" className="ch-section bg-white">
        <div className="ch-container">
          <div className="max-w-3xl">
            <p className="ch-eyebrow">Gestión institucional</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Gerencia del Centro Histórico
            </h2>
            <p className="mt-5 leading-8 text-[#62594e]">
              La Gerencia del Centro Histórico tiene como ámbito de trabajo
              la gestión, conservación y protección del Centro Histórico y
              de las áreas históricas de Cusco, mediante la formulación y
              ejecución de planes, proyectos y acciones vinculados con las
              políticas municipales y la conservación del patrimonio
              cultural y natural.
            </p>
          </div>

          <h3 className="mb-6 mt-12 text-xl font-extrabold">
            Principales funciones
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {funciones.map((funcion, index) => (
              <article className="ch-card p-6" key={funcion}>
                <div className="mb-4 text-2xl font-black text-[#b48b50]">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-[#5e554b]">
                  {funcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="ch-section bg-[#f0ece4]">
        <div className="ch-container">
          <p className="ch-eyebrow">Trabajo y conservación</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Proyectos y acciones
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-[#62594e]">
            Conoce algunas de las líneas de trabajo orientadas a la
            protección del patrimonio, la gestión del territorio y la
            recuperación de la imagen urbana.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {proyectos.map((proyecto) => (
              <article className="ch-card overflow-hidden" key={proyecto.numero}>
                <div className="bg-[#33251f] px-7 py-8 text-[#d5b477]">
                  <span className="text-4xl font-black">{proyecto.numero}</span>
                  <div className="mt-4 h-px w-14 bg-[#c9a66b]" />
                  <h3 className="mt-4 text-xl font-extrabold text-white">
                    {proyecto.titulo}
                  </h3>
                </div>
                <p className="p-7 text-sm leading-7 text-[#62594e]">
                  {proyecto.detalle}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN MAESTRO */}
      <section id="plan" className="ch-section bg-[#29211d] text-white">
        <div className="ch-container grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="ch-eyebrow !text-[#d5b477]">Planificación urbana</p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Plan Maestro del Centro Histórico del Cusco
            </h2>
            <p className="mt-6 max-w-3xl leading-8 text-white/70">
              El Plan Maestro establece lineamientos de planificación y
              gestión para orientar la conservación, protección y desarrollo
              del Centro Histórico. La documentación publicada por la
              institución incluye el Plan Maestro del Centro Histórico
              2018–2028 y sus respectivos tomos.
            </p>
          </div>

          <div className="rounded-3xl border border-[#c9a66b]/40 bg-white/[.06] p-8 text-center">
            <div className="text-5xl font-black text-[#d5b477]">2018</div>
            <div className="my-2 text-sm tracking-[.2em] text-white/60">
              PLAN MAESTRO
            </div>
            <div className="text-5xl font-black text-[#d5b477]">2028</div>
            <a
              href="https://centrohistorico.cusco.gob.pe/"
              target="_blank"
              rel="noreferrer"
              className="ch-button mt-7 bg-[#c9a66b] text-[#211b19]"
            >
              CONSULTAR DOCUMENTOS
            </a>
          </div>
        </div>
      </section>

      {/* REQUISITOS */}
      <section id="requisitos" className="ch-section">
        <div className="ch-container">
          <p className="ch-eyebrow">Trámites y procedimientos</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Requisitos y licencias
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#62594e]">
            Consulta las categorías de procedimientos y requisitos publicados
            para trámites relacionados con obras, edificaciones y otras
            intervenciones en el ámbito del Centro Histórico.
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {requisitos.map((item) => (
              <article className="ch-card flex gap-5 p-6" key={item.numero}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eee7db] font-black text-[#a47c43]">
                  {item.numero}
                </div>
                <div>
                  <h3 className="font-extrabold">{item.titulo}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6b6258]">
                    {item.detalle}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-9 rounded-2xl border border-[#e4d7c3] bg-[#f0ece4] p-7">
            <h3 className="text-lg font-extrabold">
              Consulta la información oficial de requisitos
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#62594e]">
              Para revisar los documentos, condiciones y detalles vigentes
              de cada procedimiento, consulta directamente la página de
              requisitos de la institución.
            </p>
            <a
              href="https://centrohistorico.cusco.gob.pe/requisitos/"
              target="_blank"
              rel="noreferrer"
              className="ch-button mt-5 bg-[#33251f] text-white hover:bg-[#574033]"
            >
              VER REQUISITOS OFICIALES ↗
            </a>
          </div>
        </div>
      </section>

      {/* GUÍA DE INTERVENCIÓN */}
      <section className="ch-section bg-white">
        <div className="ch-container grid gap-8 md:grid-cols-2">
          <div>
            <p className="ch-eyebrow">Conservación del patrimonio</p>
            <h2 className="mt-3 text-3xl font-black">
              Guía de intervención en inmuebles del Centro Histórico
            </h2>
          </div>
          <div>
            <p className="leading-8 text-[#62594e]">
              La guía de intervención reúne orientaciones y buenas prácticas
              dirigidas a profesionales, técnicos y ciudadanos para realizar
              intervenciones adecuadas en los inmuebles del Centro Histórico
              y contribuir a reducir los riesgos que puedan afectar el
              patrimonio.
            </p>
            <a
              href="https://centrohistorico.cusco.gob.pe/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block font-bold text-[#a47c43] underline underline-offset-4"
            >
              Consultar publicaciones institucionales ↗
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="ch-section bg-[#eee7db]">
        <div className="ch-container">
          <div className="text-center">
            <p className="ch-eyebrow">Información y atención</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Contacto institucional
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#62594e]">
              Para consultas y orientación, utiliza los canales de contacto
              publicados por la institución.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
            <div className="ch-card p-7 text-center">
              <div className="text-3xl text-[#a47c43]">⌖</div>
              <h3 className="mt-4 font-extrabold">Dirección</h3>
              <p className="mt-2 text-sm leading-6 text-[#62594e]">
                Calle Pumakurko 470
                <br />
                Cusco - Perú
              </p>
            </div>

            <div className="ch-card p-7 text-center">
              <div className="text-3xl text-[#a47c43]">☎</div>
              <h3 className="mt-4 font-extrabold">Teléfono</h3>
              <p className="mt-2 text-sm text-[#62594e]">
                (084) 222300
              </p>
            </div>

            <div className="ch-card p-7 text-center">
              <div className="text-3xl text-[#a47c43]">✉</div>
              <h3 className="mt-4 font-extrabold">Correo electrónico</h3>
              <p className="mt-2 break-all text-sm text-[#62594e]">
                centro.historico@cusco.gob.pe
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://centrohistorico.cusco.gob.pe/"
              target="_blank"
              rel="noreferrer"
              className="ch-button bg-[#33251f] text-white"
            >
              VISITAR SITIO INSTITUCIONAL ↗
            </a>
          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#211b19] px-6 py-9 text-center text-white">
        <div className="text-sm font-extrabold tracking-[.15em]">
          CENTRO HISTÓRICO DEL CUSCO
        </div>
        <p className="mt-3 text-xs leading-6 text-white/55">
          Información de carácter referencial basada en publicaciones
          institucionales disponibles públicamente.
        </p>
        <p className="mt-2 text-xs text-white/40">
          Esta página es informativa y no constituye por sí misma un portal
          oficial ni reemplaza los canales de atención institucionales.
        </p>
        <Link href="/" className="mt-5 inline-block text-sm text-[#d5b477]">
          ← VOLVER AL PORTAL PRINCIPAL
        </Link>
      </footer>
    </main>
  );
}
