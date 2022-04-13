import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BarraComponent } from './barraI/barra/barra.component';
import { MenuListaComponent } from './menu-lista/menu-lista.component';
import {FlexLayoutModule} from'@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaisesComponent } from './contenido/barra/codificador/paises/paises.component';
import { CiudadesComponent } from './contenido/barra/codificador/ciudades/ciudades.component';
import { CiudadesInsertarComponent } from './contenido/barra/codificador/ciudades/ciudadesInsertar.component';
import { ZonasComponent } from './contenido/barra/codificador/zonas/zonas.component';
import { UnidadesComponent } from './contenido/barra/codificador/unidades/unidades.component';
import { RubrosComponent } from './contenido/barra/codificador/rubros/rubros.component';
import { TiposClienteComponent } from './contenido/barra/codificador/tipos-cliente/tipos-cliente.component';
import { TiposClienteInsertarComponent } from './contenido/barra/codificador/tipos-cliente/tipos-clienteInsertar.component';
import { TiposGastoComponent } from './contenido/barra/codificador/tipos-gasto/tipos-gasto.component';
import { TiposGastoInsertarComponent } from './contenido/barra/codificador/tipos-gasto/tipos-gastoInsertar.component';
import { DepositosComponent } from './contenido/barra/codificador/depositos/depositos.component';
import { PaisInsertarComponent } from './contenido/barra/codificador/paises/paisInsertar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DepositoInsertarComponent } from './contenido/barra/codificador/depositos/depositoInsertar.component';
import { RubrosInsertarComponent } from './contenido/barra/codificador/rubros/rubrosInsertar.component';
import { UnidadInsertarComponent } from './contenido/barra/codificador/unidades/unidadInsertar.component';
import { ZonasInsertarComponent } from './contenido/barra/codificador/zonas/zonasInsertar.component';
import { ServiceZona } from './services/codificadores/zona.service';
import { GestionProductoComponent } from './contenido/barra/producto/gestion-producto/gestion-producto.component';
import { ServiceProducto } from './services/producto.service';
import { MostrarFormProductoComponent } from './contenido/barra/producto/mostrar-form-producto/mostrar-form-producto.component';
import { GestionProveedorComponent } from './contenido/barra/proveedores/gestion-proveedor/gestion-proveedor.component';
import { ServiceCiudad } from './services/codificadores/ciudad.service';
import { ServiceDeposito } from './services/codificadores/deposito.service';
import { ServicePais } from './services/codificadores/pais.service';
import { ServiceRubro } from './services/codificadores/rubro.service';
import { ServiceTipoCliente } from './services/codificadores/tipoCliente.service';
import { ServiceTipoGasto } from './services/codificadores/tipoGasto.service';
import { ItemProductoComponent } from './contenido/barra/item-producto/item-producto.component';
import { ServiceItemProducto } from './services/itemProducto.service';
import { ItemProyectoComponent } from './contenido/barra/item-proyecto/item-proyecto.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { dateFindComponent } from './contenido/barra/item-producto/dateFind.component';
import { OperacionPipe } from './contenido/barra/item-producto/pipeOperacion.component';
import { BuscarNombreComponent } from './contenido/barra/item-producto/buscar-nombre/buscar-nombre.component';
import { BuscarNombreFechaComponent } from './contenido/barra/item-producto/buscar-nombre-fecha/buscar-nombre-fecha.component';
import { ItemDepositoComponent } from './contenido/barra/item-deposito/item-deposito.component';
import { BuscarFechaComponent } from './contenido/barra/item-deposito/buscar-fecha/buscar-fecha.component';
import { BuscarNombreDepositoComponent } from './contenido/barra/item-deposito/buscar-nombre-deposito/buscar-nombre-deposito.component';
import { BuscarNombreFechaDepositoComponent } from './contenido/barra/item-deposito/buscar-nombre-fecha-deposito/buscar-nombre-fecha-deposito.component';
import { OperacionDepositoPipe } from './contenido/barra/item-deposito/pipeOperacion.component';
import { BuscarOperacionesComponent } from './contenido/barra/item-deposito/buscar-operaciones/buscar-operaciones.component';
import { EliminarComponent } from './contenido/barra/producto/gestion-producto/eliminar.component';
import { LoginComponent } from './contenido/login/login.component';
import { InsertWithStepperComponent } from './contenido/barra/producto/insert-with-stepper/insert-with-stepper.component';
import { AdministrarUsuarioComponent } from './barraI/barra/administrar-usuario/administrar-usuario.component';
import { EditarComponent } from './barraI/barra/administrar-usuario/editar/editar.component';
import { GestionUsuarioComponent } from './barraI/barra/gestion-usuario/gestion-usuario.component';
import { ServiceNivelUsuario } from './services/NivelUsuarioService.service';
import { AgregarNivelComponent } from './barraI/barra/gestion-usuario/agregar-nivel/agregar-nivel.component';
import { AddUsuarioComponent } from './barraI/barra/gestion-usuario/add-usuario/add-usuario.component';
import { SeguridadGuard } from './seguridad/seguridadGestionProducto/seguridad.guard';
import { PaginaInicialComponent } from './contenido/pagina-inicial/pagina-inicial.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AlmacenComponent } from './contenido/barra/almacen/almacen.component';
import { EntradaProductoComponent } from './contenido/barra/almacen/entrada-producto/entrada-producto.component';
import { SalidaProductoComponent } from './contenido/barra/almacen/salida-producto/salida-producto.component';
import { ItemSalidaComponent } from './contenido/barra/almacen/salida-producto/item-salida/item-salida.component';
import { EncabezadoDocumentoComponent } from './contenido/barra/almacen/salida-producto/encabezado-documento/encabezado-documento.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ItemEntradaComponent } from './contenido/barra/almacen/entrada-producto/item-entrada/item-entrada.component';

import { EncabezadoEntradaComponent } from './contenido/barra/almacen/entrada-producto/encabezado-entrada/encabezado-entrada.component';
import { CotizacionClienteComponent } from './contenido/barra/cotizacion-cliente/cotizacion-cliente.component';

import { OrdencompraComponent } from './contenido/barra/ordencompra/ordencompra.component';
import { EncabezadoOrdenCompraComponent } from './contenido/barra/ordencompra/encabezado-orden-compra/encabezado-orden-compra.component';
import { ItemsOrdenCompraComponent } from './contenido/barra/ordencompra/items-orden-compra/items-orden-compra.component';
import { NotaventaComponent } from './contenido/barra/notaventa/notaventa.component';
import { EncabezadoNotaventaComponent } from './contenido/barra/notaventa/encabezado-notaventa/encabezado-notaventa.component';
import { ItemsNotaVentaComponent } from './contenido/barra/notaventa/items-nota-venta/items-nota-venta.component';

import { EncabezadoCotizclienteComponent } from './contenido/barra/cotizacion-cliente/encabezado-cotizcliente/encabezado-cotizcliente.component';
import { ItemsCotizclienteComponent } from './contenido/barra/cotizacion-cliente/items-cotizcliente/items-cotizcliente.component';
import { NotaVentaRecuperarComponent } from './contenido/barra/RecuperarDocumentos/nota-venta-recuperar/nota-venta-recuperar.component';
import { NotaEntradaRecuperarComponent } from './contenido/barra/RecuperarDocumentos/nota-entrada-recuperar/nota-entrada-recuperar.component';
import { NotaSalidaRecuperarComponent } from './contenido/barra/RecuperarDocumentos/nota-salida-recuperar/nota-salida-recuperar.component';
import { NotaCotizacionRecuperarComponent } from './contenido/barra/RecuperarDocumentos/nota-cotizacion-recuperar/nota-cotizacion-recuperar.component';
import { NullWithDefaultPipe } from './contenido/barra/RecuperarDocumentos/Null-With-Default.component';
import { NotaOrdenCompraComponent } from './contenido/barra/RecuperarDocumentos/nota-orden-compra/nota-orden-compra.component';
import { CodigoNull } from './contenido/barra/notaventa/codigoNull.component';
import { ImprimirProyectoComponent } from './contenido/barra/cotizacion-cliente/imprimir-proyecto/imprimir-proyecto.component';
import { ProductoPadreComponent } from './contenido/barra/cotizacion-cliente/producto-padre/producto-padre.component';
import { PipeNivelPipe } from './contenido/barra/cotizacion-cliente/pipe-nivel.pipe';
import { ArbolProyectosComponent } from './contenido/barra/cotizacion-cliente/arbol-proyectos/arbol-proyectos.component';
import { PipePipe } from './contenido/barra/cotizacion-cliente/items-cotizcliente/pipe.pipe';
import { Entre2fechasComponent } from './contenido/barra/item-producto/entre2fechas/entre2fechas.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Entre2fechasDepositoComponent } from './contenido/barra/item-deposito/entre2fechas-deposito/entre2fechas-deposito.component';
import { FormularioGestionclienteComponent } from './contenido/barra/cliente/gestion-cliente/formulario-gestioncliente/formulario-gestioncliente.component';
import { BuscarClientesComponent } from './contenido/barra/cliente/buscar-clientes/buscar-clientes.component';
import { BuscarProveedoresComponent } from './contenido/barra/proveedores/buscar-proveedores/buscar-proveedores.component';
import { CotizacionesporClienteComponent } from './contenido/barra/cliente/cotizacionespor-cliente/cotizacionespor-cliente.component';
import { MayordeComprasComponent } from './contenido/barra/proveedores/mayorde-compras/mayorde-compras.component';
import { MayorordenesCompraComponent } from './contenido/barra/proveedores/mayorordenes-compra/mayorordenes-compra.component';
import { MayorcotizacionesProvComponent } from './contenido/barra/proveedores/mayorcotizaciones-prov/mayorcotizaciones-prov.component';
import { ProductoOrdenCompraProvComponent } from './contenido/barra/proveedores/producto-orden-compra-prov/producto-orden-compra-prov.component';
import {MayordeProductosCompraProvComponent} from './contenido/barra/proveedores/mayorde-productos-compra-prov/mayorde-productos-compra-prov.component';
import { ProductosCotizacionProvComponent } from './contenido/barra/proveedores/productos-cotizacion-prov/productos-cotizacion-prov.component';
import { VentasporClienteComponent } from './contenido/barra/cliente/ventaspor-cliente/ventaspor-cliente.component';
import { EntregaProductoporClienteComponent } from './contenido/barra/cliente/entrega-productopor-cliente/entrega-productopor-cliente.component';
@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    MenuListaComponent,
    PaisesComponent,
    CiudadesComponent,
    ZonasComponent,
    UnidadesComponent,
    RubrosComponent,
    TiposClienteComponent,
    TiposGastoComponent,
    DepositosComponent,
    PaisInsertarComponent,
    DepositoInsertarComponent,
    RubrosInsertarComponent,
    CiudadesInsertarComponent,
    TiposClienteInsertarComponent,
    TiposGastoInsertarComponent,
    UnidadInsertarComponent,
    ZonasInsertarComponent,
    GestionProductoComponent,
    GestionProveedorComponent,
    MostrarFormProductoComponent,
    ItemProductoComponent,
    ItemProyectoComponent,
    dateFindComponent,
    OperacionPipe,
    BuscarNombreComponent,
    BuscarNombreFechaComponent,
    ItemDepositoComponent,
    BuscarFechaComponent,
    BuscarNombreDepositoComponent,
    BuscarNombreFechaDepositoComponent,
    OperacionDepositoPipe,
    BuscarOperacionesComponent,
    EliminarComponent,
    LoginComponent,
    InsertWithStepperComponent,
    AdministrarUsuarioComponent,
    EditarComponent,
    GestionUsuarioComponent,
    AgregarNivelComponent,
    AddUsuarioComponent,
    PaginaInicialComponent,
    AlmacenComponent,
    EntradaProductoComponent,
    SalidaProductoComponent,
    ItemSalidaComponent,
    EncabezadoDocumentoComponent,
    ItemEntradaComponent,
    EncabezadoEntradaComponent,
    CotizacionClienteComponent,
    OrdencompraComponent,
    EncabezadoOrdenCompraComponent,
    ItemsOrdenCompraComponent,
    NotaventaComponent,
    EncabezadoNotaventaComponent,
    ItemsNotaVentaComponent,
    EncabezadoCotizclienteComponent,
    ItemsCotizclienteComponent,
    NotaVentaRecuperarComponent,
    NotaEntradaRecuperarComponent,
    NotaSalidaRecuperarComponent,
    NotaCotizacionRecuperarComponent,
    NullWithDefaultPipe,
    NotaOrdenCompraComponent,
    CodigoNull,
    ImprimirProyectoComponent,
    ProductoPadreComponent,
    PipeNivelPipe,
    ArbolProyectosComponent,
    PipePipe,
    Entre2fechasComponent,
    Entre2fechasDepositoComponent,
    FormularioGestionclienteComponent,
    BuscarClientesComponent,
    BuscarProveedoresComponent,
    CotizacionesporClienteComponent,
    MayordeComprasComponent,
    MayorordenesCompraComponent,
    MayorcotizacionesProvComponent,
    ProductoOrdenCompraProvComponent,
    MayordeProductosCompraProvComponent,
    ProductosCotizacionProvComponent,
    VentasporClienteComponent,
    EntregaProductoporClienteComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    InfiniteScrollModule,
    NgxBarcodeModule,

  ],
  providers: [
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    ServiceZona,ServiceProducto, ServiceCiudad, ServiceDeposito, ServicePais, ServiceRubro, ServiceTipoCliente, ServiceTipoGasto, ServiceItemProducto, ServiceNivelUsuario],
  bootstrap: [AppComponent],
  entryComponents:[ PaisInsertarComponent,DepositoInsertarComponent,RubrosInsertarComponent,CiudadesInsertarComponent,TiposClienteInsertarComponent,TiposGastoInsertarComponent,UnidadInsertarComponent,ZonasInsertarComponent,MostrarFormProductoComponent, dateFindComponent, BuscarNombreComponent, ItemProductoComponent]
})
export class AppModule {}
