import { ModelCliente } from "./Cliente.model";

export interface ModelCotizacionProyecto{
  id:Number;
  nroprj:Number;
  nota:String;
  formapago:String;
  garantia:String;
  validez:String;
  impuestos:String;
  operprj:Number;
  entrega:String;
  referencia:Number;
  cliente:ModelCliente;
  totalventas:Number;
  cotizacion:String;
  tc:Number;
  nombre:String;
  detalle:String;
  observaciones:String;
  responsable:String;
  fecha:Date;
  ciudad:String;
  nombreCliente:String;
}
