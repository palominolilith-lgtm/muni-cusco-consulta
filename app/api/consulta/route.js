import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { neon } from "@neondatabase/serverless";
import { getRecordByCodigo } from "../../../lib/store";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const sql = neon(process.env.DATABASE_URL);

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

async function buscarPorTipo(tipo, valor) {
  if (tipo === "codigo") {
    return getRecordByCodigo(valor);
  }

  let rows = [];

  if (tipo === "dni") {
    rows = await sql`
      SELECT
        id::text AS id,
        codigo,
        nombre,
        dni,
        ce,
        codigo_licencia,
        tipo,
        estado,
        fecha
      FROM registros
      WHERE LOWER(TRIM(dni)) = LOWER(TRIM(${valor}))
      LIMIT 1
    `;
  }

  if (tipo === "ce") {
    rows = await sql`
      SELECT
        id::text AS id,
        codigo,
        nombre,
        dni,
        ce,
        codigo_licencia,
        tipo,
        estado,
        fecha
      FROM registros
      WHERE LOWER(TRIM(ce)) = LOWER(TRIM(${valor}))
      LIMIT 1
    `;
  }

  if (tipo === "licencia") {
    rows = await sql`
      SELECT
        id::text AS id,
        codigo,
        nombre,
        dni,
        ce,
        codigo_licencia,
        tipo,
        estado,
        fecha
      FROM registros
      WHERE LOWER(TRIM(codigo_licencia)) =
            LOWER(TRIM(${valor}))
      LIMIT 1
    `;
  }

  return rows[0] || null;
}

export async function GET(req) {
  try {
    const ip = getClientIp(req);

    const rateLimit = await consultaRateLimit.limit(ip);

    if (!rateLimit.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rateLimit.reset - Date.now()) / 1000)
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "Demasiadas consultas. Intenta nuevamente más tarde.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const searchParams = new URL(req.url).searchParams;

    const q = searchParams.get("q")?.trim();
    const tipo = searchParams
      .get("tipo")
      ?.trim()
      .toLowerCase();

    if (!q) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Ingresa el dato que deseas consultar.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    if (q.length > 100) {
      return NextResponse.json(
        {
          ok: false,
          message: "El dato ingresado no es válido.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const tiposPermitidos = [
      "codigo",
      "dni",
      "ce",
      "licencia",
    ];

    const tipoConsulta = tipo || "codigo";

    if (!tiposPermitidos.includes(tipoConsulta)) {
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

    const item = await buscarPorTipo(
      tipoConsulta,
      q
    );

    if (!item) {
      const mensajes = {
        codigo:
          "No se encontró un registro con ese código.",
        dni:
          "No se encontró un registro asociado a ese DNI.",
        ce:
          "No se encontró un registro asociado a ese carné de extranjería.",
        licencia:
          "No se encontró un registro con ese código de licencia.",
      };

      return NextResponse.json(
        {
          ok: false,
          message: mensajes[tipoConsulta],
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
        tipoConsulta,
        registro: item,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error en consulta:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Error interno al consultar el registro.",
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
