import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { BuscarNombreFechaComponent } from './buscar-nombre-fecha/buscar-nombre-fecha.component';
import { BuscarNombreComponent } from './buscar-nombre/buscar-nombre.component';
import { dateFindComponent } from './dateFind.component';
import { ItemProductoModel } from '../../../Models/itemProducto.model';
import { DateAdapter } from '@angular/material/core';
import { Entre2fechasComponent } from './entre2fechas/entre2fechas.component';
import { ServiceImprimirConsulta } from 'src/app/services/ImprimirConsultas.service';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css'],
})
export class ItemProductoComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  displayedColumns = ['producto_id','codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];
  dataSource= new MatTableDataSource<ItemProductoModel>();
  formCheckboxGroup : FormGroup|any;
  archivos =[];
  modulo =  ""
  tituloGeneral="Por Fecha: "
  subtitulo="Periodo"
  valor= "Primeros 1000 ordenados por Fecha";
  limiteVector:Number|any;
  nuevoVector: ItemProductoModel[]|any;
  tabla=true;
  imagen=false;
  pais:ItemProductoModel[]|any;
  sujetoSubscripcion: Subscription|any;
  sujetoSubscripcionGeneral: Subscription|any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) pag: MatPaginator|any;

  constructor(private serviceItemProducto: ServiceItemProducto, private dialog: MatDialog, private formBuild: FormBuilder,
    private dateAdapter: DateAdapter<any>, private serviceImprimirConsulta:ServiceImprimirConsulta) {
    this.dateAdapter.setLocale('es');
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit(): void {
    this.modulo = ""
    this.formCheckboxGroup = this.formBuild.group({
      check1:['',[Validators.required]],
      check2:['',[Validators.required]],
      check3:['',[Validators.required]],
      check4:['',[Validators.required]],
  })

  this.sujetoSubscripcion=this.serviceItemProducto.listenerMayorIngresos().subscribe((datos)=>{
    this.modulo ="ingreso"
    //console.log(datos);
    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','proveedorNombre','observaciones','ingresos','serial'];

  })
  this.sujetoSubscripcion=this.serviceItemProducto.listenerKardex().subscribe((datos)=>{
    this.modulo ="kardex";

    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','fechaact','nrodoc','ope','observaciones','serial','invinicial','ingresos','salidas','saldo'];
  })
  this.sujetoSubscripcion=this.serviceItemProducto.listenerMayorSalidas().subscribe((datos)=>{
    this.modulo ="salida";

    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['fechaact','nrodoc','ope','clienteNombre','observaciones','serial','salidas'];

  })
  this.sujetoSubscripcion = this.serviceItemProducto.listeneritemProductoPeriodo2Fechas().subscribe((datos)=>{
    this.modulo ="periodo";

    this.dataSource.data = datos;
    this.dataSource.paginator = this.pag;
    this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];
  })

    this.serviceItemProducto.obtener1000Primeros();
    this.sujetoSubscripcion=this.serviceItemProducto.listener1000Datos().subscribe((datos)=>{
      this.modulo ="1000datos";

      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
      this.displayedColumns = ['observaciones','fechaact','codigo','nombre','cantidad','ope'];

    })
    this.sujetoSubscripcion=this.serviceItemProducto.listenerDatosItemProductoPeriodo().subscribe((datos)=>{
      this.modulo = "periodo";

      this.dataSource.data = datos;
      this.dataSource.paginator = this.pag;
      this.displayedColumns = ['codigo','nombre','unidad','invinicial','ingresos','salidas','saldo'];

    })
    console.log(this.sujetoSubscripcion);

  }
  ngOnDestroy(): void {
    if(this.sujetoSubscripcion!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }
    /*if(this.sujetoSubscripcionPeriodo!= undefined){
      this.sujetoSubscripcion.unsubscribe();
    }*/
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  cambiarValoresFalse(valorCheck:any){
    for(var elemento in this.formCheckboxGroup.controls){
          if(elemento != valorCheck){

              this.formCheckboxGroup.controls[elemento].setValue(false);
          }else{

          }
    }
  }
  productoValoradoContable(){
    this.cambiarValoresFalse( this.formCheckboxGroup.controls.check1);
    this.displayedColumns = ['nombre','invinicial','ingresos','salidas','saldo','costo','costoTotal'];
  }
  productoPeriodo(){
    var dialogRef=this.dialog.open(dateFindComponent, {width:'300px', data:"periodo"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresos(){
    var dialogRef=this.dialog.open(dateFindComponent, {width:'300px', data:"ingresos"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorSalidas(){
    var dialogRef = this.dialog.open(dateFindComponent, {width:'300px', data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!= undefined){
        this.valor=datos;
      }
    })
  }
  mayorSalidasNombre(){
    var dialogRef = this.dialog.open(BuscarNombreComponent,{width:'700px', data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!= undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresosNombre(){

    var dialogRef = this.dialog.open(BuscarNombreComponent, {width:'700px',data:"ingresos"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos;
      }
    })
  }
  mayorIngresosNombreFecha(){

    var dialogRef = this.dialog.open(BuscarNombreFechaComponent,{width:'700px',data:"ingresos"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  mayorSalidasNombreFecha(){

    var dialogRef =this.dialog.open(BuscarNombreFechaComponent,{width:'700px',data:"salidas"});
    dialogRef.afterClosed().subscribe((datos: string[])=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  entre2fechas(){
    var dialogRef = this.dialog.open(Entre2fechasComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string)=>{
      this.valor=datos;
    })
  }
  kardexFecha(){
    var dialogRef = this.dialog.open(dateFindComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string)=>{

      this.valor=datos;
    })
  }
  kardexNombre(){
    var dialogRef =this.dialog.open(BuscarNombreComponent, {width:'700px',data:"kardex"});
    dialogRef.afterClosed().subscribe((datos: string)=>{
      if(datos!=undefined){

        this.valor=datos;
      }
    })
  }
  kardexNombreFecha(){
    var dialogRef = this.dialog.open(BuscarNombreFechaComponent,{width:'700px',data:"kardex"})
    dialogRef.afterClosed().subscribe((datos: string[])=>{
      if(datos!=undefined){
        this.valor=datos[0]+"/"+datos[1];
      }
    })
  }
  cortarDatos(datos:ItemProductoModel[]){
    var valor=[];
    var cortar = datos.length/3000;
    for(var i=0; i<cortar;i++){
      var resultado = datos.splice(0,3000);
      valor.push(resultado);
    }
    return valor;
  }
  fechas(input: string){

  }
  atras(){
    if(this.limiteVector==0){
      alert("acción no permitida");
    }else{
      this.limiteVector-=1;
      this.dataSource.data=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  adelante(){
    if(this.limiteVector==this.nuevoVector.length-1){
      alert("acción no permitida");
    }else{
      this.limiteVector+=1;
      this.dataSource.data=this.nuevoVector[this.limiteVector];
      this.displayedColumns=['id','enlace'];
    }
  }
  obtenerDatos(id: String){}
  eliminar(id:String){}
  abrirDialog(){}
  hacerFiltro(filtro:string){
    this.dataSource.filter=filtro;
    console.log(this.dataSource.filteredData); // para imprimir
  }
  imprimirTodo(){
    if(this.modulo =="ingreso"){

      this.serviceImprimirConsulta.imprimirMayorIngresos(this.dataSource.data);
    }else if(this.modulo =="salida"){

      this.serviceImprimirConsulta.imprimirMayorSalidas(this.dataSource.data);
    }else if(this.modulo =="kardex"){

      this.serviceImprimirConsulta.imprimirKardex(this.dataSource.data);
    }else if(this.modulo =="periodo"){

      this.serviceImprimirConsulta.productoPeriodo(this.dataSource.data);
    }else if (this.modulo =="1000datos"){

      this.serviceImprimirConsulta.datos1000(this.dataSource.data);
    }
  }
  imprimirBuscados(){}
}
