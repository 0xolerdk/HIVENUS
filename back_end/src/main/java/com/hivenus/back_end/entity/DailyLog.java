package com.hivenus.back_end.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;


@Entity
@Data

public class DailyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date date;
    @OneToMany
    private List<Product> products;
    @OneToMany
    private List<Activity> activities;
    // getters and setters
}
