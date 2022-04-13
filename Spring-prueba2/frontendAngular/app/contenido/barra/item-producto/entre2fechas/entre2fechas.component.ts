import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiceItemProducto } from 'src/app/services/itemProducto.service';

@Component({
  selector: 'app-entre2fechas',
  templateUrl: './entre2fechas.component.html',
  styleUrls: ['./entre2fechas.component.css']
})
export class Entre2fechasComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private serviceItemProducto:ServiceItemProducto, private matDialog:MatDialog) { }

  ngOnInit(): void {

  }
  buscar(){
    this.serviceItemProducto.obtenerPorPeriodoEntre2Fechas(this.range.get('start')?.value,this.range.get('end')?.value);
    this.matDialog.closeAll()
  }
}
