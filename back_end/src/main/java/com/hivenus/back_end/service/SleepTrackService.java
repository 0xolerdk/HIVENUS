package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.SleepTrack;
import com.hivenus.back_end.repository.DailyLogRepository;
import com.hivenus.back_end.repository.SleepTrackRepository;
import com.hivenus.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SleepTrackService {

    @Autowired
    private SleepTrackRepository sleepTrackRepository;
    @Autowired
    private DailyLogRepository dailyLogRepository;
    @Autowired
    private UserRepository usersRepo;

    public List<SleepTrack> getAllSleepTracks() {
        return sleepTrackRepository.findAll();
    }

    public SleepTrack getSleepTrackById(Long id) {
        return sleepTrackRepository.findById(id).orElse(null);
    }

    public SleepTrack getSleepTracksByDate(LocalDate date) {
        // Assuming a method exists in the repository to find sleep tracks by date
        return sleepTrackRepository.findByDate(date);
    }

    public SleepTrack createSleepTrack(SleepTrack sleepTrack, Long userId) {
        OurUser user = usersRepo.findById(userId).orElse(null);

        if (user == null) {
            // Handle the case where the user is not found
            throw new IllegalArgumentException("User not found");
        }

        // Check if there's an existing record for the same user and date
        LocalDate date = sleepTrack.getDate();
        Optional<SleepTrack> existingSleepTrack = sleepTrackRepository.findByUserAndDate(user, date);
        DailyLog dailyLog = dailyLogRepository.findByUserIdAndDate(userId, date).orElseGet(() -> {
            DailyLog newDailyLog = new DailyLog();
            newDailyLog.setDate(date);
            newDailyLog.setUser(usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
            newDailyLog.setProducts(new ArrayList<>());
            return newDailyLog;
        });

        if (existingSleepTrack.isPresent()) {
            // Replace the existing record
            SleepTrack existing = existingSleepTrack.get();
            existing.setStartTime(sleepTrack.getStartTime());
            existing.setEndTime(sleepTrack.getEndTime());
            SleepTrack newSleepTrack = sleepTrackRepository.save(existing);
            dailyLog.setSleepTrack(newSleepTrack);
            dailyLogRepository.save(dailyLog);
            return newSleepTrack;
        } else {
            // Create a new record
            sleepTrack.setUser(user);
            SleepTrack newSleepTrack = sleepTrackRepository.save(sleepTrack);
            dailyLog.setSleepTrack(newSleepTrack);
            dailyLogRepository.save(dailyLog);
            return newSleepTrack;
        }
    }

    public SleepTrack updateSleepTrack(Long id, SleepTrack sleepTrackDetails) {
        return sleepTrackRepository.save(sleepTrackDetails);
    }

    public void deleteSleepTrack(Long id) {
        sleepTrackRepository.deleteById(id);
    }
}
