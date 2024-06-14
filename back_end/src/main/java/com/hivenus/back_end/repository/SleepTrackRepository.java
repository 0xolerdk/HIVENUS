package com.hivenus.back_end.repository;

import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.SleepTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SleepTrackRepository extends JpaRepository<SleepTrack, Long> {
    SleepTrack findByDate(LocalDate date);
    Optional<SleepTrack> findByUserAndDate(OurUser user, LocalDate date);

    SleepTrack findByDateAndUserId(LocalDate date, Long userId);
}
