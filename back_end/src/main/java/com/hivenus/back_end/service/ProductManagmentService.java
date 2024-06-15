package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.Product;
import com.hivenus.back_end.repository.DailyLogRepository;
import com.hivenus.back_end.repository.ProductRepository;
import com.hivenus.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductManagmentService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DailyLogRepository dailyLogRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductsByDate(LocalDate date, Long userId) {
        // Assuming a method exists in the repository to find products by date
        return productRepository.findByDailyLogDateAndUserId(date, userId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> createProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.save(productDetails);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }


public Product addProductByDateAndUserId(Product product, LocalDate date, Long userId) {
        Product createdProduct = productRepository.save(product);

        DailyLog dailyLog = dailyLogRepository.findByUserIdAndDate(userId, date).orElseGet(() -> {
            DailyLog newDailyLog = new DailyLog();
            newDailyLog.setDate(date);
            newDailyLog.setUser(userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
            newDailyLog.setProducts(new ArrayList<>());
            return newDailyLog;
        });

        dailyLog.getProducts().add(createdProduct);
        dailyLogRepository.save(dailyLog);

        return createdProduct;
    }
}
