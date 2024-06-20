package com.venus.back_end.repository;

import com.venus.back_end.entity.DailyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {
    List<DailyLog> findByUserId(Long userId);
    List<DailyLog> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    Optional<DailyLog> findByUserIdAndDate(Long userId, LocalDate date);
}
