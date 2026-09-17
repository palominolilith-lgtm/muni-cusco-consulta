import { NextResponse } from "next/server";
import { getRecords } from "../../../../../lib/store";

export async function GET(req) {
  const q = new URL(req.url).searchParams.get("q")?.trim().toLowerCase();
  if (!q) return NextResponse.json({ok:false,message:"Ingresa un término de consulta."},{status:400});
  const item = getRecords().find(x => x.codigo.toLowerCase() === q);
  if (!item) return NextResponse.json({ok:false,message:"No se encontró un registro con ese código."},{status:404});
  return NextResponse.json({ok:true,registro:item});
}