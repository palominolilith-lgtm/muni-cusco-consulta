 "use client";
import { useEffect, useState } from "react";

const empty = { codigo:"", nombre:"", tipo:"Licencia", estado:"Activo", fecha:"" };

export default function Admin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  async function load() {
    const r = await fetch("/api/registros");
    setItems(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/registros/${editing}` : "/api/registros";
    await fetch(url, { method, headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setForm(empty); setEditing(null); load();
  }

  async function remove(id) {
    if (!confirm("¿Eliminar este registro de prueba?")) return;
    await fetch(`/api/registros/${id}`, { method:"DELETE" });
    load();
  }

  function edit(x) {
    setEditing(x.id);
    setForm({codigo:x.codigo,nombre:x.nombre,tipo:x.tipo,estado:x.estado,fecha:x.fecha});
    window.scrollTo({top:0, behavior:"smooth"});
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand"><div className="seal">MC</div><div><strong>Municipalidad de Cusco</strong><span>Administración</span></div></div>
        <nav><a href="/">Inicio</a><a href="/consulta">Consulta</a><a href="/admin">Administración</a></nav>
      </header>
      <section className="page wide">
        <p className="eyebrow">ADMINISTRACIÓN</p>
        <h1>Panel de registros</h1>
        <p className="muted">CRUD demostrativo. Antes de producción, conecta autenticación y una base de datos administrada.</p>

        <form className="admin-form" onSubmit={save}>
          <input required placeholder="Código" value={form.codigo} onChange={e=>setForm({...form,codigo:e.target.value})}/>
          <input required placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>
          <select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}><option>Licencia</option><option>Permiso</option><option>Registro</option></select>
          <select value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}><option>Activo</option><option>Observado</option><option>Vencido</option></select>
          <input type="date" value={form.fecha} onChange={e=>setForm({...form,fecha:e.target.value})}/>
          <button className="btn primary">{editing ? "Guardar cambios" : "Agregar registro"}</button>
          {editing && <button type="button" className="btn secondary" onClick={()=>{setEditing(null);setForm(empty)}}>Cancelar</button>}
        </form>

        <div className="table-wrap">
          <table><thead><tr><th>Código</th><th>Nombre</th><th>Tipo</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
          <tbody>{items.map(x=><tr key={x.id}><td><b>{x.codigo}</b></td><td>{x.nombre}</td><td>{x.tipo}</td><td>{x.estado}</td><td>{x.fecha}</td><td><button className="link" onClick={()=>edit(x)}>Editar</button><button className="link danger" onClick={()=>remove(x.id)}>Eliminar</button></td></tr>)}</tbody></table>
        </div>
        <div className="notice"><b>Seguridad:</b> este panel no debe considerarse protegido para producción. Agrega login, autorización por roles, CSRF/anti-abuso según arquitectura, rate limiting y base de datos segura antes de publicar.</div>
      </section>
      <footer>Portal demostrativo — Municipalidad de Cusco</footer>
    </main>
  );
}