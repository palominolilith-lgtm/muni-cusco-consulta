import { NextResponse } from "next/server";
import { updateRecord, deleteRecord } from "../../../../lib/store";

export async function PUT(req,{params}) {
  const body = await req.json();
  const item = updateRecord(params.id, body);
  if (!item) return NextResponse.json({message:"Registro no encontrado."},{status:404});
  return NextResponse.json(item);
}
export async function DELETE(req,{params}) {
  const ok = deleteRecord(params.id);
  if (!ok) return NextResponse.json({message:"Registro no encontrado."},{status:404});
  return NextResponse.json({ok:true});
}
