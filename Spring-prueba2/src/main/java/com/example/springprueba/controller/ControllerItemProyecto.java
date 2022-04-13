package com.example.springprueba.controller;

import com.example.springprueba.model.*;
import com.example.springprueba.repo.RepoItemProyecto;
import com.example.springprueba.repo.RepoProyecto;
import com.example.springprueba.responsesJson.LoginResponse;
import com.example.springprueba.service.ServiceItemProducto;
import com.example.springprueba.service.ServiceItemProyecto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/itemProyecto")
public class ControllerItemProyecto {
    private final ServiceItemProyecto serviceItemProyecto;
    private final RepoProyecto proyecto;
    private final RepoItemProyecto repoItemProyecto;
    //private final ServiceUnidad serviceUnidad;
    public ControllerItemProyecto(ServiceItemProyecto serviceItemProyecto, RepoProyecto repoProyecto, RepoItemProyecto repoItemProyecto){
        this.serviceItemProyecto = serviceItemProyecto;
        this.proyecto = repoProyecto;
        this.repoItemProyecto = repoItemProyecto;
    }
    //    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<ItemProyecto>> getItemProyectos(){
        List<ItemProyecto> proyectoList = serviceItemProyecto.findAllItemProyectos();
        return new ResponseEntity<>(proyectoList, HttpStatus.OK);
    }
  /*  @GetMapping("/costo")
    public ResponseEntity<List<ItemProyecto>> getCostos(){
        List<ItemProyecto> proyectList = serviceItemProyecto.findAllCostos();
        return new ResponseEntity<>(proyectList, HttpStatus.OK);
    }
    public ItemProyecto arbol(ItemProyecto itemProyecto){
        if(Objects.isNull(itemProyecto.getProyectoProductosHijos())){
            return itemProyecto;
        }else{
            itemProyecto.setProducto(null);
             arbol(itemProyecto.getProyectoProductosHijos().getItemProyecto());
            return itemProyecto;
        }
    }*/
    @PostMapping("/add")
    public ResponseEntity<LoginResponse> add(@RequestBody List<ItemProyecto> itemProyectoList){

    /*    itemProyectoList.forEach(data->{
            if(!Objects.isNull(data.getNombrePadre())){
                data.setProducto(null);
            }
        });*/

        //sumas de las ventas en el total del proyecto
        Long id = this.proyecto.findByNroprj(itemProyectoList.get(0).getProyecto().getNroprj()).getId();
        proyecto proyectoObtener = itemProyectoList.get(0).getProyecto();
        String descto = proyectoObtener.getCliente().getTipodescto();
        double suma= 0;
        for(ItemProyecto proyecto1: itemProyectoList){
            if(!Objects.isNull(proyecto1.getPrecioventa())) {
                if(descto.equals('A')){
                    suma += proyecto1.getProducto().getDesctoa()*proyecto1.getCantidad();
                }else if(descto.equals('B')){
                    suma += proyecto1.getProducto().getDesctob()*proyecto1.getCantidad();
                }else if(descto.equals('C')) {
                    suma += proyecto1.getProducto().getDesctoc() * proyecto1.getCantidad();
                }else{
                    suma += proyecto1.getMonto();
                }
            }
        }
        proyectoObtener.setTotalventas(suma);
        proyectoObtener.setId(id);
        proyectoObtener.setTotalutilbruta(0.0);
        proyectoObtener.setPorcsociedad(0.0);
        proyectoObtener.setTc(6.96);
        proyectoObtener.setComisionban(0.0);
        proyectoObtener.setComisioncon(0.0);
        proyectoObtener.setTotaltaxtransporte(0.0);
        proyectoObtener.setUltimacot(0);
        proyectoObtener.setMontome(0.0);
        proyectoObtener.setEstado("COTIZACION");
        proyectoObtener.setTotalpregastos(0.0);
        proyectoObtener.setEjecucionfisica(0.0);
        proyectoObtener.setEjecuciongastos(0.0);
        proyectoObtener.setEjecucionproductos(0.0);
        proyectoObtener.setEjecucionfinanciera(0.0);
        proyectoObtener.setEjecucionventas(0.0);
        proyecto nuevoProyecto = this.proyecto.save(proyectoObtener);
        itemProyectoList.forEach(data->{
            data.setProyecto(nuevoProyecto);
        });
        repoItemProyecto.saveAll(itemProyectoList);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setRespuesta("exito");
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    @GetMapping("/byProyecto/{id}")
    public ResponseEntity<List<ItemProyecto>> findByProyecto(@PathVariable("id") Long id) {
        System.out.println(id);
        Optional<proyecto> proyecto = this.proyecto.findById(id);
        List<ItemProyecto> itemProyectoList = this.repoItemProyecto.findByProyecto(proyecto.get()); // id 413 no tiene itemproyecto entonces no devuelve nada
        if(itemProyectoList.size()==0){
            ItemProyecto itemProyecto = new ItemProyecto();
            itemProyecto.setProyecto(proyecto.get());
            itemProyecto.setOrigen("sinItems");
            List lista = new ArrayList<ItemProyecto>();
            lista.add(itemProyecto);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(itemProyectoList, HttpStatus.OK);
        }
    }
}
