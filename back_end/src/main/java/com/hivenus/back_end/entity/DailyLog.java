package com.hivenus.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class DailyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUser user;

    @ManyToMany
    @JoinTable(
        name = "daily_log_products",
        joinColumns = @JoinColumn(name = "daily_log_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "water_intake_id")
    private WaterIntake waterIntake;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sleep_track_id")
    private SleepTrack sleepTrack;
}