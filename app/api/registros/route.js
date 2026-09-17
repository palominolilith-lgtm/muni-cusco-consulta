import { NextResponse } from "next/server";
import { getRecords, addRecord } from "../../../lib/store";

export async function GET() {
  try {
    const records = await getRecords();

    return NextResponse.json({
      ok: true,
      registros: records
    });
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
    const body = await req.json();

    const codigo = String(body.codigo || "").trim();
    const nombre = String(body.nombre || "").trim();

    if (!codigo || !nombre) {
      return NextResponse.json(
        {
          ok: false,
          message: "El código y el nombre son obligatorios."
        },
        { status: 400 }
      );
    }

    const registro = await addRecord(body);

    return NextResponse.json(
      {
        ok: true,
        registro
      },
      { status: 201 }
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
