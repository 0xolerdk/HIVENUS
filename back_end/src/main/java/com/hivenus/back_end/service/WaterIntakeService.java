package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.WaterIntake;
import com.hivenus.back_end.repository.DailyLogRepository;
import com.hivenus.back_end.repository.UserRepository;
import com.hivenus.back_end.repository.WaterIntakeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WaterIntakeService {

    @Autowired
    private WaterIntakeRepository waterIntakeRepository;
    @Autowired
    private DailyLogRepository dailyLogRepository;
    @Autowired
    private UserRepository userRepository;

    public List<WaterIntake> getAllWaterIntakes() {
        return waterIntakeRepository.findAll();
    }

    public WaterIntake getWaterIntakeById(Long id) {
        return waterIntakeRepository.findById(id).orElse(null);
    }

    public List<WaterIntake> getWaterIntakesByDate(LocalDate date, Long userId) {
        return waterIntakeRepository.findAllByDateAndUserId(date, userId);
    }

    public WaterIntake createWaterIntake(WaterIntake waterIntake, Long userId) {
        OurUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check if there's an existing DailyLog for the user and date
        LocalDate date = waterIntake.getDate();
        DailyLog dailyLog = dailyLogRepository.findByUserIdAndDate(userId, date).orElseGet(() -> {
            DailyLog newDailyLog = new DailyLog();
            newDailyLog.setDate(date);
            newDailyLog.setUser(user);
            newDailyLog.setProducts(new ArrayList<>());
            newDailyLog.setWaterIntakes(new ArrayList<>());
            return newDailyLog;
        });

        // Save the water intake and add it to the daily log
        waterIntake.setUser(user);
        WaterIntake newWaterIntake = waterIntakeRepository.save(waterIntake);
        dailyLog.getWaterIntakes().add(newWaterIntake);
        dailyLogRepository.save(dailyLog);

        return newWaterIntake;
    }

    public WaterIntake updateWaterIntake(Long id, WaterIntake waterIntakeDetails) {
        return waterIntakeRepository.save(waterIntakeDetails);
    }
        @Transactional
    public void deleteWaterIntake(Long id, Long userId) {
        waterIntakeRepository.deleteByIdAndUserId(id, userId);
    }
}
