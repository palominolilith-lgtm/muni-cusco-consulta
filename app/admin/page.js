"use client";

import { useEffect, useState } from "react";

const empty = {
  codigo: "",
  apellidos: "",
  nombres: "",
  tipo_documento: "DNI",
  numero_documento: "",
  codigo_licencia: "",
  clase_categoria: "",
  fecha_expedicion: "",
  fecha_vencimiento: "",
  fecha_revalidacion: "",
  tipo: "Licencia",
  estado: "Activo",
  fecha: ""
};

export default function Admin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  async function load() {
    try {
      setError("");

      const r = await fetch("/api/registros", {
        cache: "no-store"
      });

      const data = await r.json();

      if (!r.ok || !data.ok) {
        throw new Error(
          data.message || "No se pudieron cargar los registros."
        );
      }

      setItems(
        Array.isArray(data.registros)
          ? data.registros
          : []
      );
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Error al cargar los registros."
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  async function save(e) {
    e.preventDefault();

    try {
      setError("");

      const nombreCompleto =
        `${form.apellidos} ${form.nombres}`.trim();

      const nombreSistema =
        nombreCompleto || "SIN NOMBRE";

      const payload = {
        ...form,
        nombre: nombreSistema
      };

      const method = editing ? "PUT" : "POST";

      const url = editing
        ? `/api/registros/${editing}`
        : "/api/registros";

      const r = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await r.json();

      if (!r.ok || !data.ok) {
        throw new Error(
          data.message || "No se pudo guardar el registro."
        );
      }

      setForm(empty);
      setEditing(null);

      await load();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Error al guardar."
      );
    }
  }

  async function remove(id) {
    if (!confirm("¿Eliminar este registro?")) {
      return;
    }

    try {
      setError("");

      const r = await fetch(
        `/api/registros/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await r.json();

      if (!r.ok || !data.ok) {
        throw new Error(
          data.message || "No se pudo eliminar el registro."
        );
      }

      await load();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Error al eliminar."
      );
    }
  }

  function edit(x) {
    setEditing(x.id);

    setForm({
      codigo: x.codigo || "",
      apellidos: x.apellidos || "",
      nombres: x.nombres || "",
      tipo_documento:
        x.tipo_documento ||
        (x.dni ? "DNI" : x.ce ? "CE" : "DNI"),
      numero_documento:
        x.numero_documento ||
        x.dni ||
        x.ce ||
        "",
      codigo_licencia:
        x.codigo_licencia || "",
      clase_categoria:
        x.clase_categoria || "",
      fecha_expedicion:
        x.fecha_expedicion
          ? String(x.fecha_expedicion).slice(0, 10)
          : "",
      fecha_vencimiento:
        x.fecha_vencimiento
          ? String(x.fecha_vencimiento).slice(0, 10)
          : "",
      fecha_revalidacion:
        x.fecha_revalidacion
          ? String(x.fecha_revalidacion).slice(0, 10)
          : "",
      tipo: x.tipo || "Licencia",
      estado: x.estado || "Activo",
      fecha: x.fecha
        ? String(x.fecha).slice(0, 10)
        : ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function cancelEdit() {
    setEditing(null);
    setForm(empty);
    setError("");
  }

  async function logout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setError("");

      const r = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          cache: "no-store"
        }
      );

      if (!r.ok) {
        throw new Error(
          "No se pudo cerrar la sesión."
        );
      }

      window.location.replace(
        "/admin/login"
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "No se pudo cerrar la sesión."
      );

      setLoggingOut(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="seal">
            MC
          </div>

          <div>
            <strong>
              Municipalidad de Cusco
            </strong>

            <span>
              Administración
            </span>
          </div>
        </div>

        <nav>
          <a href="/">
            Inicio
          </a>

          <a href="/consulta">
            Consulta
          </a>

          <button
            type="button"
            className="link danger"
            onClick={logout}
            disabled={loggingOut}
            style={{
              marginLeft: 12,
              cursor: loggingOut
                ? "wait"
                : "pointer"
            }}
          >
            {loggingOut
              ? "Cerrando..."
              : "Cerrar sesión"}
          </button>
        </nav>
      </header>

      <section className="page wide">
        <p className="eyebrow">
          ADMINISTRACIÓN
        </p>

        <h1>
          Panel de registros
        </h1>

        <p className="muted">
          Gestión de licencias y registros
          disponibles para consulta.
        </p>

        {error && (
          <div
            className="notice"
            style={{
              borderLeft:
                "4px solid #c62828",
              marginBottom: "20px"
            }}
          >
            <b>Error:</b> {error}
          </div>
        )}

        <form
          className="admin-form"
          onSubmit={save}
        >
          <input
            required
            placeholder="Código de registro / ficha"
            value={form.codigo}
            onChange={(e) =>
              updateField(
                "codigo",
                e.target.value
              )
            }
          />

          <input
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={(e) =>
              updateField(
                "apellidos",
                e.target.value
              )
            }
          />

          <input
            placeholder="Nombres"
            value={form.nombres}
            onChange={(e) =>
              updateField(
                "nombres",
                e.target.value
              )
            }
          />

          <select
            value={form.tipo_documento}
            onChange={(e) =>
              updateField(
                "tipo_documento",
                e.target.value
              )
            }
          >
            <option value="DNI">
              DNI
            </option>

            <option value="CE">
              CARNÉ DE EXTRANJERÍA
            </option>
          </select>

          <input
            placeholder="Número de documento"
            value={form.numero_documento}
            onChange={(e) =>
              updateField(
                "numero_documento",
                e.target.value
              )
            }
          />

          <input
            placeholder="Número de licencia"
            value={form.codigo_licencia}
            onChange={(e) =>
              updateField(
                "codigo_licencia",
                e.target.value
              )
            }
          />

          <input
            placeholder="Clase / Categoría"
            value={form.clase_categoria}
            onChange={(e) =>
              updateField(
                "clase_categoria",
                e.target.value
              )
            }
          />

          <label>
            Fecha de expedición
            <input
              type="date"
              value={form.fecha_expedicion}
              onChange={(e) =>
                updateField(
                  "fecha_expedicion",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Fecha de vencimiento
            <input
              type="date"
              value={form.fecha_vencimiento}
              onChange={(e) =>
                updateField(
                  "fecha_vencimiento",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Fecha de revalidación
            <input
              type="date"
              value={form.fecha_revalidacion}
              onChange={(e) =>
                updateField(
                  "fecha_revalidacion",
                  e.target.value
                )
              }
            />
          </label>

          <select
            value={form.tipo}
            onChange={(e) =>
              updateField(
                "tipo",
                e.target.value
              )
            }
          >
            <option value="Licencia">
              Licencia
            </option>

            <option value="Permiso">
              Permiso
            </option>

            <option value="Registro">
              Registro
            </option>
          </select>

          <select
            value={form.estado}
            onChange={(e) =>
              updateField(
                "estado",
                e.target.value
              )
            }
          >
            <option value="Activo">
              Activo
            </option>

            <option value="Observado">
              Observado
            </option>

            <option value="Vencido">
              Vencido
            </option>
          </select>

          <button
            className="btn primary"
            type="submit"
          >
            {editing
              ? "Guardar cambios"
              : "Agregar registro"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn secondary"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          )}
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ficha</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Documento</th>
                <th>N.º Documento</th>
                <th>Licencia</th>
                <th>Clase / Categoría</th>
                <th>Expedición</th>
                <th>Vencimiento</th>
                <th>Revalidación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="12">
                    No hay registros todavía.
                  </td>
                </tr>
              ) : (
                items.map((x) => (
                  <tr key={x.id}>
                    <td>
                      <b>
                        {x.codigo}
                      </b>
                    </td>

                    <td>
                      {x.apellidos || "—"}
                    </td>

                    <td>
                      {x.nombres || x.nombre || "—"}
                    </td>

                    <td>
                      {x.tipo_documento || "—"}
                    </td>

                    <td>
                      {x.numero_documento ||
                        x.dni ||
                        x.ce ||
                        "—"}
                    </td>

                    <td>
                      {x.codigo_licencia || "—"}
                    </td>

                    <td>
                      {x.clase_categoria || "—"}
                    </td>

                    <td>
                      {x.fecha_expedicion
                        ? String(
                            x.fecha_expedicion
                          ).slice(0, 10)
                        : "—"}
                    </td>

                    <td>
                      {x.fecha_vencimiento
                        ? String(
                            x.fecha_vencimiento
                          ).slice(0, 10)
                        : "—"}
                    </td>

                    <td>
                      {x.fecha_revalidacion
                        ? String(
                            x.fecha_revalidacion
                          ).slice(0, 10)
                        : "—"}
                    </td>

                    <td>
                      {x.estado}
                    </td>

                    <td>
                      <button
                        className="link"
                        onClick={() =>
                          edit(x)
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="link danger"
                        onClick={() =>
                          remove(x.id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        Portal demostrativo — Municipalidad
        de Cusco
      </footer>
    </main>
  );
}
