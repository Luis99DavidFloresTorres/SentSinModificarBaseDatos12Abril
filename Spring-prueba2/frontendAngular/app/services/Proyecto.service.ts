import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ModelCotizacionProyecto } from "../Models/CotizacionProyecto.model";


@Injectable({
  providedIn: "root"
})
export class ServiceProyecto{
  baseUrl = environment.baseUrl;
  subjectTodosProyecto = new Subject<ModelCotizacionProyecto[]>();
  constructor(private http:HttpClient){}
  obtenerTodosProyectos(){
    this.http.get<ModelCotizacionProyecto[]>(this.baseUrl+"/api/proyecto/obtenerTodos").subscribe(datos=>{
      this.subjectTodosProyecto.next(datos);
    })
  }
  listenerTodosProyecto(){
    return this.subjectTodosProyecto.asObservable();
  }
}
