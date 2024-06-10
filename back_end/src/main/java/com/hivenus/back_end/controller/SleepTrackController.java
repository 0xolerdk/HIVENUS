package com.hivenus.back_end.controller;

import com.hivenus.back_end.entity.SleepTrack;
import com.hivenus.back_end.service.SleepTrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sleeptracks")
public class SleepTrackController {

    @Autowired
    private SleepTrackService sleepTrackService;

    @GetMapping
    public ResponseEntity<List<SleepTrack>> getAllSleepTracks() {
        List<SleepTrack> sleepTracks = sleepTrackService.getAllSleepTracks();
        return ResponseEntity.ok(sleepTracks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SleepTrack> getSleepTrackById(@PathVariable Long id) {
        SleepTrack sleepTrack = sleepTrackService.getSleepTrackById(id);
        return ResponseEntity.ok(sleepTrack);
    }

    @GetMapping("/date")
    public ResponseEntity<SleepTrack> getSleepTracksByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        SleepTrack sleepTracks = sleepTrackService.getSleepTracksByDate(date);
        return ResponseEntity.ok(sleepTracks);
    }

    @PostMapping("/create")
    public ResponseEntity<SleepTrack> createSleepTrack(@RequestBody SleepTrack sleepTrack) {
        SleepTrack createdSleepTrack = sleepTrackService.createSleepTrack(sleepTrack);
        return ResponseEntity.ok(createdSleepTrack);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SleepTrack> updateSleepTrack(@PathVariable Long id, @RequestBody SleepTrack sleepTrackDetails) {
        SleepTrack updatedSleepTrack = sleepTrackService.updateSleepTrack(id, sleepTrackDetails);
        return ResponseEntity.ok(updatedSleepTrack);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSleepTrack(@PathVariable Long id) {
        sleepTrackService.deleteSleepTrack(id);
        return ResponseEntity.ok().build();
    }
}
