package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "proyecto")
@Data
public class proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String observaciones;

    private String detalle;

    private String nombre;

    private Double totalpregastos;

    private String ciudad;

    private LocalDate fecha;

    private Double totalutilbruta;
    private Double totaltaxtransporte;
    private Integer ultimacot;
    private Double montome;
    private Integer nroprj;
    private Double tc;
    private Double comisionban;
    private Double comisioncon;
    private String estado;

    private Double totaltributos;

    private Double totalutilneta;

    private Double totalventas;

    private Integer operprj;

    private Double porcsociedad;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private cliente cliente;

    private Boolean perdida;

    private Integer alertaporc;

    private Double ejecucionfisica;

    private Double ejecuciongastos;

    private Double ejecucionproductos;

    private Double ejecucionventas;
    private Double ejecucionfinanciera;
    private String entrega;

    private String impuestos;

    private String validez;

    private String formapago;

    private String garantia;

    private String nota;
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    @JsonIgnore
    List<cotizacion> cotizacionList;
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    @JsonIgnore
    List<notaventa> notaventaList;
    @OneToMany(mappedBy = "proyecto")
    @JsonIgnore
    List<transactionProduct> transactionProductList;
}
