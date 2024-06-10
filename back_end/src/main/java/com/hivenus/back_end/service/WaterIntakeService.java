package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.WaterIntake;
import com.hivenus.back_end.repository.WaterIntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WaterIntakeService {

    @Autowired
    private WaterIntakeRepository waterIntakeRepository;

    public List<WaterIntake> getAllWaterIntakes() {
        return waterIntakeRepository.findAll();
    }

    public WaterIntake getWaterIntakeById(Long id) {
        return waterIntakeRepository.findById(id).orElse(null);
    }

    public WaterIntake getWaterIntakesByDate(LocalDate date) {
        // Assuming a method exists in the repository to find water intakes by date
        return waterIntakeRepository.findByDailyLogDate(date);
    }

    public WaterIntake createWaterIntake(WaterIntake waterIntake) {
        return waterIntakeRepository.save(waterIntake);
    }

    public WaterIntake updateWaterIntake(Long id, WaterIntake waterIntakeDetails) {
        return waterIntakeRepository.save(waterIntakeDetails);
    }

    public void deleteWaterIntake(Long id) {
        waterIntakeRepository.deleteById(id);
    }
}
