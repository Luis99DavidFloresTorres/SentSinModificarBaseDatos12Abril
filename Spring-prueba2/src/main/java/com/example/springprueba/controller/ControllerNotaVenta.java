package com.example.springprueba.controller;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.notaventa;
import com.example.springprueba.repo.RepoCliente;
import com.example.springprueba.repo.RepoNotaVenta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/notaventa")
public class ControllerNotaVenta {
    private final RepoNotaVenta repoNotaVenta;
    private final RepoCliente repoCliente;
    public ControllerNotaVenta(RepoNotaVenta repoNotaVenta, RepoCliente repoCliente){
        this.repoNotaVenta = repoNotaVenta;
        this.repoCliente = repoCliente;
    }
    @GetMapping("/obtenerNotasVenta")
    public ResponseEntity<List<notaventa>> obtenerTodo(){
        List<notaventa> notaventaList = repoNotaVenta.findAll();
        return new ResponseEntity<>(notaventaList, HttpStatus.OK);
    }
    @GetMapping("/porCliente/{fechaInicio}/{fechaFinal}/{nombreCliente}")
    public ResponseEntity<List<notaventa>> porClienteFechas(@PathVariable("fechaInicio") Date fechaInicio, @PathVariable("fechaFinal") Date fechaFinal, @PathVariable("nombreCliente") String nombreCliente ){

       // System.out.println(nombreCliente);
        cliente cliente = this.repoCliente.findByNombre(nombreCliente);

        List<notaventa> notaventa = this.repoNotaVenta.findByCliente(cliente);
        List<notaventa> filterArray = new ArrayList<>();
        System.out.println(notaventa.size());
        for(notaventa notaventaFor : notaventa){
          Date fechaNotaventa = notaventaFor.getFecha();
            if(((fechaNotaventa.after(fechaInicio)) || (fechaInicio.equals(fechaNotaventa))) && ((fechaNotaventa.before(fechaFinal)) || (fechaFinal.equals(fechaNotaventa)))){
                filterArray.add(notaventaFor);
            }
        }
        return new ResponseEntity<>(filterArray, HttpStatus.OK);
    }
}
