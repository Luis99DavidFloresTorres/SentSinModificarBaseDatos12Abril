package com.example.springprueba.controller;
import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.functions.facades.FacadeProducto;
import com.example.springprueba.functions.ProductsModules;
import com.example.springprueba.functions.factories.FactoryProducto;
import com.example.springprueba.functions.operationRestrict;
import com.example.springprueba.model.cliente;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.transactionProduct;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoTransproducto;
import com.example.springprueba.repo.RepoUltimoNro;
import com.example.springprueba.responsesJson.FechaNombre;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.ServiceItemProducto;
import com.example.springprueba.service.ServiceUltimoNro;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/itemProducto")
public class ControllerItemProducto extends operationRestrict{
    private final ServiceItemProducto serviceItemProducto;
    private final ProductsModules productsModules;
    private final RepoItemProducto repoItemProducto;
    private final FacadeProducto facadeProducto;
    private final RepoTransproducto repoTransproducto;
    private final ServiceUltimoNro serviceUltimoNro;
    private final FactoryProducto factoryProducto;
    public ControllerItemProducto(ServiceItemProducto serviceItemProducto, ProductsModules productsModules1, FacadeProducto facadeProducto1,
                                  RepoItemProducto repoItemProducto, RepoTransproducto repoTransproducto, ServiceUltimoNro serviceUltimoNro, FactoryProducto factoryProducto){
        this.serviceItemProducto = serviceItemProducto;
        this.productsModules = productsModules1;
        this.facadeProducto = facadeProducto1;
        this.repoItemProducto = repoItemProducto;
        this.repoTransproducto= repoTransproducto;
        this.serviceUltimoNro = serviceUltimoNro;
        this.factoryProducto = factoryProducto;
    }
    @GetMapping
    public ResponseEntity<List<itemProducto>> getItemProductos(){ //metodo Page es para cuando tienes muchos datos aun en la base de datos para consultar
        List<itemProducto> productoList = serviceItemProducto.obtenerNormal();
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/byTransproducto/{id}")
    public ResponseEntity<List<itemProducto>> getItemsProductosByTransproducto(@PathVariable("id") Long id){
        transactionProduct transactionProduct = this.repoTransproducto.findById(id).orElseThrow(()->new ExceptionGeneral("Error"));
        List<itemProducto> productoList = repoItemProducto.findByTransproducto(transactionProduct);
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/getProductoItemProducto")
    public ResponseEntity<List<itemProducto>> getObtenerProductoItemProducto(){

        List<itemProducto> productoList = serviceItemProducto.obtenerDatosProductoItemProducto();
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/getPorFechas1000")
    public ResponseEntity<List<itemProducto>> get1000Datos(){
        List<itemProducto> productoList = serviceItemProducto.primeros1000PorFecha(1000);
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @GetMapping("/findSeriales")
    public ResponseEntity<List<String>> findSeriales(){
        List<itemProducto> productoList = repoItemProducto.seriales();
        List<String> seriales = new ArrayList<>();
        productoList.forEach(data->{
            if(!Objects.isNull(data.getSerial())){
                seriales.add(data.getSerial());
            }
        });
        return new ResponseEntity<>(seriales, HttpStatus.OK);
    }
    /*@PostMapping("/getPageable")
    public ResponseEntity<Page<itemProducto>> getPageable(@PageableDefault(size = 1000, sort = "costome") Pageable pageable){
        Page<itemProducto> productoList = repoItemProducto.findAll(pageable);
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }*/
    @PostMapping("/getOperaciones")
    public ResponseEntity<List<itemProducto>> getOpeSaldoInv(@RequestBody String fecha) throws ParseException {

        List<itemProducto> itemProductoList = serviceItemProducto.obtenerDatosIdProducto();
        SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");

       // LocalDateTime date1 = LocalDateTime.parse(fecha);
        Date date1 = dateFormat.parse(fecha);
        List<itemProducto> restrictResult =  this.productsModules.productoPeriodoC(itemProductoList,date1);
        return new ResponseEntity<>(restrictResult, HttpStatus.OK);
    }
    @PostMapping("/getOperaciones/{fecha1}/{fecha2}")
    public ResponseEntity<List<itemProducto>> getPeriodoEntre2fechas(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2) throws ParseException {

        List<itemProducto> itemProductoList = serviceItemProducto.obtenerDatosIdProducto();
        List<itemProducto> restrictResult =  this.productsModules.periodoEntre2Fechas(itemProductoList,fecha1,fecha2);
        return new ResponseEntity<>(restrictResult, HttpStatus.OK);
    }
    @GetMapping("/getIva")
    public ResponseEntity<List<itemProducto>> getIva() throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");
        String fechaVerificar = "2016-07-26";
        Date date1 = dateFormat.parse(fechaVerificar);
       // LocalDateTime date1 = LocalDateTime.parse(fechaVerificar);
        List<itemProducto> restrictResult =  this.productsModules.ivaPreciosValoradoC(date1);
        return new ResponseEntity<>(restrictResult, HttpStatus.OK);
    }
    @PostMapping("/mayorIngresos")
    public ResponseEntity<List<itemProducto>> mayorIngresos(@RequestBody FechaNombre body) throws ParseException {
        String fecha = body.getFecha();
        String nombre = body.getNombre();
        List<itemProducto> itemProductosList  = facadeProducto.getIngresos(nombre, fecha);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/mayorSalidas")
    public ResponseEntity<List<itemProducto>> mayorSalidas(@RequestBody FechaNombre body) throws ParseException {
        String fecha = body.getFecha();
        String nombre = body.getNombre();
        List<itemProducto> itemProductosList  = facadeProducto.getSalidas(nombre,fecha);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/kardex")
    public ResponseEntity<List<itemProducto>> kardexProductos(@RequestBody FechaNombre body) throws ParseException {
        String fecha = body.getFecha();
        String nombre = body.getNombre();
        List<itemProducto> itemProductosList  = facadeProducto.getKardex(nombre,fecha);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> addProducto(@RequestBody ArrayList<itemProducto> itemsProducto) throws ParseException{
        int nrodoc = itemsProducto.get(0).getTransproducto().getNrodoc();
        int ope = itemsProducto.get(0).getTransproducto().getOper();
        facadeProducto.costoPromedioActualizar(itemsProducto);  // actualizar costos de productos si es que fueron ingresados ( operacion < 320)
        Long id = repoTransproducto.findByNrodocAndOper(itemsProducto.get(0).getTransproducto().getNrodoc(), itemsProducto.get(0).getTransproducto().getOper()).getId();
        transactionProduct transactionProduct = itemsProducto.get(0).getTransproducto(); //obtener transpoducto  (sin id)
        transactionProduct.setId(id);
        transactionProduct result = repoTransproducto.save(transactionProduct); // registrar transproducto  (con id)
        itemsProducto.forEach(datos -> {
           datos.setTransproducto(result);          // actualizar transproducto registrado (con id)
        });
        repoItemProducto.saveAll(itemsProducto);
        this.serviceUltimoNro.insertarAlmacenUltimoNro(ope,nrodoc);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta("exito");
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }
    @GetMapping("/tablasEntregaporCliente/{fecha1}/{fecha2}/{nombreCliente}")
    public ResponseEntity<List<itemProducto>> entregaProductoPorcliente(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2,@PathVariable("nombreCliente") String nombreCliente) throws ParseException {

        List<itemProducto> productoPorCliente =  this.factoryProducto.entregaProductosPorCliente(fecha1,fecha2,nombreCliente);
        return new ResponseEntity<>(productoPorCliente, HttpStatus.OK);
    }
}
