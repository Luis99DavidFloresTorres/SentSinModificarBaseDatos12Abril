package com.example.springprueba.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "itemventa")
@Data
public class itemnotaventa implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double precio;
    private Integer cantidad;
    private Double subtotal;
    private Integer cantidadpend;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "notaventa_id")
    notaventa notaventa;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    producto producto;
}

