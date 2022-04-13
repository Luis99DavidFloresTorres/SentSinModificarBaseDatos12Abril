import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceDeposito } from 'src/app/services/codificadores/deposito.service';
import { ServiceItemDeposito } from 'src/app/services/itemDeposito.service';

@Component({
  selector: 'app-entre2fechas-deposito',
  templateUrl: './entre2fechas-deposito.component.html',
  styleUrls: ['./entre2fechas-deposito.component.css']
})
export class Entre2fechasDepositoComponent implements OnInit {
  depositos:String[]=[];
  deposito = new FormControl();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  depositoElegido:String="";
  constructor(private serviceItemDeposito:ServiceItemDeposito,  private matDialogRef: MatDialogRef<Entre2fechasDepositoComponent>, private depositoService: ServiceDeposito) { }

  ngOnInit(): void {

    this.depositoService.obtenerNombresDepositos();
    this.depositoService.listenerDatosNombresDepositos().subscribe(datos=>{
      this.depositos=datos;
    });
  }
  buscar(){
    this.serviceItemDeposito.obtenerPorPeriodoEntre2Fechas(this.range.get('start')?.value,this.range.get('end')?.value,this.depositoElegido.toString());
    var fecha1 = new Date(this.range.get('start')?.value);
    var fecha2 = new Date(this.range.get('end')?.value);

    var fecha1Formateada = fecha1.getFullYear()+"-"+(fecha1.getMonth()+1)+"-"+fecha1.getDate()
    var fecha2Formateada = fecha2.getFullYear()+"-"+(fecha2.getMonth()+1)+"-"+fecha2.getDate()
    console.log(fecha2Formateada);
    console.log(fecha1Formateada)
    var fecha = fecha1Formateada + " Hasta  "+fecha2Formateada
    this.matDialogRef.close(fecha);
  }
  depositoSeleccionado(deposito:String){
    this.depositoElegido =deposito;
  }
}
