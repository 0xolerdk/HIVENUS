package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {
    WaterIntake findByDate(LocalDate date);
    Optional<WaterIntake> findByUserAndDate(OurUser user, LocalDate date);}
