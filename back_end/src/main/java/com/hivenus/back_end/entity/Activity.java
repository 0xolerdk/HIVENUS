package com.hivenus.back_end.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "our_activity")
@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int caloriesBurned;
}
