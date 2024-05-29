package com.hivenus.back_end.controller;

import com.hivenus.back_end.dto.DailyLogDto;
import com.hivenus.back_end.service.FCDService;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.service.DailyLogManagmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/dailylogs")
public class DailyLogController {

    @Autowired
    private DailyLogManagmentService dailyLogManagmentService;

    @GetMapping
    public ResponseEntity<List<DailyLogDto>> getAllDailyLogs() {
        List<DailyLogDto> dailyLogs = dailyLogManagmentService.getAllDailyLogs();
        return ResponseEntity.ok(dailyLogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyLogDto> getDailyLogById(@PathVariable Long id) {
        DailyLogDto dailyLog = dailyLogManagmentService.getDailyLogById(id);
        return ResponseEntity.ok(dailyLog);
    }

    @PostMapping("/date")
    public ResponseEntity<DailyLogDto> getDailyLogByDate(@RequestBody String date) {
        // parse the date string into a Date object
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date dateObj = formatter.parse(date);
            DailyLogDto dailyLog = dailyLogManagmentService.getDailyLogByDate(dateObj);
            return ResponseEntity.ok(dailyLog);
        } catch (ParseException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping
    public ResponseEntity<DailyLogDto> createDailyLog(@RequestBody DailyLogDto dailyLog) {
        DailyLogDto createdDailyLog = dailyLogManagmentService.createDailyLog(dailyLog);
        return ResponseEntity.ok(createdDailyLog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyLogDto> updateDailyLog(@PathVariable Long id, @RequestBody DailyLogDto dailyLog) {
        DailyLogDto updatedDailyLog = dailyLogManagmentService.updateDailyLog(id, dailyLog);
        return ResponseEntity.ok(updatedDailyLog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyLog(@PathVariable Long id) {
        dailyLogManagmentService.deleteDailyLog(id);
        return ResponseEntity.ok().build();
    }
}
