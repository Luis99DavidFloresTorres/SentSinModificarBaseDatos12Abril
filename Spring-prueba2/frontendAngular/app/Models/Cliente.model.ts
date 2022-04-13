import { CiudadesModel } from "../contenido/barra/codificador/ciudades/ciudades.model";
import { ZonaModel } from "../contenido/barra/codificador/zonas/zona.model";

export interface ModelCliente{
  id:Number;
  nombre:String;
  tipodescto:String;
  codigo:String;
  telefono:String;
  direccion:String;
  ciudad:CiudadesModel;
  zona:ZonaModel;
  fechaact:Date;
}
export interface exportarDescuento{
  guardar:boolean;
  descto:String;
}
