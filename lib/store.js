let records = [
  {id:"1",codigo:"MC-0001",nombre:"Registro demostrativo",tipo:"Licencia",estado:"Activo",fecha:"2026-09-01"},
  {id:"2",codigo:"MC-0002",nombre:"Registro de prueba",tipo:"Permiso",estado:"Activo",fecha:"2026-09-05"},
  {id:"3",codigo:"MC-0003",nombre:"Registro municipal",tipo:"Registro",estado:"Observado",fecha:"2026-09-10"}
];

export function getRecords(){ return records; }
export function addRecord(body){
  const item={id:Date.now().toString(), codigo:body.codigo, nombre:body.nombre, tipo:body.tipo||"Licencia", estado:body.estado||"Activo", fecha:body.fecha||""};
  records=[item,...records]; return item;
}
export function updateRecord(id,body){
  const i=records.findIndex(x=>x.id===id); if(i<0)return null;
  records[i]={...records[i],...body,id}; return records[i];
}
export function deleteRecord(id){
  const before=records.length; records=records.filter(x=>x.id!==id); return records.length<before;
}