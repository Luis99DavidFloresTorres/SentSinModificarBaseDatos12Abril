import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ItemProductoModel } from 'src/app/Models/itemProducto.model';
import { ProveedorModel } from 'src/app/Models/proveedor.model';
import { ServiceItemCompra_OrdenCompra } from 'src/app/services/ItemCompra_OrdenCompra.service';
import { ServiceProveedor } from 'src/app/services/proveedor.service';
import { BuscarProveedoresComponent } from '../buscar-proveedores/buscar-proveedores.component';

@Component({
  selector: 'app-mayorde-ordencompras2',
  templateUrl: './mayorde-ordencompras2.component.html',
  styleUrls: ['./mayorde-ordencompras2.component.css']
})
export class MayordeOrdencompras2Component implements OnInit {

  // este no
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;
  activar=false;
  dataSource= new MatTableDataSource<ItemProductoModel>();
  displayedColumns:String[] = ['cantidad','costo','costoTotal']
  proveedorModel : ProveedorModel|any;
  @ViewChild(MatSort) sort: MatSort | any;
  proveedoresAll:ProveedorModel[] = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceProveedor:ServiceProveedor, private dialog:MatDialog, private serviceItemCompra_OrdenCompra:ServiceItemCompra_OrdenCompra) {
    this.dateAdapter.setLocale('es');
   }


  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })


    this.serviceProveedor.listenerProductoItemOrdenCompra().subscribe(data=>{
      this.proveedorModel = data;
      this.formGroup.get('myControl').setValue(data.nombre);
    })
  }
  ngAfterViewInit (){

    this.dataSource.sort = this.sort;
  }
  buscar(){
    this.activar=true;

    this.serviceItemCompra_OrdenCompra.mayorProductoCompra(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.serviceItemCompra_OrdenCompra.listenerMayorProductoCompra().subscribe((mayorProductosCompra:any)=>{
      this.dataSource.data = mayorProductosCompra
     //'transproducto.fecha','transproducto.nrodoc','transproducto.oper','transproducto.factura','producto.nombre',
    })
  }

}


