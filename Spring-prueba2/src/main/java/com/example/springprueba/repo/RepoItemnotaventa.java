package com.example.springprueba.repo;

import com.example.springprueba.model.itemnotaventa;
import com.example.springprueba.model.notaventa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepoItemnotaventa extends JpaRepository<itemnotaventa, Long> {
    List<itemnotaventa> findByNotaventa(notaventa notaventa);
}
