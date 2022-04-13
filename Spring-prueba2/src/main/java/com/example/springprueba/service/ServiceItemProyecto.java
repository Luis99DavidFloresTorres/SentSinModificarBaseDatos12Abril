package com.example.springprueba.service;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.itemProducto;
import com.example.springprueba.repo.RepoItemProducto;
import com.example.springprueba.repo.RepoItemProyecto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceItemProyecto {
    private final RepoItemProyecto repo;
    @Autowired
    public ServiceItemProyecto(RepoItemProyecto repoI){
        repo = repoI;
    }
    public ItemProyecto addItemProyecto(ItemProyecto itemProducto){

        return  repo.save(itemProducto);
    }
    public List<ItemProyecto> findAllItemProyectos(){
        return repo.obtenerDatos();
    }
    public List<ItemProyecto> findAllCostos(){return repo.queryCosto();}
    /*public acceso findbyidItemProducto(Long id){
        return repo.findInmuebleById(id).orElseThrow(()-> new ExceptionGeneral("Inmueble no encontrado"));
    }*/
   /* public itemProducto editarItemProducto(itemProducto itemProducto){
        return repo.save(itemProducto);
    }*/
}
