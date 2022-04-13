package com.example.springprueba.repo;

import com.example.springprueba.model.ItemProyecto;
import com.example.springprueba.model.proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RepoProyecto extends JpaRepository<proyecto, Long> {
    proyecto findByNroprj(Integer prj);
    @Transactional
    void deleteByNroprj(Integer nroprj);

}