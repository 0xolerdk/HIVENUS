package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {

    List<WaterIntake> findAllByDateAndUserId(LocalDate date, Long userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM WaterIntake w WHERE w.id = ?1 AND w.user.id = ?2")
    int deleteByIdAndUserId(Long id, Long userId);}

