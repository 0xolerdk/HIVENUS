package com.hivenus.back_end.controller;

import com.hivenus.back_end.entity.WaterIntake;
import com.hivenus.back_end.service.WaterIntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/waterintakes")
public class WaterIntakeController {

    @Autowired
    private WaterIntakeService waterIntakeService;

    @GetMapping
    public ResponseEntity<List<WaterIntake>> getAllWaterIntakes() {
        List<WaterIntake> waterIntakes = waterIntakeService.getAllWaterIntakes();
        return ResponseEntity.ok(waterIntakes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WaterIntake> getWaterIntakeById(@PathVariable Long id) {
        WaterIntake waterIntake = waterIntakeService.getWaterIntakeById(id);
        return ResponseEntity.ok(waterIntake);
    }

    @GetMapping("/date")
    public ResponseEntity<WaterIntake> getWaterIntakesByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        WaterIntake waterIntakes = waterIntakeService.getWaterIntakesByDate(date);
        return ResponseEntity.ok(waterIntakes);
    }

    @PostMapping("/create")
    public ResponseEntity<WaterIntake> createWaterIntake(@RequestBody WaterIntake waterIntake) {
        WaterIntake createdWaterIntake = waterIntakeService.createWaterIntake(waterIntake);
        return ResponseEntity.ok(createdWaterIntake);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WaterIntake> updateWaterIntake(@PathVariable Long id, @RequestBody WaterIntake waterIntakeDetails) {
        WaterIntake updatedWaterIntake = waterIntakeService.updateWaterIntake(id, waterIntakeDetails);
        return ResponseEntity.ok(updatedWaterIntake);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWaterIntake(@PathVariable Long id) {
        waterIntakeService.deleteWaterIntake(id);
        return ResponseEntity.ok().build();
    }
}
