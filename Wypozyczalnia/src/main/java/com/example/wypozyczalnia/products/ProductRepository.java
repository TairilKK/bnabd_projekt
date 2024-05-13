package com.example.wypozyczalnia.products;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Long categoryId);

    List<Product> findByBrandOrderByAvailability(String brand);
    List<Product> findByModelOrderByAvailability(String model);
    List<Product> findBySizeOrderByAvailability(Double size);


}

