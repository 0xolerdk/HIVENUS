package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.UserSettings;
import com.hivenus.back_end.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSettingsService {

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    public UserSettings getUserSettingsByUserId(Long userId) {
        return userSettingsRepository.findByUserId(userId);
    }

    public UserSettings createUserSettings(UserSettings userSettings) {
        return userSettingsRepository.save(userSettings);
    }

    public UserSettings updateUserSettings(Long userId, UserSettings userSettings) {
        Optional<UserSettings> optionalUserSettings = Optional.ofNullable(userSettingsRepository.findByUserId(userId));
        if (optionalUserSettings.isPresent()) {
            UserSettings existingUserSettings = optionalUserSettings.get();
            existingUserSettings.setMaxEneregy(userSettings.getMaxEneregy());
            existingUserSettings.setMaxProtein(userSettings.getMaxProtein());
            existingUserSettings.setMaxFat(userSettings.getMaxFat());
            existingUserSettings.setMaxCarbs(userSettings.getMaxCarbs());
            existingUserSettings.setMaxWater(userSettings.getMaxWater());
            existingUserSettings.setMinSleep(userSettings.getMinSleep());
            existingUserSettings.setMaxActivity(userSettings.getMaxActivity());
            return userSettingsRepository.save(existingUserSettings);
        } else {
            return null;
        }
    }

    public boolean deleteUserSettings(Long userId) {
        UserSettings userSettings = userSettingsRepository.findByUserId(userId);
        if (userSettings != null) {
            userSettingsRepository.delete(userSettings);
            return true;
        } else {
            return false;
        }
    }
}
