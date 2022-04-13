import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ModelCliente } from 'src/app/Models/Cliente.model';
import { CotizacionModel } from 'src/app/Models/Cotizacion.model';
import { ServiceCliente } from 'src/app/services/Cliente.service';
import { ServiceCotizacionCliente } from 'src/app/services/CotizacionCliente.service';
import { ServiceItemCompra_OrdenCompra } from 'src/app/services/ItemCompra_OrdenCompra.service';

@Component({
  selector: 'app-cotizacionespor-cliente',
  templateUrl: './cotizacionespor-cliente.component.html',
  styleUrls: ['./cotizacionespor-cliente.component.css']
})
export class CotizacionesporClienteComponent implements OnInit {
  filteredOptions :Observable<string[]>|any;
  options:String[] = [];
  sujeto = new Subject();
  formGroup:FormGroup|any;
  activar=false;
  dataSource= new MatTableDataSource<CotizacionModel>();
  displayedColumns:String[] = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<any>, private serviceCliente:ServiceCliente, private serviceCotizacion: ServiceCotizacionCliente) {
    this.dateAdapter.setLocale('es');
   }

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({

      myControl:['',[Validators.required]]
    })
    this.filteredOptions = this.formGroup.get('myControl').valueChanges.pipe(
      takeUntil(this.sujeto),
      startWith(''),
      map((value:String) => this._filter(value))

    );
    //this.serviceCliente.
  }
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    var palabra =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    return palabra;
  }
  buscar(){

    this.activar=true;
    this.serviceCotizacion.productoOrdenCompra(this.range.get('start')?.value,this.range.get('end')?.value, this.formGroup.get('myControl').value);
    this.serviceCotizacion.listenerCotizacion().subscribe(cotizacion=>{
      this.dataSource.data = cotizacion
      this.displayedColumns = ['fecha','nrodoc','useract','oper','detalle'];
    })
  }
}
