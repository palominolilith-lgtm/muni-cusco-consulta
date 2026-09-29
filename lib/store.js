import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está configurada.");
}

const sql = neon(process.env.DATABASE_URL);

function validateText(value, field, maxLength) {
  const text = String(value ?? "").trim();

  if (!text) {
    throw new Error(`${field} es obligatorio.`);
  }

  if (text.length > maxLength) {
    throw new Error(`${field} supera el límite permitido.`);
  }

  return text;
}

function validateOptionalText(value, field, maxLength) {
  const text = String(value ?? "").trim();

  if (text.length > maxLength) {
    throw new Error(`${field} supera el límite permitido.`);
  }

  return text || null;
}

function validateDate(value) {
  const date = String(value ?? "").trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("La fecha no tiene un formato válido.");
  }

  const parsed = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("La fecha no es válida.");
  }

  return date;
}

export async function getRecords() {
  const rows = await sql`
    SELECT
      id::text AS id,
      codigo,
      nombre,
      dni,
      ce,
      codigo_licencia,
      clase_categoria,
      tipo,
      estado,
      fecha
    FROM registros
    ORDER BY id DESC
  `;

  return rows;
}

export async function getRecordByCodigo(codigo) {
  const cleanCodigo = validateText(codigo, "El código", 100);

  const rows = await sql`
    SELECT
      id::text AS id,
      codigo,
      nombre,
      dni,
      ce,
      codigo_licencia,
      clase_categoria,
      tipo,
      estado,
      fecha
    FROM registros
    WHERE LOWER(TRIM(codigo)) = LOWER(TRIM(${cleanCodigo}))
    LIMIT 1
  `;

  return rows[0] || null;
}

export async function addRecord(body) {
  const codigo = validateText(body.codigo, "El código", 100);
  const nombre = validateText(body.nombre, "El nombre", 255);

  const dni = validateOptionalText(
    body.dni,
    "El DNI",
    20
  );

  const ce = validateOptionalText(
    body.ce,
    "El carné de extranjería",
    30
  );

  const codigo_licencia = validateOptionalText(
    body.codigo_licencia,
    "El código de licencia",
    100
  );

  const clase_categoria = validateOptionalText(
    body.clase_categoria,
    "La clase/categoría",
    50
  );

  const tipo = body.tipo
    ? validateText(body.tipo, "El tipo", 100)
    : "Licencia";

  const estado = body.estado
    ? validateText(body.estado, "El estado", 100)
    : "Activo";

  const fecha = body.fecha
    ? validateDate(body.fecha)
    : new Date().toISOString().slice(0, 10);

  const rows = await sql`
    INSERT INTO registros
      (
        codigo,
        nombre,
        dni,
        ce,
        codigo_licencia,
        clase_categoria,
        tipo,
        estado,
        fecha
      )
    VALUES
      (
        ${codigo},
        ${nombre},
        ${dni},
        ${ce},
        ${codigo_licencia},
        ${clase_categoria},
        ${tipo},
        ${estado},
        ${fecha}
      )
    RETURNING
      id::text AS id,
      codigo,
      nombre,
      dni,
      ce,
      codigo_licencia,
      clase_categoria,
      tipo,
      estado,
      fecha
  `;

  return rows[0];
}

export async function updateRecord(id, body) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("ID de registro no válido.");
  }

  const currentRows = await sql`
    SELECT
      id::text AS id,
      codigo,
      nombre,
      dni,
      ce,
      codigo_licencia,
      clase_categoria,
      tipo,
      estado,
      fecha
    FROM registros
    WHERE id = ${numericId}
    LIMIT 1
  `;

  if (currentRows.length === 0) {
    return null;
  }

  const current = currentRows[0];

  const codigo =
    body.codigo !== undefined
      ? validateText(body.codigo, "El código", 100)
      : current.codigo;

  const nombre =
    body.nombre !== undefined
      ? validateText(body.nombre, "El nombre", 255)
      : current.nombre;

  const dni =
    body.dni !== undefined
      ? validateOptionalText(body.dni, "El DNI", 20)
      : current.dni;

  const ce =
    body.ce !== undefined
      ? validateOptionalText(
          body.ce,
          "El carné de extranjería",
          30
        )
      : current.ce;

  const codigo_licencia =
    body.codigo_licencia !== undefined
      ? validateOptionalText(
          body.codigo_licencia,
          "El código de licencia",
          100
        )
      : current.codigo_licencia;

  const clase_categoria =
    body.clase_categoria !== undefined
      ? validateOptionalText(
          body.clase_categoria,
          "La clase/categoría",
          50
        )
      : current.clase_categoria;

  const tipo =
    body.tipo !== undefined
      ? validateText(body.tipo, "El tipo", 100)
      : current.tipo;

  const estado =
    body.estado !== undefined
      ? validateText(body.estado, "El estado", 100)
      : current.estado;

  const fecha =
    body.fecha !== undefined
      ? validateDate(body.fecha)
      : current.fecha;

  const rows = await sql`
    UPDATE registros
    SET
      codigo = ${codigo},
      nombre = ${nombre},
      dni = ${dni},
      ce = ${ce},
      codigo_licencia = ${codigo_licencia},
      clase_categoria = ${clase_categoria},
      tipo = ${tipo},
      estado = ${estado},
      fecha = ${fecha}
    WHERE id = ${numericId}
    RETURNING
      id::text AS id,
      codigo,
      nombre,
      dni,
      ce,
      codigo_licencia,
      clase_categoria,
      tipo,
      estado,
      fecha
  `;

  return rows[0] || null;
}

export async function deleteRecord(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return false;
  }

  const rows = await sql`
    DELETE FROM registros
    WHERE id = ${numericId}
    RETURNING id
  `;

  return rows.length > 0;
}
