import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/Models/producto.model';
import { ServiceProducto } from 'src/app/services/producto.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  productos:ProductoModel[]=[]
  constructor(private serviceProducto: ServiceProducto) { }

  ngOnInit(): void {
    this.serviceProducto.clienteShow();
    this.serviceProducto.listenerClienteShow().subscribe(datos=>{
      this.productos = datos;
    })
  }

}
