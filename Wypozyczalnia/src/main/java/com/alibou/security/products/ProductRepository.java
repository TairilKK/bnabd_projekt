package com.alibou.security.products;

import com.alibou.security.categories.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    List<Product> findByBrandOrderByAvailability(String brand);
    List<Product> findByModelOrderByAvailability(String model);
    List<Product> findBySizeOrderByAvailability(String size);
}

