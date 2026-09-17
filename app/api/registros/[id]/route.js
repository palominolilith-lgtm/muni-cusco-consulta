import { NextResponse } from "next/server";
import {
  updateRecord,
  deleteRecord
} from "../../../../lib/store";
import { verifySession } from "../../../../lib/auth";

async function requireAdmin(req) {
  const token = req.cookies.get("admin_session")?.value;

  if (!token) {
    return false;
  }

  return await verifySession(token);
}

export async function PUT(req, { params }) {
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

    const registro = await updateRecord(params.id, body);

    if (!registro) {
      return NextResponse.json(
        {
          ok: false,
          message: "Registro no encontrado."
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      registro
    });
  } catch (error) {
    console.error("Error actualizando registro:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo actualizar el registro."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
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

    const deleted = await deleteRecord(params.id);

    if (!deleted) {
      return NextResponse.json(
        {
          ok: false,
          message: "Registro no encontrado."
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Registro eliminado correctamente."
    });
  } catch (error) {
    console.error("Error eliminando registro:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo eliminar el registro."
      },
      { status: 500 }
    );
  }
}
