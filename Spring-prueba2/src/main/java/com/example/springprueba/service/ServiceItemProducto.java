package com.example.springprueba.service;

import com.example.springprueba.exception.ExceptionGeneral;
import com.example.springprueba.model.acceso;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.repo.RepoAcceso;
import com.example.springprueba.repo.RepoItemProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServiceItemProducto {
    private final RepoItemProducto repo;
    @Autowired
    public ServiceItemProducto(RepoItemProducto repoI){
        repo = repoI;
    }
    public itemProducto addItemProducto(itemProducto itemProducto){

        return  repo.save(itemProducto);
    }
   /* public List<itemProducto> findAllItemProductos(){
        return repo.obtenerItems();
    }*/
    public List<itemProducto> obtenerNormal(){
        return repo.findAll();
    }
    public List<itemProducto> obtenerDatosProductoItemProducto(){
        return repo.obtenerItems();
    }
    public List<itemProducto> obtenerDatosProductoPeriodo(){
        return repo.findProductoPeriodo();
    }
    public List<itemProducto> kardexProducto(){
        return repo.kardexProducto();
    }
    public List<itemProducto> mayorIngresos(){
        return repo.mayorIngresos();
    }
    public List<itemProducto> mayorSalidas(){ return repo.mayorSalidas();}
    public List<itemProducto> kardexByNamesDate(String nombre){ return repo.kardexProductoByName(nombre);}
    public List<itemProducto> obtenerDatosIdProducto(){
        return repo.findByIdProducto();
    }
    public List<itemProducto> obtenerDatosIdProductoPorDeposito(String depositoNombre){
        return repo.obtenerProductosPorDepositos(depositoNombre);
    }
    public List<itemProducto> operacionesDeposito(){ return repo.depositoOperaciones();}
    public List<itemProducto> depositoMayorIngresos(){ return repo.depositoMayorIngresos();}
    public List<itemProducto> depositoMayorSalidas(){ return repo.depositoMayorSalidas();}
    public List<itemProducto> depositoKardex(){ return repo.depositokardexProducto();}
    public List<itemProducto> depositoKardexNombreProducto(String nombreProducto, String nombreDeposito){ return repo.depositokardexProductoByName(nombreProducto, nombreDeposito);}
    public List<itemProducto> productosConMovimientos() { return repo.productosWithMov();}
    public List<itemProducto> primeros1000PorFecha(Integer limit){

            return repo.primeros1000fechas(PageRequest.of(0, limit));
    }
    public List<itemProducto> primeros1000PorFechaYDeposito(Integer limit){
        System.out.println(repo.primeros1000fechas(PageRequest.of(0, 30)));
        return repo.primeros1000fechasDeposito(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC,"tr.fecha").and(Sort.by("de.nombre"))));
    }
    /*public acceso findbyidItemProducto(Long id){
        return repo.findInmuebleById(id).orElseThrow(()-> new ExceptionGeneral("Inmueble no encontrado"));
    }*/
    public itemProducto editarItemProducto(itemProducto itemProducto){
        return repo.save(itemProducto);
    }

}
