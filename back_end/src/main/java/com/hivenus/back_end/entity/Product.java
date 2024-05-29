package com.hivenus.back_end.entity;


import jakarta.persistence.*;
import lombok.Data;

@Table(name = "our_products")
@Data
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int FdcId;
    private String name;
    private String portion;
    private int quantity;
    private int gram;



}
