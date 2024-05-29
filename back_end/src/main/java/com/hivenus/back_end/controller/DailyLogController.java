package com.hivenus.back_end.controller;

import com.hivenus.back_end.service.FCDService;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.service.DailyLogManagmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dailylogs")
public class DailyLogController {

    @Autowired
    private DailyLogManagmentService dailyLogManagmentService;

    @GetMapping
    public ResponseEntity<List<DailyLog>> getAllDailyLogs() {
        List<DailyLog> dailyLogs = dailyLogManagmentService.getAllDailyLogs();
        return ResponseEntity.ok(dailyLogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyLog> getDailyLogById(@PathVariable Long id) {
        DailyLog dailyLog = dailyLogManagmentService.getDailyLogById(id);
        return ResponseEntity.ok(dailyLog);
    }

    @PostMapping
    public ResponseEntity<DailyLog> createDailyLog(@RequestBody DailyLog dailyLog) {
        DailyLog createdDailyLog = dailyLogManagmentService.createDailyLog(dailyLog);
        return ResponseEntity.ok(createdDailyLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyLog> updateDailyLog(@PathVariable Long id, @RequestBody DailyLog dailyLog) {
        DailyLog updatedDailyLog = dailyLogManagmentService.updateDailyLog(id, dailyLog);
        return ResponseEntity.ok(updatedDailyLog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyLog(@PathVariable Long id) {
        dailyLogManagmentService.deleteDailyLog(id);
        return ResponseEntity.ok().build();
    }
}
