import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ZonaModel } from "src/app/contenido/barra/codificador/zonas/zona.model";
import { environment } from "src/environments/environment";

import {LoginModel} from "../Models/LoginResponse.model";
import { ItemProductoModel } from "../Models/itemProducto.model";
import { ProductoModel } from "../Models/producto.model";
import { ClaseExportar } from "../Models/iInterface.model";
@Injectable({
  providedIn: "root"
})
export class ServiceItemProducto{
  baseUrl = environment.baseUrl;

  private itemProductoID: ItemProductoModel|any;
  private itemProducto: ItemProductoModel[]=[];
  private itemProductobyIdSubject = new Subject<ItemProductoModel>();
  //private buscarFechaPeriodo : ItemProductoModel[]= [];
  //private buscarFechaPeriodoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoSubject = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo = new Subject<ItemProductoModel[]>();
  private itemProductoPeriodo2Fechas = new Subject<ItemProductoModel[]>();
  private itemProducto1000Primeros = new Subject<ItemProductoModel[]>();
  private itemProductoKardex = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorIngresos = new Subject<ItemProductoModel[]>();
  private itemProductoPorMayorSalidas= new Subject<ItemProductoModel[]>();
  private itemProductoSeriales= new Subject<String[]>();
  private itemByTransproducto = new Subject<ItemProductoModel[]>();
  private buscarporFechasCliente = new Subject<ItemProductoModel[]>();
  constructor(private http:HttpClient){

  }
  obtenerProductos(){
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto')
    .subscribe((data)=>{
      var itemP: ItemProductoModel[]|null;
      itemP=data;
      this.itemProductoSubject.next(itemP);
    });
  }
  obtenerPorPeriodo(fecha: string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/getOperaciones', fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo.next(vector);
    });
  }
  obtenerPorPeriodoEntre2Fechas(fecha: string,fecha2:string){
    this.http.post<ItemProductoModel[]>(this.baseUrl+`api/itemProducto/getOperaciones/${fecha}/${fecha2}`, fecha)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPeriodo2Fechas.next(vector);
    });
  }
  obtenerDistintosSeriales(){
    this.http.get<String[]>(this.baseUrl+'api/itemProducto/findSeriales')
    .subscribe((data)=>{
      var vector: String[]=data;
      this.itemProductoSeriales.next(vector);
    });
  }
  obtenerPorMayorIngresos(fecha: string, nombre: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseExportar={fecha:fecha,nombre:nombre}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/mayorIngresos', objeto, { headers: httpOptions})
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPorMayorIngresos.next(vector);
    });
  }
  obtener1000Primeros(){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/getPorFechas1000', { headers: httpOptions})
    .subscribe((data)=>{
      var vector: ItemProductoModel[]|any=data;
      this.itemProducto1000Primeros.next(vector);
    });
  }
  obtenerPorKardex(fecha: string, nombre: String){
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseExportar={fecha:fecha,nombre:nombre}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/kardex', objeto, {headers: httpOptions})
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoKardex.next(vector);
    });
  }
  obtenerPorMayorSalidas(fecha: string, nombre:String){
     const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const objeto: ClaseExportar={fecha:fecha,nombre:nombre}
    this.http.post<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/mayorSalidas', objeto,{headers:httpOptions})
    .subscribe((data)=>{
      var vector: ItemProductoModel[]=data;
      this.itemProductoPorMayorSalidas.next(vector);
    });
  }
  obtenerbyIdItemProductos(id: String){
    this.http.get<ProductoModel>(this.baseUrl+'api/itemProducto/byId/'+id)
    .subscribe((data)=>{
      var vector: ItemProductoModel[]|any=data;
      this.itemProductoPeriodo.next(vector);
    });
  }
  obtenerItemsByTransproducto(id:Number){
    this.http.get<ItemProductoModel[]>(this.baseUrl+'api/itemProducto/byTransproducto/'+id).subscribe(datos=>{
      var items:ItemProductoModel[]= datos;
      this.itemByTransproducto.next(items);
    })
  }
  agregarItemProducto(producto:ItemProductoModel[]){
    producto.forEach(mostrar=>{
      console.log("product");
      console.log(mostrar);
    })
    this.http.post<LoginModel>(this.baseUrl+'api/itemProducto/add',producto)
    .subscribe((data)=>{
        console.log('respuesta = '+data.respuesta);
    });
  }
  entregaProductoPorCliente(fecha1:Date, fecha2:Date, nombreCliente:String){
    this.http.get<any[]>(this.baseUrl+'api/itemProducto/tablasEntregaporCliente/'+fecha1+'/'+fecha2+'/'+nombreCliente).subscribe(data=>{
        console.log(data);
        this.buscarporFechasCliente.next(data);
    })
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
  listener1000Datos(){
    return this.itemProducto1000Primeros.asObservable();
  }
  listenerDatosItemProductoID(){
    return this.itemProductobyIdSubject;
  }
  listenerDatosItemProductoPeriodo(){
    return this.itemProductoPeriodo.asObservable();
  }

  listenerSeriales(){
    return this.itemProductoSeriales.asObservable();
  }
  listenerItemByTransproducto(){
    return this.itemByTransproducto.asObservable();
  }
  listeneritemProductoPeriodo2Fechas(){
    return this.itemProductoPeriodo2Fechas.asObservable();
  }
  listenerBuscarEntregasProductoPorCliente(){
    return this.buscarporFechasCliente.asObservable();
  }
}
