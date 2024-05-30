package com.hivenus.back_end.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String FdcId;
    private String Portion;
    private int Gram;
    private int Quantity;


    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
    private List<DailyLog> dailyLogs;

    // Getters and setters
}
