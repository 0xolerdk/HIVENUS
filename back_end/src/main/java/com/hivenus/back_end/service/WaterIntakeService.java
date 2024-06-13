package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.WaterIntake;
import com.hivenus.back_end.repository.DailyLogRepository;
import com.hivenus.back_end.repository.UserRepository;
import com.hivenus.back_end.repository.WaterIntakeRepository;
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
    private UserRepository usersRepo;

    public List<WaterIntake> getAllWaterIntakes() {
        return waterIntakeRepository.findAll();
    }

    public WaterIntake getWaterIntakeById(Long id) {
        return waterIntakeRepository.findById(id).orElse(null);
    }

    public WaterIntake getWaterIntakesByDate(LocalDate date) {
        // Assuming a method exists in the repository to find water intakes by date
        return waterIntakeRepository.findByDate(date);
    }

     public WaterIntake createWaterIntake(WaterIntake waterIntake, Long userId) {
        OurUser user = usersRepo.findById(userId).orElse(null);

        if (user == null) {
            // Handle the case where the user is not found
            throw new IllegalArgumentException("User not found");
        }

        // Check if there's an existing record for the same user and date
        LocalDate date = waterIntake.getDate();
        Optional<WaterIntake> existingWaterIntake = waterIntakeRepository.findByUserAndDate(user, date);
                DailyLog dailyLog = dailyLogRepository.findByUserIdAndDate(userId, date).orElseGet(() -> {
            DailyLog newDailyLog = new DailyLog();
            newDailyLog.setDate(date);
            newDailyLog.setUser(usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
            newDailyLog.setProducts(new ArrayList<>());
            return newDailyLog;
        });
        if (existingWaterIntake.isPresent()) {
            // Replace the existing record
            WaterIntake existing = existingWaterIntake.get();
            existing.setAmount(waterIntake.getAmount());
            WaterIntake newWaterIntake = waterIntakeRepository.save(existing);
            dailyLog.setWaterIntake(newWaterIntake);
            dailyLogRepository.save(dailyLog);
            return newWaterIntake;
        } else {
            // Create a new record
            waterIntake.setUser(user);
            WaterIntake newWaterIntake = waterIntakeRepository.save(waterIntake);
            dailyLog.setWaterIntake(newWaterIntake);
            dailyLogRepository.save(dailyLog);
            return newWaterIntake;
        }
    }

    public WaterIntake updateWaterIntake(Long id, WaterIntake waterIntakeDetails) {
        return waterIntakeRepository.save(waterIntakeDetails);
    }

    public void deleteWaterIntake(Long id) {
        waterIntakeRepository.deleteById(id);
    }
}
