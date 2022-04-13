package com.example.springprueba.repo;

import com.example.springprueba.model.cliente;
import com.example.springprueba.model.notaventa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RepoNotaVenta extends JpaRepository<notaventa, Long> {
    Page<notaventa> findAll(Pageable pageable);
    notaventa findByNrodoc(Integer nrodoc);
    @Transactional
    void deleteByNrodoc(Integer nrodoc);
    List<notaventa> findByCliente(cliente cliente);

}
