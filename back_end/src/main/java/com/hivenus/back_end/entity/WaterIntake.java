package com.hivenus.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class WaterIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int amount;
    private LocalDate date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUser user;

    @JsonIgnore
    @ManyToMany(mappedBy = "waterIntakes", cascade = CascadeType.ALL)
    private List<DailyLog> dailyLogs;
}