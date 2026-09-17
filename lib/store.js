import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está configurada.");
}

const sql = neon(process.env.DATABASE_URL);

export async function getRecords() {
  const rows = await sql`
    SELECT
      id::text AS id,
      codigo,
      nombre,
      tipo,
      estado,
      fecha
    FROM registros
    ORDER BY id DESC
  `;

  return rows;
}

export async function getRecordByCodigo(codigo) {
  const rows = await sql`
    SELECT
      id::text AS id,
      codigo,
      nombre,
      tipo,
      estado,
      fecha
    FROM registros
    WHERE LOWER(codigo) = LOWER(${codigo})
    LIMIT 1
  `;

  return rows[0] || null;
}

export async function addRecord(body) {
  const codigo = String(body.codigo || "").trim();
  const nombre = String(body.nombre || "").trim();
  const tipo = String(body.tipo || "Licencia").trim();
  const estado = String(body.estado || "Activo").trim();
  const fecha =
    body.fecha || new Date().toISOString().slice(0, 10);

  const rows = await sql`
    INSERT INTO registros
      (codigo, nombre, tipo, estado, fecha)
    VALUES
      (${codigo}, ${nombre}, ${tipo}, ${estado}, ${fecha})
    RETURNING
      id::text AS id,
      codigo,
      nombre,
      tipo,
      estado,
      fecha
  `;

  return rows[0];
}

export async function updateRecord(id, body) {
  const currentRows = await sql`
    SELECT
      id::text AS id,
      codigo,
      nombre,
      tipo,
      estado,
      fecha
    FROM registros
    WHERE id = ${Number(id)}
    LIMIT 1
  `;

  if (currentRows.length === 0) {
    return null;
  }

  const current = currentRows[0];

  const codigo = String(
    body.codigo ?? current.codigo
  ).trim();

  const nombre = String(
    body.nombre ?? current.nombre
  ).trim();

  const tipo = String(
    body.tipo ?? current.tipo
  ).trim();

  const estado = String(
    body.estado ?? current.estado
  ).trim();

  const fecha =
    body.fecha ?? current.fecha;

  const rows = await sql`
    UPDATE registros
    SET
      codigo = ${codigo},
      nombre = ${nombre},
      tipo = ${tipo},
      estado = ${estado},
      fecha = ${fecha}
    WHERE id = ${Number(id)}
    RETURNING
      id::text AS id,
      codigo,
      nombre,
      tipo,
      estado,
      fecha
  `;

  return rows[0] || null;
}

export async function deleteRecord(id) {
  const rows = await sql`
    DELETE FROM registros
    WHERE id = ${Number(id)}
    RETURNING id
  `;

  return rows.length > 0;
}
