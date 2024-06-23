package com.venus.back_end.service;

import com.venus.back_end.entity.DailyLog;
import com.venus.back_end.entity.OurUser;
import com.venus.back_end.entity.WaterIntake;
import com.venus.back_end.repository.DailyLogRepository;
import com.venus.back_end.repository.UserRepository;
import com.venus.back_end.repository.WaterIntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

        LocalDate date = waterIntake.getDate();
        DailyLog dailyLog = dailyLogRepository.findByUserIdAndDate(userId, date).orElseGet(() -> {
            DailyLog newDailyLog = new DailyLog();
            newDailyLog.setDate(date);
            newDailyLog.setUser(user);
            newDailyLog.setProducts(new ArrayList<>());
            newDailyLog.setWaterIntakes(new ArrayList<>());
            return newDailyLog;
        });

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
    public boolean deleteByIdAndUserId(Long id, Long userId) {
        int result = waterIntakeRepository.deleteByIdAndUserId(id, userId);
        return result > 0;
    }
}
