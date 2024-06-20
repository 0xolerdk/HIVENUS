package com.venus.back_end.controller;

import com.venus.back_end.dto.UserDto;
import com.venus.back_end.entity.UserSettings;
import com.venus.back_end.service.UserSettingsService;
import com.venus.back_end.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-settings")
public class UserSettingsController {
    @Autowired
    private UsersManagementService usersManagementService;

    @Autowired
    private UserSettingsService userSettingsService;

    @GetMapping("/")
    public ResponseEntity<UserSettings> getUserSettings() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserSettings userSettings = userSettingsService.getUserSettingsByUserId(userDto.getOurUsers().getId());
        if (userSettings != null) {
            return ResponseEntity.ok(userSettings);
        } else {
            return ResponseEntity.notFound().build();
        }
        
    }

    @PostMapping
    public ResponseEntity<UserSettings> createUserSettings(@RequestBody UserSettings userSettings) {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserSettings createdUserSettings = userSettingsService.createUserSettings(userSettings, userDto.getOurUsers().getId());
                if (createdUserSettings != null) {
            return ResponseEntity.ok(createdUserSettings);
        } else {
            return ResponseEntity.unprocessableEntity().build();
        }
    }

    @PostMapping("/modify")
    public ResponseEntity<UserSettings> updateUserSettings(@RequestBody UserSettings userSettings) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        UserSettings updatedUserSettings = userSettingsService.updateUserSettings(userDto.getOurUsers().getId(), userSettings);
        if (updatedUserSettings != null) {
            return ResponseEntity.ok(updatedUserSettings);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/admin/{userId}")
    public ResponseEntity<Void> deleteUserSettings(@PathVariable Long userId) {
        boolean deleted = userSettingsService.deleteUserSettings(userId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
