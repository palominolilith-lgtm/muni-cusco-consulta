import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { getRecordByCodigo } from "../../../lib/store";

export const dynamic = "force-dynamic";

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

    const q = new URL(req.url).searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json(
        {
          ok: false,
          message: "Ingresa un término de consulta.",
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
          message: "Término de consulta no válido.",
        },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    const item = await getRecordByCodigo(q);

    if (!item) {
      return NextResponse.json(
        {
          ok: false,
          message: "No se encontró un registro con ese código.",
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
        registro: item,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error en consulta:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Error interno al consultar el registro.",
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
