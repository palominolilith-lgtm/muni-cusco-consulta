import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { createSession } from "../../../../lib/auth";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "muni-cusco:login",
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

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    const rateLimit = await loginRateLimit.limit(ip);

    if (!rateLimit.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rateLimit.reset - Date.now()) / 1000)
      );

      return NextResponse.json(
        {
          message:
            "Demasiados intentos de inicio de sesión. Intenta nuevamente más tarde.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!username || !password) {
      return NextResponse.json(
        {
          message: "Usuario y contraseña son obligatorios.",
        },
        { status: 400 }
      );
    }

    if (username.length > 100 || password.length > 200) {
      return NextResponse.json(
        {
          message: "Datos de acceso no válidos.",
        },
        { status: 400 }
      );
    }

    const validUser =
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD;

    if (!validUser) {
      return NextResponse.json(
        {
          message: "Usuario o contraseña incorrectos.",
        },
        { status: 401 }
      );
    }

    const session = await createSession(username);

    const response = NextResponse.json({
      ok: true,
    });

    response.cookies.set({
      name: "admin_session",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);

    return NextResponse.json(
      {
        message: "No se pudo iniciar sesión.",
      },
      { status: 500 }
    );
  }
}
