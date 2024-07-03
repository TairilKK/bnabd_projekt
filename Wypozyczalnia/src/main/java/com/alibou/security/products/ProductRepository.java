package com.alibou.security.products;

import com.alibou.security.categories.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);
    Page<Product> findByCategory(Category category, Pageable pageable);
    Page<Product> findByBrand(String brand, Pageable pageable);
    Page<Product> findByCategoryAndBrand(Category category, String brand, Pageable pageable);
    List<Product> findByCategory(Category category);

    @Query("SELECT DISTINCT p.brand FROM Product p")
    List<String> findDistinctBrands();

    @Query("SELECT DISTINCT c.categoryName FROM Category c")
    List<String> findDistinctCategories();
}

