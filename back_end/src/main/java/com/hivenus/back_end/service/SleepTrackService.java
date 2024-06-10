package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.SleepTrack;
import com.hivenus.back_end.repository.SleepTrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SleepTrackService {

    @Autowired
    private SleepTrackRepository sleepTrackRepository;

    public List<SleepTrack> getAllSleepTracks() {
        return sleepTrackRepository.findAll();
    }

    public SleepTrack getSleepTrackById(Long id) {
        return sleepTrackRepository.findById(id).orElse(null);
    }

    public SleepTrack getSleepTracksByDate(LocalDate date) {
        // Assuming a method exists in the repository to find sleep tracks by date
        return sleepTrackRepository.findByDailyLogDate(date);
    }

    public SleepTrack createSleepTrack(SleepTrack sleepTrack) {
        return sleepTrackRepository.save(sleepTrack);
    }

    public SleepTrack updateSleepTrack(Long id, SleepTrack sleepTrackDetails) {
        return sleepTrackRepository.save(sleepTrackDetails);
    }

    public void deleteSleepTrack(Long id) {
        sleepTrackRepository.deleteById(id);
    }
}
