package com.example.springprueba.service;

import com.example.springprueba.model.itemcompra;
import com.example.springprueba.repo.RepoItemCompra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceItemCompra {
    private final RepoItemCompra repoItemCompra;
    @Autowired
    public ServiceItemCompra(RepoItemCompra repoItemCompra){
        this.repoItemCompra = repoItemCompra;
    }
    public List<itemcompra> porProveedor(String nombre){
        return this.repoItemCompra.byProveedor(nombre);
    }
}
