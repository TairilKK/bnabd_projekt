package com.alibou.security.products;

import com.alibou.security.categories.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    List<Product> findByBrand(String brand);
    List<Product> findByCategoryAndBrand(Category category, String brand);

    @Query("SELECT DISTINCT p.brand FROM Product p")
    List<String> findDistinctBrands();
}

