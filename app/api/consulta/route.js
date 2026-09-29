import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está configurada.");
}

const sql = neon(process.env.DATABASE_URL);

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const consultaRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "muni-cusco:consulta",
});

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function cleanValue(value) {
  return String(value ?? "").trim();
}

async function buscarRegistro(tipo, valor) {
  const consulta = cleanValue(valor);

  if (tipo === "codigo") {
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
      WHERE LOWER(TRIM(codigo)) = LOWER(TRIM(${consulta}))
      ORDER BY id DESC
      LIMIT 1
    `;

    return rows[0] || null;
  }

  if (tipo === "dni") {
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
      WHERE LOWER(TRIM(dni)) = LOWER(TRIM(${consulta}))
         OR (
           LOWER(TRIM(tipo_documento)) = 'dni'
           AND LOWER(TRIM(numero_documento)) = LOWER(TRIM(${consulta}))
         )
      ORDER BY id DESC
      LIMIT 1
    `;

    return rows[0] || null;
  }

  if (tipo === "ce") {
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
      WHERE LOWER(TRIM(ce)) = LOWER(TRIM(${consulta}))
         OR (
           LOWER(TRIM(tipo_documento)) IN ('ce', 'carné de extranjería', 'carne de extranjeria')
           AND LOWER(TRIM(numero_documento)) = LOWER(TRIM(${consulta}))
         )
      ORDER BY id DESC
      LIMIT 1
    `;

    return rows[0] || null;
  }

  if (tipo === "licencia") {
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
      WHERE LOWER(TRIM(codigo_licencia)) = LOWER(TRIM(${consulta}))
      ORDER BY id DESC
      LIMIT 1
    `;

    return rows[0] || null;
  }

  return null;
}

export async function GET(request) {
  try {
    const ip = getClientIp(request);

    const rateLimit = await consultaRateLimit.limit(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Has realizado demasiadas consultas. Espera un momento e inténtalo nuevamente.",
        },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const { searchParams } = new URL(request.url);

    const tipo = cleanValue(searchParams.get("tipo")).toLowerCase();
    const valor = cleanValue(searchParams.get("q"));

    const tiposPermitidos = ["codigo", "dni", "ce", "licencia"];

    if (!tiposPermitidos.includes(tipo)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Tipo de consulta no válido.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    if (!valor) {
      return NextResponse.json(
        {
          ok: false,
          message: "Ingresa un dato para realizar la consulta.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    if (valor.length > 100) {
      return NextResponse.json(
        {
          ok: false,
          message: "El dato ingresado supera el límite permitido.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const registro = await buscarRegistro(tipo, valor);

    if (!registro) {
      return NextResponse.json(
        {
          ok: false,
          message: "No se encontró un registro con los datos ingresados.",
        },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        registro,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error en consulta:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Ocurrió un error al realizar la consulta.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
