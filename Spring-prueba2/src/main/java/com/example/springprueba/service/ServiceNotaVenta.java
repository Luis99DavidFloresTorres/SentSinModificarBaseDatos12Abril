package com.example.springprueba.service;

import com.example.springprueba.model.notaventa;
import com.example.springprueba.repo.RepoNotaVenta;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceNotaVenta {
    RepoNotaVenta repoNotaVenta;
    public ServiceNotaVenta(RepoNotaVenta repoNotaVenta){
        this.repoNotaVenta =repoNotaVenta;
    }
    public List<notaventa> ventasNroDoc(int cantidad){
       // List<notaventa> notaventaList = repoNotaVenta.findAll(Sort.by(Sort.Direction.DESC,"nrodoc"));
        List<notaventa> notaventaList = repoNotaVenta.findAll(PageRequest.of(0, cantidad,Sort.by(Sort.Direction.DESC,"nrodoc"))).getContent();
        return notaventaList;
    }
}
