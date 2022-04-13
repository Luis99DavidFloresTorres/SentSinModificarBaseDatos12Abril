package com.example.springprueba.controller;
import com.example.springprueba.functions.DepositoModules;
//import com.example.springprueba.functions.codigo.CodigoProducto;
import com.example.springprueba.functions.facades.DepositoFacade;

import com.example.springprueba.model.itemProducto;
import com.example.springprueba.model.producto;
import com.example.springprueba.responsesJson.DepositoFechaNombre;
import com.example.springprueba.responsesJson.DepositoFechaOperacion;

import com.example.springprueba.service.ServiceItemProducto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/api/itemDepositoProducto")
public class ControllerItemDepositoProducto {
    private final DepositoFacade depositoFacadeProducto;
    private final ServiceItemProducto serviceItemProducto;
    private final DepositoModules depositoModules;
    public ControllerItemDepositoProducto(DepositoFacade depositoFacadeProducto1, ServiceItemProducto serviceItemProducto, DepositoModules depositoModules){
        this.depositoFacadeProducto = depositoFacadeProducto1;
        this.serviceItemProducto = serviceItemProducto;
        this.depositoModules = depositoModules;
    }
    @GetMapping("/getPorFechas1000")
    public ResponseEntity<List<itemProducto>> get1000Datos(){
        List<itemProducto> productoList = serviceItemProducto.primeros1000PorFechaYDeposito(1000);
        return new ResponseEntity<>(productoList, HttpStatus.OK);
    }
    @PostMapping("/mayorIngresos")
    public ResponseEntity<List<itemProducto>> mayorIngresos(@RequestBody DepositoFechaNombre body) throws ParseException {
        String fecha = body.getFecha();
        String nombre = body.getNombre();
        String depositoNombre = body.getDepositoNombre();
        List<itemProducto> itemProductosList  = depositoFacadeProducto.getIngresos(nombre, fecha, depositoNombre);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/mayorSalidas")
    public ResponseEntity<List<itemProducto>> mayorSalidas(@RequestBody DepositoFechaNombre body) throws ParseException {
        String fecha = body.getFecha();
        String nombre = body.getNombre();
        String depositoNombre = body.getDepositoNombre();
        List<itemProducto> itemProductosList  = depositoFacadeProducto.getSalidas(nombre,fecha, depositoNombre);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/kardexDeposito")
    public ResponseEntity<List<itemProducto>> kardexWareHouse(@RequestBody DepositoFechaNombre body) throws ParseException {
        String fecha = body.getFecha();
        String nombre = body.getNombre();
        String depositoNombre = body.getDepositoNombre();
        List<itemProducto> itemProductosList  = depositoFacadeProducto.getKardex(nombre,fecha, depositoNombre);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/operaciones")
    public ResponseEntity<List<itemProducto>> mayorIngresosOperaciones(@RequestBody DepositoFechaOperacion body) throws ParseException {
        String fecha = body.getFecha();
       String operacion = body.getOperacion();

        List<itemProducto> itemProductosList  = depositoFacadeProducto.getIngresosOperaciones(operacion, fecha);
        return new ResponseEntity<>(itemProductosList, HttpStatus.OK);
    }
    @PostMapping("/getOperaciones/{fecha1}/{fecha2}/{depositoNombre}")
    public ResponseEntity<List<itemProducto>> getPeriodoEntre2fechas(@PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("depositoNombre") String depositoNombre) throws ParseException {
        List<itemProducto> itemProductoList = this.serviceItemProducto.obtenerDatosIdProductoPorDeposito(depositoNombre);


        if(itemProductoList.size() > 0){
            List<itemProducto> restrictResult =  depositoModules.periodoEntre2Fechas(itemProductoList,fecha1,fecha2,depositoNombre);
            return new ResponseEntity<>(restrictResult, HttpStatus.OK);
        }
        itemProducto itemProducto = new itemProducto();
        itemProducto.setNombre("No existe movimiento en este almacen");
        itemProductoList.add(itemProducto);
        return new ResponseEntity<>(itemProductoList, HttpStatus.OK);
    }
}
