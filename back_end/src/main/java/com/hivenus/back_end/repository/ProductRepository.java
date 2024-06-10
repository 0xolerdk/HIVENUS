package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByDailyLogsDate(LocalDate date);
}
