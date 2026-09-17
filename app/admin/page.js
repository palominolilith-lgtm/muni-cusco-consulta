"use client";

import { useEffect, useState } from "react";

const empty = {
  codigo: "",
  nombre: "",
  tipo: "Licencia",
  estado: "Activo",
  fecha: ""
};

export default function Admin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

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

      setItems(Array.isArray(data.registros) ? data.registros : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al cargar los registros.");
      setItems([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e) {
    e.preventDefault();

    try {
      setError("");

      const method = editing ? "PUT" : "POST";
      const url = editing
        ? `/api/registros/${editing}`
        : "/api/registros";

      const r = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
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
      setError(err.message || "Error al guardar.");
    }
  }

  async function remove(id) {
    if (!confirm("¿Eliminar este registro?")) return;

    try {
      setError("");

      const r = await fetch(`/api/registros/${id}`, {
        method: "DELETE"
      });

      const data = await r.json();

      if (!r.ok || !data.ok) {
        throw new Error(
          data.message || "No se pudo eliminar el registro."
        );
      }

      await load();
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al eliminar.");
    }
  }

  function edit(x) {
    setEditing(x.id);

    setForm({
      codigo: x.codigo || "",
      nombre: x.nombre || "",
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

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="seal">MC</div>

          <div>
            <strong>Municipalidad de Cusco</strong>
            <span>Administración</span>
          </div>
        </div>

        <nav>
          <a href="/">Inicio</a>
          <a href="/consulta">Consulta</a>
          <a href="/admin">Administración</a>
        </nav>
      </header>

      <section className="page wide">
        <p className="eyebrow">ADMINISTRACIÓN</p>

        <h1>Panel de registros</h1>

        <p className="muted">
          Gestión de registros almacenados en la base de datos.
        </p>

        {error && (
          <div
            className="notice"
            style={{
              borderLeft: "4px solid #c62828",
              marginBottom: "20px"
            }}
          >
            <b>Error:</b> {error}
          </div>
        )}

        <form className="admin-form" onSubmit={save}>
          <input
            required
            placeholder="Código"
            value={form.codigo}
            onChange={(e) =>
              setForm({
                ...form,
                codigo: e.target.value
              })
            }
          />

          <input
            required
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) =>
              setForm({
                ...form,
                nombre: e.target.value
              })
            }
          />

          <select
            value={form.tipo}
            onChange={(e) =>
              setForm({
                ...form,
                tipo: e.target.value
              })
            }
          >
            <option>Licencia</option>
            <option>Permiso</option>
            <option>Registro</option>
          </select>

          <select
            value={form.estado}
            onChange={(e) =>
              setForm({
                ...form,
                estado: e.target.value
              })
            }
          >
            <option>Activo</option>
            <option>Observado</option>
            <option>Vencido</option>
          </select>

          <input
            type="date"
            value={form.fecha}
            onChange={(e) =>
              setForm({
                ...form,
                fecha: e.target.value
              })
            }
          />

          <button className="btn primary" type="submit">
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
                <th>Código</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No hay registros todavía.
                  </td>
                </tr>
              ) : (
                items.map((x) => (
                  <tr key={x.id}>
                    <td>
                      <b>{x.codigo}</b>
                    </td>

                    <td>{x.nombre}</td>

                    <td>{x.tipo}</td>

                    <td>{x.estado}</td>

                    <td>
                      {x.fecha
                        ? String(x.fecha).slice(0, 10)
                        : ""}
                    </td>

                    <td>
                      <button
                        className="link"
                        onClick={() => edit(x)}
                      >
                        Editar
                      </button>

                      <button
                        className="link danger"
                        onClick={() => remove(x.id)}
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
        Portal demostrativo — Municipalidad de Cusco
      </footer>
    </main>
  );
}
