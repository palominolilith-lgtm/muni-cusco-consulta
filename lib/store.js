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

function validateOptionalDate(value, field) {
  const date = String(value ?? "").trim();

  if (!date) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${field} no tiene un formato válido.`);
  }

  const parsed = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${field} no es válida.`);
  }

  return date;
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
      apellidos,
      nombres,
      dni,
      ce,
      tipo_documento,
      numero_documento,
      codigo_licencia,
      clase_categoria,
      fecha_expedicion,
      fecha_vencimiento,
      fecha_revalidacion,
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
      apellidos,
      nombres,
      dni,
      ce,
      tipo_documento,
      numero_documento,
      codigo_licencia,
      clase_categoria,
      fecha_expedicion,
      fecha_vencimiento,
      fecha_revalidacion,
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
  const codigo = validateText(
    body.codigo,
    "El código",
    100
  );

  const nombre = validateText(
    body.nombre,
    "El nombre",
    255
  );

  const apellidos = validateOptionalText(
    body.apellidos,
    "Los apellidos",
    255
  );

  const nombres = validateOptionalText(
    body.nombres,
    "Los nombres",
    255
  );

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

  const tipo_documento = validateOptionalText(
    body.tipo_documento,
    "El tipo de documento",
    50
  );

  const numero_documento = validateOptionalText(
    body.numero_documento,
    "El número de documento",
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

  const fecha_expedicion = validateOptionalDate(
    body.fecha_expedicion,
    "La fecha de expedición"
  );

  const fecha_vencimiento = validateOptionalDate(
    body.fecha_vencimiento,
    "La fecha de vencimiento"
  );

  const fecha_revalidacion = validateOptionalDate(
    body.fecha_revalidacion,
    "La fecha de revalidación"
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
        apellidos,
        nombres,
        dni,
        ce,
        tipo_documento,
        numero_documento,
        codigo_licencia,
        clase_categoria,
        fecha_expedicion,
        fecha_vencimiento,
        fecha_revalidacion,
        tipo,
        estado,
        fecha
      )
    VALUES
      (
        ${codigo},
        ${nombre},
        ${apellidos},
        ${nombres},
        ${dni},
        ${ce},
        ${tipo_documento},
        ${numero_documento},
        ${codigo_licencia},
        ${clase_categoria},
        ${fecha_expedicion},
        ${fecha_vencimiento},
        ${fecha_revalidacion},
        ${tipo},
        ${estado},
        ${fecha}
      )
    RETURNING
      id::text AS id,
      codigo,
      nombre,
      apellidos,
      nombres,
      dni,
      ce,
      tipo_documento,
      numero_documento,
      codigo_licencia,
      clase_categoria,
      fecha_expedicion,
      fecha_vencimiento,
      fecha_revalidacion,
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
      apellidos,
      nombres,
      dni,
      ce,
      tipo_documento,
      numero_documento,
      codigo_licencia,
      clase_categoria,
      fecha_expedicion,
      fecha_vencimiento,
      fecha_revalidacion,
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

  const apellidos =
    body.apellidos !== undefined
      ? validateOptionalText(
          body.apellidos,
          "Los apellidos",
          255
        )
      : current.apellidos;

  const nombres =
    body.nombres !== undefined
      ? validateOptionalText(
          body.nombres,
          "Los nombres",
          255
        )
      : current.nombres;

  const dni =
    body.dni !== undefined
      ? validateOptionalText(
          body.dni,
          "El DNI",
          20
        )
      : current.dni;

  const ce =
    body.ce !== undefined
      ? validateOptionalText(
          body.ce,
          "El carné de extranjería",
          30
        )
      : current.ce;

  const tipo_documento =
    body.tipo_documento !== undefined
      ? validateOptionalText(
          body.tipo_documento,
          "El tipo de documento",
          50
        )
      : current.tipo_documento;

  const numero_documento =
    body.numero_documento !== undefined
      ? validateOptionalText(
          body.numero_documento,
          "El número de documento",
          30
        )
      : current.numero_documento;

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

  const fecha_expedicion =
    body.fecha_expedicion !== undefined
      ? validateOptionalDate(
          body.fecha_expedicion,
          "La fecha de expedición"
        )
      : current.fecha_expedicion;

  const fecha_vencimiento =
    body.fecha_vencimiento !== undefined
      ? validateOptionalDate(
          body.fecha_vencimiento,
          "La fecha de vencimiento"
        )
      : current.fecha_vencimiento;

  const fecha_revalidacion =
    body.fecha_revalidacion !== undefined
      ? validateOptionalDate(
          body.fecha_revalidacion,
          "La fecha de revalidación"
        )
      : current.fecha_revalidacion;

  const tipo =
    body.tipo !== undefined
      ? validateText(body.tipo, "El tipo", 100)
      : current.tipo;

  const estado =
    body.estado !== undefined
      ? validateText(
          body.estado,
          "El estado",
          100
        )
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
      apellidos = ${apellidos},
      nombres = ${nombres},
      dni = ${dni},
      ce = ${ce},
      tipo_documento = ${tipo_documento},
      numero_documento = ${numero_documento},
      codigo_licencia = ${codigo_licencia},
      clase_categoria = ${clase_categoria},
      fecha_expedicion = ${fecha_expedicion},
      fecha_vencimiento = ${fecha_vencimiento},
      fecha_revalidacion = ${fecha_revalidacion},
      tipo = ${tipo},
      estado = ${estado},
      fecha = ${fecha}
    WHERE id = ${numericId}
    RETURNING
      id::text AS id,
      codigo,
      nombre,
      apellidos,
      nombres,
      dni,
      ce,
      tipo_documento,
      numero_documento,
      codigo_licencia,
      clase_categoria,
      fecha_expedicion,
      fecha_vencimiento,
      fecha_revalidacion,
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
