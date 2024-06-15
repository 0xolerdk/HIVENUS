package com.hivenus.back_end.controller;

import com.hivenus.back_end.dto.UserDto;
import com.hivenus.back_end.entity.SleepTrack;
import com.hivenus.back_end.service.SleepTrackService;
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
@RequestMapping("/sleeptracks")
public class SleepTrackController {

    @Autowired
    private SleepTrackService sleepTrackService;
    @Autowired
    private UsersManagementService usersManagementService;

    @GetMapping(value = "/admin")
    public ResponseEntity<List<SleepTrack>> getAllSleepTracks() {
        List<SleepTrack> sleepTracks = sleepTrackService.getAllSleepTracks();
        return ResponseEntity.ok(sleepTracks);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<SleepTrack> getSleepTrackById(@PathVariable Long id) {
        SleepTrack sleepTrack = sleepTrackService.getSleepTrackById(id);
        return ResponseEntity.ok(sleepTrack);
    }

    @GetMapping("/date")
    public ResponseEntity<SleepTrack> getSleepTracksByDate(
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
        SleepTrack sleepTracks = sleepTrackService.getSleepTracksByDate(date, userDto.getOurUsers().getId());
        return ResponseEntity.ok(sleepTracks);
    }

    @PostMapping("/create")
    public ResponseEntity<SleepTrack> createSleepTrack(@RequestBody SleepTrack sleepTrack) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        SleepTrack createdSleepTrack = sleepTrackService.createSleepTrack(sleepTrack, userDto.getOurUsers().getId());
        return ResponseEntity.ok(createdSleepTrack);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<SleepTrack> updateSleepTrack(@PathVariable Long id, @RequestBody SleepTrack sleepTrackDetails) {
        SleepTrack updatedSleepTrack = sleepTrackService.updateSleepTrack(id, sleepTrackDetails);
        return ResponseEntity.ok(updatedSleepTrack);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteSleepTrack(@PathVariable Long id) {
        sleepTrackService.deleteSleepTrack(id);
        return ResponseEntity.ok().build();
    }
}
