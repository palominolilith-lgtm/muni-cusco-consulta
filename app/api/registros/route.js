import { NextResponse } from "next/server";
import { getRecords, addRecord } from "../../../lib/store";
import { verifySession } from "../../../lib/auth";

export const dynamic = "force-dynamic";

async function requireAdmin(req) {
  const token = req.cookies.get("admin_session")?.value;

  if (!token) {
    return false;
  }

  return await verifySession(token);
}

export async function GET(req) {
  try {
    const authorized = await requireAdmin(req);

    if (!authorized) {
      return NextResponse.json(
        {
          ok: false,
          message: "No autorizado."
        },
        { status: 401 }
      );
    }

    const records = await getRecords();

    return NextResponse.json(
      {
        ok: true,
        registros: records
      },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("Error obteniendo registros:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Error interno al obtener los registros."
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const authorized = await requireAdmin(req);

    if (!authorized) {
      return NextResponse.json(
        {
          ok: false,
          message: "No autorizado."
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const codigo =
      typeof body.codigo === "string"
        ? body.codigo.trim()
        : "";

    const nombre =
      typeof body.nombre === "string"
        ? body.nombre.trim()
        : "";

    if (!codigo || !nombre) {
      return NextResponse.json(
        {
          ok: false,
          message: "El código y el nombre son obligatorios."
        },
        { status: 400 }
      );
    }

    if (codigo.length > 100 || nombre.length > 255) {
      return NextResponse.json(
        {
          ok: false,
          message: "Los datos proporcionados son demasiado largos."
        },
        { status: 400 }
      );
    }

    const registro = await addRecord({
      ...body,
      codigo,
      nombre
    });

    return NextResponse.json(
      {
        ok: true,
        registro
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("Error creando registro:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo crear el registro."
      },
      { status: 500 }
    );
  }
}
