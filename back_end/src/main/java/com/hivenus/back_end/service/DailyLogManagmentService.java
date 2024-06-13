package com.hivenus.back_end.service;

import com.hivenus.back_end.dto.DailyLogDto;
import com.hivenus.back_end.entity.*;
import com.hivenus.back_end.repository.*;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyLogManagmentService {

    @Autowired
    private DailyLogRepository dailyLogRepository;
    @Autowired
    WaterIntakeRepository waterIntakeRepository;
    @Autowired
    SleepTrackRepository sleepTrackRepository;
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
        Optional<DailyLog> optionalExistingLog = dailyLogRepository.findByUserIdAndDate(userId, dailyLogDto.getDate());

        DailyLog dailyLog;

        if (optionalExistingLog.isPresent()) {
            dailyLog = optionalExistingLog.get();

            // Initialize products list if it is null
            if (dailyLog.getProducts() == null) {
                dailyLog.setProducts(new ArrayList<>());
            }

            // Append new products to the existing list of products
            List<Product> newProducts = dailyLogDto.getProducts().stream()
                .map(product -> {
                    if (product.getId() == null) {
                        return productRepository.save(product);
                    } else {
                        return product;
                    }
                })
                .collect(Collectors.toList());
            dailyLog.getProducts().addAll(newProducts);

            // Handle SleepTrack and WaterIntake replacements similarly
            // (Same as before, ensure to check for null values)

        } else {
            // Create a new DailyLog if none exists for the given date
            dailyLog = convertToEntity(dailyLogDto);
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

            // Save SleepTrack if provided
            if (dailyLogDto.getSleepTrack() != null) {
                SleepTrack newSleepTrack = dailyLogDto.getSleepTrack();
                if (newSleepTrack.getId() == null) {
                    newSleepTrack = sleepTrackRepository.save(newSleepTrack);
                }
                dailyLog.setSleepTrack(newSleepTrack);
            }


        }

        try {
            DailyLog savedDailyLog = dailyLogRepository.save(dailyLog);
            return convertToDto(savedDailyLog);
        } catch (Exception e) {
            e.printStackTrace();
            // Log the error or throw a custom exception
            return null;
        }
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

            // Replace existing SleepTrack if provided
            if (dailyLogDto.getSleepTrack() != null) {
                SleepTrack newSleepTrack = dailyLogDto.getSleepTrack();
                if (dailyLog.getSleepTrack() != null) {
                    sleepTrackRepository.delete(dailyLog.getSleepTrack());
                }
                if (newSleepTrack.getId() == null) {
                    newSleepTrack = sleepTrackRepository.save(newSleepTrack);
                }
                dailyLog.setSleepTrack(newSleepTrack);
            }



            try {
                DailyLog updatedDailyLog = dailyLogRepository.save(dailyLog);
                return convertToDto(updatedDailyLog);
            } catch (Exception e) {
                e.printStackTrace();
                // Log the error or throw a custom exception
                return null;
            }
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
        dailyLogDto.setId(dailyLog.getId());
        dailyLogDto.setSleepTrack(dailyLog.getSleepTrack());
        dailyLogDto.setWaterIntakes(dailyLog.getWaterIntakes());

        dailyLogDto.setProducts(dailyLog.getProducts().stream()
                .map(product -> {
                    Product simplifiedProduct = new Product();
                    simplifiedProduct.setId(product.getId());
                    simplifiedProduct.setName(product.getName());
                    simplifiedProduct.setFdcId(product.getFdcId());
                    simplifiedProduct.setPortion(product.getPortion());
                    simplifiedProduct.setQuantity(product.getQuantity());
                    simplifiedProduct.setGram(product.getGram());
                    return simplifiedProduct;
                })
                .collect(Collectors.toList()));
        return dailyLogDto;
    }

private DailyLog convertToEntity(DailyLogDto dailyLogDto) {
    DailyLog dailyLog = new DailyLog();
    dailyLog.setDate(dailyLogDto.getDate());

    // Initialize products list if it is null
    if (dailyLogDto.getProducts() != null) {
        dailyLog.setProducts(dailyLogDto.getProducts());
    } else {
        dailyLog.setProducts(new ArrayList<>());
    }

    dailyLog.setSleepTrack(dailyLogDto.getSleepTrack());
    return dailyLog;
}


    public List<DailyLogDto> getDailyLogsByDate(Long userId, LocalDate date) {
        Optional<DailyLog> dailyLogs = dailyLogRepository.findByUserIdAndDate(userId, date);
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

    public boolean deleteProductFromDailyLog(Long userId, LocalDate date, Long productId) {
        Optional<DailyLog> optionalDailyLog = dailyLogRepository.findByUserIdAndDate(userId, date);
        if (optionalDailyLog.isPresent()) {
            DailyLog dailyLog = optionalDailyLog.get();
            List<Product> products = dailyLog.getProducts();

            boolean productRemoved = products.removeIf(product -> product.getId().equals(productId));
            if (productRemoved) {
                dailyLogRepository.save(dailyLog);
                return true;
            }
        }
        return false;
    }
}
