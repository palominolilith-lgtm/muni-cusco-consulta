import { NextResponse } from "next/server";
import { getRecords, addRecord } from "../../../../lib/store";

export async function GET() {
  return NextResponse.json(getRecords());
}
export async function POST(req) {
  const body = await req.json();
  if (!body.codigo || !body.nombre) return NextResponse.json({message:"Código y nombre son obligatorios."},{status:400});
  const item = addRecord(body);
  return NextResponse.json(item,{status:201});
}