package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.Product;
import com.hivenus.back_end.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProductManagmentService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductsByDate(LocalDate date) {
        // Assuming a method exists in the repository to find products by date
        return productRepository.findByDailyLogsDate(date);
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
}
