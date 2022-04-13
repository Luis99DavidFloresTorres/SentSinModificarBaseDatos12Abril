import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceCiudad } from 'src/app/services/codificadores/ciudad.service';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceZona } from 'src/app/services/codificadores/zona.service';
import { BuscarClientesComponent } from '../../buscar-clientes/buscar-clientes.component';

@Component({
  selector: 'app-formulario-gestioncliente',
  templateUrl: './formulario-gestioncliente.component.html',
  styleUrls: ['./formulario-gestioncliente.component.css']
})
export class FormularioGestionclienteComponent implements OnInit, OnDestroy{
  ciudades:String[] = []
  zonas:String[] = []
  index = 0;
  clienteAll:ModelCliente[]=[]
  subscriptionClienteEncontrado:Subscription|any;
  formGroup:FormGroup|any;
  subscriptionZona:Subscription|any;
  subscriptionDeposito:Subscription|any;
  subscribeAllCliente:Subscription|any;
  constructor(private formBuilder:FormBuilder, private dialog:MatDialog, private serviceCliente:ServiceCliente, private serviceZona:ServiceZona, private serviceCiudad:ServiceCiudad, private dateAdapter: DateAdapter<any>) { }
  ngOnDestroy(): void {
   this.desubscribir();
  }
  ngOnInit(): void {

      this.dateAdapter.setLocale('es');
    this.formGroup = this.formBuilder.group({
      codigoF:[''],
      direccionF:[''],
      telefonoF:[''],
      ciudadF:[''],
      zonaF:[''],
      fechaF:[''],
      nombreClienteF:['']
    })
    this.desubscribir();
    this.serviceCliente.allClientes();
    this.subscribeAllCliente = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      var vectorCliente:ModelCliente[]=[]
      data.forEach(cliente=>{vectorCliente.push(cliente)})
      this.clienteAll = vectorCliente;
      this.cambiarValoresFormulario();
    })
    this.serviceZona.obtenerZonas();
    this.subscriptionZona = this.serviceZona.listenerDatosZona().subscribe(datos=>{
      var vectorZona:String[] = []
      datos.forEach(zona=>{vectorZona.push(zona.nombre); });
      this.zonas = vectorZona;
    })
    this.subscriptionClienteEncontrado = this.serviceCliente.listenerEncontrarGestionCliente().subscribe(datos=>{
      if(datos.zona!=undefined){
        this.formGroup.patchValue({
          nombreClienteF:datos.nombre,
          codigoF:datos.codigo,
          direccionF:datos.direccion,
          telefonoF:datos.telefono,
          ciudadF:datos.ciudad.nombre,
          fechaF:datos.fechaact,
          zonaF:datos.zona.nombre,

        })
      }else{
        this.formGroup.patchValue({
          nombreClienteF:datos.nombre,
          codigoF:datos.codigo,
          direccionF:datos.direccion,
          telefonoF:datos.telefono,
          ciudadF:datos.nombre,
          fechaF:datos.fechaact,
        })
      }
      this.index = this.clienteAll.findIndex(data=> data==datos);
    })
    this.serviceCiudad.obtenerCiudades();
    this.subscriptionDeposito=  this.serviceCiudad.listenerDatosCiudad().subscribe(datos=>{
      var ciudadesVector:String[] = []
      datos.forEach(deposito=>{
        ciudadesVector.push(deposito.nombre)
      })
      this.ciudades = ciudadesVector;
    })
  }
  desubscribir(){
    if(this.subscriptionClienteEncontrado!=undefined) {
      this.subscriptionClienteEncontrado.unsubscribe();
    }
    if(this.subscriptionZona!=undefined) {
      this.subscriptionZona.unsubscribe();
    }
    if(this.subscriptionDeposito!=undefined) {
      this.subscriptionDeposito.unsubscribe();
    }
    if(this.subscribeAllCliente!=undefined){
      this.subscribeAllCliente.unsubscribe();
    }
  }
  ciudadS(nombre:any){
  }
  zonaS(nombre:any){
  }
  buscarCiudades(){

  }
  buscarZonas(){}
  buscarClientes(){
    var enviar = {datos:this.clienteAll, clase:'gestionCliente'};
    this.dialog.open(BuscarClientesComponent,{width:'700px',height:'800px', data:enviar});
  }
  primer(){
    this.index = 0;
    this.cambiarValoresFormulario();
  }
  siguiente(){
    if(this.index<this.clienteAll.length-1){
      this.index++;
  }
    this.cambiarValoresFormulario();
  }
  anterior(){
    if(this.index>0){
      this.index--;
    }

    this.cambiarValoresFormulario();
  }
  ultimo(){
    this.index=this.clienteAll.length-1;
    this.cambiarValoresFormulario();
  }
  cambiarValoresFormulario(){

    if(this.clienteAll[this.index].zona!=undefined){
      this.formGroup.patchValue({
        nombreClienteF:this.clienteAll[this.index].nombre,
        codigoF:this.clienteAll[this.index].codigo,
        direccionF:this.clienteAll[this.index].direccion,
        telefonoF:this.clienteAll[this.index].telefono,
        ciudadF:this.clienteAll[this.index].ciudad.nombre,
        fechaF:this.clienteAll[this.index].fechaact,
        zonaF:this.clienteAll[this.index].zona.nombre,
      })
    }else{
      this.formGroup.patchValue({
        nombreClienteF:this.clienteAll[this.index].nombre,
        codigoF:this.clienteAll[this.index].codigo,
        direccionF:this.clienteAll[this.index].direccion,
        telefonoF:this.clienteAll[this.index].telefono,
        ciudadF:this.clienteAll[this.index].ciudad.nombre,
        fechaF:this.clienteAll[this.index].fechaact,
      })
    }
  }
}
