import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraComponent } from './barraI/barra/barra.component';
import { EntradaProductoComponent } from './contenido/barra/almacen/entrada-producto/entrada-producto.component';
import { ItemSalidaComponent } from './contenido/barra/almacen/salida-producto/item-salida/item-salida.component';
import { SalidaProductoComponent } from './contenido/barra/almacen/salida-producto/salida-producto.component';
import { CotizacionesporClienteComponent } from './contenido/barra/cliente/cotizacionespor-cliente/cotizacionespor-cliente.component';
import { EntregaProductoporClienteComponent } from './contenido/barra/cliente/entrega-productopor-cliente/entrega-productopor-cliente.component';
import { FormularioGestionclienteComponent } from './contenido/barra/cliente/gestion-cliente/formulario-gestioncliente/formulario-gestioncliente.component';
import { VentasporClienteComponent } from './contenido/barra/cliente/ventaspor-cliente/ventaspor-cliente.component';
import { CiudadesComponent } from './contenido/barra/codificador/ciudades/ciudades.component';
import { DepositosComponent } from './contenido/barra/codificador/depositos/depositos.component';
import { PaisesComponent } from './contenido/barra/codificador/paises/paises.component';
import { RubrosComponent } from './contenido/barra/codificador/rubros/rubros.component';
import { TiposClienteComponent } from './contenido/barra/codificador/tipos-cliente/tipos-cliente.component';
import { TiposGastoComponent } from './contenido/barra/codificador/tipos-gasto/tipos-gasto.component';
import { UnidadesComponent } from './contenido/barra/codificador/unidades/unidades.component';
import { ZonasComponent } from './contenido/barra/codificador/zonas/zonas.component';
import { ArbolProyectosComponent } from './contenido/barra/cotizacion-cliente/arbol-proyectos/arbol-proyectos.component';
import { CotizacionClienteComponent } from './contenido/barra/cotizacion-cliente/cotizacion-cliente.component';
import { ImprimirProyectoComponent } from './contenido/barra/cotizacion-cliente/imprimir-proyecto/imprimir-proyecto.component';
import { ItemDepositoComponent } from './contenido/barra/item-deposito/item-deposito.component';
import { ItemProductoComponent } from './contenido/barra/item-producto/item-producto.component';
import { ItemProyectoComponent } from './contenido/barra/item-proyecto/item-proyecto.component';
import { NotaventaComponent } from './contenido/barra/notaventa/notaventa.component';
import { OrdencompraComponent } from './contenido/barra/ordencompra/ordencompra.component';
import { GestionProductoComponent } from './contenido/barra/producto/gestion-producto/gestion-producto.component';
import { GestionProveedorComponent } from './contenido/barra/proveedores/gestion-proveedor/gestion-proveedor.component';
import { MayorcotizacionesProvComponent } from './contenido/barra/proveedores/mayorcotizaciones-prov/mayorcotizaciones-prov.component';
import { MayordeComprasComponent } from './contenido/barra/proveedores/mayorde-compras/mayorde-compras.component';
import { MayordeProductosCompraProvComponent } from './contenido/barra/proveedores/mayorde-productos-compra-prov/mayorde-productos-compra-prov.component';
import { MayorordenesCompraComponent } from './contenido/barra/proveedores/mayorordenes-compra/mayorordenes-compra.component';
import { ProductoOrdenCompraProvComponent } from './contenido/barra/proveedores/producto-orden-compra-prov/producto-orden-compra-prov.component';
import { ProductosCotizacionProvComponent } from './contenido/barra/proveedores/productos-cotizacion-prov/productos-cotizacion-prov.component';
import { LoginComponent } from './contenido/login/login.component';
import { PaginaInicialComponent } from './contenido/pagina-inicial/pagina-inicial.component';
import { SeguridadEntradaProductoGuard } from './seguridad/seguridadEntradaProducto/seguridad-entrada-producto.guard';
import { SeguridadGuard } from './seguridad/seguridadGestionProducto/seguridad.guard';
import { SeguridadItemDepositoGuard } from './seguridad/seguridadItemDeposito/seguridad-item-deposito.guard';
import { SeguridadItemProductoGuard } from './seguridad/seguridadItemProducto/seguridad-item-producto.guard';
import { NotaventaGuardGuard } from './seguridad/seguridadNotaVenta/notaventa-guard.guard';
import { SeguridadProyectoCotzGuard } from './seguridad/seguridadProyecto/seguridad-proyecto-cotz.guard';
import { SalidaProductoGuard } from './seguridad/seguridadSalidaProducto/salida-producto.guard';


const routes: Routes = [
  { path:'codificador/paises', component: PaisesComponent},
  { path:'codificador/ciudades', component: CiudadesComponent},
  { path:'codificador/zonas', component: ZonasComponent},
  { path:'codificador/unidades', component: UnidadesComponent},
  { path:'codificador/rubros', component: RubrosComponent},
  { path:'codificador/tipoClientes', component: TiposClienteComponent},
  { path:'codificador/tipoGastos', component: TiposGastoComponent},
  { path:'codificador/depositos', component: DepositosComponent},
  { path:'Gestion Productos', component: GestionProductoComponent, canActivate:[SeguridadGuard]},
  { path:'Gestion Cliente', component: FormularioGestionclienteComponent},
  { path:'Gestion Proveedor', component: GestionProveedorComponent},
  { path:'itemProducto', component: ItemProductoComponent, canActivate:[SeguridadItemProductoGuard]},
  { path:'itemProyecto', component: ItemProyectoComponent},
  { path:'itemDeposito', component: ItemDepositoComponent, canActivate:[SeguridadItemDepositoGuard]},
  { path:'salidaProducto', component: SalidaProductoComponent, canActivate:[SalidaProductoGuard]},
  { path:'entradaProducto', component: EntradaProductoComponent, canActivate:[SeguridadEntradaProductoGuard]},
  { path:'ordencompra', component: OrdencompraComponent, canActivate:[SalidaProductoGuard]},
  { path:'notaventa', component: NotaventaComponent, canActivate:[NotaventaGuardGuard]},
  { path:'cotizacionProyecto', component: CotizacionClienteComponent, canActivate:[SeguridadProyectoCotzGuard]},
  { path:'', component: LoginComponent},
  { path:'cotizacionesVenta', component: CotizacionesporClienteComponent},
  { path:'inicial', component: PaginaInicialComponent},
  { path:'mayordecompras', component: MayordeComprasComponent},
  { path:'mayorordencompras', component: MayorordenesCompraComponent},
  { path:'mayorcotizaciones', component: MayorcotizacionesProvComponent},
  { path:'productoOrdenCompra', component: ProductoOrdenCompraProvComponent},
  { path:'mayorproductosCompra', component:MayordeProductosCompraProvComponent},
  { path:'productoCotizacion', component:ProductosCotizacionProvComponent},
  { path:'entregaProductosPorCliente', component:EntregaProductoporClienteComponent},
  { path:'ventasPorCliente', component:VentasporClienteComponent},
  { path:'prueba', component: ImprimirProyectoComponent},
  { path:'prueba2', component: ArbolProyectosComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
