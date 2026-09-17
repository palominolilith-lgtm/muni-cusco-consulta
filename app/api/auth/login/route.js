import { NextResponse } from "next/server";
import { createSession } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Usuario y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const validUser =
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD;

    if (!validUser) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos." },
        { status: 401 }
      );
    }

    const session = await createSession(username);

    const response = NextResponse.json({
      ok: true
    });

    response.cookies.set({
      name: "admin_session",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "No se pudo iniciar sesión." },
      { status: 500 }
    );
  }
}
