package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.DailyLog;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {

    Optional<DailyLog> save();
}