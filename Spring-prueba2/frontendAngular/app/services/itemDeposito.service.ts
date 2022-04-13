import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";
import { ItemProductoModel } from "../Models/itemProducto.model";
import { ProductoModel } from "../Models/producto.model";

import { ClaseDepositoExportar } from "../Models/ExportarDeposito.model";
import { ExportarOperacion } from "../Models/ExportarOperacion.model";
import { ClaseExportar } from "../Models/iInterface.model";
@Injectable({
  providedIn: "root"
})
export class ServiceItemDeposito{
  baseUrl = environment.baseUrl;
  private nombreLista: string[] = []
  private itemProductoID: ItemProductoModel|any;
  private itemProducto: ItemProductoModel[]=[];
  private itemProductobyIdSubject = new Subject<ItemProductoModel>();
  //private buscarFechaPeriodo : ItemProductoModel[]= [];
  //private buscarFechaPeriodoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo = new Subject<ItemProductoModel[]>();
  private itemProductoKardex = new Subject<ItemProductoModel[]>();
  private datos1000PorFechaYDeposito = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorIngresos = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorSalidas= new Subject<ItemProductoModel[]>();
  private itemProductoOperacion = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2Fechas = new Subject<ItemProductoModel[]>();

  constructor(private http:HttpClient){

  }
  obtenerProductos(){
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto')
    .subscribe((data)=>{
      this.itemProducto=data;
      this.itemProductoSubject.next(this.itemProducto);
    });
  }
  obtenerPorMayorIngresos(fecha: string, nombre: String, nombreDeposito: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseDepositoExportar|any={fecha:fecha,nombre:nombre, depositoNombre: nombreDeposito}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/mayorIngresos', objeto, { headers: httpOptions})
    .subscribe((data)=>{
      this.itemProducto=data;
      console.log(data);
      this.itemProductoPorMayorIngresos.next(this.itemProducto);
    });
  }
  obtenerPorKardex(fecha: string, nombre: String, nombreDeposito:String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseDepositoExportar|any={fecha:fecha,nombre:nombre,depositoNombre:nombreDeposito}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/kardexDeposito', objeto, {headers: httpOptions})
    .subscribe((data)=>{
      console.log(data);
      this.itemProducto=data;
      this.itemProductoKardex.next(this.itemProducto);
    });
  }
  obtenerPorMayorSalidas(fecha: string, nombre:String, nombreDeposito:String){
     const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseDepositoExportar|any={fecha:fecha,nombre:nombre, depositoNombre: nombreDeposito};
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/mayorSalidas', objeto,{headers:httpOptions})
    .subscribe((data)=>{
      var itemProducto:ItemProductoModel[]=data;
      this.itemProductoPorMayorSalidas.next(itemProducto);
    });
  }
  obtenerbyIdItemProductos(id: String){
    this.http.get<ProductoModel>(this.baseUrl+'api/itemDepositoProducto/byId/'+id)
    .subscribe((data)=>{
      this.itemProductoID=data;
      this.itemProductoPeriodo.next(this.itemProductoID);
    });
    //return this.autoresLista.slice();
  }
  obtenerPorOperaciones(fecha: string, operacion: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ExportarOperacion={fecha:fecha,operacion:operacion}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/operaciones', objeto, { headers: httpOptions})
    .subscribe((data)=>{
      this.itemProducto=data;
      this.itemProductoOperacion.next(this.itemProducto);
    });
  }
  obtener1000DatosPorFechaYDeposito(){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
   // const objeto: ExportarOperacion={fecha:fecha,operacion:operacion}
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemDepositoProducto/getPorFechas1000')
    .subscribe((data)=>{
      console.log(data)
      this.datos1000PorFechaYDeposito.next(data);
    });
  }
  obtenerPorPeriodoEntre2Fechas(fecha: string,fecha2:string,depositoNombre:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemDepositoProducto/getOperaciones/${fecha}/${fecha2}/${depositoNombre}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2Fechas.next(vector);
    });
  }
  listenerProductoPeriodo2Fechas(){
    return this.itemProductoPeriodo2Fechas.asObservable();
  }
  listenerDatosItemProducto(){
    return this.itemProductoSubject;
  }
  listenerBuscarFecha(){
    return this.itemProductoSubject.asObservable();
  }
  listenerMayorIngresos(){
    return this.itemProductoPorMayorIngresos.asObservable();
  }
  listenerMayorSalidas(){
    return this.itemProductoPorMayorSalidas.asObservable();
  }
  listenerKardex(){
    return this.itemProductoKardex.asObservable();
  }
  listenerDatosItemProductoID(){
    return this.itemProductobyIdSubject;
  }
  listenerDatosItemProductoPeriodo(){
    return this.itemProductoPeriodo.asObservable();
  }
  listenerOperaciones(){
    return this.itemProductoOperacion.asObservable();
  }
  listener1000PorFechaYDeposito(){
    return this.datos1000PorFechaYDeposito.asObservable();
  }
  agregarItemProducto(producto:ItemProductoModel){
    this.http.post(this.baseUrl+'api/producto/add',producto)
    .subscribe((data)=>{

    });
  }
}
