package com.hivenus.back_end.entity;


import jakarta.persistence.*;
import lombok.Data;

@Table(name = "product")
@Data
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private double protein;
    private double totalLipid;
    private double carbohydrate;
    private double energy;
    private double sugars;
    private double dietaryFiber;
    private double calcium;
    private double iron;
    private double sodium;
    private double vitaminA;
    private double vitaminC;
    private double cholesterol;



}
