package com.hivenus.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class WaterIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    int amount;

    @OneToOne(mappedBy = "waterIntake", fetch = FetchType.LAZY) // Fixed here
    private DailyLog dailyLog;
}
