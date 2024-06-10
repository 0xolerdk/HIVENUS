package com.hivenus.back_end.service;

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
public class DailyLogManagementService {

    @Autowired
    private DailyLogRepository dailyLogRepository;
    @Autowired
    private UserRepository usersRepo;
    @Autowired
    private ProductRepository productRepository;

    public List<DailyLog> getAllDailyLogs() {
        return dailyLogRepository.findAll();
    }

    public DailyLog getDailyLogById(Long id) {
        return dailyLogRepository.findById(id).orElse(null);
    }

    public DailyLog createDailyLog(DailyLog dailyLog, Long userId) {
        Optional<OurUser> optionalUser = usersRepo.findById(userId);
        if (optionalUser.isPresent()) {
            OurUser user = optionalUser.get();
            Optional<DailyLog> optionalExistingLog = dailyLogRepository.findByUserIdAndDate(userId, dailyLog.getDate());

            DailyLog newDailyLog;
            if (optionalExistingLog.isPresent()) {
                newDailyLog = optionalExistingLog.get();
                // Append new products to the existing list of products
                List<Product> newProducts = dailyLog.getProducts().stream()
                        .map(product -> {
                            if (product.getId() == null) {
                                return productRepository.save(product);
                            } else {
                                return product;
                            }
                        })
                        .collect(Collectors.toList());
                newDailyLog.getProducts().addAll(newProducts);
            } else {
                // Create a new DailyLog if none exists for the given date
                newDailyLog = dailyLog;
                newDailyLog.setUser(user);

                // Save all products if they are not already saved
                List<Product> savedProducts = newDailyLog.getProducts().stream()
                        .map(product -> {
                            if (product.getId() == null) {
                                return productRepository.save(product);
                            } else {
                                return product;
                            }
                        })
                        .collect(Collectors.toList());

                newDailyLog.setProducts(savedProducts);
            }

            return dailyLogRepository.save(newDailyLog);
        } else {
            return null;
        }
    }

    public DailyLog updateDailyLog(Long id, DailyLog dailyLog) {
        Optional<DailyLog> optionalDailyLog = dailyLogRepository.findById(id);
        if (optionalDailyLog.isPresent()) {
            DailyLog existingDailyLog = optionalDailyLog.get();
            existingDailyLog.setDate(dailyLog.getDate());

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

            existingDailyLog.setProducts(savedProducts);
            return dailyLogRepository.save(existingDailyLog);
        } else {
            return null;
        }
    }

    public void deleteDailyLog(Long id) {
        dailyLogRepository.deleteById(id);
    }

    public List<DailyLog> getDailyLogsByDate(Long userId, LocalDate date) {
        return dailyLogRepository.findByUserIdAndDate(userId, date).stream()
                .collect(Collectors.toList());
    }

    public List<Product> getProductsByDate(Long userId, LocalDate date) {
        return dailyLogRepository.findByUserIdAndDate(userId, date)
                .map(DailyLog::getProducts)
                .orElse(List.of());
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
