package com.hivenus.back_end.service;

import com.hivenus.back_end.dto.DailyLogDto;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.repository.DailyLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyLogManagmentService {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    public List<DailyLogDto> getAllDailyLogs() {
        List<DailyLog> dailyLogs = dailyLogRepository.findAll();
        return dailyLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DailyLogDto getDailyLogById(Long id) {
        Optional<DailyLog> dailyLog = dailyLogRepository.findById(id);
        return dailyLog.map(this::convertToDto).orElse(null);
    }

    public DailyLogDto createDailyLog(DailyLogDto dailyLogDto) {
        DailyLog dailyLog = convertToEntity(dailyLogDto);
        DailyLog savedDailyLog = dailyLogRepository.save(dailyLog);
        return convertToDto(savedDailyLog);
    }

    public DailyLogDto updateDailyLog(Long id, DailyLogDto dailyLogDto) {
        Optional<DailyLog> optionalDailyLog = dailyLogRepository.findById(id);
        if(optionalDailyLog.isPresent()) {
            DailyLog dailyLog = optionalDailyLog.get();
            dailyLog.setDate(dailyLogDto.getDate());
            dailyLog.setProducts(dailyLogDto.getProducts());
            dailyLog.setActivities(dailyLogDto.getActivities());
            DailyLog updatedDailyLog = dailyLogRepository.save(dailyLog);
            return convertToDto(updatedDailyLog);
        } else {
            return null;
        }
    }

    public void deleteDailyLog(Long id) {
        dailyLogRepository.deleteById(id);
    }

    private DailyLogDto convertToDto(DailyLog dailyLog) {
        DailyLogDto dailyLogDto = new DailyLogDto();
        dailyLogDto.setDate(dailyLog.getDate());
        dailyLogDto.setProducts(dailyLog.getProducts());
        dailyLogDto.setActivities(dailyLog.getActivities());
        return dailyLogDto;
    }


    private DailyLog convertToEntity(DailyLogDto dailyLogDto) {
        DailyLog dailyLog = new DailyLog();
        dailyLog.setDate(dailyLogDto.getDate());
        dailyLog.setProducts(dailyLogDto.getProducts());
        dailyLog.setActivities(dailyLogDto.getActivities());
        return dailyLog;
    }

    public DailyLogDto getDailyLogByDate(Date date) {
        Optional<DailyLog> dailyLog = dailyLogRepository.findByDate(date);
        return dailyLog.map(this::convertToDto).orElse(null);
    }

    public List<DailyLogDto> getDailyLogsByDate(Date dateObj) {
        List<DailyLog> dailyLogs = dailyLogRepository.findAllByDate(dateObj);
        return dailyLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

}
