package com.example.springprueba.controller;

import com.example.springprueba.functions.factories.FactoryProveedores;
import com.example.springprueba.model.itemProducto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/api/itemcompra_ordencompra")
public class ControllerItemcompra_OrdenCompra {
    private final FactoryProveedores factoryProveedores;
    public ControllerItemcompra_OrdenCompra(FactoryProveedores factoryProveedores){
        this.factoryProveedores = factoryProveedores;
    }
    @GetMapping("/tablas/{nombre}/{fecha1}/{fecha2}/{nombreProveedor}")
    public ResponseEntity<List<?>> tablasConsulta(@PathVariable("nombre") String nombre, @PathVariable("fecha1") Date fecha1, @PathVariable("fecha2") Date fecha2, @PathVariable("nombreProveedor") String nombreProveedor){
        List<?> listaTablaProveedor = this.factoryProveedores.tablas(nombre, fecha1, fecha2, nombreProveedor);
        return new ResponseEntity<>(listaTablaProveedor, HttpStatus.OK);
    }
}
