package com.venus.back_end.controller;

import com.venus.back_end.dto.UserDto;
import com.venus.back_end.entity.WaterIntake;
import com.venus.back_end.service.UsersManagementService;
import com.venus.back_end.service.WaterIntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/waterintakes")
public class WaterIntakeController {

    @Autowired
    private WaterIntakeService waterIntakeService;
    @Autowired
    private UsersManagementService usersManagementService;

    @GetMapping(value = "/admin")
    public ResponseEntity<List<WaterIntake>> getAllWaterIntakes() {
        List<WaterIntake> waterIntakes = waterIntakeService.getAllWaterIntakes();
        return ResponseEntity.ok(waterIntakes);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<WaterIntake> getWaterIntakeById(@PathVariable Long id) {
        WaterIntake waterIntake = waterIntakeService.getWaterIntakeById(id);
        return ResponseEntity.ok(waterIntake);
    }

    @GetMapping("/date")
    public ResponseEntity<List<WaterIntake>> getWaterIntakesByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<WaterIntake> waterIntakes = waterIntakeService.getWaterIntakesByDate(date, userDto.getOurUsers().getId());
        return ResponseEntity.ok(waterIntakes);
    }

    @PostMapping("/create")
    public ResponseEntity<WaterIntake> createWaterIntake(@RequestBody WaterIntake waterIntake) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        WaterIntake createdWaterIntake = waterIntakeService.createWaterIntake(waterIntake, userDto.getOurUsers().getId());
        return ResponseEntity.ok(createdWaterIntake);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<WaterIntake> updateWaterIntake(@PathVariable Long id, @RequestBody WaterIntake waterIntakeDetails) {
        WaterIntake updatedWaterIntake = waterIntakeService.updateWaterIntake(id, waterIntakeDetails);
        return ResponseEntity.ok(updatedWaterIntake);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWaterIntake(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if(waterIntakeService.deleteByIdAndUserId(id, userDto.getOurUsers().getId())){
            return ResponseEntity.ok().build();
        }
        else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }
}
