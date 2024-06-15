package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN p.dailyLogs dl WHERE dl.date = :date")
    List<Product> findByDailyLogDate(@Param("date") LocalDate date);
    @Query("SELECT p FROM Product p JOIN p.dailyLogs dl WHERE dl.date = :date AND dl.user.id = :userId")
    List<Product> findByDailyLogDateAndUserId(LocalDate date, Long userId);
}
