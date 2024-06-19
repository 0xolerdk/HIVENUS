package com.venus.back_end.service;

import com.venus.back_end.entity.UserSettings;
import com.venus.back_end.repository.UserRepository;
import com.venus.back_end.repository.UserSettingsRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Optional;

@Service
public class UserSettingsService {

    @Autowired
    private UserSettingsRepository userSettingsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HttpServletResponse httpServletResponse;

    public UserSettings getUserSettingsByUserId(Long userId) {
        return userSettingsRepository.findByUserId(userId);
    }

    public UserSettings createUserSettings(UserSettings userSettings, Long userId) {
        Optional<UserSettings> optionalUserSettings = Optional.ofNullable(userSettingsRepository.findByUserId(userId));
        if (optionalUserSettings.isPresent()) {
            return null;
        } else {
            userSettings.setUser(userRepository.findById(userId).get());
            return userSettingsRepository.save(userSettings);
        }
    }

    public UserSettings updateUserSettings(Long userId, UserSettings userSettings) {
        Optional<UserSettings> optionalUserSettings = Optional.ofNullable(userSettingsRepository.findByUserId(userId));
        if (optionalUserSettings.isPresent()) {
            UserSettings existingUserSettings = optionalUserSettings.get();
            updateFields(existingUserSettings, userSettings);
            return userSettingsRepository.save(existingUserSettings);
        } else {
            return createUserSettings(userSettings, userId);
        }
    }

    private void updateFields(UserSettings existingUserSettings, UserSettings newUserSettings) {
        for (Field field : UserSettings.class.getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object newValue = field.get(newUserSettings);
                if (newValue != null && !newValue.equals(0)) {
                    field.set(existingUserSettings, newValue);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
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
