package com.hivenus.back_end.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;


@Entity
@Data
@Table(name = "our_dailyLogs")
public class DailyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date date;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Activity> activities;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private OurUser user;
}
