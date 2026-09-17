import { NextResponse } from "next/server";
import { getRecords } from "../../../lib/store";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const q = new URL(req.url).searchParams.get("q")?.trim().toLowerCase();

    if (!q) {
      return NextResponse.json(
        { ok: false, message: "Ingresa un término de consulta." },
        { status: 400 }
      );
    }

    const records = await getRecords();
    const item = records.find(
      (x) => x.codigo.toLowerCase() === q
    );

    if (!item) {
      return NextResponse.json(
        {
          ok: false,
          message: "No se encontró un registro con ese código."
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      registro: item
    });
  } catch (error) {
    console.error("Error en consulta:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Error interno al consultar el registro."
      },
      { status: 500 }
    );
  }
}
