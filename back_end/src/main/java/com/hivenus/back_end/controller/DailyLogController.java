package com.hivenus.back_end.controller;

import com.hivenus.back_end.dto.DailyLogDto;
import com.hivenus.back_end.dto.UserDto;
import com.hivenus.back_end.service.DailyLogManagmentService;
import com.hivenus.back_end.service.OurUserDetailsService;
import com.hivenus.back_end.service.UsersManagementService;
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
@RequestMapping("/dailylogs")
public class DailyLogController {

    @Autowired
    private DailyLogManagmentService dailyLogManagmentService;
    @Autowired
    private UsersManagementService usersManagementService;


    @GetMapping(produces = "application/json")
    public ResponseEntity<List<DailyLogDto>> getAllDailyLogs() {
        List<DailyLogDto> dailyLogs = dailyLogManagmentService.getAllDailyLogs();
        return ResponseEntity.ok(dailyLogs);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<DailyLogDto> getDailyLogById(@PathVariable Long id) {
        DailyLogDto dailyLog = dailyLogManagmentService.getDailyLogById(id);
        return ResponseEntity.ok(dailyLog);
    }

    @GetMapping(value = "/date", produces = "application/json")
    public ResponseEntity<List<DailyLogDto>> getDailyLogsByDate(
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

        try {
            List<DailyLogDto> dailyLogs = dailyLogManagmentService.getDailyLogsByDate(userDto.getOurUsers().getId(), date);
            return ResponseEntity.ok(dailyLogs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/{userId}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<DailyLogDto> createDailyLog(@RequestBody DailyLogDto dailyLog, @PathVariable Long userId) {
        DailyLogDto createdDailyLog = dailyLogManagmentService.createDailyLog(dailyLog, userId);
        return ResponseEntity.ok(createdDailyLog);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<DailyLogDto> addDailyLog(@RequestBody DailyLogDto dailyLog) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        DailyLogDto updatedDailyLog = dailyLogManagmentService.createDailyLog(dailyLog, userDto.getOurUsers().getId());
        return ResponseEntity.ok(updatedDailyLog);
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Void> deleteDailyLog(@PathVariable Long id) {
        dailyLogManagmentService.deleteDailyLog(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/date")
    public ResponseEntity<Void> deleteProductFromDailyLog(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @RequestParam Long productId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
           boolean deleted = dailyLogManagmentService.deleteProductFromDailyLog(userDto.getOurUsers().getId(), date, productId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
