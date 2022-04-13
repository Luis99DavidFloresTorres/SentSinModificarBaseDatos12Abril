package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity(name = "notaventa")
@Data
public class notaventa implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double total;
    /*@JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private empleado empleado;*/
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer nrodoc;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private char estado;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double totalme;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String operacion;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String contactopre;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String detalle;
    private Integer oper;
    private Date fecha;
    private Double tc;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private proyecto proyecto;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private cliente cliente;
}
