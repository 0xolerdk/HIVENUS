package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.repository.DailyLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DailyLogManagmentService {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    public List<DailyLog> getAllDailyLogs() {
        return dailyLogRepository.findAll();
    }

    public DailyLog getDailyLogById(Long id) {
        Optional<DailyLog> dailyLog = dailyLogRepository.findById(id);
        return dailyLog.orElse(null);
    }

    public DailyLog createDailyLog(DailyLog dailyLog) {
        return dailyLogRepository.save(dailyLog);
    }

    public DailyLog updateDailyLog(Long id, DailyLog dailyLogDetails) {
        Optional<DailyLog> optionalDailyLog = dailyLogRepository.findById(id);
        if(optionalDailyLog.isPresent()) {
            DailyLog dailyLog = optionalDailyLog.get();
            dailyLog.setDate(dailyLogDetails.getDate());
            dailyLog.setProducts(dailyLogDetails.getProducts());
            dailyLog.setActivities(dailyLogDetails.getActivities());
            return dailyLogRepository.save(dailyLog);
        } else {
            return null;
        }
    }

    public void deleteDailyLog(Long id) {
        dailyLogRepository.deleteById(id);
    }
}
