package com.example.wypozyczalnia.products;

import com.example.wypozyczalnia.users.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductManager {
    ProductRepository productRepository;

    public ProductManager(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> FindProductById(Long id) {
        return productRepository.findById(id);
    }
    public List<Product> FindAllProducts() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void delete(Product product){
        productRepository.delete(product);
    }

    public List<Product> findByCategory(Long categoryId) {
        return productRepository.findByCategory(categoryId);
    }

    public List<Product> findByBrandOrderByAvailability(String brand) {
        return productRepository.findByBrandOrderByAvailability(brand);
    }

    public List<Product> findByModelOrderByAvailability(String model){
        return productRepository.findByModelOrderByAvailability(model);
    }

    public List<Product> findBySizeOrderByAvailability(Double size){
        return productRepository.findBySizeOrderByAvailability(size);
    }
}
