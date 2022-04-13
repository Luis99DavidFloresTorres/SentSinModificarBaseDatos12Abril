package com.example.springprueba.controller;

import com.example.springprueba.functions.imprimir.Imprimir;
import com.example.springprueba.model.itemcompra;

import com.example.springprueba.model.ordencompra;
import com.example.springprueba.repo.RepoItemCompra;

import com.example.springprueba.repo.RepoOrdenCompra;
import com.example.springprueba.responsesJson.LoginResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itemCompra")
public class ControllerItemCompra {
    private RepoItemCompra repoItemCompra;
    private RepoOrdenCompra repoOrdenCompra;
    private Imprimir imprimir;
    public ControllerItemCompra(RepoItemCompra repoItemCompra, RepoOrdenCompra repoOrdenCompra, Imprimir imprimir){
        this.repoItemCompra=repoItemCompra;
        this.repoOrdenCompra = repoOrdenCompra;
        this.imprimir=imprimir;
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<itemcompra>> encontrarTodo(){
        List<itemcompra> itemcompraList = repoItemCompra.findAll();
        return new ResponseEntity<>(itemcompraList, HttpStatus.OK);
    }
    @GetMapping("/byOrdenCompra/{id}")
    public ResponseEntity<List<itemcompra>> bydOrdenCompra(@PathVariable("id") Long id){
        Optional<ordencompra> ordencompra = repoOrdenCompra.findById(id);
        List<itemcompra> itemcompraList = repoItemCompra.findByOrdencompra(ordencompra.get());
        return new ResponseEntity<>(itemcompraList, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> agregar(@RequestBody List<itemcompra> itemcompraList){
        Long id = repoOrdenCompra.findByNrodoc(itemcompraList.get(0).getOrdencompra().getNrodoc()).getId();
        ordencompra ordencompra = itemcompraList.get(0).getOrdencompra();
        ordencompra.setId(id);
        ordencompra nuevoOrdenCompra = repoOrdenCompra.save(ordencompra);
        for (itemcompra itemcompra: itemcompraList){
            itemcompra.setOrdencompra(nuevoOrdenCompra);
        }
        repoItemCompra.saveAll(itemcompraList);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta("exito");
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    @GetMapping("/imprimir/{nrodoc}")
    public ResponseEntity<InputStreamResource> buildExcelDocument(@PathVariable("nrodoc") Integer nrodoc) throws Exception {
        System.out.println("entra");
        ByteArrayInputStream byteCliente = this.imprimir.ordenCompra(nrodoc,this.repoOrdenCompra,this.repoItemCompra);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition","attachment; filename=\"notaventa.xlsx\"");
        return  ResponseEntity.ok().headers(httpHeaders).body(new InputStreamResource(byteCliente));
    }
}
