package com.hivenus.back_end.service;

import com.hivenus.back_end.dto.DailyLogDto;
import com.hivenus.back_end.entity.Activity;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.Product;
import com.hivenus.back_end.repository.DailyLogRepository;
import com.hivenus.back_end.repository.ProductRepository;
import com.hivenus.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyLogManagmentService {

    @Autowired
    private DailyLogRepository dailyLogRepository;
    @Autowired
    private UserRepository usersRepo;
    @Autowired
    private ProductRepository productRepository;

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

    public DailyLogDto createDailyLog(DailyLogDto dailyLogDto, Long userId) {
        Optional<OurUser> optionalUser = usersRepo.findById(userId);
        if (optionalUser.isPresent()) {
            OurUser user = optionalUser.get();
            DailyLog dailyLog = convertToEntity(dailyLogDto);
            dailyLog.setUser(user);

            // Save all products if they are not already saved
            List<Product> savedProducts = dailyLog.getProducts().stream()
                    .map(product -> {
                        if (product.getId() == null) {
                            return productRepository.save(product);
                        } else {
                            return product;
                        }
                    })
                    .collect(Collectors.toList());

            dailyLog.setProducts(savedProducts);

            DailyLog savedDailyLog = dailyLogRepository.save(dailyLog);
            return convertToDto(savedDailyLog);
        } else {
            return null;
        }
    }

    public DailyLogDto updateDailyLog(Long id, DailyLogDto dailyLogDto) {
        Optional<DailyLog> optionalDailyLog = dailyLogRepository.findById(id);
        if (optionalDailyLog.isPresent()) {
            DailyLog dailyLog = optionalDailyLog.get();
            dailyLog.setDate(dailyLogDto.getDate());

            // Save all products if they are not already saved
            List<Product> savedProducts = dailyLogDto.getProducts().stream()
                    .map(product -> {
                        if (product.getId() == null) {
                            return productRepository.save(product);
                        } else {
                            return product;
                        }
                    })
                    .collect(Collectors.toList());

            dailyLog.setProducts(savedProducts);
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
        dailyLogDto.setProducts(dailyLog.getProducts().stream()
                .map(product -> {
                    Product simplifiedProduct = new Product();
                    simplifiedProduct.setId(product.getId());
                    simplifiedProduct.setName(product.getName());
                    simplifiedProduct.setFdcId(product.getFdcId());
                    simplifiedProduct.setPortion(product.getPortion());
                    simplifiedProduct.setGram(product.getGram());

                    return simplifiedProduct;
                })
                .collect(Collectors.toList()));
        dailyLogDto.setActivities(dailyLog.getActivities().stream()
                .map(activity -> {
                    Activity simplifiedActivity = new Activity();
                    simplifiedActivity.setId(activity.getId());
                    simplifiedActivity.setName(activity.getName());
                    return simplifiedActivity;
                })
                .collect(Collectors.toList()));
        return dailyLogDto;
    }

    private DailyLog convertToEntity(DailyLogDto dailyLogDto) {
        DailyLog dailyLog = new DailyLog();
        dailyLog.setDate(dailyLogDto.getDate());
        dailyLog.setProducts(dailyLogDto.getProducts());
        dailyLog.setActivities(dailyLogDto.getActivities());
        return dailyLog;
    }

    public List<DailyLogDto> getDailyLogsByDate(Long userId, LocalDate date) {
        List<DailyLog> dailyLogs = dailyLogRepository.findByUserIdAndDate(userId, date);
        return dailyLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<DailyLog> getAllLogsByUser(Long userId) {
        return dailyLogRepository.findByUserId(userId);
    }

    public List<DailyLog> getLogsByUserAndDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return dailyLogRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
    }

    public DailyLog addDailyLog(DailyLog dailyLog) {
        return dailyLogRepository.save(dailyLog);
    }
}
