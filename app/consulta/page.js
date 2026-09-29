"use client";

import { useState } from "react";

const tipos = [
  {
    id: "codigo",
    titulo: "Código de registro",
    descripcion: "Consulta por ficha"
  },
  {
    id: "dni",
    titulo: "DNI",
    descripcion: "Consulta disponible"
  },
  {
    id: "ce",
    titulo: "CE / Carné de extranjería",
    descripcion: "Consulta disponible"
  },
  {
    id: "licencia",
    titulo: "Licencia",
    descripcion: "Consulta disponible"
  }
];

const textos = {
  codigo: {
    label: "Código de registro / ficha",
    placeholder: "Ejemplo: 101010",
    ayuda: "Ingresa el código de registro proporcionado."
  },
  dni: {
    label: "Número de DNI",
    placeholder: "Ejemplo: 40507828",
    ayuda: "Ingresa el número de DNI."
  },
  ce: {
    label: "Número de carné de extranjería",
    placeholder: "Ejemplo: 006310958",
    ayuda: "Ingresa el número de tu carné de extranjería."
  },
  licencia: {
    label: "Número de licencia",
    placeholder: "Ejemplo: Q-006310958",
    ayuda: "Ingresa el número de licencia."
  }
};

function formatDate(value) {
  if (!value) return "—";

  const date = String(value).slice(0, 10);

  const parts = date.split("-");

  if (parts.length !== 3) {
    return date;
  }

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getLicenseStatus(registro) {
  const estado = String(registro?.estado ?? "").trim().toLowerCase();
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

  const estadoActivo =
    estado === "activo" ||
    estado === "activa" ||
    estado === "vigente" ||
    estado === "valid" ||
    estado === "válido" ||
    estado === "valido";

  const vigente = Boolean(licencia) && estadoActivo && !vencida;

  if (vigente) {
    return {
      vigente: true,
      etiqueta: "Activo",
      titulo: "Licencia vigente",
      mensaje:
        "La licencia se encuentra activa y vigente.",
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
      setError(
        "Ingresa el dato que deseas consultar."
      );
      setRegistro(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRegistro(null);

      const params = new URLSearchParams({
        tipo,
        q: dato
      });

      const response = await fetch(
        `/api/consulta?${params.toString()}`,
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.message ||
            "No se encontró información."
        );
      }

      setRegistro(data.registro);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "No se pudo realizar la consulta."
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

  const apellidos =
    registro?.apellidos ||
    "—";

  const nombres =
    registro?.nombres ||
    registro?.nombre ||
    "—";

  const estadoLicencia = getLicenseStatus(registro);

  return (
    <main className="consulta-page">
      <section className="hero">
        <div className="seal">
          <img
            src="/escudo-cusco.png"
            alt="Escudo de Cusco"
          />
        </div>

        <p className="institution">
          MUNICIPALIDAD PROVINCIAL DEL CUSCO
        </p>

        <h1>
          Portal de Consultas
        </h1>

        <p className="hero-text">
          Plataforma de consulta de información
          y registros municipales. Selecciona
          el tipo de consulta e ingresa el dato
          solicitado.
        </p>
      </section>

      <section className="main-card">
        <div className="heading">
          <div className="search-icon">
            ⌕
          </div>

          <div>
            <span>
              SERVICIO EN LÍNEA
            </span>

            <h2>
              Consulta de registros
            </h2>
          </div>
        </div>

        <p className="intro">
          Selecciona una modalidad de búsqueda
          para consultar la información disponible
          en el sistema.
        </p>

        <div className="type-grid">
          {tipos.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`type-card ${
                tipo === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                cambiarTipo(item.id)
              }
            >
              <div className="type-icon">
                {item.id === "dni"
                  ? "▤"
                  : item.id === "ce"
                  ? "▤"
                  : item.id === "licencia"
                  ? "▥"
                  : "▣"}
              </div>

              <strong>
                {item.titulo}
              </strong>

              <small>
                {item.descripcion}
              </small>
            </button>
          ))}
        </div>

        <form
          className="search-box"
          onSubmit={consultar}
        >
          <label>
            {textos[tipo].label}
          </label>

          <div className="search-row">
            <div className="input-wrap">
              <span>
                ⌕
              </span>

              <input
                value={valor}
                onChange={(e) =>
                  setValor(e.target.value)
                }
                placeholder={
                  textos[tipo].placeholder
                }
                autoComplete="off"
              />
            </div>

            <button
              className="search-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Consultando..."
                : "Consultar  →"}
            </button>
          </div>

          <small>
            {textos[tipo].ayuda}
          </small>
        </form>

        {error && (
          <div className="error-box">
            <div className="error-icon">
              !
            </div>

            <div>
              <strong>
                No se encontró información
              </strong>

              <p>
                {error}
              </p>
            </div>
          </div>
        )}

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
                  <span>
                    CONSULTA DE LICENCIA
                  </span>

                  <h3>
                    Resultado de consulta
                  </h3>
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
                  {estadoLicencia.vigente
                    ? "✓"
                    : "✕"}
                </i>
                {estadoLicencia.etiqueta}
              </div>
            </div>

            <div className="holder">
              <span>
                INFORMACIÓN DEL TITULAR
              </span>

              <h4>
                {apellidos !== "—"
                  ? apellidos
                  : nombres}
              </h4>

              {apellidos !== "—" &&
                registro.nombres && (
                  <p>
                    {registro.nombres}
                  </p>
                )}
            </div>

            <div className="data-grid">
              <div className="data-item">
                <span>
                  TIPO DE DOCUMENTO
                </span>

                <strong>
                  {tipoDocumento}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  NÚMERO DE DOCUMENTO
                </span>

                <strong>
                  {numeroDocumento}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  TIPO DE REGISTRO
                </span>

                <strong>
                  {registro.tipo ||
                    "LICENCIA"}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  NÚMERO DE LICENCIA
                </span>

                <strong>
                  {registro.codigo_licencia ||
                    "—"}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  CLASE / CATEGORÍA
                </span>

                <strong>
                  {registro.clase_categoria ||
                    "—"}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  FICHA / CÓDIGO DE REGISTRO
                </span>

                <strong>
                  {registro.codigo ||
                    "—"}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  FECHA DE EXPEDICIÓN
                </span>

                <strong>
                  {formatDate(
                    registro.fecha_expedicion
                  )}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  FECHA DE VENCIMIENTO
                </span>

                <strong>
                  {formatDate(
                    registro.fecha_vencimiento
                  )}
                </strong>
              </div>

              <div className="data-item">
                <span>
                  FECHA DE REVALIDACIÓN
                </span>

                <strong>
                  {formatDate(
                    registro.fecha_revalidacion
                  )}
                </strong>
              </div>
            </div>

            <div className="result-footer">
              <div>
                <span>
                  ESTADO DE LA LICENCIA
                </span>

                <strong
                  className={
                    estadoLicencia.vigente
                      ? "footer-valid"
                      : "footer-invalid"
                  }
                >
                  <i>
                    {estadoLicencia.vigente
                      ? "✓"
                      : "✕"}
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

      <section className="bottom-section">
        <span>
          SERVICIOS DIGITALES
        </span>

        <h2>
          Realiza tus consultas de manera sencilla
        </h2>

        <p>
          Accede a los servicios disponibles
          desde cualquier dispositivo.
        </p>

        <div className="bottom-cards">
          <div>
            <b>⌕</b>
            <strong>
              Consulta en línea
            </strong>
            <p>
              Realiza consultas rápidamente.
            </p>
          </div>

          <div>
            <b>✓</b>
            <strong>
              Información disponible
            </strong>
            <p>
              Consulta los registros disponibles.
            </p>
          </div>

          <div>
            <b>◷</b>
            <strong>
              Atención digital
            </strong>
            <p>
              Servicio disponible desde cualquier
              dispositivo.
            </p>
          </div>
        </div>
      </section>
      <style jsx>{`
              .consulta-page {
          min-height: 100vh;
          background: #f5f2ee;
          color: #351717;
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          grid-template-areas:
            "seal institution"
            "title text";
          align-items: center;
          column-gap: clamp(35px, 6vw, 90px);
          row-gap: 18px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 210, 100, 0.1),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #741016,
              #4f080d
            );

          color: white;
          text-align: left;
          padding: 42px clamp(24px, 7vw, 90px) 105px;
        }

        .seal,
        .mini-seal {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #d9ad4a;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .seal {
          grid-area: seal;
          width: clamp(100px, 8vw, 124px);
          height: clamp(100px, 8vw, 124px);
          margin: 0;
          justify-self: start;
          border-width: 3px;
          box-shadow:
            0 0 0 8px rgba(217, 173, 74, 0.08),
            0 14px 35px rgba(0, 0, 0, 0.18);
        }

        .seal img,
        .mini-seal img {
          width: 88%;
          height: 88%;
          object-fit: contain;
          display: block;
        }

        .institution {
          grid-area: institution;
          justify-self: end;
          max-width: 480px;
          color: #e5ba58;
          font-size: clamp(14px, 1.2vw, 18px);
          font-weight: 900;
          letter-spacing: clamp(3px, 0.45vw, 6px);
          line-height: 1.45;
          text-align: right;
          margin: 0;
          text-transform: uppercase;
        }

        .hero h1 {
          grid-area: title;
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(42px, 6vw, 68px);
          line-height: 1;
        }

        .hero-text {
          grid-area: text;
          max-width: 560px;
          justify-self: end;
          margin: 0;
          line-height: 1.75;
          font-size: clamp(14px, 1.15vw, 17px);
          color: rgba(255, 255, 255, 0.9);
          text-align: right;
        }

        .main-card {
          width: min(920px, calc(100% - 28px));
          margin: -48px auto 0;
          position: relative;
          background: white;
          border-radius: 18px;
          padding: 34px;
          box-shadow:
            0 25px 60px rgba(58, 30, 20, 0.12);
        }

        .heading {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-icon {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #f8eeea;
          color: #870f17;
          font-size: 27px;
        }

        .heading span,
        .holder > span,
        .result-brand span,
        .bottom-section > span {
          color: #b27b19;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .heading h2 {
          margin: 3px 0 0;
          font-family: Georgia, serif;
          font-size: 30px;
        }

        .intro {
          color: #756b66;
          margin: 22px 0;
          font-size: 14px;
        }

        .type-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 10px;
        }

        .type-card {
          border: 1px solid #eadfd9;
          background: #fffdfc;
          border-radius: 12px;
          padding: 17px 14px;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
          color: #351717;
        }

        .type-card:hover {
          transform: translateY(-2px);
          border-color: #b72029;
        }

        .type-card.active {
          border-color: #b72029;
          background: #fff8f5;
          box-shadow:
            inset 0 0 0 1px #b72029;
        }

        .type-icon {
          color: #900f17;
          font-size: 18px;
          margin-bottom: 11px;
        }

        .type-card strong {
          display: block;
          font-size: 13px;
        }

        .type-card small {
          display: block;
          color: #9a8c86;
          font-size: 10px;
          margin-top: 5px;
        }

        .search-box {
          background: #faf7f4;
          border: 1px solid #eadfd9;
          border-radius: 14px;
          padding: 20px;
          margin-top: 22px;
        }

        .search-box label {
          display: block;
          font-weight: 800;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .search-row {
          display: grid;
          grid-template-columns: 1fr 145px;
          gap: 10px;
        }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid #dfd3ce;
          border-radius: 10px;
          padding: 0 14px;
        }

        .input-wrap span {
          color: #8b151c;
        }

        .input-wrap input {
          width: 100%;
          border: 0;
          outline: 0;
          padding: 15px 0;
          background: transparent;
          font-size: 14px;
        }

        .search-button {
          border: 0;
          border-radius: 10px;
          background: #830f16;
          color: white;
          font-weight: 900;
          cursor: pointer;
          box-shadow:
            0 8px 18px rgba(112, 10, 20, 0.18);
        }

        .search-button:disabled {
          opacity: 0.65;
          cursor: wait;
        }

        .search-box > small {
          display: block;
          margin-top: 9px;
          color: #998c86;
          font-size: 10px;
        }

        .error-box {
          display: flex;
          gap: 14px;
          margin-top: 20px;
          padding: 18px;
          border: 1px solid #efcccc;
          background: #fff7f7;
          border-radius: 12px;
          color: #7e1717;
        }

        .error-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #b42020;
          color: white;
          display: grid;
          place-items: center;
          font-weight: 900;
        }

        .error-box p {
          margin: 5px 0 0;
          font-size: 12px;
        }

        .license-result {
          margin-top: 24px;
          border: 1px solid #e5d8d2;
          border-radius: 17px;
          overflow: hidden;
          box-shadow:
            0 15px 35px rgba(65, 31, 20, 0.08);
        }

        .result-header {
          background:
            linear-gradient(
              135deg,
              #870f17,
              #650a10
            );
          color: white;
          padding: 22px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .result-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mini-seal {
          width: 48px;
          height: 48px;
        }

        .mini-seal img {
          width: 82%;
          height: 82%;
        }

        .result-brand span {
          color: #e8c36c;
          font-size: 9px;
        }

        .result-brand h3 {
          margin: 4px 0 0;
          font-family: Georgia, serif;
          font-size: 25px;
        }

        .status {
          border-radius: 30px;
          padding: 9px 15px;
          font-weight: 800;
          font-size: 12px;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .status-valid {
          border: 1px solid rgba(86, 211, 116, 0.45);
          background: rgba(42, 145, 67, 0.2);
          color: #dfffe7;
        }

        .status-invalid {
          border: 1px solid rgba(255, 126, 116, 0.5);
          background: rgba(190, 45, 38, 0.22);
          color: #ffe4e1;
        }

        .status i,
        .result-footer strong i {
          display: inline-grid;
          place-items: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin: 0;
          font-style: normal;
          font-size: 11px;
          font-weight: 900;
        }

        .status-valid i,
        .footer-valid i {
          background: #2e9d4d;
          color: white;
        }

        .status-invalid i,
        .footer-invalid i {
          background: #c9372c;
          color: white;
        }

        .holder {
          padding: 23px 27px;
          border-bottom: 1px solid #eee5e0;
        }

        .holder h4 {
          margin: 8px 0 0;
          font-size: 24px;
          letter-spacing: 0.5px;
        }

        .holder p {
          margin: 4px 0 0;
          font-size: 16px;
          font-weight: 700;
          color: #5f4b45;
        }

        .data-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
        }

        .data-item {
          padding: 20px 27px;
          border-bottom: 1px solid #eee5e0;
        }

        .data-item:nth-child(odd) {
          border-right: 1px solid #eee5e0;
        }

        .data-item span,
        .result-footer span {
          display: block;
          color: #927f77;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;
          margin-bottom: 7px;
        }

        .data-item strong {
          font-size: 14px;
          color: #38221d;
        }

        .result-footer {
          padding: 17px 27px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .info-box {
          display: flex;
          gap: 13px;
          margin-top: 22px;
          padding: 17px;
          background: #f7f4f1;
          border: 1px solid #e4dcd6;
          border-radius: 12px;
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
          border-radius: 50%;
          background: #8c7d74;
          color: white;
          font-weight: 900;
          font-size: 13px;
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
          color: #6f655f;
          font-size: 10px;
          margin: 5px 0 0;
          line-height: 1.5;
        }

        .info-box.info-valid p {
          color: #3e7650;
        }

        .info-box.info-invalid p {
          color: #8e514c;
        }

        .bottom-section {
          text-align: center;
          padding: 70px 20px;
          background: #eee9e3;
          margin-top: 70px;
        }

        .bottom-section h2 {
          font-family: Georgia, serif;
          font-size: 30px;
          margin: 10px 0;
        }

        .bottom-section > p {
          color: #81756e;
          font-size: 13px;
        }

        .bottom-cards {
          width: min(850px, 100%);
          margin: 28px auto 0;
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 14px;
          text-align: left;
        }

        .bottom-cards > div {
          background: white;
          border: 1px solid #e5dbd4;
          border-radius: 14px;
          padding: 22px;
        }

        .bottom-cards b {
          display: block;
          color: #8a1118;
          margin-bottom: 15px;
          font-size: 20px;
        }

        .bottom-cards strong {
          display: block;
          font-size: 13px;
        }

        .bottom-cards p {
          color: #8b8079;
          font-size: 11px;
          line-height: 1.5;
        }

        @media (max-width: 850px) {
          .hero {
            grid-template-columns: 1fr;
            grid-template-areas:
              "seal"
              "institution"
              "title"
              "text";
            justify-items: center;
            text-align: center;
            padding: 34px 22px 85px;
            row-gap: 14px;
          }

          .seal {
            width: 96px;
            height: 96px;
            justify-self: center;
            margin: 0 auto 4px;
          }

          .institution {
            justify-self: center;
            max-width: 650px;
            text-align: center;
            font-size: 13px;
            letter-spacing: 3px;
            line-height: 1.5;
          }

          .hero h1 {
            text-align: center;
            font-size: clamp(38px, 9vw, 52px);
            line-height: 1.05;
          }

          .hero-text {
            justify-self: center;
            max-width: 620px;
            text-align: center;
            font-size: 14px;
            line-height: 1.65;
          }

          .main-card {
            padding: 20px;
          }

          .type-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .search-row {
            grid-template-columns: 1fr;
          }

          .search-button {
            min-height: 48px;
          }

          .data-grid {
            grid-template-columns: 1fr;
          }

          .data-item:nth-child(odd) {
            border-right: 0;
          }

          .result-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .result-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .bottom-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 28px 18px 75px;
            row-gap: 12px;
          }

          .seal {
            width: 86px;
            height: 86px;
          }

          .institution {
            font-size: 11px;
            letter-spacing: 2.2px;
          }

          .hero h1 {
            font-size: 38px;
          }

          .hero-text {
            font-size: 13px;
          }

          .main-card {
            width: calc(100% - 18px);
            padding: 16px;
          }

          .type-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
