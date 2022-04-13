package com.example.springprueba.controller;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.proyecto;
import com.example.springprueba.repo.RepoProyecto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/proyecto")
public class ControllerProyecto {
    private final RepoProyecto repoProyecto;
    public ControllerProyecto(RepoProyecto repoProyecto){
        this.repoProyecto = repoProyecto;
    }
    @GetMapping("/obtenerTodos")
    public ResponseEntity<List<proyecto>> getAll(){
        List<proyecto> proyectList = repoProyecto.findAll();
        return new ResponseEntity<>(proyectList, HttpStatus.OK);
    }
}
