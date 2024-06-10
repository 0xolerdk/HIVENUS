package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {
    WaterIntake findByDailyLogDate(LocalDate date);
}
