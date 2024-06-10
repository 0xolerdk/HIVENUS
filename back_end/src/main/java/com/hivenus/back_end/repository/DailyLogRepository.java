package com.hivenus.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hivenus.back_end.entity.DailyLog;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {
    List<DailyLog> findByUserId(Long userId);
    List<DailyLog> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    Optional<DailyLog> findByUserIdAndDate(Long userId, LocalDate date);
}
