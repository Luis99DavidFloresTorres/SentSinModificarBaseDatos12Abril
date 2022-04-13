import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';
import { BuscarClientesComponent } from '../buscar-clientes/buscar-clientes.component';

@Component({
  selector: 'app-entrega-productopor-cliente',
  templateUrl: './entrega-productopor-cliente.component.html',
  styleUrls: ['./entrega-productopor-cliente.component.css']
})
export class EntregaProductoporClienteComponent implements OnInit {
  subscriptionAllclientes:Subscription|any;
  subscriptionCliente :Subscription|any;
  subscriptionProveedor2Fechas:Subscription|any;
  subscriptionMayordeCompras:Subscription|any;
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;
  activar=false;
  dataSource= new MatTableDataSource<ItemProductoModel>();
  displayedColumns:String[] = []
  clienteModel : ModelCliente|any;
  clienteAll:ModelCliente[] = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceCliente:ServiceCliente, private dialog:MatDialog, private serviceItemProducto:ServiceItemProducto) {
    this.dateAdapter.setLocale('es');
   }
  ngOnDestroy(): void {
    if(this.subscriptionAllclientes!=undefined){
      this.subscriptionAllclientes.unsubscribe();
    }
    if(this.subscriptionCliente!=undefined){
      this.subscriptionCliente.unsubscribe();
    }
    if(this.subscriptionProveedor2Fechas!=undefined){
      this.subscriptionProveedor2Fechas.unsubscribe();
    }
    if(this.subscriptionMayordeCompras!=undefined){
      this.subscriptionMayordeCompras.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })

    this.serviceCliente.allClientes();
    this.subscriptionAllclientes = this.serviceCliente.listenerAllClientes().subscribe(data=>{
      this.clienteAll = data;
      var clienteNombre:String[] = []
      data.forEach(proveedor=>{
        clienteNombre.push(proveedor.nombre);
      })
      this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
        takeUntil(this.sujeto),
        startWith(''),
        map((value:String) => this._filter(value))
      );
      this.options = clienteNombre;
    })
    this.subscriptionCliente = this.serviceCliente.listenerEncontrarProductoPorCliente().subscribe(data=>{
      this.clienteModel = data;
      this.formGroup.get('myControl').setValue(data.nombre);
    })
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  buscar(){
    this.activar=true;
    if(this.subscriptionMayordeCompras!=undefined){
      this.subscriptionMayordeCompras.unsubscribe();
    }
    this.serviceItemProducto.entregaProductoPorCliente(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.subscriptionMayordeCompras= this.serviceItemProducto.listenerBuscarEntregasProductoPorCliente().subscribe((mayorProductosCompra:any)=>{
      this.dataSource.data = mayorProductosCompra
      this.displayedColumns = ['transproducto.fecha','transproducto.nrodoc','transproducto.oper','productoNombre','cantidad','precioProducto','costo','costoTotal'];
    })
  }
  buscarClientes(){
    var enviar = {datos:this.clienteAll, clase:'entregaProductoPorCliente'};
    this.dialog.open(BuscarClientesComponent,{width:'700px',height:'800px', data:enviar});
  }
  hacerFiltro(filtro: string){
    this.dataSource.filter = filtro;
  }
}
